import { SendEmail } from '../core/useCases/UseCaseEmail/SendEmail'
import { SendEmailResponse } from '../core/useCases/UseCaseEmail/SendEmailResponse'
import { MissingParamError } from './errors/MissingParamError'
import { badRequest, ok, serverError } from './http-helper'
import { HttpRequest } from './https'

export class DesinatarioController {
  private readonly sendEmailToDestinatario: SendEmail

  constructor (sendEmailToDestinatario: SendEmail) {
    this.sendEmailToDestinatario = sendEmailToDestinatario
  }

  async handle (httpRequest: HttpRequest) {
    try {
      if (
        !httpRequest.body.name ||
        !httpRequest.body.email ||
        !httpRequest.body.description
      ) {
        return badRequest(new MissingParamError('name, email or description'))
      }

      const userData = {
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        description: httpRequest.body.description
      }

      const sendEmailResponse: SendEmailResponse =
          await this.sendEmailToDestinatario.sendEmailToUser(userData)

      if (sendEmailResponse.isLeft()) {
        return serverError(sendEmailResponse.value.message)
      }

      return ok(userData)
    } catch (error) {
      return serverError('internal')
    }
  }
}
