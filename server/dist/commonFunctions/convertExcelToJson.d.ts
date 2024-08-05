declare const convertExcelToJson: (listPath: string, line: string) => {
    model: string;
    product: string;
    content: string;
    line: string;
} | undefined;
declare const convertExcelToJsonWithoutAlterLine: (listPath: string) => {
    model: string;
    product: string;
    content: string;
    line: string;
} | undefined;

export { convertExcelToJson, convertExcelToJsonWithoutAlterLine };
