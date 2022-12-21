import mongoose, { Schema } from 'mongoose';

const ExercisePlanSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            default: '',
        },
        exercisePlanName: {
            type: String,
            required: true,
        },
        exercisePlan: [
            {
                exerciseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Exercise',
                    required: true,
                },
                exerciseSet: { type: String, default: '' },
                exerciseRep: { type: String, default: '' },
                exerciseTempo: { type: String, default: '' },
                exerciseRest: { type: String, default: '' },
            },
        ],
    },
    { timestamps: true },
);

const exercisePlanConnection = mongoose.model('exercisePlan', ExercisePlanSchema);

export default exercisePlanConnection;
