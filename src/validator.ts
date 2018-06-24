/**
 * Validator class handles different validations regarding file inputs.
 */
export class Validator {
    getFileExtension(file) {
        return ".json";
    }

    checkDataValidity(file) {
        return true;
    }
}