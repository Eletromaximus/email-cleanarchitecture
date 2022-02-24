import { IRemetente } from '../entities/IRemetente'

export interface RemetenteRepository {
  (remetente: IRemetente): Promise<void>
}
