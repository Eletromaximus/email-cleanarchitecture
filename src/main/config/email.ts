import { EmailOptions } from '../../core/useCases/ports/EmailService'

const attachments: any[] = []

export function getEmailOptions (): EmailOptions {
  const from = 'Max Milliano | Correio eletrônico'
  const to = ''
  const mailOptions: EmailOptions = {
    host: String(process.env.EMAIL_HOST),
    port: Number.parseInt(String(process.env.EMAIL_PORT)),
    username: String(process.env.EMAIL_USERNAME),
    password: String(process.env.EMAIL_PASSWORD),
    from: from,
    to: to,
    subject: 'Olá, você recebeu uma mensagem!',
    text: '',
    html: '',
    attachments: attachments
  }

  return mailOptions
}
