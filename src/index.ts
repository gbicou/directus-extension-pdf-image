import { defineHook } from '@directus/extensions-sdk'
import { AssetsService } from '@directus/api/services/assets'
import { FilesService } from '@directus/api/services/files'
import { pdf } from 'pdf-to-img'
import { Readable } from 'node:stream'

export default defineHook(({ action }, { services }) => {
  // hook on each PDF file upload
  action('files.upload', async ({ payload, key }, context) => {
    if (payload.type === 'application/pdf') {
      const assets: AssetsService = new services.AssetsService(context)
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
        const files: FilesService = new services.FilesService(context)
        await files.uploadOne(Readable.from(image), {
          ...payload,
        })
      }
    }
  })
})
