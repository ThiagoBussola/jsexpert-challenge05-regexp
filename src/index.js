// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
// Dica do wells: no lugar da chamada do PDF parser, um simples `.toString()` resolve, já que nós é que implementaremos o "CSV parser"
'user strict'
import { readFile } from 'fs/promises'
import { join } from 'path'

import { TextProcessorFacade } from './textProcessorFacade'

// text processor facade

;(async () => {
    const dataBuffer = await readFile(join(__dirname, ''))
    const data = await dataBuffer.toString()

    const instance = new TextProcessorFacade(data.text)
    
})