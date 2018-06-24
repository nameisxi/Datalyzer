/**
 * Validator class handles different validations regarding file inputs.
 */
export class Validator {
    getFileExtension(file) {
        const fileExtension = file.name.split('.').pop();
        return fileExtension;
    }
    checkDataValidity(file) {
        return true;
    }
}
