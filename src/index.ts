import { defineHook } from '@directus/extensions-sdk'
import { AssetsService } from '@directus/api/services/assets'
import { FilesService } from '@directus/api/services/files'
import { pdf } from 'pdf-to-img'
import { Readable } from 'node:stream'

export default defineHook(({ action }, { services }) => {
  action('files.upload', async ({ payload, key }, context) => {
    if (payload.type === 'application/pdf') {
      const assets: AssetsService = new services.AssetsService(context)
      const files: FilesService = new services.FilesService(context)

      payload.type = 'image/png'
      payload.filename_download = payload.filename_download.replace(/\.pdf$/i, '') + '.png'
      payload.filename_disk = payload.filename_disk.replace(/\.pdf$/i, '') + '.png'

      const { stream } = await assets.getAsset(key)
      const document = await pdf(stream)
      const page = await document.getPage(1)

      if (page) {
        const image = Readable.from(page)
        await files.uploadOne(image, {
          ...payload,
        })
      }
    }
  })
})
