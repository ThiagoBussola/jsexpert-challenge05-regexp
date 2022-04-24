// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
import { describe, test, expect } from '@jest/globals'
import { Project } from '../src/project.js';
import { evaluateRegex } from './../src/util.js'

describe('Project', () => {
    test.only('should generate a project instance from project list', () => {
        const content = {
            titulo: "Projeto de lei 584/2016",
            link: "http://www.al.sp.gov.br/propositura?id=1322563",
            autor: "Jorge Wilson Xerife do Consumidor",
            etapa: "PAUTA",
            ementa: "Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.",
        };

        const expected = {
            id: "1322563",
            numero:"545",
            ano: "2016",
            autores: [{
                nome: "Jorge Wilson Xerife do Consumidor"
            }],
            indexadores: []
        }

        const result = new Project(content)

        console.log(result)
    })
})