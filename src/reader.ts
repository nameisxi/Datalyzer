import { ErrorHandler } from "./errorHandler";
import { Analyzer } from "./analyzer";

/**
 * Reader class handles file readings.
 */
export class Reader {
    errorHandler: ErrorHandler;
    analyzer: Analyzer;
    constructor() {
        this.errorHandler = new ErrorHandler();
        this.analyzer = new Analyzer();
    }

    readJSONFile(file) {
        let jsonFile = null;
        const reader = new FileReader();

        let promise = new Promise((resolve, reject) => {
            reader.readAsText(file, "UTF-8");
            reader.onload = (event) => {
                console.log("loading...");
                jsonFile = event.target.result;
                resolve(jsonFile);
            }
    
            reader.onerror = (event) => {
                reject(this.errorHandler.fileReadingError());
            }
        });

        promise.then((jsonFile) => this.analyzer.analyzeJSONFile(jsonFile));
    }

    readCSVFile(file) {

    }
}