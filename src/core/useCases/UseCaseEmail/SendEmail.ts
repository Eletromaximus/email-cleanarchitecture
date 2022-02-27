import { SendEmailData } from './SendEmailData'
import { SendEmailResponse } from './SendEmailResponse'

export interface SendEmail {
  sendEmailToUser(sendEmail: SendEmailData): Promise<SendEmailResponse>
}
