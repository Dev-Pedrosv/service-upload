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
exports.UploadImageController = void 0;
const upload_1 = require("../config/upload");
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
exports.UploadImageController = {
    upload: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.file) {
                throw new Error('Missing file');
            }
            const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
            if (!imageExtensions.includes(fileExtension)) {
                throw new Error('Invalid file type. Only image files are allowed.');
            }
            const imageUrl = yield (0, upload_1.uploadFile)(req);
            return res.status(201).json(imageUrl);
        }
        catch (err) {
            return res.status(500).json({
                message: err.message || 'Internal Server Error',
            });
        }
    }),
};
//# sourceMappingURL=UploadImage.js.map