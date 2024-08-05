import { Request, Response } from 'express';

declare const credentialCheck: (req: Request, res: Response) => Promise<void>;

export { credentialCheck };
