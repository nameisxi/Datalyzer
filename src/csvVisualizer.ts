import { ErrorHandler } from "./errorHandler.js";
import { CSVDomCreator } from "./csvDomCreator.js";

export class CSVVisualizer {
    domCreator: CSVDomCreator;
    errorHandler: ErrorHandler;
    
    constructor() {
        this.domCreator = new CSVDomCreator();
        this.errorHandler = new ErrorHandler();
    }

    initializeContainers(): void {
        /* Container holds all the other parts created by JS in this application. */
        let container = document.createElement("div");
        container.setAttribute("id", "container");
 
        // firstObjectContainer holds file's first object's structure and the first object itself.
        let firstObjectContainer = document.createElement("div");
        firstObjectContainer.setAttribute("id", "firstRowsContainer");

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

    visualizeCSV(file): void {
        try {
            let innerHTMLString: string = this.csvFileToHTML(file);
            let fullFileValues = document.createElement("div");
            fullFileValues.setAttribute("id", "fullFileValues");
            fullFileValues.innerHTML = innerHTMLString;

            let rowList = fullFileValues.firstElementChild.childNodes;
            let firstRows = [rowList[0].cloneNode(true), rowList[1].cloneNode(true)];
            let innerHTMLStringOfStructure = this.csvStructureToHTML(file);

            this.domCreator.initializeFirstRowsContainer(file, innerHTMLStringOfStructure, firstRows);
            console.log("toimii 1");
            this.domCreator.initializeFullFileContainer(fullFileValues);
            console.log("toimii 2");
            this.domCreator.initializeFileSearchContainer(rowList);
            console.log("toimii 3");
        } catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }

    csvStructureToHTML(data): string {
        let innerHTMLString: string = "<ul>";

        for (let row of data) {
            innerHTMLString += "<li>";

            for (let column of row) {
                innerHTMLString += typeof(column) + ",";
            }

            innerHTMLString += "</li>";
        }
        innerHTMLString += "</ul>";

        return innerHTMLString;
    }

    csvFileToHTML(data): string {
        let innerHTMLString: string = "<ul>";

        for (let row of data) {
            innerHTMLString += "<li>" + row + "</li>";
        }
        innerHTMLString += "</ul>";

        return innerHTMLString;
    }
}