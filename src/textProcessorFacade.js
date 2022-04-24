import { TextProcessorFluentAPI } from "./textProcessorFluentAPI.js";
export class TextProcessorFacade {
    #textProcessorFluentAPI
    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text)
    }

    getPeopleFromPDF() {
        return this.#textProcessorFluentAPI
            .divideTextInColumns()
            .removeEmptyCharacters()
            .build()
    }
}