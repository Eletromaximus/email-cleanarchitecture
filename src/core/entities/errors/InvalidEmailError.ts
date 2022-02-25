import { DomainError } from './DomainsError'

export class InvalidEmailError extends Error implements DomainError {
  constructor (email: string) {
    super('Invalid email' + email + '.')
    this.name = 'InvalidEmailError'
  }
}
