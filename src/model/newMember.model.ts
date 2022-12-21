import mongoose, { Schema } from 'mongoose';

const NewMemberSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            default: '',
        },
        contact: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            default: Date,
        },
        additionalContact: {
            type: String,
            default: '',
        },
        emailId: {
            type: String,
            default: '',
        },
        occupation: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        postcode: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        state: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: '',
        },
        favourOf: {
            type: String,
            enum: ['S/O', 'D/O', 'W/O'],
            default: 'S/O',
        },
        favourName: {
            type: String,
            default: '',
        },
        purposeOfJoining: {
            type: Schema.Types.ObjectId,
            ref: 'purpose',
            required: true,
        },
        bloodGroup: {
            type: String,
            enum: ['NOT KNOWN', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
            default: 'NOT KNOWN',
        },
        maritalStatus: {
            type: String,
            enum: ['NOT KNOWN', 'SINGLE', 'MARRIED', 'WIDOWED', 'DIVORCED', 'SEPARATED'],
            default: 'NOT KNOWN',
        },
        dateOfAnniversary: {
            type: Date,
            default: Date.now,
        },
        query: {
            type: String,
            default: '',
        },
        biometric: {
            type: String,
            default: '',
        },
        referredBy: {
            type: String,
            default: '',
        },
        response: {
            type: String,
            required: true,
        },
        interestInPackage: {
            type: Schema.Types.ObjectId,
            ref: 'package',
            required: true,
        },
        followUpDate: {
            type: Date,
            default: Date.now,
        },
        followUpStatus: {
            type: Boolean,
            default: false,
        },
        entryStatus: {
            type: String,
            enum: ['enquiry', 'newMember'],
            default: 'newMember',
        },
    },
    { timestamps: true },
);

const newMemberConnection = mongoose.model('newMember', NewMemberSchema);

export default newMemberConnection;
