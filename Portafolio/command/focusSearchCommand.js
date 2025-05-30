export class FocusSearchCommand {
    constructor(inputElement) {
        this.inputElement = inputElement;
    }

    execute() {
        this.inputElement.focus();
    }
}
