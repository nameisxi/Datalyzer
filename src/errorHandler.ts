/**
 * ErroHandler class handles error message visualizations to the user.
 */
export class ErrorHandler {
    dataIsNotValid() {
        let div = document.createElement("div");
        div.setAttribute("class", "errorDiv");

        let errorMessage = document.createElement("dataValidationError");
        errorMessage.textContent = "Data in the file that you provided is not valid";

        div.appendChild(errorMessage);
        div.appendChild(document.createElement("br"));
        document.body.appendChild(div);
    }

    fileReadingError() {
        let div = document.createElement("div");
        div.setAttribute("class", "errorDiv");

        let errorMessage = document.createElement("fileReadingError");
        errorMessage.textContent = "File read was unsuccessful due to an error the reader encountered";

        div.appendChild(errorMessage);
        div.appendChild(document.createElement("br"));
        
        return div;
    }

    fileParsingError() {
        let div = document.createElement("div");
        div.setAttribute("class", "errorDiv");

        let errorMessage = document.createElement("fileParsingError");
        errorMessage.textContent = "File processing was unsuccessful due to an error encountered in it";

        div.appendChild(errorMessage);
        div.appendChild(document.createElement("br"));
        document.body.appendChild(div);
    }

    fileVisualizationError() {
        let div = document.createElement("div");
        div.setAttribute("class", "errorDiv");

        let errorMessage = document.createElement("fileVisualizationError");
        errorMessage.textContent = "Content visualization was unsuccessful due to an error";

        div.appendChild(errorMessage);
        div.appendChild(document.createElement("br"));
        document.body.appendChild(div);
    }

    testi() {
        let div = document.createElement("div");

        let errorMessage = document.createElement("testi");
        errorMessage.textContent = "TOIMIIIIII";

        div.appendChild(errorMessage);
        div.appendChild(document.createElement("br"));
        document.body.appendChild(div);
    }
}