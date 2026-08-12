import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber:{
        type: Schema.Types.ObjectId,
        ref:"User" // one who subscriber
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref:"User" // one who has an channel
    }
}, {timestamps: true})

export const Subscriber = mongoose.Schema('Subscriber', subscriptionSchema)