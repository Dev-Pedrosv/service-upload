import { uploadFile } from '../config/upload'

export const UploadImageController = {
  upload: async (req, res) => {
    try {
      if(!req.file){
        throw new Error('Missing file')
      }

      const imageUrl  = await uploadFile(req)
      return res.status(201).json(imageUrl)

    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Internal Server Error',
      })
    }
  },
}
