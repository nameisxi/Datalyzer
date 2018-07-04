export class CSVDomCreator {
    constructor() {
    }
    initializeFirstRowsContainer(file, innerHTMLStringOfStructure, firstCSVRows) {
        let firstRowsContainer = document.getElementById("firstRowsContainer");
        let csvFileStructureContainer = this.initializeCSVFileStructureContainer(file, innerHTMLStringOfStructure);
        let firstCSVRowsContainer = this.initializeFirstCSVRowsContainer(file, firstCSVRows);
        console.log("toimii 1 2");
        firstRowsContainer.appendChild(csvFileStructureContainer);
        firstRowsContainer.appendChild(firstCSVRowsContainer);
    }
    initializeCSVFileStructureContainer(file, innerHTMLStringOfStructure) {
        let CSVFileStructureContainer = document.createElement("div");
        CSVFileStructureContainer.setAttribute("id", "CSVFileStructureContainer");
        let h3 = document.createElement("h3");
        let h3Value = document.createTextNode("CSV file's structure: ");
        h3.appendChild(h3Value);
        CSVFileStructureContainer.appendChild(h3);
        let CSVFileStructureValueContainer = document.createElement("div");
        CSVFileStructureValueContainer.setAttribute("id", "CSVFileStructureValueContainer");
        let temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = innerHTMLStringOfStructure;
        CSVFileStructureValueContainer.appendChild(temporaryDiv.firstElementChild.firstElementChild);
        CSVFileStructureContainer.appendChild(CSVFileStructureValueContainer);
        return CSVFileStructureContainer;
    }
    initializeFirstCSVRowsContainer(file, firstCSVRows) {
        let firstCSVRowsContainer = document.createElement("div");
        firstCSVRowsContainer.setAttribute("id", "firstCSVRowsContainer");
        let h3 = document.createElement("h3");
        let h3Value = document.createTextNode("CSV file's first rows: ");
        h3.appendChild(h3Value);
        firstCSVRowsContainer.appendChild(h3);
        let firstCSVRowsValueContainer = document.createElement("div");
        firstCSVRowsValueContainer.setAttribute("id", "firstCSVRowsValueContainer");
        console.log("row: ", firstCSVRows);
        firstCSVRowsValueContainer.appendChild(firstCSVRows[0]);
        firstCSVRowsValueContainer.appendChild(firstCSVRows[1]);
        firstCSVRowsContainer.appendChild(firstCSVRowsValueContainer);
        console.log("toimii 1 2 3");
        return firstCSVRowsContainer;
    }
    initializeFullFileContainer(fullFileValues) {
        // Full file value container
        let fullFileValueContainer = document.createElement("div");
        fullFileValueContainer.setAttribute("id", "fullFileValueContainer");
        let h3 = document.createElement("h3");
        let h3Value = document.createTextNode("CSV file: ");
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
    initializeFileSearchContainer(rowList) {
        let fileSearchContainer = document.getElementById("fileSearchContainer");
        let stringSearchContainer = this.initializeStringSearchContainer(rowList);
        let nthRowSearchContainer = this.initializeNthRowSearchContainer(rowList);
        fileSearchContainer.appendChild(stringSearchContainer);
        fileSearchContainer.appendChild(nthRowSearchContainer);
    }
    initializeStringSearchContainer(rowList) {
        let stringSearchContainer = document.createElement("div");
        stringSearchContainer.setAttribute("id", "stringSearchContainer");
        let stringSearchControlsContainer = document.createElement("div");
        stringSearchControlsContainer.setAttribute("id", "stringSearchControlsContainer");
        let stringSearchFieldContainer = this.initializeStringSearchFieldContainer(rowList);
        stringSearchControlsContainer.appendChild(stringSearchFieldContainer);
        let searchButtonContainer = this.initializeStringSearchButtonContainer(rowList);
        stringSearchControlsContainer.appendChild(searchButtonContainer);
        let searchResultContainer = this.initializeStringSearchResultsContainer();
        stringSearchContainer.appendChild(searchResultContainer);
        stringSearchContainer.appendChild(stringSearchControlsContainer);
        return stringSearchContainer;
    }
    initializeStringSearchFieldContainer(rowList) {
        let stringSearchFieldContainer = document.createElement("div");
        stringSearchFieldContainer.setAttribute("id", "stringSearchFieldContainer");
        let searchField = document.createElement("input");
        searchField.setAttribute("id", "stringSearchField");
        searchField.setAttribute("type", "text");
        searchField.setAttribute("placeholder", "Rows that contain...");
        searchField.addEventListener("keypress", (event) => {
            if (event.key == "Enter") {
                event.preventDefault();
                let oldResultsContainer = document.getElementById("stringSearchResultsContainer");
                oldResultsContainer.innerHTML = "";
                let inputElement = document.getElementById("stringSearchField");
                let inputValue = inputElement.value.trim().toLowerCase();
                for (let row of rowList) {
                    if (inputValue != null && inputValue != "" && row.innerHTML.includes(inputValue)) {
                        document.getElementById("stringSearchResultsContainer").appendChild(row.cloneNode(true));
                        document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                        document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                        document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                    }
                }
                if (!document.getElementById("stringSearchResultsContainer").hasChildNodes()) {
                    let notFoundElement = document.createElement("li");
                    notFoundElement.innerHTML = "No results";
                    document.getElementById("stringSearchResultsContainer").appendChild(notFoundElement);
                }
            }
        });
        stringSearchFieldContainer.appendChild(searchField);
        return stringSearchFieldContainer;
    }
    initializeStringSearchButtonContainer(rowList) {
        let searchButtonContainer = document.createElement("div");
        searchButtonContainer.setAttribute("id", "searchButtonContainer");
        let searchButton = document.createElement("div");
        searchButtonContainer.setAttribute("class", "button");
        searchButtonContainer.setAttribute("id", "stringSearchButton");
        let label = document.createElement("label");
        label.innerHTML = "Search";
        searchButton.appendChild(label);
        searchButton.addEventListener("click", () => {
            let oldResultsContainer = document.getElementById("stringSearchResultsContainer");
            oldResultsContainer.innerHTML = "";
            let inputElement = document.getElementById("stringSearchField");
            let inputValue = inputElement.value.trim().toLowerCase();
            for (let row of rowList) {
                if (inputValue != null && inputValue != "" && row.innerHTML.includes(inputValue)) {
                    document.getElementById("stringSearchResultsContainer").appendChild(row.cloneNode(true));
                    document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                    document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                    document.getElementById("stringSearchResultsContainer").appendChild(document.createElement("br"));
                }
            }
            if (!document.getElementById("stringSearchResultsContainer").hasChildNodes()) {
                let notFoundElement = document.createElement("li");
                notFoundElement.innerHTML = "No results";
                document.getElementById("stringSearchResultsContainer").appendChild(notFoundElement);
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
    initializeNthRowSearchContainer(rowList) {
        let nthRowSearchContainer = document.createElement("div");
        nthRowSearchContainer.setAttribute("id", "nthRowSearchContainer");
        let nthRowSearchControlsContainer = document.createElement("div");
        nthRowSearchControlsContainer.setAttribute("id", "nthRowSearchControlsContainer");
        let nthRowSearchFieldContainer = this.initializeNthRowSearchFieldContainer(rowList);
        nthRowSearchControlsContainer.appendChild(nthRowSearchFieldContainer);
        let searchButtonContainer = this.initializeNthRowSearchButtonContainer(rowList);
        nthRowSearchControlsContainer.appendChild(searchButtonContainer);
        let searchResultsContainer = this.initializeNthRowSearchResultsContainer();
        nthRowSearchContainer.appendChild(nthRowSearchControlsContainer);
        nthRowSearchContainer.appendChild(searchResultsContainer);
        return nthRowSearchContainer;
    }
    initializeNthRowSearchFieldContainer(rowList) {
        let nthRowSearchFieldContainer = document.createElement("div");
        nthRowSearchFieldContainer.setAttribute("id", "nthRowSearchFieldContainer");
        let nthRowSearchField = document.createElement("input");
        nthRowSearchField.setAttribute("id", "nthRowSearchField");
        nthRowSearchField.setAttribute("type", "text");
        nthRowSearchField.setAttribute("placeholder", "Nth Row");
        nthRowSearchFieldContainer.appendChild(nthRowSearchField);
        nthRowSearchField.addEventListener('keypress', (event) => {
            if (event.key == "Enter") {
                event.preventDefault();
                let oldResultsContainer = document.getElementById("nthRowSearchResultsContainer");
                oldResultsContainer.innerHTML = "";
                let inputValue = Number.parseInt(nthRowSearchField.value) - 1;
                let numberOfRows = rowList.length;
                if (!isNaN(inputValue) && inputValue < numberOfRows && inputValue > 0) {
                    let nthRow = rowList[inputValue].cloneNode(true);
                    document.getElementById("nthRowSearchResultsContainer").appendChild(nthRow);
                    document.getElementById("nthRowSearchResultsContainer").scrollIntoView();
                    window.scrollBy(0, -70);
                }
                else if (isNaN(inputValue)) {
                    let valueNotValid = document.createElement("li");
                    valueNotValid.innerHTML = "Not a valid value";
                    document.getElementById("nthRowSearchResultsContainer").appendChild(valueNotValid);
                }
                else {
                    let valueNotValid = document.createElement("li");
                    valueNotValid.innerHTML = "Last row of the file is " + numberOfRows;
                    document.getElementById("nthRowSearchResultsContainer").appendChild(valueNotValid);
                }
            }
        });
        return nthRowSearchFieldContainer;
    }
    initializeNthRowSearchButtonContainer(rowList) {
        let searchButtonContainer = document.createElement("div");
        searchButtonContainer.setAttribute("id", "searchButtonContainer");
        let searchButton = document.createElement("div");
        searchButtonContainer.setAttribute("class", "button");
        searchButtonContainer.setAttribute("id", "nthRowSearchButton");
        let label = document.createElement("label");
        label.innerHTML = "Search";
        searchButton.appendChild(label);
        searchButton.addEventListener("click", () => {
            let oldResultsContainer = document.getElementById("nthRowSearchResultsContainer");
            oldResultsContainer.innerHTML = "";
            let inputElement = document.getElementById("nthRowSearchField");
            let inputValue = Number.parseInt(inputElement.value) - 1;
            let numberOfRows = rowList.length;
            if (!isNaN(inputValue) && inputValue < numberOfRows && inputValue > 0) {
                let nthRow = rowList[inputValue].cloneNode(true);
                document.getElementById("nthRowSearchResultsContainer").appendChild(nthRow);
                document.getElementById("nthRowSearchResultsContainer").scrollIntoView();
                window.scrollBy(0, -70);
            }
            else if (isNaN(inputValue)) {
                let valueNotValid = document.createElement("li");
                valueNotValid.innerHTML = "Not a valid value";
                document.getElementById("nthRowSearchResultsContainer").appendChild(valueNotValid);
            }
            else {
                let valueNotValid = document.createElement("li");
                valueNotValid.innerHTML = "Last row of the file is " + numberOfRows;
                document.getElementById("nthRowSearchResultsContainer").appendChild(valueNotValid);
            }
        });
        searchButtonContainer.appendChild(searchButton);
        return searchButtonContainer;
    }
    initializeNthRowSearchResultsContainer() {
        let nthRowSearchResultsContainer = document.createElement("div");
        nthRowSearchResultsContainer.setAttribute("id", "nthRowSearchResultsContainer");
        return nthRowSearchResultsContainer;
    }
}
