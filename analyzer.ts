class Analyzer {
    analyze(jsonFileParsed) {
        const file = jsonFileParsed;
        const keys = Object.keys(file);
        const firstItem = file[keys[0]];
        const content = getJSONContent(firstItem, false, false);
    
        //analyzeAllData(jsonFileParsed, keys);
        //draw(content, false);

        return content;
    }

    analyzeAllData(jsonFileParsed, keys) {
        const content = [];
        for (key in keys) {
            content.push(getJSONContent(jsonFileParsed[key], false, false));
        }
        console.log(content);
    }
}