import { ErrorHandler } from './errorHandler.js';
import { Validator } from './validator.js';
import { Reader } from './reader.js';
/*
TODO:
    -Get content full or first n elements
    -Additional information regarding single key value pairs etc. on click or hover
    -CSV support
    -code editor that enables turning text to file
    -data validator
    -migrate to react
    -add example file that fires on click of logo or something else
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
        console.log("taking file...");
        //const file = <HTMLInputElement>document.getElementById("fileInputField").files[0];
        const inputField = document.getElementById("fileInputField");
        const files = inputField.files;
        const file = files[0];
        const fileExtension = this.validator.getFileExtension(file);
        console.log("extension: ", fileExtension);
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
        console.log("clearing page has started...");
        const container = document.getElementById("container");
        let errorDivs = document.getElementsByClassName("errorDiv");
        if (container) {
            document.body.removeChild(container);
        }
        while (errorDivs[0]) {
            errorDivs[0].parentNode.removeChild(errorDivs[0]);
        }
        console.log("page cleared.");
    }
}
document.getElementById("fileInputField").addEventListener("change", () => {
    console.log("change detected: starting...");
    let main = new Main();
    main.main();
});
