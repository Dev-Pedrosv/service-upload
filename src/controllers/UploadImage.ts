import { uploadFile } from '../config/upload'
import { Request, Response } from 'express'

export const UploadImageController = {
  upload: async (req: Request, res: Response) => {
    try {
      if(!req.file){
        throw new Error('Missing file')
      }

      const imageUrl  = await uploadFile(req)
      return res.status(201).json(imageUrl)

    } catch (err: any) {
      return res.status(500).json({
        message: err.message || 'Internal Server Error',
      })
    }
  },
}
