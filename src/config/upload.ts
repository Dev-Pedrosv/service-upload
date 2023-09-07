import { Request } from 'express'

const {google} = require('googleapis')
const fs = require('fs')

export async function uploadFile(req: Request) {
  try {
    const { folderId, client_id, private_key, client_email} = req.body

    if (!folderId) {
      return { message: 'Missing folder id' }
    }
    if (!client_id) {
      return { message: 'Missing client_id' }
    }
    if (!private_key) {
      return { message: 'Missing private_key' }
    }
    if (!client_email) {
      return { message: 'Missing client_email' }
    }

    const file = {
      client_email: client_email,
      client_id: client_id,
      private_key: JSON.parse(private_key)
    }

    const auth = new google.auth.GoogleAuth({
      credentials: file,
      scopes: ['https://www.googleapis.com/auth/drive'],
    })

    const driveService = google.drive({
      version: 'v3',
      auth,
    })

    const fileMetaData = {
      name: req?.file?.filename,
      parents: [folderId],
    }

    const media = {
      mimeType: req?.file?.mimetype,
      body: fs.createReadStream(req?.file?.path),
    }

    const res = await driveService.files.create({
      resource: fileMetaData,
      media,
      field: 'id',
    })

    const urlImage = `https://drive.google.com/uc?export=view&id=${res.data.id}`
    return urlImage

  } catch (err) {
    console.log(err)
    return { message: 'Erro ao salvar imagem' }
  } finally {
    deleteFile(req)
  }
}

export function deleteFile(req: Request) {
  try {
    const filePath = req?.file?.path
    if (filePath) {
      fs.unlink(filePath, (err: any) => {
        if (err) {
          console.log('Error deleting file', err)
        }
      })
    }
    return { message: 'Image deleted successfully' }
  } catch (err) {
    console.log('Delete file error', err)
    return { message: 'Error deleting image' }
  }
}
