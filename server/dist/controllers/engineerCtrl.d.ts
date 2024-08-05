import { Request, Response } from 'express';

declare const createList: (req: Request, res: Response) => Promise<void>;

export { createList };
