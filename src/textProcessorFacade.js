import { TextProcessorFluentAPI } from "./textProcessorFluentAPI.js";
export class TextProcessorFacade {
    #textProcessorFluentAPI
    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text)
    }

    getProjectsFromCSV() {
        return this.#textProcessorFluentAPI
           .extractHeaders()
           .extractContent()
           .splitValues()
           .removeEmptyCharacters()
           .mapRawObjects()
           .mapProjects()
           .build()
    }
}