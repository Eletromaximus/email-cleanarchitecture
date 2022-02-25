/* eslint-disable no-undef */
import { right } from '../../shared/either'
import { emailValid } from './EmailValidator'
import InvalidDescriptionError from './errors/InvalidDescriptionError'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { Name } from './Name'
import { Remetente } from './Remetente'

describe('Avaliando formatação de email e nome', () => {
  test('Deve aceitar um email válido', () => {
    expect(emailValid('maxmilliano@gmail.br')).toBe(true)
  })

  test('Deve aceitar um nome valido', () => {
    expect(Name.validate('max')).toBe(true)
  })

  test('Não deve aceitar email incorreto', () => {
    const remetente = Remetente.create(
      '@gmail.com',
      'max',
      ''
    )

    expect(remetente).toEqual(right(new InvalidEmailError('@gmail.com')))
  })

  test('Não deve aceitar descrição em branco', () => {
    const remetente = Remetente.create(
      'maxmilliano@gmail.com',
      'max',
      ''
    )

    expect(remetente).toEqual(right(new InvalidDescriptionError()))
  })
})
