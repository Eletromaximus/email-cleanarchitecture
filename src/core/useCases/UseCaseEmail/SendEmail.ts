import { Remetente } from '../../entities/Remetente'
import { SendEmailResponse } from './SendEmailResponse'

export interface SendEmail {
  sendEmailToUser: (remetente: Remetente) => Promise<SendEmailResponse>
}
