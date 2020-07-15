import { server } from '../helpers'
import SessionModel from '../models/SessionModel';

class MessageController {

    sendMessage = async (req, res) => {
        const { number, message } = req.body
        try {
            const data = await SessionModel.findOne({}, 'WABrowserId WASecretBundle WAToken1 WAToken2').sort({ _id: -1 })
            const client = server(data)
            client.initialize()
            client.on('ready', () => {
                client.sendMessage(`${number}@c.us`, message)
                    .then(response => {
                        console.log("OK")
                    })
                    .catch(err => console.log(err))
            })
            return res.json({ status: true, message: 'OK' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Internal server error!' })
        }
    }

}
export default new MessageController()