import { evaluateRegex } from "./util.js";
import { Project } from "./project.js";
export class TextProcessorFluentAPI {
    #content

    constructor(content) {
        this.#content = content
    }

    extractHeaders() {
        const matchHeaders = evaluateRegex(/(?:(?!\n).)*/);

        const [headers] = this.#content.match(matchHeaders);

        this.#content = {
            headers: headers,
            content: this.#content,
        };

        return this;
    }

    extractContent() {
        const { content } = this.#content;

        const matchContent = evaluateRegex(/(?<=\n).*/g);

        const projects = content.match(matchContent);
        this.#content.content = projects;

        return this;
    }

    splitContent() {
        const splitSemicolonRegex = evaluateRegex(/;/)

        this.#content = {
            headers: this.#content.headers.split(splitSemicolonRegex),
            content: this.#content.content.map(line => line.split(splitSemicolonRegex)),
        };

        return this;
    }

    removeEmptyCharacters() {
        const formatedHeader = this.#content.headers.filter(content => content != '')
        const formatedContent = this.#content.content.map(item => item.filter(content => content != ''))

        this.#content = {
            headers: formatedHeader,
            content: formatedContent
        }
        return this
    }

    mapRawObjects() {

        return this;
    }

    mapProjects() {
        this.#content = this.#content.map(line => new Project(line))
        return this
    }

    build() {
        return this.#content
    }
}
