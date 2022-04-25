// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.

import { evaluateRegex } from './util.js'
export class Project {
    constructor({ titulo, link, autor, etapa, ementa, indexorama }) {

        const projectNumberAndYear = evaluateRegex(/(?<=Projeto de lei )(?<lei>\d*)\/(?<ano>\d*)/gm)
        const projectId = evaluateRegex(/(?<=id=)(\d*)/gm)
        const authorsName = autor.split(',').map(autor => {
            let nomeCompleto = autor.trim().split(" ")
            if(nomeCompleto.length > 1) {
                return {
                    nome: `${nomeCompleto[0]} ${nomeCompleto[nomeCompleto.length -1]}`
                }
            }
            return {
                nome: nomeCompleto[0]
            }
        })

        const indexo = indexorama.split(',').map(index => {
            let indexoramaArr = index.trim()
            return indexoramaArr
        })


        const { groups: { lei, ano } } = projectNumberAndYear.exec(titulo)
        const id = link.match(projectId)[0] 

        this.numero = lei
        this.ano = ano
        this.id = id,
        this.url = link
        this.autores = authorsName
        this.etapa = etapa
        this.ementa = ementa
        this.indexorama = indexo
    }
}