/* eslint-disable no-undef */
import { DesinatarioController } from './index'
import { MissingParamError, ServerError } from './errors'
import { right } from '../shared/either'
import { SendEmail } from '../core/useCases/UseCaseEmail/SendEmail'
import { SendEmailResponse } from '../core/useCases/UseCaseEmail/SendEmailResponse'
// import { InvalidNameError } from '../core/entities/errors/InvalidNameError'
// import { InvalidEmailError } from '../core/entities/errors/InvalidEmailError'
import { EmailOptions } from '../core/useCases/ports/EmailService'
import { SendEmailData } from '../core/useCases/UseCaseEmail/SendEmailData'

interface SutType {
  sut: DesinatarioController
  sendEmailToUserStub: SendEmail
}

const attachmentFilePath: string = '../resources/test.txt'
const fromName = 'Test'
const fromEmail = 'from_email@mail.com'
const toName = 'any_name'
const toEmail = 'any_email@mail.com'
const subject = 'Test e-mail'
const emailBody = 'Hello world attachment test'
const emailBodyHtml = '<b>Hello world attachment test</b>'
const attachments = [{
  filename: attachmentFilePath,
  contentType: 'text/plain'
}]

const mailOptions: EmailOptions = {
  host: 'test',
  port: 867,
  username: 'test',
  password: 'test',
  from: fromName + ' ' + fromEmail,
  to: toName + ' <' + toEmail + '>',
  subject: subject,
  text: emailBody,
  html: emailBodyHtml,
  attachments: attachments
}

const makeSendEmailToUser = (): SendEmail => {
  class SendEmailToUserStub implements SendEmail {
    async sendEmailToUser (sendEmail: SendEmailData): Promise<SendEmailResponse> {
      return await Promise.resolve(right(mailOptions))
    }
  }
  return new SendEmailToUserStub()
}

const makeSut = (): SutType => {
  const sendEmailToUserStub = makeSendEmailToUser()
  const sut = new DesinatarioController(sendEmailToUserStub)
  return { sut, sendEmailToUserStub }
}

describe('Register User Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name, email or description').message)
  })

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name, email or description').message)
  })

  test('should call SendEmailToUserWithBonus with correct values and return 200', async () => {
    const { sut, sendEmailToUserStub } = makeSut()
    const sendEmailSpy = jest.spyOn(sendEmailToUserStub, 'sendEmailToUser')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        description: 'description'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(sendEmailSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      description: 'description'
    })
    expect(response.statusCode).toEqual(200)
  })

  test('should return 500 if send email user throws', async () => {
    const { sut, sendEmailToUserStub } = makeSut()
    jest.spyOn(sendEmailToUserStub, 'sendEmailToUser').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        description: 'anything'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toEqual(500)
    expect((response.body as ServerError).message).toEqual('Server error: internal.')
  })
})
