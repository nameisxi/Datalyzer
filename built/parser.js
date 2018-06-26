import { ErrorHandler } from "./errorHandler.js";
export class Parser {
    constructor() {
        this.errorHandler = new ErrorHandler();
    }
    parseJSONFile(rawFile) {
        try {
            let jsonFileParsed = JSON.parse(rawFile);
            return jsonFileParsed;
        }
        catch (error) {
            this.errorHandler.fileParsingError();
        }
    }
    parseCSVFile() {
        return null;
    }
}
