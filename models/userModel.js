import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const {Schema} = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//pre: Defines a pre hook for the model.
//https://mongoosejs.com/docs/api.html#schema_Schema-pre
userSchema.pre('save', function (next) {
    const user = this; // üzerinde yaptığımız söz konusu objeninin burdaki user olması
    bcrypt.hash(user.password, 10, function (err, hash) {
        // Store hash in your password DB.
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);

export default User;
