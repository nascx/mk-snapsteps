import { Request, Response } from 'express';

declare const handleUploadIT: (req: Request, res: Response) => Promise<void>;
declare const handleUploadQualityFile: (req: Request, res: Response) => Promise<void>;

export { handleUploadIT, handleUploadQualityFile };
