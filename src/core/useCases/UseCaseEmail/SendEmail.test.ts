// /* eslint-disable no-undef */
// import { EmailService, EmailOptions } from '../ports/EmailService'
// import { Either, left, Left, right, Right } from '../../../shared/either'
// import { MailServiceError } from '../errors/MailServiceError'
// import { SendEmail } from './SendEmail'
// import { Remetente } from '../../entities/Remetente'

// const attachmentFilePath: string = '../resources/test.txt'

// const fromName = 'Test'
// const fromEmail = 'from_email@mail.com'
// const toName = 'any_name'
// const toEmail = 'any_email@mail.com'
// const subject = 'Test e-mail'
// const emailBody = 'Hello world attachment test'
// const emailBodyHtml = '<b>Hello world attachment test</b>'
// const attachments = [{
//   filename: attachmentFilePath,
//   contentType: 'text/plain'
// }]

// const mailOptions: EmailOptions = {
//   host: 'test',
//   port: 867,
//   username: 'test',
//   password: 'test',
//   from: fromName + ' ' + fromEmail,
//   to: toName + ' <' + toEmail + '>',
//   subject: subject,
//   text: emailBody,
//   html: emailBodyHtml,
//   attachments: attachments
// }

// class MailServiceStub implements EmailService {
//   async send (mailInfo: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
//     return right(mailInfo)
//   }
// }

// const makeSut = (): { sut: SendEmail, mailServiceStub: MailServiceStub } => {
//   const mailServiceStub = new MailServiceStub()
//   const sut = new SendEmail (Remetente)
//   return { sut, mailServiceStub }
// }

// describe('Send email to user with bonus use case', () => {
//   test('should not email user with invalid email address', async () => {
//     const { sut } = makeSut()
//     const result = await sut.sendEmailToUserWithBonus({ name: toName, email: 'invalid_email' })
//     expect(result).toBeInstanceOf(Left)
//   })

//   test('should email user with attachment', async () => {
//     const { sut } = makeSut()
//     const result = await sut.sendEmailToUserWithBonus({ name: toName, email: toEmail })
//     expect(result).toBeInstanceOf(Right)
//   })

//   test('should raise error when email service fails', async () => {
//     const { sut, mailServiceStub } = makeSut()
//     jest.spyOn(mailServiceStub, 'send').mockReturnValueOnce(Promise.resolve(left(new MailServiceError())))
//     const result = await sut.sendEmailToUserWithBonus({ name: toName, email: toEmail })
//     expect(result.value).toBeInstanceOf(MailServiceError)
//   })
// })
