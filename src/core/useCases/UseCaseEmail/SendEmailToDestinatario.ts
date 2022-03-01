import { Either, left, right } from '../../../shared/either'
import { InvalidDestinatarioError } from '../../entities/errors/InvalidDestinatarioError'
import { Destinatario } from '../../entities/Destinatario'
import { MailServiceError } from '../errors/MailServiceError'
import { EmailOptions, EmailService } from '../ports/EmailService'
import { SendEmail } from './SendEmail'
import { SendEmailData } from './SendEmailData'
import { SendEmailResponse } from './SendEmailResponse'

export class SendEmailToDestinatario implements SendEmail {
  private readonly mailService: EmailService
  private readonly mailOptions: EmailOptions

  constructor (mailOptions: EmailOptions, mailService: EmailService) {
    this.mailOptions = mailOptions
    this.mailService = mailService
  }

  async sendEmailToUser ({ name, email, description }: SendEmailData):
    Promise<SendEmailResponse> {
    const destinatarioOrError: Either<InvalidDestinatarioError,
      Destinatario > = Destinatario.create(email, name, description)

    if (destinatarioOrError.isLeft()) {
      return left(destinatarioOrError.value)
    }

    const destinatario = destinatarioOrError.value
    const greetings = 'Olá <b>' + destinatario.name.value + '</b>, como vai?'
    const customizedHtml = greetings + '<br><br>' + this.mailOptions.html
    const options = {
      host: this.mailOptions.host,
      port: this.mailOptions.port,
      username: this.mailOptions.username,
      password: this.mailOptions.password,
      from: this.mailOptions.from,
      to: destinatario.name.value + '<' + destinatario.email.value + '>',
      subject: this.mailOptions.subject,
      text: this.mailOptions.text,
      html: customizedHtml,
      attachments: this.mailOptions.attachments
    }

    const send: Either<MailServiceError, EmailOptions> =
      await this.mailService.send(options)

    if (send.isLeft()) {
      return left(new MailServiceError())
    }

    return right(options)
  }
}
