import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const UserSchema = Schema({
        email: {
            type: String,
            min: 7,
            max: 320,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            min: 4,
            max: 70,
            required: true
        },
        password: {
            type: String,
            min: 8,
            max: 1024,
            required: true
        },
    },
    {
        timestamps: true
    });

export default model('Users', UserSchema);
