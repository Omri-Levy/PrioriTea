import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const ListSchema = Schema({
        title: {
            type: String,
            min: 1,
            max: 70,
            required: true
        },
        owner: {
            type: String,
            min: 2,
            max: 70,
            required: true
        }
    },
    {
        timestamps: true
    });

export default model('Lists', ListSchema);

