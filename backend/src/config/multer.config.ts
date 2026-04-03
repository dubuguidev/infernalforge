import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

const uploadPath = join(process.cwd(), 'uploads', 'characters');

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}

const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/pjpeg', 'image/png', 'image/webp'];

export const characterMulterOptions = {
  storage: diskStorage({
    destination: uploadPath,
    filename: (_req, file, cb) => {
      const extension = extname(file.originalname).toLowerCase();
      const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
      cb(null, safeName);
    },
  }),
  fileFilter: (_req: Express.Request, file: Express.Multer.File, cb: any) => {
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
