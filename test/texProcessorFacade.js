import { expect, describe, test } from "@jest/globals";
import { TextProcessorFacade } from "../src/textProcessorFacade.js";
import { TextProcessorFluentAPI } from "../src/textProcessorFluentAPI.js";

describe("#TextProcessorFacade", () => {
  test.only("#Should call all methods", () => {
    const text = "text";
    const textProcessorFluentAPI = new TextProcessorFluentAPI(text);

    const textProcessorFacade = new TextProcessorFacade({
        textProcessorFluentAPI: textProcessorFluentAPI,
    });

    textProcessorFacade.getProjectsFromCSV();

    expect(textProcessorFluentAPI.extractHeaders).toBeCalled();
    expect(textProcessorFluentAPI.extractContent).toBeCalled();
    expect(textProcessorFluentAPI.splitValues).toBeCalled();
    expect(textProcessorFluentAPI.removeEmptyCharacters).toBeCalled();
    expect(textProcessorFluentAPI.mapRawObjects).toBeCalled();
    expect(textProcessorFluentAPI.mapProjects).toBeCalled();
    expect(textProcessorFluentAPI.build).toBeCalled();
  });
});