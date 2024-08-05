import { Request, Response } from 'express';

declare const downloadList: (req: Request, res: Response) => Promise<void>;
declare const getModelAndProductOptions: (req: Request, res: Response) => Promise<void>;
declare const getModelProductOptionsAndLine: (req: Request, res: Response) => Promise<void>;
declare const uploadProductionLists: (req: Request, res: Response) => Promise<void>;
declare const sendIT: (req: Request, res: Response) => Promise<void>;

export { downloadList, getModelAndProductOptions, getModelProductOptionsAndLine, sendIT, uploadProductionLists };
