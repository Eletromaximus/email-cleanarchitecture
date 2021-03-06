import { Email } from './Email'
import { Either, left, right } from '../../shared/either'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { Name } from './Name'
import { InvalidNameError } from './errors/InvalidNameError'
import InvalidDescriptionError from './errors/InvalidDescriptionError'

export class Destinatario {
  public readonly email: Email
  public readonly name: Name
  description: string

  constructor (
    email: Email,
    name: Name,
    description: string
  ) {
    this.email = email
    this.name = name
    this.description = description
  }

  public static create (email: string, name: string, description: string):
    Either<
      InvalidEmailError | InvalidNameError |
      InvalidDescriptionError, Destinatario
    > {
    const emailOrError = Email.create(email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(email))
    }

    const nameOrError = Name.create(name)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(name))
    }

    if (description === '') {
      return left(new InvalidDescriptionError())
    }

    const emailObject: Email = emailOrError.value as Email
    const nameObject: Name = nameOrError.value as Name

    return right(new Destinatario(emailObject, nameObject, description))
  }
}
