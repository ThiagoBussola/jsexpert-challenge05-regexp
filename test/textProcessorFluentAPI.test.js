import { expect, describe, test, beforeEach } from "@jest/globals";
import { TextProcessorFluentAPI } from "../src/textProcessorFluentAPI.js";
import { mockCsv } from "./mock/valid.js";

describe("#TextProcessorFluentApi", () => {

    // test('#build', () => {
    //     const result = new TextProcessorFluentAPI(mockCsv).build();
    //     expect(result).toEqual(mockCsv);
    // })

    test("#ExtractHeaders", () => {
        const result = new TextProcessorFluentAPI(mockCsv).extractHeaders().build();

        const expected = {
            headers: 'título;link;autor;etapa;ementa;indexadoresnorma;',
            content: mockCsv,
        };

        expect(result).toEqual(expected);
    });

    test("#ExtractContent", () => {
        const result = new TextProcessorFluentAPI(mockCsv).extractHeaders().extractContent().build();

        const expected = {
            headers: 'título;link;autor;etapa;ementa;indexadoresnorma;',
            content: [
                'Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;',
                'Projeto de lei 580/2016;http://www.al.sp.gov.br/propositura?id=1323286;Marcia Lia;PAUTA;Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.;NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA;',
                'Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;'
            ],
        };

        expect(result).toEqual(expected);
    });

    test("#splitContent", () => {
        const expected = {
            headers: ['título', 'link', 'autor', 'etapa', 'ementa', 'indexadoresnorma', ''],
            content: [
                [
                    'Projeto de lei 584/2016',
                    'http://www.al.sp.gov.br/propositura?id=1322563',
                    'Jorge Wilson Xerife do Consumidor',
                    'PAUTA',
                    'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
                    'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO',
                    ''
                ],
                [
                    'Projeto de lei 580/2016',
                    'http://www.al.sp.gov.br/propositura?id=1323286',
                    'Marcia Lia',
                    'PAUTA',
                    'Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.',
                    'NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA',
                    ''
                ],
                [
                    'Projeto de lei 545/2016',
                    'http://www.al.sp.gov.br/propositura?id=1322832',
                    'Roberto Morais, Itamar Borges',
                    'PAUTA',
                    'Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.',
                    ''
                ]
            ],
        }
        const content = new TextProcessorFluentAPI(mockCsv).extractHeaders().extractContent().splitContent().build();

        expect(expected).toEqual(content);
    });
    test("#removeEmptyCharacters", () => {
        const expected = {
            headers: ['título', 'link', 'autor', 'etapa', 'ementa', 'indexadoresnorma'],
            content: [
                [
                    'Projeto de lei 584/2016',
                    'http://www.al.sp.gov.br/propositura?id=1322563',
                    'Jorge Wilson Xerife do Consumidor',
                    'PAUTA',
                    'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
                    'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO',
                ],
                [
                    'Projeto de lei 580/2016',
                    'http://www.al.sp.gov.br/propositura?id=1323286',
                    'Marcia Lia',
                    'PAUTA',
                    'Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.',
                    'NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA',
                ],
                [
                    'Projeto de lei 545/2016',
                    'http://www.al.sp.gov.br/propositura?id=1322832',
                    'Roberto Morais, Itamar Borges',
                    'PAUTA',
                    'Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.',
                ]
            ],
        }
        const content = new TextProcessorFluentAPI(mockCsv).extractHeaders().extractContent().splitContent().removeEmptyCharacters().build();
        expect(expected).toEqual(content);
    });
    test("#mapRawObjects", () => {
        const expected = {
            content: [
                {
                    título: 'Projeto de lei 584/2016',
                    link: 'http://www.al.sp.gov.br/propositura?id=1322563',
                    autor: 'Jorge Wilson Xerife do Consumidor',
                    etapa: 'PAUTA',
                    ementa: 'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
                    indexadoresnorma: 'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO'
                },
                {
                    título: 'Projeto de lei 580/2016',
                    link: 'http://www.al.sp.gov.br/propositura?id=1323286',
                    autor: 'Marcia Lia',
                    etapa: 'PAUTA',
                    ementa: 'Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.',
                    indexadoresnorma: 'NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA'
                },
                {
                    título: 'Projeto de lei 545/2016',
                    link: 'http://www.al.sp.gov.br/propositura?id=1322832',
                    autor: 'Roberto Morais, Itamar Borges',
                    etapa: 'PAUTA',
                    ementa: 'Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.'
                }
            ],
        }
        const content = new TextProcessorFluentAPI(mockCsv).extractHeaders().extractContent().splitContent().removeEmptyCharacters().mapRawObjects().build();
        
        expect(expected).toEqual(content);
    });

    test('#mapProjects', () => {
        const expected = new TextProcessorFluentAPI(mockCsv)

        const result = expected.extractHeaders().extractContent().splitContent().removeEmptyCharacters().mapProjects()

        expect(result).toEqual()
    })
});