import mongoose from 'mongoose'

class Database {

    connection() {
        const MODE = process.env.NODE_ENV || 'development'

        if (MODE === 'production') {
            mongoose.Promise = global.Promise
            mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&w=1`, {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true
            }, (err) => {
                if (err) {
                    console.log('Failed to connect to mongo on startup - retrying in 5 sec')
                } else {
                    console.log("database connected");
                }
            })
        } else {
            mongoose.Promise = global.Promise
            mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true
            }, (err) => {
                if (err) {
                    console.log('Failed to connect to mongo on startup - retrying in 5 sec')
                } else {
                    console.log("database connected");
                }
            })
        }
    }

}
export default new Database().connection