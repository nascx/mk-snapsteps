import { Request, Response } from 'express';

declare const sendQAFilesOptions: (req: Request, res: Response) => Promise<void>;

export { sendQAFilesOptions };
