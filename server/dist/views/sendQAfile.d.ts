import { Request, Response } from 'express';

declare const sendQAFile: (req: Request, res: Response) => Promise<void>;

export { sendQAFile };
