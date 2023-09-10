import { Request } from "express"

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

    const file = req.file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const newFileName = 'file-' + uniqueSuffix + '-' + file!.originalname;

    file!.filename = newFileName;

    const config = {
      client_email: client_email,
      client_id: client_id,
      private_key: private_key
    }

    const auth = new google.auth.GoogleAuth({
      credentials: config,
      scopes: ['https://www.googleapis.com/auth/drive'],
    })

    const driveService = google.drive({
      version: 'v3',
      auth,
    })

    const fileMetaData = {
      name: file?.filename,
      parents: [folderId],
    }

    const readableStream = fs.createReadStream(null, { start: 0, end: file?.buffer.length, fd: 0, autoClose: false });
    readableStream.push(file?.buffer);
    readableStream.push(null);

    const media = {
      mimeType: file?.mimetype,
      body: readableStream,
    }

    const res = await driveService.files.create({
      resource: fileMetaData,
      media,
      field: 'id',
    })

    const urlImage = `https://drive.google.com/uc?export=view&id=${res.data.id}`
    return urlImage

  } catch (err) {
    console.log({err})
    return { message: 'Erro ao salvar imagem' }
  } 
}
