import multer from 'multer';

declare const uploadEngineeringLists: multer.Multer;
declare const uploadProductionListsMulter: multer.Multer;
declare const uploadIT: multer.Multer;
declare const uploadQuality: multer.Multer;

export { uploadEngineeringLists, uploadIT, uploadProductionListsMulter, uploadQuality };
