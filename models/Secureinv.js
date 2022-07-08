import mongoose from "mongoose";

const SecureInvSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    guildid: {
        type: String,
        required: true,
    },
    expireinfinite: {
        type: Boolean,
        required: true,
    },
    expire: {
        type: String,
        default: null
    },
    countinfinite: {
        type: Boolean,
        required: true,
    },
    maxcount: {
        type: Number,
        default: null
    },
    count: {
        type: Number,
        default: 0,
    }
})

export default mongoose.models.Secureinv || mongoose.model('Secureinv', SecureInvSchema)
