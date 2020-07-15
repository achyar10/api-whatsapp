import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import MessageController from '../controllers/MessageController'
// import { verifyToken } from '../middlewares/AuthMiddleware'


class Routers {

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {

        // Authenticate
        this.router.get('/scan/qr', AuthController.scanQr)

        // Send Message
        this.router.post('/send', MessageController.sendMessage)


    }


}
export default new Routers().router