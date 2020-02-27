import * as mongoose from  'mongoose'
import { usersRouter } from './users.router'

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    }
})

export const User = mongoose.model('User', userSchema)