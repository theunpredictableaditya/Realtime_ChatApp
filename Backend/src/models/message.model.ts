import mongoose, {Schema, Types, Document} from 'mongoose'

interface MessageDocument extends Document {
    conversation: Types.ObjectId;
    sender: Types.ObjectId;
    content: string;
    messageType: "text" | "image" | "video" | "file";
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<MessageDocument>({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'CONVERSATION',
        required: true
    },
    sender : {
        type: Schema.Types.ObjectId,
        ref: "USER",
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'video', 'file'],
        default: 'text'
    }
}, {
    timestamps: true
})

const messageModel = mongoose.model("MESSAGE", MessageSchema)

export {
    MessageDocument,
    messageModel
}