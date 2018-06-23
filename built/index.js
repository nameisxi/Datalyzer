import { ErrorHandler } from './errorHandler.js';
import { Validator } from './validator.js';
/*
TODO:
    -When new file is uploaded, clear the html page from old file
    -Get content full or first n elements
    -Additional information regarding single key value pairs etc.
    -CSV support
    -Refactoring
    -Styling
    -code editor that enables turning text to file
    -data validator
*/
/**
 * Analyzes the file that was uploaded through the input field.
 */
class StartUp {
    constructor() {
        this.errorHandler = new ErrorHandler();
        this.validator = new Validator();
    }
    main() {
        this.clearPage();
        /*const file = document.getElementById("fileInputField").files[0];

        const fileExtension = this.validator.checkFileExtension(file);
        const dataIsValid = this.validator.checkDataValidity(file);

        let reader = new Reader();
        if (dataIsValid) {
            if (fileExtension === ".json") {
                reader.readJSONFile(file);
            } else if (fileExtension === ".csv") {
                reader.readCSVFile(file);
            }
        } else {
            this.errorHandler.dataIsNotValid();
            return;
        }*/
    }
    clearPage() {
        const jsonStructureDiv = document.getElementById("JSONStructure");
        const jsonFirstElementDiv = document.getElementById("JSONFirstElement");
        let errorDivs = document.getElementsByClassName("errorDiv");
        if (jsonStructureDiv) {
            document.body.removeChild(jsonStructureDiv);
        }
        if (jsonFirstElementDiv) {
            document.body.removeChild(jsonFirstElementDiv);
        }
        while (errorDivs[0]) {
            errorDivs[0].parentNode.removeChild(errorDivs[0]);
        }
        this.errorHandler.testi();
    }
}
/*function drawJSONStructure(content, parentElement) {
    for (item in content) {
        let subItems = content[item][1];
        let key = content[item][0]
        console.log("key: ", key);

        if (typeof(subItems) === "object" && subItems.length > 1) {
            let ul = document.createElement("ul");
            ul = drawJSONStructure(subItems, ul);

            let li = document.createElement("li");
            let value = document.createTextNode(key + ": ");
            li.appendChild(value);

            parentElement.appendChild(li);
            parentElement.appendChild(ul);
            continue;
        }

        let li = document.createElement("li");
        let value = document.createTextNode(key + ": " + typeof(subItems));
        li.appendChild(value);

        parentElement.appendChild(li);
        parentElement.appendChild(document.createElement("br"));
    }

    return parentElement;
}

function drawFirstJSONElement(content, parentElement) {
    for (item in content) {
        let subItems = content[item][1];
        let key = content[item][0]
        console.log("key: ", key);

        if (typeof(subItems) === "object" && subItems.length > 1) {
            let ul = document.createElement("ul");
            ul = drawFirstJSONElement(subItems, ul);

            let li = document.createElement("li");
            let value = document.createTextNode(key + ": ");
            li.appendChild(value);

            parentElement.appendChild(li);
            parentElement.appendChild(ul);
            continue;
        }

        let li = document.createElement("li");
        let value = document.createTextNode(key + ": " + subItems);
        li.appendChild(value);

        parentElement.appendChild(li);
        parentElement.appendChild(document.createElement("br"));
    }

    return parentElement;
}

function analyze(jsonFileParsed) {
    const file = jsonFileParsed;
    const keys = Object.keys(file);
    const firstItem = file[keys[0]];
    const values = getJSONContent(firstItem, false, false);
    const content = [keys[0], values];
    
    //analyzeAllData(jsonFileParsed, keys);
    //draw(content, false);

    return content;
}

function analyzeAllData(jsonFileParsed, keys) {
    const content = [];
    for (key in keys) {
        content.push(getJSONContent(jsonFileParsed[key], false, false));
    }
    console.log(content);
}

function getJSONContent(items, recursion, returnKeyValuePair) {
    let content = [];
    for (key in items) {
        let keyValuePair = [];
        let value = items[key];
        keyValuePair.push(key);

        if (typeof(value) === "object") {
            if (value.length > 1) {
                value = getJSONContent(value, true, false);
            } else {
                value = getJSONContent(value, true, true);
            }
            
            if (returnKeyValuePair) {
                return value;
            }

            if (keyValuePair.length === 1) {
                if (recursion) {
                    keyValuePair[0] = value[0];
                    value = value[1];
                }
                keyValuePair.push(value);
            } else if (keyValuePair.length === 2) {
                let temporaryValue = keyValuePair.pop();
                let values = [temporaryValue, value];
                keyValuePair.push(values);
            } else {
                keyValuePair[1].push(value);
            }
        } else {
            keyValuePair.push(value);
        }

        if (returnKeyValuePair) {
            return keyValuePair;
        }

        content.push(keyValuePair);
    }

    return content;
}

function readFile() {
    const jsonStructureDiv = document.getElementById("JSONStructure");
    const jsonFirstElementDiv = document.getElementById("JSONFirstElement");
    let errorDivs = document.getElementsByClassName("errorDiv");
    
    if (jsonStructureDiv) {
        document.body.removeChild(jsonStructureDiv);
    }

    if (jsonFirstElementDiv) {
        document.body.removeChild(jsonFirstElementDiv);
    }

    while (errorDivs[0]) {
        errorDivs[0].parentNode.removeChild(errorDivs[0]);
    }

    const file = document.getElementById("fileInputField").files[0];
    const reader = new FileReader();
    let jsonFile = null;
    let jsonFileParsed = null;
    let content = null;

    let promise = new Promise((resolve, reject) => {
        reader.readAsText(file, "UTF-8");
        reader.onload = (event) => {
            console.log("loading...");
            jsonFile = event.target.result;
            resolve(jsonFile);
        }

        reader.onerror = (event) => {
            let div = document.createElement("div");
            div.setAttribute("class", "errorDiv");

            let errorMessage = document.createElement("fileReadingError");
            errorMessage.textContent = "File read was unsuccessful";

            div.appendChild(errorMessage);
            reject(div);
        }
    });

    promise.then((jsonFile) => parse(jsonFile));

    promise.then((jsonFile) => {
        try {
            parse(jsonFile);
            console.log("jsonfile: ", jsonFile);
            jsonFileParsed = JSON.parse(jsonFile);
            content = analyze(jsonFileParsed);
            console.log(content);
        } catch (error) {
            console.log("outoa");
            let div = document.createElement("div");
            div.setAttribute("class", "errorDiv");

            let errorMessage = document.createElement("fileParsingError");
            errorMessage.textContent = "File processing was unsuccessful due to an error encountered in it";

            div.appendChild(errorMessage);
            div.appendChild(document.createElement("br"));
            document.body.appendChild(div);
        }
    }).then(() => {
        try {
            let div = document.createElement("div");
            div.setAttribute("id", "JSONStructure");

            let h3 = document.createElement("h3");
            let h3Value = document.createTextNode("JSON file's structure: ");
            h3.appendChild(h3Value);
            div.appendChild(h3);

            let ul = document.createElement("ul");
            let valueUl = document.createElement("ul");
            let valueDiv = document.createElement("div");
            valueDiv.setAttribute("id", "JSONStructureValue");

            let visualizedJSON = drawJSONStructure(content[1], valueUl);
            let li = document.createElement("li");
            let liValue = document.createTextNode(content[0] + ": ");

            li.appendChild(liValue);
            valueDiv.appendChild(li);
            valueDiv.appendChild(visualizedJSON);
            div.appendChild(valueDiv);
            document.body.appendChild(div);
        } catch (error) {
            let div = document.createElement("div");
            div.setAttribute("class", "errorDiv");

            let errorMessage = document.createElement("contentDrawingError");
            errorMessage.textContent = "Content drawing was unsuccessful due to an error";

            div.appendChild(errorMessage);
            div.appendChild(document.createElement("br"));
            document.body.appendChild(div);
        }
    }).then(() => {
        try {
            let div = document.createElement("div");
            div.setAttribute("id", "JSONFirstElement");

            let h3 = document.createElement("h3");
            let h3Value = document.createTextNode("JSON file's first element: ");
            h3.appendChild(h3Value);
            div.appendChild(h3);

            let ul = document.createElement("ul");
            let valueUl = document.createElement("ul");
            let valueDiv = document.createElement("div");
            valueDiv.setAttribute("id", "JSONFirstElementValue");

            let visualizedJSON = drawFirstJSONElement(content[1], valueUl);
            let li = document.createElement("li");
            let liValue = document.createTextNode(content[0] + ": ");

            li.appendChild(liValue);
            valueDiv.appendChild(li);
            valueDiv.appendChild(visualizedJSON);
            div.appendChild(valueDiv);
            document.body.appendChild(div);
        } catch (error) {
            let div = document.createElement("div");
            div.setAttribute("class", "errorDiv");

            let errorMessage = document.createElement("contentDrawingError");
            errorMessage.textContent = "Content drawing was unsuccessful due to an error";

            div.appendChild(errorMessage);
            div.appendChild(document.createElement("br"));
            document.body.appendChild(div);
        }
    });
}

function parse(jsonFile) {
    console.log("parse toimii");
    try {
        console.log("parse toimii edelleen");
        console.log("jsonfile: ", jsonFile);
        jsonFileParsed = JSON.parse(jsonFile);
        content = analyze(jsonFileParsed);
        console.log(content);

        drawS(content);
        drawE(content);

    } catch (error) {
        console.log("parse ei toimi enaa: ", error);
        let div = document.createElement("div");
        div.setAttribute("class", "errorDiv");

        let errorMessage = document.createElement("fileParsingError");
        errorMessage.textContent = "File processing was unsuccessful due to an error encountered in it";

        div.appendChild(errorMessage);
        div.appendChild(document.createElement("br"));
        document.body.appendChild(div);
    }
}

function drawS(content) {
    try {
        let div = document.createElement("div");
        div.setAttribute("id", "JSONStructure");

        let h3 = document.createElement("h3");
        let h3Value = document.createTextNode("JSON file's structure: ");
        h3.appendChild(h3Value);
        div.appendChild(h3);

        let ul = document.createElement("ul");
        let valueUl = document.createElement("ul");
        let valueDiv = document.createElement("div");
        valueDiv.setAttribute("id", "JSONStructureValue");

        let visualizedJSON = drawJSONStructure(content[1], valueUl);
        let li = document.createElement("li");
        let liValue = document.createTextNode(content[0] + ": ");

        li.appendChild(liValue);
        valueDiv.appendChild(li);
        valueDiv.appendChild(visualizedJSON);
        div.appendChild(valueDiv);
        document.body.appendChild(div);
    } catch (error) {
        let div = document.createElement("div");
        div.setAttribute("class", "errorDiv");

        let errorMessage = document.createElement("contentDrawingError");
        errorMessage.textContent = "Content drawing was unsuccessful due to an error";

        div.appendChild(errorMessage);
        div.appendChild(document.createElement("br"));
        document.body.appendChild(div);
    }
}

function drawE(content) {
    try {
        let div = document.createElement("div");
        div.setAttribute("id", "JSONFirstElement");

        let h3 = document.createElement("h3");
        let h3Value = document.createTextNode("JSON file's first element: ");
        h3.appendChild(h3Value);
        div.appendChild(h3);

        let ul = document.createElement("ul");
        let valueUl = document.createElement("ul");
        let valueDiv = document.createElement("div");
        valueDiv.setAttribute("id", "JSONFirstElementValue");

        let visualizedJSON = drawFirstJSONElement(content[1], valueUl);
        let li = document.createElement("li");
        let liValue = document.createTextNode(content[0] + ": ");

        li.appendChild(liValue);
        valueDiv.appendChild(li);
        valueDiv.appendChild(visualizedJSON);
        div.appendChild(valueDiv);
        document.body.appendChild(div);
    } catch (error) {
        let div = document.createElement("div");
        div.setAttribute("class", "errorDiv");

        let errorMessage = document.createElement("contentDrawingError");
        errorMessage.textContent = "Content drawing was unsuccessful due to an error";

        div.appendChild(errorMessage);
        div.appendChild(document.createElement("br"));
        document.body.appendChild(div);
    }
}*/
document.getElementById("fileInputField").addEventListener("change", () => {
    let startUp = new StartUp();
    startUp.main();
});
