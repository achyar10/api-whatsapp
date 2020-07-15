import mongoose from 'mongoose'

const schema = mongoose.Schema({
    WABrowserId: String,
    WASecretBundle: String,
    WASecretBundle: String,
    WAToken1: String,
    WAToken2: String
})
export default mongoose.model('session', schema)