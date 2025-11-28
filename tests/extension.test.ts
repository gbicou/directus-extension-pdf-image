import { describe, expect, it } from 'vitest'
import {
  createDirectus,
  readAssetArrayBuffer,
  readExtensions,
  readFiles,
  rest, sleep,
  staticToken,
  uploadFiles,
} from '@directus/sdk'
import { name } from '../package.json'
import { readFileSync } from 'fs'
import * as path from 'node:path'
import { randomUUID } from 'node:crypto'

describe('extension', () => {
  // directus client
  const directus = createDirectus(process.env.PUBLIC_URL as string)
    .with(rest())
    .with(staticToken(process.env.ADMIN_TOKEN as string))

  it('register correctly in directus', async () => {
    const extensions = await directus.request(readExtensions())

    expect(extensions).toBeDefined()
    expect(extensions.map(extension => extension.schema?.name)).toContain(name)
  })

  it('create an image from PDF', async () => {
    const fileName = `sample-${randomUUID()}`

    // read contents of sample.pdf
    const raw_file = readFileSync(path.join(__dirname, 'sample.pdf'))

    // setup form data
    const formData = new FormData()
    formData.append('file_1_title', fileName)
    formData.append('file', new File([raw_file], `${fileName}.pdf`, { type: 'application/pdf' }))

    // upload file
    const uploaded = await directus.request(uploadFiles(formData))
    expect(uploaded).toBeDefined()
    expect(uploaded.filename_disk).toMatch(/\.pdf$/)

    // wait for extension to process file
    await sleep(1000)

    // search same filename with png
    const files = await directus.request(readFiles({
      filter: {
        filename_disk: uploaded.filename_disk.replace(/\.pdf$/, '.png'),
      },
    }))
    expect(files).toBeDefined()
    expect(files).toHaveLength(1)
    expect(files[0]?.title).toMatch(uploaded.title)

    const image = await directus.request(readAssetArrayBuffer(files[0]?.id))
    expect(image.byteLength).toMatchInlineSnapshot(`222347`)

    const expected = readFileSync(path.join(__dirname, 'sample.png'))
    expect(image.byteLength).toEqual(expected.byteLength)
  })
})
