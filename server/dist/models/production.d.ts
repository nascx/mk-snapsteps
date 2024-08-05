declare const getContentFromProductionList: (model: string, product: string, line: string) => Promise<unknown>;
declare const getContentFromEngineeringList: (model: string, product: string) => Promise<unknown>;
declare const searchByModelAndProductOptions: () => Promise<unknown>;
declare const searchByModelAndProductOptionsAndLine: () => Promise<unknown>;
declare const exsitsThisListInProductionLists: (model: string, product: string, line: string) => Promise<unknown>;
declare const saveNewListInProductionLists: (model: string, product: string, line: string, content: string) => Promise<unknown>;
declare const updateListInProductionLists: (model: string, product: string, line: string, content: string) => Promise<unknown>;

export { exsitsThisListInProductionLists, getContentFromEngineeringList, getContentFromProductionList, saveNewListInProductionLists, searchByModelAndProductOptions, searchByModelAndProductOptionsAndLine, updateListInProductionLists };
