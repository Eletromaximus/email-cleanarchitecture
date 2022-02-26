import { Either } from '../../../shared/either'
import { EmailOptions } from '../ports/EmailService'
import { MailServiceError } from '../errors/MailServiceError'

export type SendEmailResponse = Either<MailServiceError, EmailOptions>
