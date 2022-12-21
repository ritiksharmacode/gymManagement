import mongoose, { Schema } from 'mongoose';

const PurposeSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            default: '',
        },
        purposeName: {
            type: String,
            required: true,
        },
        mondayWorkOut: [
            {
                type: Schema.Types.ObjectId,
                ref: 'exercisePlan',
            },
        ],
        tuesdayWorkOut: [
            {
                type: Schema.Types.ObjectId,
                ref: 'exercisePlan',
            },
        ],
        wednesdayWorkOut: [
            {
                type: Schema.Types.ObjectId,
                ref: 'exercisePlan',
            },
        ],
        thursdayWorkOut: [
            {
                type: Schema.Types.ObjectId,
                ref: 'exercisePlan',
            },
        ],
        fridayWorkOut: [
            {
                type: Schema.Types.ObjectId,
                ref: 'exercisePlan',
            },
        ],
        saturdayWorkOut: [
            {
                type: Schema.Types.ObjectId,
                ref: 'exercisePlan',
            },
        ],
        sundayWorkOut: [
            {
                type: Schema.Types.ObjectId,
                ref: 'exercisePlan',
            },
        ],
        mondayDiet: {
            type: String,
            default: '',
        },
        tuesdayDiet: {
            type: String,
            default: '',
        },
        wednesdayDiet: {
            type: String,
            default: '',
        },
        thursdayDiet: {
            type: String,
            default: '',
        },
        fridayDiet: {
            type: String,
            default: '',
        },
        saturdayDiet: {
            type: String,
            default: '',
        },
        sundayDiet: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

const purposeConnection = mongoose.model('purpose', PurposeSchema);

export default purposeConnection;
