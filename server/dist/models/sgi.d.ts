declare const existsThisIT: (path: string) => Promise<unknown>;
declare const insertIT: (path: string, name: string) => Promise<unknown>;
declare const existsThisQAFile: (code: string) => Promise<unknown>;
declare const insertQAFile: (code: string, title: string, path: string) => Promise<unknown>;

export { existsThisIT, existsThisQAFile, insertIT, insertQAFile };
