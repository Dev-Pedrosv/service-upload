import { Router } from 'express'
import { upload } from '../config/multer'
import { UploadImageController } from '../controllers/UploadImage'

const routes = Router()

routes.post('/upload-image', upload.single('file'), UploadImageController.upload)

export default routes
