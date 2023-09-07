import { Router } from 'express'
import { upload } from '../config/multer'
import { UploadImageController } from '../controllers/UploadImage'
import { HelloController } from '../controllers/Hello'

const routes = Router()

routes.get('/', HelloController.get)
routes.post('/upload-image', upload.single('file'), UploadImageController.upload)

export default routes
