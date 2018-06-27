import { Parser } from "./parser.js";
import { Visualizer } from "./visualizer.js";

export class Analyzer {
    parser: Parser;
    visualizer: Visualizer;

    constructor() {
        this.parser = new Parser();
        this.visualizer = new Visualizer();
    }

    analyzeJSONFile(rawFile) {
        let file = this.parser.parseJSONFile(rawFile);

        this.visualizer.initializeContainers();
        let jsonElement = this.visualizer.visualizeJSON(file);
    }

    analyzeCSVFile(file) {
        return null;
    }
}