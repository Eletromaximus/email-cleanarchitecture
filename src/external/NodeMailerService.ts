import { EmailOptions, EmailService } from '../core/useCases/ports/EmailService'
import { MailServiceError } from '../core/useCases/errors/MailServiceError'
import { Either, left, right } from '../shared/either'
const nodemailer = require('nodemailer')

export class NodeMailerService implements EmailService {
  async send (options: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
    try {
      const transporter = nodemailer.createTransport({
        port: options.port,
        host: options.host,
        auth: {
          user: options.username,
          pass: options.password
        }
      })
      await transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments
      })
    } catch (error) {
      return left(new MailServiceError())
    }
    return right(options)
  }
}
