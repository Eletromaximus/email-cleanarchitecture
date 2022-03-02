
import { DesinatarioController } from '../../controller'
import { NodeMailerService } from '../../external/NodeMailerService'
import { SendEmailToDestinatario } from '../../core/useCases/UseCaseEmail/SendEmailToDestinatario'
import { getEmailOptions } from '../config/email'

export const makeDestinatarioController = (): DesinatarioController => {
  const nodemailerService = new NodeMailerService()
  const sendEmailToDestinatario = new SendEmailToDestinatario(
    getEmailOptions(), nodemailerService
  )
  const destinatarioController = new DesinatarioController(sendEmailToDestinatario)
  return destinatarioController
}
