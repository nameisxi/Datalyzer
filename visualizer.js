class Visualizer {
    constructor() {
        this.errorHandler = new ErrorHandler();
    }

    visualizeJSONStructure(content) {
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
            this.errorHandler.fileVisualizationError();
        }
    }

    visualizeFirstJSONElement(content) {
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
            this.errorHandler.fileVisualizationError();
        }
    }

    visualizeNthJSONElement() {
        return null;
    }

    visualizeWholeJSONFile() {
        return null;
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

    drawJSONStructure(content, parentElement) {
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

    drawCSVStructure() {
        return null;
    }

    drawFirstJSONElement(content, parentElement) {
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

    drawFirstCSVElement() {
        return null;
    }
}