import mongoose from 'mongoose';

const {Schema} = mongoose;

const photoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

const Photo = mongoose.model('Photo', photoSchema); // model ilk parametresi Collection name'dir. mongoDB'de photos olarak gözükür.

export default Photo;
