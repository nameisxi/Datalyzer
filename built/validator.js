/**
 * Validator class handles different validations regarding file inputs.
 */
export class Validator {
    checkFileExtension(file) {
        return ".json";
    }
    checkDataValidity(file) {
        return true;
    }
}
