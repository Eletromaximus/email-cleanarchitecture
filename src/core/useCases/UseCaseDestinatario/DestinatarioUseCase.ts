import { Either, left, right } from '../../../shared/either'
import { Email } from '../../entities/Email'
import { InvalidEmailError } from '../../entities/errors/InvalidEmailError'
import { InvalidNameError } from '../../entities/errors/InvalidNameError'
import { InvalidDestinatarioError } from '../../entities/errors/InvalidDestinatarioError'
import { Name } from '../../entities/Name'
import { Destinatario } from '../../entities/Destinatario'
import { DestinatarioRepository } from '../ports/Destinatario'
import { DestinatarioDTO } from './DestinatarioDTO'

export default class DestinatarioUseCase {
  constructor (private useDestinatario: DestinatarioRepository) {
    this.useDestinatario = useDestinatario
  }

  async execute ({ description, email, name }: DestinatarioDTO):
    Promise<Either<
    InvalidEmailError | InvalidNameError | InvalidDestinatarioError,
    void>> {
    const find: Destinatario = await this.useDestinatario.findByMail(email)

    if (!find) {
      const _name = Name.create(name)

      if (_name.isLeft()) {
        return left(_name.value)
      }

      const _email = Email.create(email)

      if (_email.isLeft()) {
        return left(_email.value)
      }

      const response = await this.useDestinatario.save({
        description,
        email: _email.value,
        name: _name.value
      })

      return right(response)
    } return left(new InvalidDestinatarioError())
  }
}
