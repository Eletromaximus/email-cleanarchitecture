import { Either, left, right } from '../../shared/either'
import { valid } from './EmailValidator'
import { InvalidEmailError } from './errors/InvalidEmailError'

export class Email {
  public readonly value: string

  private constructor (email: string) {
    this.value = email
    Object.freeze(this)
  }

  public static create (email: string): Either<InvalidEmailError, Email> {
    if (valid(email)) {
      return right(new Email(email))
    }

    return left(new InvalidEmailError(email))
  }
}
