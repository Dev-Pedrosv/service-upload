"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../config/multer");
const UploadImage_1 = require("../controllers/UploadImage");
const Hello_1 = require("../controllers/Hello");
const routes = (0, express_1.Router)();
routes.get('/', Hello_1.HelloController.get);
routes.post('/upload-image', multer_1.upload.single('file'), UploadImage_1.UploadImageController.upload);
exports.default = routes;
//# sourceMappingURL=routes.js.map