import mongoose, {Schema, Document, Types} from 'mongoose'

interface ConversationDocument extends Document {
    type : 'direct' | 'group';
    participants: Types.ObjectId[];
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ConversationSchema = new Schema<ConversationDocument>({
    type: {
        type: String,
        enum: ['direct', 'group'],
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
    }],
    name: {
        type: String,
        trim: true
    }
    },{
    timestamps: true
});

export const conversationModel = mongoose.model('CONVERSATION', ConversationSchema)