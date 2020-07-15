import { server } from '../helpers'
import SessionModel from '../models/SessionModel';
import QrModel from '../models/QrModel';

class AuthController {

    scanQr = async (req, res) => {
        try {
            const client = server(false)
            client.initialize()
            client.on('qr', (qr) => {
                console.log('QR RECEIVED', qr)
                QrModel.create({ QrCode: qr })
            })
            client.on('authenticated', (session) => {
                console.log('AUTHENTICATED')
                SessionModel.create(session)
            })
            return res.json({ status: true, message: 'OK' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Internal server error!' })
        }
    }

}
export default new AuthController()