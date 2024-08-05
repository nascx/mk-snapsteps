import { Request, Response } from 'express';

declare const sendPdf: (req: Request, res: Response) => Promise<void>;

export { sendPdf };
