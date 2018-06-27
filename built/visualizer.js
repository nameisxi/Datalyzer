import { ErrorHandler } from "./errorHandler.js";
export class Visualizer {
    constructor() {
        this.errorHandler = new ErrorHandler();
    }
    initializeContainers() {
        // Container holds all the other parts created by JS in this application.
        let container = document.createElement("div");
        container.setAttribute("id", "container");
        // firstElementContainer holds file's first element's structure and first element.
        let firstElementContainer = document.createElement("div");
        firstElementContainer.setAttribute("id", "firstElementContainer");
        let fullFileContainer = document.createElement("div");
        fullFileContainer.setAttribute("id", "fullFileContainer");
        container.appendChild(firstElementContainer);
        container.appendChild(fullFileContainer);
        document.body.appendChild(container);
    }
    visualizeJSON(file) {
        try {
            let div = document.createElement("div");
            div.setAttribute("id", "JSONElement");
            let h3 = document.createElement("h3");
            let h3Value = document.createTextNode("JSON file: ");
            h3.appendChild(h3Value);
            div.appendChild(h3);
            let valueDiv = document.createElement("div");
            valueDiv.setAttribute("id", "JSONElementValue");
            let innerHTMLString = this.drawJSONElement(file);
            valueDiv.innerHTML = innerHTMLString;
            div.appendChild(valueDiv);
            let firstJSONElement = valueDiv.firstElementChild.firstElementChild;
            this.visualizeJSONStructure(file);
            this.visualizeFirstJSONElement(file, firstJSONElement);
            this.createFullJSONViewerButton(div);
        }
        catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }
    visualizeJSONStructure(file) {
        try {
            let div = document.createElement("div");
            div.setAttribute("id", "JSONStructure");
            let h3 = document.createElement("h3");
            let h3Value = document.createTextNode("JSON file's structure: ");
            h3.appendChild(h3Value);
            div.appendChild(h3);
            let valueDiv = document.createElement("div");
            valueDiv.setAttribute("id", "JSONStructureValue");
            let innerHTMLString = this.drawJSONStructure(file);
            let temporaryDiv = document.createElement("div");
            temporaryDiv.innerHTML = innerHTMLString;
            valueDiv.appendChild(temporaryDiv.firstElementChild.firstElementChild);
            div.appendChild(valueDiv);
            document.getElementById("firstElementContainer").appendChild(div);
        }
        catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }
    visualizeFirstJSONElement(file, firstJSONElement) {
        try {
            let div = document.createElement("div");
            div.setAttribute("id", "JSONFirstElement");
            let h3 = document.createElement("h3");
            let h3Value = document.createTextNode("JSON file's first element: ");
            h3.appendChild(h3Value);
            div.appendChild(h3);
            let valueDiv = document.createElement("div");
            valueDiv.setAttribute("id", "JSONFirstElementValue");
            valueDiv.appendChild(firstJSONElement);
            div.appendChild(valueDiv);
            document.getElementById("firstElementContainer").appendChild(div);
        }
        catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }
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
    drawJSONElement(data) {
        let innerHTMLString = "";
        if (typeof (data) == "object") {
            innerHTMLString += "<ul>";
            for (let key in data) {
                innerHTMLString += "<li>" + key;
                innerHTMLString += this.drawJSONElement(data[key]);
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
    visualizeNthJSONElement() {
        return null;
    }
    visualizeWholeJSONFile() {
        return null;
    }
    createFullJSONViewerButton(fullJSON) {
        //<div class="button"><label for="fileInputField">Upload</label></div>
        let div = document.createElement("div");
        div.setAttribute("class", "button");
        div.setAttribute("id", "fullFileButton");
        div.addEventListener("click", () => {
            if (document.getElementById("JSONElement") === null) {
                document.getElementById("fullFileContainer").appendChild(fullJSON);
                div.firstElementChild.innerHTML = "Hide full file";
            }
            else {
                document.getElementById("fullFileContainer").removeChild(fullJSON);
                div.firstElementChild.innerHTML = "Full file";
            }
        });
        let label = document.createElement("label");
        label.innerHTML = "Full file";
        div.appendChild(label);
        document.getElementById("container").appendChild(div);
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
