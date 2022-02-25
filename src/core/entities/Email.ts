import { Either, left, right } from '../../shared/either'
import { emailValid } from './EmailValidator'
import { InvalidEmailError } from './errors/InvalidEmailError'

export class Email {
  public readonly value: string

  private constructor (email: string) {
    this.value = email
    Object.freeze(this)
  }

  public static create (email: string): Either<InvalidEmailError, Email> {
    if (emailValid(email)) {
      return right(new Email(email))
    }

    return left(new InvalidEmailError(email))
  }
}
