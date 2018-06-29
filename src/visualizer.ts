import { ErrorHandler } from "./errorHandler.js";

export class Visualizer {
    errorHandler: ErrorHandler;
    
    constructor() {
        this.errorHandler = new ErrorHandler();
    }

    initializeContainers(): void {
        // Container holds all the other parts created by JS in this application.
        let container = document.createElement("div");
        container.setAttribute("id", "container");

        // firstObjectContainer holds file's first element's structure and first element.
        let firstObjectContainer = document.createElement("div");
        firstObjectContainer.setAttribute("id", "firstObjectContainer");

        // 
        let fullFileButtonContainer = document.createElement("div");
        fullFileButtonContainer.setAttribute("class", "button");
        fullFileButtonContainer.setAttribute("id", "fullFileButtonContainer");

        let fullFileContainer = document.createElement("div");
        fullFileContainer.setAttribute("id", "fullFileContainer");

        let fileSearchContainer = document.createElement("div");
        fileSearchContainer.setAttribute("id", "fileSearchContainer");

        let fileSearchControlsContainer = document.createElement("div");
        fileSearchControlsContainer.setAttribute("id", "fileSearchControlsContainer");

        let fileSearchResultsContainer = document.createElement("div");
        fileSearchResultsContainer.setAttribute("id", "fileSearchResultsContainer");

        fileSearchContainer.appendChild(fileSearchControlsContainer);
        fileSearchContainer.appendChild(fileSearchResultsContainer);
        
        container.appendChild(firstObjectContainer);
        container.appendChild(fullFileButtonContainer);
        container.appendChild(fullFileContainer);
        container.appendChild(fileSearchContainer);
        document.body.appendChild(container);        
    }

    visualizeJSON(file): void {
        try {
            let div = document.createElement("div");
            div.setAttribute("id", "JSONObject");

            let h3 = document.createElement("h3");
            let h3Value = document.createTextNode("JSON file: ");
            h3.appendChild(h3Value);
            div.appendChild(h3);

            let valueDiv = document.createElement("div");
            valueDiv.setAttribute("id", "JSONObjectValue");

            let innerHTMLString: string = this.drawJSONObject(file);
            valueDiv.innerHTML = innerHTMLString;

            div.appendChild(valueDiv);

            let objectList = valueDiv.firstElementChild.childNodes;
            let firstJSONObject = objectList[0];
            this.visualizeJSONStructure(file);
            this.visualizeFirstJSONObject(file, firstJSONObject);
            this.createFullFileButton(div);
            this.createFileSearchControls(objectList, (objectList.length).toString().length);
        } catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }

    visualizeJSONStructure(file): void {
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

    drawJSONObject(data): string {
        let innerHTMLString: string = "";
        if (typeof(data) == "object") {
            innerHTMLString += "<ul>";

            for (let key in data) {
                innerHTMLString += "<li>" + key;
                innerHTMLString += this.drawJSONObject(data[key]);             
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

    visualizeNthJSONElement() {
        return null;
    }

    visualizeWholeJSONFile() {
        return null;
    }

    createFullFileButton(fullJSON: HTMLElement): void {
        let fullFileButton = document.getElementById("fullFileButtonContainer");
        let label = document.createElement("label");
        label.innerHTML = "Full file";
        fullFileButton.appendChild(label);

        fullFileButton.addEventListener("click", () => {
            if (document.getElementById("JSONObject") === null) {
                document.getElementById("fullFileContainer").appendChild(fullJSON);
                fullFileButton.firstElementChild.innerHTML = "Hide file";
            } else {
                document.getElementById("fullFileContainer").removeChild(fullJSON);
                fullFileButton.firstElementChild.innerHTML = "Full file";
            }
        });
    }

    createFileSearchControls(objectList, numberOfObjects): void {
        let stringSearchContainer = this.createStringSearch();
        let nthObjectSearchContainer = this.createNthObjectSearch(objectList, numberOfObjects);

        document.getElementById("fileSearchControlsContainer").appendChild(stringSearchContainer);
        document.getElementById("fileSearchControlsContainer").appendChild(nthObjectSearchContainer);
    }

    createStringSearch() {
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
    }

    createNthObjectSearch(objectList, numberOfObjects) {
        let nthObjectSearchContainer = document.createElement("div");

        let nthObjectSearchField = document.createElement("input");
        nthObjectSearchField.setAttribute("id", "nthObjectSearchField");
        nthObjectSearchField.setAttribute("type", "text");
        nthObjectSearchField.setAttribute("placeholder", "Nth");
        nthObjectSearchField.setAttribute("size", numberOfObjects.toString());

        let nthObjectSearchButton = document.createElement("div");
        nthObjectSearchButton.setAttribute("class", "fileSearchControlsButtons");
        nthObjectSearchButton.setAttribute("id", "nthObjectSearchButton");

        let label = document.createElement("label");
        label.innerHTML = "Search";
        nthObjectSearchButton.appendChild(label);

        nthObjectSearchButton.addEventListener("click", () => {
            let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("nthObjectSearchField");
            let inputValue = inputElement.value;
            console.log(inputValue);
            console.log(Number.parseInt(inputValue));

            //if (!isNaN(inputValue) && inputValue < objectList.length) {
                //console.log("toimii2");
                //let nthObject = objectList[inputValue];
              //  document.getElementById("fileSearchResultsContainer").appendChild(nthObject);
            //}
        });

        nthObjectSearchContainer.appendChild(document.createTextNode("Get the "));
        nthObjectSearchContainer.appendChild(nthObjectSearchField);
        nthObjectSearchContainer.appendChild(document.createTextNode(" object"));
        nthObjectSearchContainer.appendChild(nthObjectSearchButton);

        return nthObjectSearchContainer;
    }

    visualizeCSVStructure() {
        return null;
    }

    visualizeFirstCSVElement() {
        return null;
    }

    visualizeNthCSVElement() {
        return null;
    }

    visualizeWholeCSVFile() {
        return null;
    }
}