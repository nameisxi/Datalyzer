/*function drawStructure(content, parentElement) {
    for (item in content) {
        let subItems = content[item][1];
        let key = content[item][0]

        if (typeof(subItems) === "object" && subItems.length > 1) {
            console.log("sub items toimii: ", subItems);
            let ul = document.createElement("ul");
            ul = drawStructure(subItems, ul);
            //let br = document.createElement("br");
            //parentElement.appendChild(br);
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
}*/

/*function drawFirstElement(content, parentElement) {
    for (item in content) {
        let subItems = content[item][1];
        let key = content[item][0]

        if (typeof(subItems) === "object" && subItems.length > 1) {
            console.log("sub items toimii: ", subItems);
            let ul = document.createElement("ul");
            ul = drawStructure(subItems, ul);
            //let br = document.createElement("br");
            //parentElement.appendChild(br);
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
}*/

/*function analyze(jsonFileParsed) {
    const file = jsonFileParsed;
    const keys = Object.keys(file);
    const firstItem = file[keys[0]];
    const content = getJSONContent(firstItem, false, false);
    
    //analyzeAllData(jsonFileParsed, keys);
    //draw(content, false);

    return content;
}*/

/*function analyzeAllData(jsonFileParsed, keys) {
    const content = [];
    for (key in keys) {
        content.push(getJSONContent(jsonFileParsed[key], false, false));
    }
    console.log(content);
}*/

/*function getJSONContent(items, recursion, returnKeyValuePair) {
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
}*/

function readFile() {
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
            let errorMessage = document.createElement("fileReadingError");
            errorMessage.textContent = "File read was unsuccessful";
            reject(document.body.appendChild(errorMessage));
        }
    });

    promise.then((result) => {
        try {
            jsonFileParsed = JSON.parse(result);
            content = analyze(jsonFileParsed);
            console.log(content);
        } catch (error) {
            let errorMessage = document.createElement("fileParsingError");
            errorMessage.textContent = "File processing was unsuccessful due to an error encountered in it";
            document.body.appendChild(errorMessage);
        }
    }).then(() => {
        try {
            let h3 = document.createElement("h3");
            let value = document.createTextNode("JSON file's structure: ");
            h3.appendChild(value);
            document.body.appendChild(h3);

            let ul = document.createElement("ul");
            let div = document.createElement("div");
            let visualizedJSON = drawStructure(content, ul);
            div.appendChild(visualizedJSON);
            document.body.appendChild(div);
        } catch (error) {
            let errorMessage = document.createElement("contentDrawingError");
            errorMessage.textContent = "Content drawing was unsuccessful due to an error";
            document.body.appendChild(errorMessage);
        }
    }).then(() => {
        try {
            let h3 = document.createElement("h3");
            let value = document.createTextNode("JSON file's first element: ");
            h3.appendChild(value);
            document.body.appendChild(h3);

            let ul = document.createElement("ul");
            let div = document.createElement("div");
            let visualizedJSON = drawFirstElement(content, ul);
            div.appendChild(visualizedJSON);
            document.body.appendChild(div);
        } catch (error) {
            let errorMessage = document.createElement("contentDrawingError");
            errorMessage.textContent = "Content drawing was unsuccessful due to an error";
            document.body.appendChild(errorMessage);
        }
    });
}