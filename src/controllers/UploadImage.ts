import { Request, Response } from 'express'
import { uploadFile } from '../config/upload'

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

export const UploadImageController = {
  upload: async (req: Request, res: Response) => {
    try {
      if(!req.file){
        throw new Error('Missing file')
      }

      const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

      if (!imageExtensions.includes(fileExtension)) {
        throw new Error('Invalid file type. Only image files are allowed.');
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
