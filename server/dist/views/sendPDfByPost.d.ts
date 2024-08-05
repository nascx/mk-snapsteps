import { Request, Response } from 'express';

declare const sendPdfByPost: (req: Request, res: Response) => Promise<void>;

export { sendPdfByPost };
