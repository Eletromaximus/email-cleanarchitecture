import { DomainError } from './DomainsError'

export default class InvalidDescriptionError extends Error implements DomainError {
  constructor () {
    super('Description Vazia')
    this.name = 'InvalidDescriptionError'
  }
}
