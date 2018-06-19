class Drawer {
    drawStructure(content, parentElement) {
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
    }
    
    drawFirstElement(content, parentElement) {
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
    }
}