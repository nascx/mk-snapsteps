declare const exsitsThisListIEngineeringLists: (model: string, product: string) => Promise<unknown>;
declare const insertListInEngineeringLists: (model: string, product: string, content: string, line: string) => Promise<unknown>;
declare const updateListInEngineeringLists: (model: string, product: string, content: string, line: string) => Promise<unknown>;
declare const exsitsListsWithThisModelAndProductInProductionLists: (model: string, product: string) => Promise<unknown>;
declare const updateContentInProductionLists: (content: string, model: string, product: string, line: string) => Promise<unknown>;

export { exsitsListsWithThisModelAndProductInProductionLists, exsitsThisListIEngineeringLists, insertListInEngineeringLists, updateContentInProductionLists, updateListInEngineeringLists };
