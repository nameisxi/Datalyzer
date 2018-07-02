export class DomCreator {
    constructor() {
    }
    initializeFirstObjectContainer(file, innerHTMLStringOfStructure, firstJSONObject) {
        let firstObjectContainer = document.getElementById("firstObjectContainer");
        let jsonFileStructureContainer = this.initializeJSONFileStructureContainer(file, innerHTMLStringOfStructure);
        let firstJSONObjectContainer = this.initializeFirstJSONObjectContainer(file, firstJSONObject);
        firstObjectContainer.appendChild(jsonFileStructureContainer);
        firstObjectContainer.appendChild(firstJSONObjectContainer);
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
        fullFileButtonContainer.setAttribute("class", "button");
        let label = document.createElement("label");
        label.innerHTML = "Full file";
        fullFileButtonContainer.appendChild(label);
        fullFileButtonContainer.addEventListener("click", () => {
            if (document.getElementById("fullFileValueContainer") === null) {
                document.getElementById("fullFileContainer").appendChild(fullFileValueContainer);
                fullFileButtonContainer.firstElementChild.innerHTML = "Hide file";
            }
            else {
                document.getElementById("fullFileContainer").removeChild(fullFileValueContainer);
                fullFileButtonContainer.firstElementChild.innerHTML = "Full file";
            }
        });
        document.getElementById("fullFileContainer").appendChild(fullFileButtonContainer);
    }
    initializeFileSearchContainer(objectList, inputFieldLength) {
        let fileSearchContainer = document.getElementById("fileSearchContainer");
        let stringSearchContainer = this.initializeStringSearchContainer(objectList);
        let nthObjectSearchContainer = this.initializeNthObjectSearchContainer(objectList, inputFieldLength);
        fileSearchContainer.appendChild(stringSearchContainer);
        fileSearchContainer.appendChild(nthObjectSearchContainer);
    }
    initializeStringSearchContainer(objectList) {
        let stringSearchContainer = document.createElement("div");
        stringSearchContainer.setAttribute("id", "stringSearchContainer");
        let stringSearchControlsContainer = document.createElement("div");
        stringSearchControlsContainer.setAttribute("id", "stringSearchControlsContainer");
        let stringSearchFieldContainer = this.initializeStringSearchFieldContainer(objectList);
        stringSearchControlsContainer.appendChild(stringSearchFieldContainer);
        let searchButtonContainer = this.initializeStringSearchButtonContainer(objectList);
        stringSearchControlsContainer.appendChild(searchButtonContainer);
        let searchResultContainer = this.initializeStringSearchResultsContainer();
        stringSearchContainer.appendChild(searchResultContainer);
        stringSearchContainer.appendChild(stringSearchControlsContainer);
        return stringSearchContainer;
    }
    initializeStringSearchFieldContainer(objectList) {
        let stringSearchFieldContainer = document.createElement("div");
        stringSearchFieldContainer.setAttribute("id", "stringSearchFieldContainer");
        let searchField = document.createElement("input");
        searchField.setAttribute("id", "stringSearchField");
        searchField.setAttribute("type", "text");
        searchField.setAttribute("placeholder", "Objects that contain...");
        searchField.addEventListener("keypress", (event) => {
            if (event.key == "Enter") {
                event.preventDefault();
                let oldResultsContainer = document.getElementById("stringSearchResultsContainer");
                oldResultsContainer.innerHTML = "";
                let inputElement = document.getElementById("stringSearchField");
                let inputValue = inputElement.value.trim().toLowerCase();
                for (let object of objectList) {
                    if (inputValue != null && object.innerHTML.includes(inputValue)) {
                        document.getElementById("stringSearchResultsContainer").appendChild(object);
                        document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                        document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                        document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                    }
                }
            }
        });
        stringSearchFieldContainer.appendChild(searchField);
        return stringSearchFieldContainer;
    }
    initializeStringSearchButtonContainer(objectList) {
        let searchButtonContainer = document.createElement("div");
        searchButtonContainer.setAttribute("id", "searchButtonContainer");
        let searchButton = document.createElement("div");
        searchButtonContainer.setAttribute("class", "button");
        searchButtonContainer.setAttribute("id", "stringSearchButton");
        let label = document.createElement("label");
        label.innerHTML = "Search";
        searchButton.appendChild(label);
        searchButton.addEventListener("click", () => {
            console.log("toimii 1");
            let oldResultsContainer = document.getElementById("stringSearchResultsContainer");
            oldResultsContainer.innerHTML = "";
            let inputElement = document.getElementById("stringSearchField");
            let inputValue = inputElement.value.trim().toLowerCase();
            for (let object of objectList) {
                if (inputValue != null && object.innerHTML.includes(inputValue)) {
                    document.getElementById("stringSearchResultsContainer").appendChild(object);
                    document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                }
            }
        });
        searchButtonContainer.appendChild(searchButton);
        return searchButtonContainer;
    }
    initializeStringSearchResultsContainer() {
        let stringSearchResultsContainer = document.createElement("div");
        stringSearchResultsContainer.setAttribute("id", "stringSearchResultsContainer");
        return stringSearchResultsContainer;
    }
    initializeNthObjectSearchContainer(objectList, inputFieldLength) {
        let nthObjectSearchContainer = document.createElement("div");
        nthObjectSearchContainer.setAttribute("id", "nthObjectSearchContainer");
        let nthObjectSearchControlsContainer = document.createElement("div");
        nthObjectSearchControlsContainer.setAttribute("id", "nthObjectSearchControlsContainer");
        let nthObjectSearchFieldContainer = this.initializeNthObjectSearchFieldContainer(objectList, inputFieldLength);
        nthObjectSearchControlsContainer.appendChild(nthObjectSearchFieldContainer);
        let searchButtonContainer = this.initializeNthObjectSearchButtonContainer(objectList);
        nthObjectSearchControlsContainer.appendChild(searchButtonContainer);
        let searchResultsContainer = this.initializeNthObjectSearchResultsContainer();
        nthObjectSearchContainer.appendChild(nthObjectSearchControlsContainer);
        nthObjectSearchContainer.appendChild(searchResultsContainer);
        return nthObjectSearchContainer;
    }
    initializeNthObjectSearchFieldContainer(objectList, inputFieldLength) {
        let nthObjectSearchFieldContainer = document.createElement("div");
        nthObjectSearchFieldContainer.setAttribute("id", "nthObjectSearchFieldContainer");
        let nthObjectSearchField = document.createElement("input");
        nthObjectSearchField.setAttribute("id", "nthObjectSearchField");
        nthObjectSearchField.setAttribute("type", "text");
        nthObjectSearchField.setAttribute("placeholder", "Nth Object");
        nthObjectSearchField.setAttribute("size", inputFieldLength.toString());
        nthObjectSearchFieldContainer.appendChild(nthObjectSearchField);
        nthObjectSearchField.addEventListener('keypress', (event) => {
            if (event.key == "Enter") {
                event.preventDefault();
                let oldResultsContainer = document.getElementById("nthObjectSearchResultsContainer");
                oldResultsContainer.innerHTML = "";
                let inputValue = Number.parseInt(nthObjectSearchField.value) - 1;
                let numberOfObjects = objectList.length;
                if (!isNaN(inputValue) && inputValue < numberOfObjects) {
                    let nthObject = objectList[inputValue].cloneNode(true);
                    document.getElementById("nthObjectSearchResultsContainer").appendChild(nthObject);
                    document.getElementById("nthObjectSearchResultsContainer").scrollIntoView();
                    window.scrollBy(0, -70);
                }
                else if (isNaN(inputValue)) {
                    console.log("not valid value");
                }
                else {
                    console.log("Last object of the file is ", numberOfObjects);
                }
            }
        });
        return nthObjectSearchFieldContainer;
    }
    initializeNthObjectSearchButtonContainer(objectList) {
        let searchButtonContainer = document.createElement("div");
        searchButtonContainer.setAttribute("id", "searchButtonContainer");
        let searchButton = document.createElement("div");
        searchButtonContainer.setAttribute("class", "button");
        searchButtonContainer.setAttribute("id", "nthObjectSearchButton");
        let label = document.createElement("label");
        label.innerHTML = "Search";
        searchButton.appendChild(label);
        searchButton.addEventListener("click", () => {
            let oldResultsContainer = document.getElementById("nthObjectSearchResultsContainer");
            oldResultsContainer.innerHTML = "";
            let inputElement = document.getElementById("nthObjectSearchField");
            let inputValue = Number.parseInt(inputElement.value) - 1;
            let numberOfObjects = objectList.length;
            if (!isNaN(inputValue) && inputValue < numberOfObjects) {
                let nthObject = objectList[inputValue].cloneNode(true);
                document.getElementById("nthObjectSearchResultsContainer").appendChild(nthObject);
                document.getElementById("nthObjectSearchResultsContainer").scrollIntoView();
                window.scrollBy(0, -70);
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
    initializeNthObjectSearchResultsContainer() {
        let nthObjectSearchResultsContainer = document.createElement("div");
        nthObjectSearchResultsContainer.setAttribute("id", "nthObjectSearchResultsContainer");
        return nthObjectSearchResultsContainer;
    }
}
