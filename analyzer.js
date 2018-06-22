class Analyzer {
    constructor() {
        this.parser = new Parser();
        this.visualizer = new Visualizer();
    }

    analyzeJSONFile(rawFile) {
        let file = this.parser.parseJSONFile(rawFile);

        const keys = Object.keys(file);
        const firstItem = file[keys[0]];
        const values = this.parser.getJSONContent(firstItem, false, false);
        const content = [keys[0], values];

        this.visualizer.visualizeJSONStructure(content);
        this.visualizer.visualizeFirstJSONElement(content);
    }

    analyzeCSVFile(file) {
        return null;
    }
}