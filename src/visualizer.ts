import { ErrorHandler } from "./errorHandler.js";

export class Visualizer {
    errorHandler: ErrorHandler;
    
    constructor() {
        this.errorHandler = new ErrorHandler();
    }

    visualizeJSONStructure(file) {
        try {
            let div = document.createElement("div");
            div.setAttribute("id", "JSONStructure");

            let h3 = document.createElement("h3");
            let h3Value = document.createTextNode("JSON file's structure: ");
            h3.appendChild(h3Value);
            div.appendChild(h3);

            //let valueUl = document.createElement("ul");
            let valueDiv = document.createElement("div");
            valueDiv.setAttribute("id", "JSONStructureValue");

            //let visualizedJSON = this.drawJSONStructure(file, valueUl);
            this.drawJSONStructure(file, valueDiv);

            //valueDiv.appendChild(visualizedJSON);
            div.appendChild(valueDiv);
            document.getElementById("container").appendChild(div);
        } catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }

    drawJSONStructure(data, parentContainer) {
        if (typeof(data) == 'object') {
            parentContainer.innerHTML = '<ul>';
            //document.write('<ul>');
            for (let key in data) {
                let keyValue = '<li>' + key
                //document.write(keyValue);
                parentContainer.innerHTML = parentContainer.innerHTML.concat(keyValue);

                this.drawJSONStructure(data[key], parentContainer);             
            }
            //document.write('</ul>');
            parentContainer.innerHTML = parentContainer.innerHTML.concat('</ul>');
        } else {
            let value: string = ': "' + data + '"';
            if (typeof(data) === "number") {
                value = ': ' + typeof(data);
            }
            //document.write(value);
            parentContainer.innerHTML = parentContainer.innerHTML.concat(value);
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

            /*let visualizedJSON = this.drawFirstJSONElement(content[1], valueUl);
            let li = document.createElement("li");
            let liValue = document.createTextNode(content[0] + ": ");

            li.appendChild(liValue);
            valueDiv.appendChild(li);
            valueDiv.appendChild(visualizedJSON);
            div.appendChild(valueDiv);
            document.getElementById("container").appendChild(div);*/
        } catch (error) {
            this.errorHandler.fileVisualizationError();
        }
    }

    drawFirstJSONElement(data) {
        if (typeof(data) == 'object') {
            document.write('<ul>');
            for (let key in data) {
                let keyValue = '<li>' + key
                document.write(keyValue); 
                this.visualizeFirstJSONElement(data[key]);            
            }
            document.write('</ul>');
        } else {
            let value: string = ': "' + data + '"';
            if (typeof(data) === "number") {
                value = ': ' + data;
            }
            document.write(value);
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

    /*drawJSONStructure(content, parentElement) {
        for (let item in content) {
            let subItems = content[item][1];
            let key = content[item][0]
            console.log("key type: ", typeof(key));
    
            if (typeof(subItems) === "object" && subItems.length > 1) {
                let ul = document.createElement("ul");
                ul = this.drawJSONStructure(subItems, ul);
    
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
        for (let item in content) {
            let subItems = content[item][1];
            let key = content[item][0]
            console.log("key: ", key);
    
            if (typeof(subItems) === "object" && subItems.length > 1) {
                let ul = document.createElement("ul");
                ul = this.drawFirstJSONElement(subItems, ul);
    
                let li = document.createElement("li");
                let value = document.createTextNode(key + ": ");
                li.appendChild(value);
    
                parentElement.appendChild(li);
                parentElement.appendChild(ul);
                continue;
            }
    
            let li = document.createElement("li");
            let value = document.createTextNode(key + ': "' + subItems + '"');
            console.log(typeof(subItems));
            if (typeof(subItems) === "number" || typeof(subItems) === "boolean") {
                value = document.createTextNode(key + ': ' + subItems);
            }
            li.appendChild(value);
    
            parentElement.appendChild(li);
            parentElement.appendChild(document.createElement("br"));       
        }
    
        return parentElement;
    }

    drawFirstCSVElement() {
        return null;
    }*/
}