export declare const characterMulterOptions: {
    storage: import("multer").StorageEngine;
    fileFilter: (_req: Express.Request, file: Express.Multer.File, cb: any) => void;
    limits: {
        fileSize: number;
    };
};
