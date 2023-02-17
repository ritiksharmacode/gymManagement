import mongoose from 'mongoose';

const AccessLevelSchema = new mongoose.Schema(
    {
        accessLevelName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const accessLevelConnection = mongoose.model('accessLevel', AccessLevelSchema);

export default accessLevelConnection;
