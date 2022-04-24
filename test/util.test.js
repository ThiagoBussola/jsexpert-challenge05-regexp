// TODO: Dê uma olhada no projeto oficial do módulo 06 (Expressões Regulares - RegExp) para implementar este arquivo.
import { describe, test, expect } from '@jest/globals'
import { evaluateRegex } from './../src/util.js'


describe('Util', () => {
    test('#evaluateRegex should throw an error using an unsafe Regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        // gerando um erro na chamada para pegar a mensagem | fonte https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest
        try {
            evaluateRegex(unsafeRegex)
        } catch(error) {
            expect(error.message).toBe("This /^([a-z|A-Z|0-9]+\\s?)+$/ is unsafe dude!")
        }
        // teste padrão das aulas
        expect(() => evaluateRegex(unsafeRegex)).toThrowError()
    })

    test('#evaluateRegex should not throw an error using a safe regex', () => {
        const safeRegex = /([a-z])$/

        expect(() => evaluateRegex(safeRegex)).not.toThrowError()
        expect(evaluateRegex(safeRegex))
    })
})