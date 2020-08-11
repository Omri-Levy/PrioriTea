import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const TaskSchema = Schema({
        priority: {
            type: String,
            min: 1,
            max: 80,
            required: true
        },
        task: {
            type: String,
            min: 1,
            max: 80,
            required: true
        },
        status: {
            type: String,
            min: 1,
            max: 80,
            default: 'Standby'
        }
    },
    {
        timestamps: true
    });

export default model('Tasks', TaskSchema);
