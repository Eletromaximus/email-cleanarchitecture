import { DomainError } from './DomainsError'

export class InvalidNameError extends Error implements DomainError {
  constructor (name: string) {
    super(`The name "${name}" is Invalid`)
    this.name = 'InvalidNameError'
  }
}
