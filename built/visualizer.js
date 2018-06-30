import { ErrorHandler } from "./errorHandler.js";
import { DomCreator } from "./domCreator.js";
export class Visualizer {
    constructor() {
        this.domCreator = new DomCreator();
        this.errorHandler = new ErrorHandler();
    }
    initializeContainers() {
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
    visualizeJSON(file) {
        try {
            let innerHTMLString = this.drawJSONFile(file);
            let fullFileValues = document.createElement("div");
            fullFileValues.setAttribute("id", "fullFileValues");
            fullFileValues.innerHTML = innerHTMLString;
            let objectList = fullFileValues.firstElementChild.childNodes;
            let firstJSONObject = objectList[0].cloneNode(true);
            let inputFieldLength = (file.length).toString().length;
            let innerHTMLStringOfStructure = this.drawJSONStructure(file);
            this.domCreator.initializeFirstObjectContainer(file, innerHTMLStringOfStructure, firstJSONObject);
            this.domCreator.initializeFullFileContainer(fullFileValues);
            this.domCreator.initializeFileSearchContainer(objectList, inputFieldLength);
        }
        catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }
    /*visualizeJSONStructure(file): void {
        try {
            let div = document.createElement("div");
            div.setAttribute("id", "JSONStructure");

            let h3 = document.createElement("h3");
            let h3Value = document.createTextNode("JSON file's structure: ");
            h3.appendChild(h3Value);
            div.appendChild(h3);

            let valueDiv = document.createElement("div");
            valueDiv.setAttribute("id", "JSONStructureValue");

            let innerHTMLString: string = this.drawJSONStructure(file);
            let temporaryDiv = document.createElement("div");
            temporaryDiv.innerHTML = innerHTMLString;
            valueDiv.appendChild(temporaryDiv.firstElementChild.firstElementChild);

            div.appendChild(valueDiv);
            document.getElementById("firstObjectContainer").appendChild(div);
        } catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }

    visualizeFirstJSONObject(file, firstJSONObject): void {
        try {
            let div = document.createElement("div");
            div.setAttribute("id", "firstJSONObject");

            let h3 = document.createElement("h3");
            let h3Value = document.createTextNode("JSON file's first object: ");
            h3.appendChild(h3Value);
            div.appendChild(h3);

            let valueDiv = document.createElement("div");
            valueDiv.setAttribute("id", "firstJSONObjectValue");
            valueDiv.appendChild(firstJSONObject);

            div.appendChild(valueDiv);
            document.getElementById("firstObjectContainer").appendChild(div);
        } catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }*/
    drawJSONStructure(data) {
        let innerHTMLString = "";
        if (typeof (data) == "object") {
            innerHTMLString += "<ul>";
            for (let key in data) {
                innerHTMLString += "<li>" + key;
                innerHTMLString += this.drawJSONStructure(data[key]);
            }
            innerHTMLString += "</ul>";
        }
        else {
            let value = ": " + typeof (data);
            if (typeof (data) === "number") {
                value = ": integer";
            }
            innerHTMLString += value;
        }
        return innerHTMLString;
    }
    drawJSONFile(data) {
        let innerHTMLString = "";
        if (typeof (data) == "object") {
            innerHTMLString += "<ul>";
            for (let key in data) {
                innerHTMLString += "<li>" + key;
                innerHTMLString += this.drawJSONFile(data[key]);
            }
            innerHTMLString += "</ul>";
        }
        else {
            let value = ': "' + data + '"';
            if (typeof (data) === "number") {
                value = ": " + data;
            }
            innerHTMLString += value;
        }
        return innerHTMLString;
    }
    /*createFullFileButton(fullJSON: HTMLElement): void {
        let fullFileButton = document.getElementById("fullFileButtonContainer");
        let label = document.createElement("label");
        label.innerHTML = "Full file";
        fullFileButton.appendChild(label);

        fullFileButton.addEventListener("click", () => {
            if (document.getElementById("JSONFile") === null) {
                document.getElementById("fullFileContainer").appendChild(fullJSON);
                fullFileButton.firstElementChild.innerHTML = "Hide file";
            } else {
                document.getElementById("fullFileContainer").removeChild(fullJSON);
                fullFileButton.firstElementChild.innerHTML = "Full file";
            }
        });
    }*/
    /*createFileSearchControls(objectList, numberOfObjects, inputFieldLength): void {
        let stringSearchContainer = this.createStringSearch();
        let nthObjectSearchContainer = this.createNthObjectSearch(objectList, numberOfObjects, inputFieldLength);

        document.getElementById("fileSearchControlsContainer").appendChild(stringSearchContainer);
        document.getElementById("fileSearchControlsContainer").appendChild(nthObjectSearchContainer);
    }*/
    /*createStringSearch() {
        let stringSearchContainer = document.createElement("div");

        let searchParameterField = document.createElement("input");
        searchParameterField.setAttribute("id", "searchParameterField");
        searchParameterField.setAttribute("type", "text");
        searchParameterField.setAttribute("placeholder", "Rows that include...");

        let stringSearchButton = document.createElement("div");
        stringSearchButton.setAttribute("class", "fileSearchControlsButtons");
        stringSearchButton.setAttribute("id", "stringSearchButton");

        let label = document.createElement("label");
        label.innerHTML = "Search";
        stringSearchButton.appendChild(label);

        stringSearchContainer.appendChild(searchParameterField);
        stringSearchContainer.appendChild(stringSearchButton);

        return stringSearchContainer;
    }*/
    /*createNthObjectSearch(objectList, numberOfObjects, inputFieldLength) {
        /*let div = document.createElement("div");
        div.setAttribute("id", "JSONFile");

        let h3 = document.createElement("h3");
        let h3Value = document.createTextNode("JSON file: ");
        h3.appendChild(h3Value);
        div.appendChild(h3);

        let valueDiv = document.createElement("div");
        valueDiv.setAttribute("id", "JSONFileValues");

        let innerHTMLString: string = this.drawJSONFile(file);
        valueDiv.innerHTML = innerHTMLString;

        div.appendChild(valueDiv)*/
    /*let nthObjectSearchContainer = document.createElement("div");

    let nthObjectSearchField = document.createElement("input");
    nthObjectSearchField.setAttribute("id", "nthObjectSearchField");
    nthObjectSearchField.setAttribute("type", "text");
    nthObjectSearchField.setAttribute("placeholder", "Nth");
    nthObjectSearchField.setAttribute("size", inputFieldLength.toString());

    let nthObjectSearchButton = document.createElement("div");
    nthObjectSearchButton.setAttribute("class", "fileSearchControlsButtons");
    nthObjectSearchButton.setAttribute("id", "nthObjectSearchButton");

    nthObjectSearchButton.addEventListener("click", () => {
        let previousResultsContainer = document.getElementById("fileSearchResultsContainer");
        previousResultsContainer.innerHTML = "";

        let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("nthObjectSearchField");
        let inputValue = Number.parseInt(inputElement.value) - 1;

        if (!isNaN(inputValue) && inputValue < numberOfObjects) {
            let nthObject = objectList[inputValue].cloneNode(true);
            document.getElementById("fileSearchResultsContainer").appendChild(nthObject);
        } else if (isNaN(inputValue)) {
            console.log("not valid value");
        } else {
            console.log("Last object of the file is ", numberOfObjects);
        }
    });

    let label = document.createElement("label");
    label.innerHTML = "Search";
    nthObjectSearchButton.appendChild(label);

    nthObjectSearchContainer.appendChild(document.createTextNode("Get the "));
    nthObjectSearchContainer.appendChild(nthObjectSearchField);
    nthObjectSearchContainer.appendChild(document.createTextNode(" object"));
    nthObjectSearchContainer.appendChild(nthObjectSearchButton);

    return nthObjectSearchContainer;
}*/
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
