import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import router from './routers'
import connection from './configs/Database'
import { config as dotenv } from 'dotenv'

class Server {

    constructor() {
        this.app = express()
        this.plugins()
        this.routes()
        connection()
        dotenv()
    }

    plugins() {
        this.app.enable('trust proxy')
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(morgan('combined'))
        morgan.token('date', function () {
            let p = new Date().toString().replace(/[A-Z]{3}\+/, '+').split(/ /);
            return (p[2] + '/' + p[1] + '/' + p[3] + ':' + p[4] + ' ' + p[5]);
        });
        this.app.use(bodyParser.json({ limit: '50mb' }))
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    }

    routes() {
        this.app.use('/', router)
        this.app.get('/', (req, res) => {
            res.send('Hello, Its Works')
        })
        this.app.use((req, res) => {
            res.status(404).send('Page not found!')
        })
    }

}

dotenv()
const port = process.env.PORT || 3000
const app = new Server().app
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})