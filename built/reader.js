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
        let csvFile = null;
        let promise = new Promise((resolve, reject) => {
            this.reader.readAsText(file, "UTF-8");
            this.reader.onload = (event) => {
                csvFile = event.target.result.split("\n");
                resolve(csvFile);
            };
            this.reader.onerror = (event) => {
                reject(this.errorHandler.fileReadingError());
            };
        });
        promise.then((csvFile) => this.analyzer.analyzeCSVFile(csvFile));
    }
}
