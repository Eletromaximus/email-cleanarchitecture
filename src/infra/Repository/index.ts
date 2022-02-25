import { Remetente } from '../../core/entities/Remetente'
import { RemetenteRepository } from '../../core/repositories/RemetenteRepository'

const knex = require('../../database')

export class ProstgresUserRepository implements RemetenteRepository {
  async findByMail (email: string): Promise<Remetente> {
    const remetente = await knex('remetentes')
      .select()
      .from('remetentes')
      .then((data: Remetente[]) => {
        return data[0]
      })
      .catch((err: any) => {
        console.log(err)
        return undefined
      })

    return remetente
  }

  async save (remetente: Remetente): Promise<void> {
    const result = await knex('remetentes')
      .insert(remetente)
      .then(() => {
        return 'ok'
      })
      .catch((error: any) => {
        console.log(error, 'falha ao inserir remetente')
        return undefined
      })

    return result
  }
}
