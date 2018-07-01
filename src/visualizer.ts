import { ErrorHandler } from "./errorHandler.js";
import { DomCreator } from "./domCreator.js";

export class Visualizer {
    domCreator: DomCreator;
    errorHandler: ErrorHandler;
    
    constructor() {
        this.domCreator = new DomCreator();
        this.errorHandler = new ErrorHandler();
    }

    initializeContainers(): void {
        /* Container holds all the other parts created by JS in this application. */
        let container = document.createElement("div");
        container.setAttribute("id", "container");
 
        // firstObjectContainer holds file's first object's structure and the first object itself.
        let firstObjectContainer = document.createElement("div");
        firstObjectContainer.setAttribute("id", "firstObjectContainer");

        /* Holds everything related to full file view */
        let fullFileContainer = document.createElement("div");
        fullFileContainer.setAttribute("id", "fullFileContainer");

        /* Holds everything related to file search */
        let fileSearchContainer = document.createElement("div");
        fileSearchContainer.setAttribute("id", "fileSearchContainer");
        
        container.appendChild(firstObjectContainer);
        container.appendChild(fullFileContainer);
        container.appendChild(fileSearchContainer);
        document.body.appendChild(container);        
    }

    visualizeJSON(file): void {
        try {
            console.log("visualizeJSOn toimii");
            let innerHTMLString: string = this.drawJSONFile(file);
            console.log("drawjsonfile toimii");
            let fullFileValues = document.createElement("div");
            fullFileValues.setAttribute("id", "fullFileValues");
            fullFileValues.innerHTML = innerHTMLString;

            let objectList = fullFileValues.firstElementChild.childNodes;
            let firstJSONObject = objectList[0].cloneNode(true);
            let inputFieldLength = (file.length).toString().length;
            let innerHTMLStringOfStructure = this.drawJSONStructure(file);
            console.log("drawjsonstructure toimii");

            this.domCreator.initializeFirstObjectContainer(file, innerHTMLStringOfStructure, firstJSONObject);
            console.log("initializefirstobjetcontainer toimii");
            this.domCreator.initializeFullFileContainer(fullFileValues);
            console.log("initializefullfilecontainer toimii");
            this.domCreator.initializeFileSearchContainer(objectList, inputFieldLength);
            console.log("intitializefilesearchcontainer toimii");
        } catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }

    drawJSONStructure(data): string {
        let innerHTMLString: string = "";
        if (typeof(data) == "object") {
            innerHTMLString += "<ul>";
            for (let key in data) {
                innerHTMLString += "<li>" + key;
                innerHTMLString += this.drawJSONStructure(data[key]);            
            }
            innerHTMLString += "</ul>";
        } else {
            let value: string = ": " + typeof(data);
            if (typeof(data) === "number") {
                value = ": integer";
            }    
            innerHTMLString += value;
        }

        return innerHTMLString;
    }

    drawJSONFile(data): string {
        let innerHTMLString: string = "";
        if (typeof(data) == "object") {
            innerHTMLString += "<ul>";

            for (let key in data) {
                innerHTMLString += "<li>" + key;
                innerHTMLString += this.drawJSONFile(data[key]);             
            }
            innerHTMLString += "</ul>";
        } else {
            let value: string = ': "' + data + '"';
            if (typeof(data) === "number") {
                value = ": " + data;
            }
            innerHTMLString += value;
        }

        return innerHTMLString;
    }

    visualizeCSV() {
        return null;
    }

    drawCSVStructure() {
        return null;
    }

    drawFirstCSVRow() {
        return null;
    }
}