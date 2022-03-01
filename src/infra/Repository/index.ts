import { Destinatario } from '../../core/entities/Destinatario'
import { DestinatarioRepository } from '../../core/useCases/ports/Destinatario'

const knex = require('../../database')

export class ProstgresUserRepository implements DestinatarioRepository {
  async findByMail (email: string): Promise<Destinatario> {
    const destinatario = await knex('destinatarios')
      .select()
      .from('destinatarios')
      .then((data: Destinatario[]) => {
        return data[0]
      })
      .catch((err: any) => {
        console.log(err)
        return undefined
      })

    return destinatario
  }

  async save (destinatario: Destinatario): Promise<void> {
    const result = await knex('destinatarios')
      .insert(destinatario)
      .then(() => {
        return 'ok'
      })
      .catch((error: any) => {
        console.log(error, 'falha ao inserir destinatario')
        return undefined
      })

    return result
  }
}
