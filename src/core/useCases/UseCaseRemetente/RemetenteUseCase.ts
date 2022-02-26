import { Either, left, right } from '../../../shared/either'
import { Email } from '../../entities/Email'
import { InvalidEmailError } from '../../entities/errors/InvalidEmailError'
import { InvalidNameError } from '../../entities/errors/InvalidNameError'
import { InvalidRemetenteError } from '../../entities/errors/InvalidRemetenteError'
import { Name } from '../../entities/Name'
import { Remetente } from '../../entities/Remetente'
import { RemetenteRepository } from '../ports/RemetenteRepository'
import { RemetenteDTO } from './RemetenteDTO'

export default class RemetenteUseCase {
  constructor (private useRepository: RemetenteRepository) {
    this.useRepository = useRepository
  }

  async execute ({ description, email, name }: RemetenteDTO):
    Promise<Either<
    InvalidEmailError | InvalidNameError | InvalidRemetenteError,
    void>> {
    const find: Remetente = await this.useRepository.findByMail(email)

    if (!find) {
      const _name = Name.create(name)

      if (_name.isLeft()) {
        return left(_name.value)
      }

      const _email = Email.create(email)

      if (_email.isLeft()) {
        return left(_email.value)
      }

      const response = await this.useRepository.save({
        description,
        email: _email.value,
        name: _name.value
      })

      return right(response)
    } return left(new InvalidRemetenteError())
  }
}
