import mongoose from 'mongoose'

const schema = mongoose.Schema({
    QrCode: String
})
export default mongoose.model('qr_code', schema)