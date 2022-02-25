import { Either, left, right } from '../../shared/either'
import { Email } from '../entities/Email'
import { InvalidEmailError } from '../entities/errors/InvalidEmailError'
import { RemetenteRepository } from '../repositories/RemetenteRepository'
import { RemetenteDTO } from './RemetenteDTO'

export default class RemetenteUseCase {
  constructor (private useRepository: RemetenteRepository) {
    this.useRepository = useRepository
  }

  async execute ({ description, email, name }: RemetenteDTO):
    Promise<Either<InvalidEmailError, void>> {
    // const find = await this.useRepository.findByMail(email)

    const _email = Email.create(email)

    if (_email.isLeft()) {
      return left(_email.value)
    }

    const response = await this.useRepository.save({
      description,
      email: _email.value,
      name
    })

    return right(response)
  }
}
