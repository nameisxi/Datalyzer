import { ErrorHandler } from "./errorHandler.js";
import { Analyzer } from "./analyzer.js";
/**
 * Reader class handles file readings.
 */
export class Reader {
    constructor() {
        this.errorHandler = new ErrorHandler();
        this.analyzer = new Analyzer();
        this.reader = new FileReader();
    }
    readJSONFile(file) {
        console.log("JSON reading started...");
        let jsonFile = null;
        let promise = new Promise((resolve, reject) => {
            this.reader.readAsText(file, "UTF-8");
            this.reader.onload = (event) => {
                jsonFile = event.target.result;
                resolve(jsonFile);
            };
            this.reader.onerror = (event) => {
                reject(this.errorHandler.fileReadingError());
            };
        });
        promise.then((jsonFile) => this.analyzer.analyzeJSONFile(jsonFile));
    }
    readCSVFile(file) {
        return null;
    }
}
