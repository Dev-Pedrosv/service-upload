import multer, { Multer } from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const fileName =
      file.fieldname +
      '-' +
      uniqueSuffix +
      '-' +
      file.originalname.split('-').pop()
    cb(null, fileName)
  },
})

export const upload: Multer = multer({ storage })
