"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const { google } = require('googleapis');
const fs = require('fs');
function uploadFile(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { folderId, client_id, private_key, client_email } = req.body;
            if (!folderId) {
                return { message: 'Missing folder id' };
            }
            if (!client_id) {
                return { message: 'Missing client_id' };
            }
            if (!private_key) {
                return { message: 'Missing private_key' };
            }
            if (!client_email) {
                return { message: 'Missing client_email' };
            }
            const file = req.file;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const newFileName = 'file-' + uniqueSuffix + '-' + file.originalname;
            file.filename = newFileName;
            const config = {
                client_email: client_email,
                client_id: client_id,
                private_key: private_key
            };
            const auth = new google.auth.GoogleAuth({
                credentials: config,
                scopes: ['https://www.googleapis.com/auth/drive'],
            });
            const driveService = google.drive({
                version: 'v3',
                auth,
            });
            const fileMetaData = {
                name: file === null || file === void 0 ? void 0 : file.filename,
                parents: [folderId],
            };
            const readableStream = fs.createReadStream(null, { start: 0, end: file === null || file === void 0 ? void 0 : file.buffer.length, fd: 0, autoClose: false });
            readableStream.push(file === null || file === void 0 ? void 0 : file.buffer);
            readableStream.push(null);
            const media = {
                mimeType: file === null || file === void 0 ? void 0 : file.mimetype,
                body: readableStream,
            };
            const res = yield driveService.files.create({
                resource: fileMetaData,
                media,
                field: 'id',
            });
            const urlImage = `https://drive.google.com/uc?export=view&id=${res.data.id}`;
            return urlImage;
        }
        catch (err) {
            console.log({ err });
            return { message: 'Erro ao salvar a imagem', err };
        }
    });
}
exports.uploadFile = uploadFile;
//# sourceMappingURL=upload.js.map