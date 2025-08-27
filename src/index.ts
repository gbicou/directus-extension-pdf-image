import { defineHook } from '@directus/extensions-sdk'
import { pdf } from 'pdf-to-img'
import { Readable } from 'node:stream'

export default defineHook(({ action }, { services, getSchema }) => {
  // hook on each PDF file upload
  action('files.upload', async ({ payload, key }, context) => {
    if (payload.type === 'application/pdf') {
      const schema = await getSchema()
      const assets = new services.AssetsService({
        schema,
        accountability: context.accountability,
      })
      const { stream } = await assets.getAsset(key)

      // convert pdf first page to png
      const document = await pdf(stream)
      const image = await document.getPage(1)

      if (image) {
        // patch original payload
        payload.type = 'image/png'
        payload.filename_download = payload.filename_download.replace(/\.pdf$/i, '') + '.png'
        payload.filename_disk = payload.filename_disk.replace(/\.pdf$/i, '') + '.png'

        // upload image to directus files
        const files = new services.FilesService({
          schema,
          accountability: context.accountability,
        })
        await files.uploadOne(Readable.from(image), {
          ...payload,
        })
      }
    }
  })
})
