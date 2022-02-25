import { Email } from './Email'
import { Either, left, right } from '../../shared/either'
import { InvalidEmailError } from './errors/InvalidEmailError'

export class Remetente {
  email: Email
  name: string
  description: string

  constructor (
    email: Email,
    name: string,
    description: string
  ) {
    this.email = email
    this.name = name
    this.description = description
  }

  public static create (email: string, name: string, description: string):
    Either<InvalidEmailError, Remetente> {
    const emailOrError = Email.create(email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(email))
    }

    const emailObject: Email = emailOrError.value as Email

    return right(new Remetente(emailObject, name, description))
  }
}
