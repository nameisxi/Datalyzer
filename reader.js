/**
 * Reader class handles file readings.
 */
class Reader {
    constructor() {
        this.errorHandler = new ErrorHandler();
        this.analyzer = new Analyzer();
    }

    readJSONFile(file) {
        let jsonFile = null;
        const reader = new FileReader();

        let promise = new Promise((resolve, reject) => {
            reader.readAsText(file, "UTF-8");
            reader.onload = (event) => {
                console.log("loading...");
                jsonFile = event.target.result;
                resolve(jsonFile);
            }
    
            reader.onerror = (event) => {
                reject(this.errorHandler.fileReadingError());
            }
        });

        promise.then((jsonFile) => this.analyzer.analyzeJSONFile(jsonFile));


        /*promise.then((jsonFile) => {
            this.parser.parseJSONFile(jsonFile)
            try {
                jsonFileParsed = JSON.parse(result);
                content = analyze(jsonFileParsed);
                console.log(content);
            } catch (error) {
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
        });*/










    }

    readCSVFile(file) {

    }
}