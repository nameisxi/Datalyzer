import { Parser } from "./parser.js";
import { JSONVisualizer } from "./jsonVisualizer.js";
import { CSVVisualizer } from "./csvVisualizer.js";

export class Analyzer {
    parser: Parser;
    jsonVisualizer: JSONVisualizer;
    csvVisualizer: CSVVisualizer;

    constructor() {
        this.parser = new Parser();
        this.jsonVisualizer = new JSONVisualizer();
        this.csvVisualizer = new CSVVisualizer();
    }

    analyzeJSONFile(rawFile) {
        let file = this.parser.parseJSONFile(rawFile);

        this.jsonVisualizer.initializeContainers();
        this.jsonVisualizer.visualizeJSON(file);
    }

    analyzeCSVFile(file) {
        this.csvVisualizer.initializeContainers();
        this.csvVisualizer.visualizeCSV(file);
    }
}