import mongoose, { Schema } from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
    {
        newMemberId: {
            type: Schema.Types.ObjectId,
            ref: 'newMember',
            required: true,
        },
        attendanceDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['present', 'absent'],
            default: 'present',
        },
    },
    { timestamps: true },
);

const attendanceConnection = mongoose.model('attendance', AttendanceSchema);

export default attendanceConnection;
