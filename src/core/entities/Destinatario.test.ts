/* eslint-disable no-undef */
import { right } from '../../shared/either'
import { emailValid } from './EmailValidator'
import InvalidDescriptionError from './errors/InvalidDescriptionError'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { Name } from './Name'
import { Destinatario } from './Destinatario'

describe('Avaliando formatação de email e nome', () => {
  test('Deve aceitar um email válido', () => {
    expect(emailValid('maxmilliano@gmail.br')).toBe(true)
  })

  test('Deve aceitar um nome valido', () => {
    expect(Name.validate('max')).toBe(true)
  })

  test('Não deve aceitar email incorreto', () => {
    const destinatario = Destinatario.create(
      '@gmail.com',
      'max',
      ''
    )

    expect(destinatario).toEqual(right(new InvalidEmailError('@gmail.com')))
  })

  test('Não deve aceitar descrição em branco', () => {
    const destinatario = Destinatario.create(
      'maxmilliano@gmail.com',
      'max',
      ''
    )

    expect(destinatario).toEqual(right(new InvalidDescriptionError()))
  })
})
