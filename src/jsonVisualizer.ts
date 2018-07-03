import { ErrorHandler } from "./errorHandler.js";
import { JSONDomCreator } from "./jsonDomCreator.js";

export class JSONVisualizer {
    domCreator: JSONDomCreator;
    errorHandler: ErrorHandler;
    
    constructor() {
        this.domCreator = new JSONDomCreator();
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
            let innerHTMLString: string = this.jsonFileToHTML(file);
            let fullFileValues = document.createElement("div");
            fullFileValues.setAttribute("id", "fullFileValues");
            fullFileValues.innerHTML = innerHTMLString;

            let objectList = fullFileValues.firstElementChild.childNodes;
            let firstJSONObject = objectList[0].cloneNode(true);
            let innerHTMLStringOfStructure = this.jsonStructureToHTML(file);

            this.domCreator.initializeFirstObjectContainer(file, innerHTMLStringOfStructure, firstJSONObject);
            this.domCreator.initializeFullFileContainer(fullFileValues);
            this.domCreator.initializeFileSearchContainer(objectList);
        } catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }

    jsonStructureToHTML(data): string {
        let innerHTMLString: string = "";
        if (typeof(data) == "object") {
            innerHTMLString += "<ul>";
            for (let key in data) {
                innerHTMLString += "<li>" + key;
                innerHTMLString += this.jsonStructureToHTML(data[key]);            
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

    jsonFileToHTML(data): string {
        let innerHTMLString: string = "";
        if (typeof(data) == "object") {
            innerHTMLString += "<ul>";

            for (let key in data) {
                innerHTMLString += "<li>" + key;
                innerHTMLString += this.jsonFileToHTML(data[key]);             
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
}