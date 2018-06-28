import { ErrorHandler } from './errorHandler.js';
import { Validator } from './validator.js';
import { Reader } from './reader.js';
/*
TODO:
    -Get content full [OR] first n elements
    -Additional information regarding single key value pairs etc. on click or hover
    -CSV support
    -code editor that enables turning text to file
    -data validator
    -migrate to react
    -add example file that fires on click of logo or something else
    -method to add id's for css and other features
    -fix container bottom border
*/
/**
 * Analyzes the file that was uploaded through the input field.
 */
class Main {
    constructor() {
        this.errorHandler = new ErrorHandler();
        this.validator = new Validator();
        this.reader = new Reader();
    }
    main() {
        this.clearPage();
        const inputField = document.getElementById("fileInputField");
        const files = inputField.files;
        const file = files[0];
        const fileExtension = this.validator.getFileExtension(file);
        const dataIsValid = this.validator.checkDataValidity(file);
        if (dataIsValid) {
            if (fileExtension === "json") {
                this.reader.readJSONFile(file);
            }
            else if (fileExtension === "csv") {
                this.reader.readCSVFile(file);
            }
        }
        else {
            this.errorHandler.dataIsNotValid();
            return;
        }
    }
    clearPage() {
        const container = document.getElementById("container");
        let errorDivs = document.getElementsByClassName("errorDiv");
        if (container) {
            document.body.removeChild(container);
        }
        while (errorDivs[0]) {
            errorDivs[0].parentNode.removeChild(errorDivs[0]);
        }
    }
}
document.getElementById("fileInputField").addEventListener("change", () => {
    let main = new Main();
    main.main();
});
