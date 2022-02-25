import { Email } from './Email'
import { Either, left, right } from '../../shared/either'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { Name } from './Name'
import { InvalidNameError } from './errors/InvalidNameError'

export class Remetente {
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
    Either<InvalidEmailError, Remetente> {
    const emailOrError = Email.create(email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(email))
    }

    const nameOrError = Name.create(name)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(name))
    }

    const emailObject: Email = emailOrError.value as Email
    const nameObject: Name = nameOrError.value as Name

    return right(new Remetente(emailObject, nameObject, description))
  }
}
