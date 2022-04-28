// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
// Dica do wells: no lugar da chamada do PDF parser, um simples `.toString()` resolve, já que nós é que implementaremos o "CSV parser"
'user strict'
    
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

import TextProcessorFacade from './textProcessorFacade.js';
import TextProcessorFluentAPI from './textProcessorFluentAPI.js';

async function main() {
  const rootDir = join(fileURLToPath(import.meta.url), '../', '../');
  const csvPath = join(rootDir, 'docs/projeto-de-lei.csv');
  const jsonPath = join(rootDir, 'docs/projeto-de-lei.json');
  const csvData = (await readFile(csvPath)).toString();

  const textProcessorFacade = new TextProcessorFacade({
    TextProcessorFluentAPI,
    text: csvData,
  });

  const projectsArray = textProcessorFacade.getProjectsFromCSV();

  await writeFile(jsonPath, JSON.stringify(projectsArray, null, 2));
}

await main();