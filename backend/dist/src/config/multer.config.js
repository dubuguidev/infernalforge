"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterMulterOptions = void 0;
const multer_1 = require("multer");
const fs_1 = require("fs");
const path_1 = require("path");
const uploadPath = (0, path_1.join)(process.cwd(), 'uploads', 'characters');
if (!(0, fs_1.existsSync)(uploadPath)) {
    (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
}
const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/pjpeg', 'image/png', 'image/webp'];
exports.characterMulterOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: uploadPath,
        filename: (_req, file, cb) => {
            const extension = (0, path_1.extname)(file.originalname).toLowerCase();
            const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
            cb(null, safeName);
        },
    }),
    fileFilter: (_req, file, cb) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(new Error('Tipo de arquivo nao permitido. Use JPEG, PNG ou WEBP.'), false);
            return;
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
};
//# sourceMappingURL=multer.config.js.map