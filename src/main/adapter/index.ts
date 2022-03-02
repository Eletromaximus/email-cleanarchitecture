import { Request, Response } from 'express'
import { DesinatarioController } from '../../controller'
import { HttpRequest } from '../../controller/https'

export const adapterRoute = (controller: DesinatarioController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
