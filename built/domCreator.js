export class DomCreator {
    constructor() {
    }
    initializeFirstObjectContainer(file, innerHTMLStringOfStructure, firstJSONObject) {
        let firstObjectContainer = document.getElementById("firstObjectContainer");
        let jsonFileStructureContainer = this.initializeJSONFileStructureContainer(file, innerHTMLStringOfStructure);
        let firstJSONObjectContainer = this.initializeFirstJSONObjectContainer(file, firstJSONObject);
        firstJSONObjectContainer.appendChild(jsonFileStructureContainer);
        firstJSONObjectContainer.appendChild(firstJSONObjectContainer);
    }
    initializeJSONFileStructureContainer(file, innerHTMLStringOfStructure) {
        let JSONFileStructureContainer = document.createElement("div");
        JSONFileStructureContainer.setAttribute("id", "JSONFileStructureContainer");
        let h3 = document.createElement("h3");
        let h3Value = document.createTextNode("JSON file's structure: ");
        h3.appendChild(h3Value);
        JSONFileStructureContainer.appendChild(h3);
        let JSONFileStructureValueContainer = document.createElement("div");
        JSONFileStructureValueContainer.setAttribute("id", "JSONFileStructureValueContainer");
        let temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = innerHTMLStringOfStructure;
        JSONFileStructureValueContainer.appendChild(temporaryDiv.firstElementChild.firstElementChild);
        JSONFileStructureContainer.appendChild(JSONFileStructureValueContainer);
        return JSONFileStructureContainer;
    }
    initializeFirstJSONObjectContainer(file, firstJSONObject) {
        let firstJSONObjectContainer = document.createElement("div");
        firstJSONObjectContainer.setAttribute("id", "firstJSONObjectContainer");
        let h3 = document.createElement("h3");
        let h3Value = document.createTextNode("JSON file's first object: ");
        h3.appendChild(h3Value);
        firstJSONObjectContainer.appendChild(h3);
        let firstJSONObjectValueContainer = document.createElement("div");
        firstJSONObjectValueContainer.setAttribute("id", "firstJSONObjectValueContainer");
        firstJSONObjectValueContainer.appendChild(firstJSONObject);
        firstJSONObjectContainer.appendChild(firstJSONObjectValueContainer);
        return firstJSONObjectContainer;
    }
    initializeFullFileContainer(fullFileValues) {
        // Full file value container
        let fullFileValueContainer = document.createElement("div");
        fullFileValueContainer.setAttribute("id", "fullFileValueContainer");
        let h3 = document.createElement("h3");
        let h3Value = document.createTextNode("JSON file: ");
        h3.appendChild(h3Value);
        fullFileValueContainer.appendChild(h3);
        fullFileValueContainer.appendChild(fullFileValues);
        // Full file button container
        let fullFileButtonContainer = document.createElement("div");
        fullFileButtonContainer.setAttribute("id", "fullFileButtonContainer");
        let label = document.createElement("label");
        label.innerHTML = "Full file";
        fullFileButtonContainer.appendChild(label);
        fullFileButtonContainer.addEventListener("click", () => {
            if (document.getElementById("fullFileValues") === null) {
                document.getElementById("fullFileValueContainer").appendChild(fullFileValues);
                fullFileButtonContainer.firstElementChild.innerHTML = "Hide file";
            }
            else {
                document.getElementById("fullFileValueContainer").removeChild(fullFileValues);
                fullFileButtonContainer.firstElementChild.innerHTML = "Full file";
            }
        });
    }
    initializeFileSearchContainer(objectList, inputFieldLength) {
        let fileSearchContainer = document.getElementById("fileSearchContainer");
        let stringSearchContainer = this.initializeStringSearchContainer();
        let nthObjectSearchContainer = this.initializeNthObjectSearchContainer(objectList, inputFieldLength);
        fileSearchContainer.appendChild(stringSearchContainer);
        fileSearchContainer.appendChild(nthObjectSearchContainer);
    }
    initializeStringSearchContainer() {
        let stringSearchContainer = document.createElement("div");
        stringSearchContainer.setAttribute("id", "stringSearchContainer");
        let stringSearchFieldContainer = this.initializeStringSearchFieldContainer();
        let searchButtonContainer = this.initializeStringSearchButtonContainer();
        let searchResultContainer = this.initializeSearchResultContainer();
        stringSearchContainer.appendChild(stringSearchFieldContainer);
        stringSearchContainer.appendChild(searchButtonContainer);
        stringSearchContainer.appendChild(searchResultContainer);
        return stringSearchContainer;
    }
    initializeStringSearchFieldContainer() {
        let stringSearchFieldContainer = document.createElement("div");
        stringSearchFieldContainer.setAttribute("id", "stringSearchFieldContainer");
        let searchField = document.createElement("input");
        searchField.setAttribute("id", "searchParameterField");
        searchField.setAttribute("type", "text");
        searchField.setAttribute("placeholder", "Rows that include...");
        stringSearchFieldContainer.appendChild(searchField);
        return stringSearchFieldContainer;
    }
    initializeStringSearchButtonContainer() {
        let searchButtonContainer = document.createElement("div");
        searchButtonContainer.setAttribute("id", "searchButtonContainer");
        let searchButton = document.createElement("div");
        searchButtonContainer.setAttribute("class", "button");
        searchButtonContainer.setAttribute("id", "searchButton");
        let label = document.createElement("label");
        label.innerHTML = "Search";
        searchButton.appendChild(label);
        searchButton.addEventListener("click", () => {
            let oldResultsContainer = document.getElementById("searchResultsContainer");
            oldResultsContainer.innerHTML = "";
        });
        searchButtonContainer.appendChild(searchButton);
        return searchButtonContainer;
    }
    initializeNthObjectSearchContainer(objectList, inputFieldLength) {
        let nthObjectSearchContainer = document.createElement("div");
        nthObjectSearchContainer.setAttribute("id", "nthObjectSearchContainer");
        let nthObjectSearchFieldContainer = this.initializeNthObjectSearchFieldContainer(inputFieldLength);
        let searchButtonContainer = this.initializeNthObjectSearchButtonContainer(objectList);
        let searchResultContainer = this.initializeSearchResultContainer();
        nthObjectSearchContainer.appendChild(nthObjectSearchFieldContainer);
        nthObjectSearchContainer.appendChild(searchButtonContainer);
        nthObjectSearchContainer.appendChild(searchResultContainer);
        return nthObjectSearchContainer;
    }
    initializeNthObjectSearchFieldContainer(inputFieldLength) {
        let nthObjectSearchFieldContainer = document.createElement("div");
        nthObjectSearchFieldContainer.setAttribute("id", "nthObjectSearchFieldContainer");
        let nthObjectSearchField = document.createElement("input");
        nthObjectSearchField.setAttribute("id", "nthObjectSearchField");
        nthObjectSearchField.setAttribute("type", "text");
        nthObjectSearchField.setAttribute("placeholder", "Nth");
        nthObjectSearchField.setAttribute("size", inputFieldLength.toString());
        nthObjectSearchFieldContainer.appendChild(nthObjectSearchField);
        return nthObjectSearchFieldContainer;
    }
    initializeNthObjectSearchButtonContainer(objectList) {
        let searchButtonContainer = document.createElement("div");
        searchButtonContainer.setAttribute("id", "searchButtonContainer");
        let searchButton = document.createElement("div");
        searchButtonContainer.setAttribute("class", "button");
        searchButtonContainer.setAttribute("id", "searchButton");
        let label = document.createElement("label");
        label.innerHTML = "Search";
        searchButton.appendChild(label);
        searchButton.addEventListener("click", () => {
            let oldResultsContainer = document.getElementById("searchResultsContainer");
            oldResultsContainer.innerHTML = "";
            let inputElement = document.getElementById("nthObjectSearchField");
            let inputValue = Number.parseInt(inputElement.value) - 1;
            let numberOfObjects = objectList.length;
            if (!isNaN(inputValue) && inputValue < numberOfObjects) {
                let nthObject = objectList[inputValue].cloneNode(true);
                document.getElementById("searchResultsContainer").appendChild(nthObject);
            }
            else if (isNaN(inputValue)) {
                console.log("not valid value");
            }
            else {
                console.log("Last object of the file is ", numberOfObjects);
            }
        });
        searchButtonContainer.appendChild(searchButton);
        return searchButtonContainer;
    }
    initializeSearchResultContainer() {
        return null;
    }
}
