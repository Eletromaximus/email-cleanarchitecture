import { Destinatario } from '../../entities/Destinatario'

export interface DestinatarioRepository {
  save(destinatario: Destinatario): Promise<void>
  findByMail(email: string): Promise<Destinatario>
}
