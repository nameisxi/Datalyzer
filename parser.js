class Parser {
    constructor() {
        this.errorHandler = new ErrorHandler();
        this.analyzer = new Analyzer();
    }

    parseJSONFile(file) {
        try {
            let jsonFileParsed = JSON.parse(file);
            return jsonFileParsed;
        } catch (error) {
            this.errorHandler.fileParsingError();
        }
    }

    parseCSVFile() {
        return null;
    }

    getJSONContent(items, recursion, returnKeyValuePair) {
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

    getCSVContent() {
        return null;
    }
}