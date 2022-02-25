import { DomainError } from './DomainsError'

export class InvalidRemetenteError extends Error implements DomainError {
  constructor () {
    super('User Already Exist')
    this.name = 'InvalidRemetenteError'
  }
}
