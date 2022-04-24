
import { evaluateRegex } from './util.js'
// import { Project } from './project.js'

export class TextProcessorFluentAPI {
    #content
    constructor(content) {
        this.#content = content
    }

    extractCSVData() {

    }

    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))
        return this
    }

    removeEmptyCharacters() {
        const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))
        return this
    }

    build() {
        return this.#content
    }
}