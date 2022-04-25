import { expect, describe, test } from "@jest/globals";
import { Project } from "../src/project.js";
import { TextProcessorFluentAPI } from "../src/textProcessorFluentAPI.js";
import mock from "./mock/valid.js";

describe("#TextProcessorFluentApi", () => {
    test('#build', () => {
        const result = new TextProcessorFluentAPI(mock).build()

        expect(result).toStrictEqual(mock)
    })
    test("#ExtractHeaders", () => {
        const expected = {
            headers: "título;link;autor;etapa;ementa;indexadoresnorma;\r\n",
            content:
                'Projeto de lei 395/2016;http://www.al.sp.gov.br/propositura?id=1315251;Paulo Correa Jr, Caio França, Wellington Moura;DISTRIBUIÇÃO;Cria o Programa Estadual de Preservação Ambiental da Zona portuária do Estado. Parecer nº 848, de 2016, da Comissão de Justiça e Redação.;PROGRAMA, PRESERVAÇÃO AMBIENTAL, ZONA PORTUÁRIA, ESTADO DE SÃO PAULO;\r\n' +
                'Projeto de lei 394/2016;http://www.al.sp.gov.br/propositura?id=1314662;Cezinha de Madureira;COMISSÃO;"Institui a ""Semana Estadual de Conscientização Sobre a Paralisia do Sono"".";SEMANA DE, MAIO (CALENDÁRIO OFICIAL), DATA COMEMORATIVA, CALENDÁRIO OFICIAL, PARALISIA DO SONO;\r\n' +
                'Projeto de lei 393/2016;http://www.al.sp.gov.br/propositura?id=1315352;Feliciano Filho;COMISSÃO;"Declara de utilidade pública a ""Associação Vidanimal"", em Atibaia.";ATIBAIA (MUNICÍPIO), UTILIDADE PÚBLICA, ASSOCIAÇÃO;\r\n' +
                'Projeto de lei 392/2016;http://www.al.sp.gov.br/propositura?id=1315372;Roque Barbiere;COMISSÃO;"Dá a denominação de ""Professor Reynaldo Cisoto Gianecchini - Patão"" ao Prédio da FATEC - Faculdade de Tecnologia de São Paulo em Birigui.";BIRIGUI (MUNICÍPIO), DENOMINAÇÃO, FACULDADE DE TECNOLOGIA - FATEC;"'
        };

        const content = textProcessorFluentApi.extractHeaders().build();

        console.log(content)

        expect(expected).toEqual(content);
    });

    test("#splitContentKeys", () => {
        const expected = {
            headers: ["título", "link", "autor", "etapa", "ementa", "indexadoresnorma"],
            content: [
                [
                    "Projeto de lei 584/2016",
                    "http://www.al.sp.gov.br/propositura?id=1322563",
                    "Jorge Wilson Xerife do Consumidor",
                    "PAUTA",
                    "Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.",
                    "CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO",
                ],
                [
                    "Projeto de lei 583/2016",
                    "http://www.al.sp.gov.br/propositura?id=1322562",
                    "Jorge Wilson Xerife do Consumidor",
                    "PAUTA",
                    "Assegura ao cônjuge ou à pessoa em união estável do consumidor responsável pela unidade consumidora o direito de fazer constar na fatura de serviços o seu nome, e dá outras providências.",
                    "CONSUMIDOR, ÁGUA (ABASTECIMENTO), ENERGIA ELÉTRICA, CÔNJUGE, EMPRESA PRESTADORA DE SERVIÇO, TELEFONIA, ATESTADO DE RESIDÊNCIA, NOME, UNIÃO ESTÁVEL, INCLUSÃO, FATURA MENSAL DE CONSUMO",
                ],
                [
                    "Projeto de lei 582/2016",
                    "http://www.al.sp.gov.br/propositura?id=1323583",
                    "Jorge Wilson Xerife do Consumidor",
                    "PAUTA",
                    "Torna obrigatória, em todos os supermercados e congêneres, a adaptação de 5% (cinco por cento) dos carrinhos de compras às crianças com deficiência ou mobilidade reduzida.",
                    "SUPERMERCADO, HIPERMERCADO, CRIANÇA, MOBILIDADE REDUZIDA, ADAPTAÇÃO, CRIANÇAS COM NECESSIDADES ESPECIAIS, CARRINHO DE COMPRA",
                ],
                [
                    "Projeto de lei 581/2016",
                    "http://www.al.sp.gov.br/propositura?id=1323579",
                    "Jorge Wilson Xerife do Consumidor",
                    "PAUTA",
                    "Dispõe sobre a comercialização de produtos não disponíveis em estoque, e dá outras providências.",
                    "PROIBIÇÃO, COMERCIALIZAÇÃO, INTERNET, ESTOQUE, PRODUTOS, INDISPONÍVEL",
                ],
                [
                    "Projeto de lei 580/2016",
                    "http://www.al.sp.gov.br/propositura?id=1323286",
                    "Marcia Lia",
                    "PAUTA",
                    "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
                    "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
                ],
            ],
        };

        const content = textProcessorFluentApi.extractHeaders().splitContentKeys().build();

        expect(expected).toEqual(content);
    });

    test("#createRawObject", () => {
        const expected = {
            content: [
                {
                    título: "Projeto de lei 584/2016",
                    link: "http://www.al.sp.gov.br/propositura?id=1322563",
                    autor: "Jorge Wilson Xerife do Consumidor",
                    etapa: "PAUTA",
                    ementa:
                        "Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.",
                    indexadoresnorma:
                        "CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO",
                },
                {
                    título: "Projeto de lei 583/2016",
                    link: "http://www.al.sp.gov.br/propositura?id=1322562",
                    autor: "Jorge Wilson Xerife do Consumidor",
                    etapa: "PAUTA",
                    ementa:
                        "Assegura ao cônjuge ou à pessoa em união estável do consumidor responsável pela unidade consumidora o direito de fazer constar na fatura de serviços o seu nome, e dá outras providências.",
                    indexadoresnorma:
                        "CONSUMIDOR, ÁGUA (ABASTECIMENTO), ENERGIA ELÉTRICA, CÔNJUGE, EMPRESA PRESTADORA DE SERVIÇO, TELEFONIA, ATESTADO DE RESIDÊNCIA, NOME, UNIÃO ESTÁVEL, INCLUSÃO, FATURA MENSAL DE CONSUMO",
                },
                {
                    título: "Projeto de lei 582/2016",
                    link: "http://www.al.sp.gov.br/propositura?id=1323583",
                    autor: "Jorge Wilson Xerife do Consumidor",
                    etapa: "PAUTA",
                    ementa:
                        "Torna obrigatória, em todos os supermercados e congêneres, a adaptação de 5% (cinco por cento) dos carrinhos de compras às crianças com deficiência ou mobilidade reduzida.",
                    indexadoresnorma:
                        "SUPERMERCADO, HIPERMERCADO, CRIANÇA, MOBILIDADE REDUZIDA, ADAPTAÇÃO, CRIANÇAS COM NECESSIDADES ESPECIAIS, CARRINHO DE COMPRA",
                },
                {
                    título: "Projeto de lei 581/2016",
                    link: "http://www.al.sp.gov.br/propositura?id=1323579",
                    autor: "Jorge Wilson Xerife do Consumidor",
                    etapa: "PAUTA",
                    ementa:
                        "Dispõe sobre a comercialização de produtos não disponíveis em estoque, e dá outras providências.",
                    indexadoresnorma: "PROIBIÇÃO, COMERCIALIZAÇÃO, INTERNET, ESTOQUE, PRODUTOS, INDISPONÍVEL",
                },
                {
                    título: "Projeto de lei 580/2016",
                    link: "http://www.al.sp.gov.br/propositura?id=1323286",
                    autor: "Marcia Lia",
                    etapa: "PAUTA",
                    ementa:
                        "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
                    indexadoresnorma:
                        "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
                },
            ],
        };

        const content = textProcessorFluentApi
            .extractHeaders()
            .splitContentKeys()
            .createRawObject()
            .build();

        expect(expected).toEqual(content);
    });

    test("#createRawObject", () => {
        const content = textProcessorFluentApi
            .extractHeaders()
            .splitContentKeys()
            .createRawObject()
            .mapProjects()
            .build();

        expect(content[0]).toBeInstanceOf(Project);
    });
});