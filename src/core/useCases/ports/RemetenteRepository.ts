import { Remetente } from '../../entities/Remetente'

export interface RemetenteRepository {
  save(remetente: Remetente): Promise<void>
  findByMail(email: string): Promise<Remetente>
}
