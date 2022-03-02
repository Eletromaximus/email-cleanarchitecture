import { Router } from 'express'
import { adapterRoute } from '../adapter'
import { makeDestinatarioController } from '../factories'

export default (router: Router): void => {
  router.post('/register', adapterRoute(makeDestinatarioController()))
}
