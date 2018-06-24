import { Parser } from "./parser.js";
import { Visualizer } from "./visualizer.js";
export class Analyzer {
    constructor() {
        this.parser = new Parser();
        this.visualizer = new Visualizer();
    }
    analyzeJSONFile(rawFile) {
        console.log("analyzing json file...");
        let file = this.parser.parseJSONFile(rawFile);
        const keys = Object.keys(file);
        const firstItem = file[keys[0]];
        console.log("json content getting started...");
        const values = this.parser.getJSONContent(firstItem, false, false);
        console.log("json content obtained.");
        const content = [keys[0], values];
        let container = document.createElement("div");
        container.setAttribute("id", "container");
        document.body.appendChild(container);
        this.visualizer.visualizeJSONStructure(content);
        this.visualizer.visualizeFirstJSONElement(content);
    }
    analyzeCSVFile(file) {
        return null;
    }
}
