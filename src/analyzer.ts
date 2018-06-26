import { Parser } from "./parser.js";
import { Visualizer } from "./visualizer.js";

export class Analyzer {
    parser: Parser;
    visualizer: Visualizer;

    constructor() {
        this.parser = new Parser();
        this.visualizer = new Visualizer();
    }

    tree(data) {    
        if (typeof(data) == 'object') {
            document.write('<ul>');
            for (let key in data) {
                let keyValue = '<li>' + key
                document.write(keyValue);
                this.tree(data[key]);            
            }
            document.write('</ul>');
        } else {
            let value: string = ': "' + data + '"';
            if (typeof(data) === "number") {
                value = ': ' + data;
            }
            document.write(value);
        }
    }

    analyzeJSONFile(rawFile) {
        console.log("analyzing json file...");
        let file = this.parser.parseJSONFile(rawFile);

        //const keys = Object.keys(file);
        //const firstItem = file[keys[0]];
        //console.log("json content getting started...");
        //const values = this.parser.getJSONContent(firstItem, false, false);
        //console.log("json content obtained.");
        //const content = [keys[0], values];

        let container = document.createElement("div");
        container.setAttribute("id", "container");
        document.body.appendChild(container);

        //this.tree(file);
        this.visualizer.visualizeJSONStructure(file);
        this.visualizer.visualizeFirstJSONElement(file);
    }

    analyzeCSVFile(file) {
        return null;
    }
}