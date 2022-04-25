// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
import { describe, test, expect } from '@jest/globals'
import { Project } from '../src/project.js';
import { evaluateRegex } from './../src/util.js'

describe('Project', () => {
    test('should generate a project instance from project list', () => {
        const content = {
            titulo: "Projeto de lei 584/2016",
            link: "http://www.al.sp.gov.br/propositura?id=1322563",
            autor: "Jorge Wilson Xerife do Consumidor, Thiago Bussola da Silva, João dos Montes",
            etapa: "PAUTA",
            ementa: "Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.",
            indexorama: "CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO"
        };

        const expected = {
            id: "1322563",
            numero: "584",
            link: "http://www.al.sp.gov.br/propositura",
            ano: "2016",
            autores: [
                { nome: 'Jorge Consumidor' },
                { nome: 'Thiago Silva' },
                { nome: 'João Montes' }
            ],
            indexadores: ['CONTRATO', 'OBRIGATORIEDADE', 'CLÁUSULA', 'SERVIÇO', 'TELEFONIA MÓVEL', 'TELEFONIA FIXA', 'PRAZO', 'INCLUSÃO', 'RESCISÃO CONTRATUAL', 'LIBERAÇÃO']
        }

        const result = new Project(content)

        expect(result.id).toBe(expected.id);
        expect(result.numero).toBe(expected.numero);
        expect(result.ano).toBe(expected.ano);
        expect(result.autores).toEqual(expected.autores);
        expect(result.url).toBe(content.link);
        expect(result.indexorama).toEqual(expected.indexadores);
        expect(result.etapa).toBe(content.etapa);
        expect(result.ementa).toBe(content.ementa);
    })
})