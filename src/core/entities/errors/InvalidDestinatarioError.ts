import { DomainError } from './DomainsError'

export class InvalidDestinatarioError extends Error implements DomainError {
  constructor () {
    super('User Already Exist')
    this.name = 'InvalidDestinatarioError'
  }
}
