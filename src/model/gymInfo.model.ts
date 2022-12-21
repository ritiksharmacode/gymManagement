import mongoose from 'mongoose';

const GymInfoSchema = new mongoose.Schema(
    {
        businessContact: {
            type: Number,
            required: true,
        },
        businessName: {
            type: String,
            required: true,
        },
        businessEmailId: {
            type: String,
            required: true,
        },
        businessAddress: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },

        businessLogo: {
            type: String,
            default: '',
        },
        additionalContact: {
            type: String,
            default: '',
        },
        businessWebsite: {
            type: String,
            default: '',
        },
        ownerName: {
            type: String,
            default: 'Owner',
        },
        postCode: {
            type: Number,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        mapLocation: {
            type: String,
            default: '',
        },
        twitter: {
            type: String,
            default: '',
        },
        facebook: {
            type: String,
            default: '',
        },
        instagram: {
            type: String,
            default: '',
        },
        whatsapp: {
            type: String,
            default: '',
        },
        bankName: {
            type: String,
            default: '',
        },
        bankBranch: {
            type: String,
            default: '',
        },
        accountType: {
            type: String,
            enum: ['saving', 'current'],
            default: 'saving',
        },
        accountHolderName: {
            type: String,
            default: '',
        },
        accountNumber: {
            type: String,
            default: '',
        },
        accountIfsc: {
            type: String,
            default: '',
        },
        businessGst: {
            type: String,
            default: '',
        },
        wishes: {
            type: String,
            default: '',
        },
        businessTagline: {
            type: String,
            default: '',
        },
        termsAndConditions: {
            type: String,
            default: '',
        },
        registrationFee: {
            type: Number,
        },
        registrationPrefix: {
            type: String,
            default: '',
        },
        newPackageSubscription: {
            type: Boolean,
            default: false,
        },
        expiringIn7Days: {
            type: Boolean,
            default: false,
        },
        expirationDay: {
            type: Boolean,
            default: false,
        },
        automaticBirthdayWishes: {
            type: Boolean,
            default: false,
        },
        automaticAnniversaryWishes: {
            type: Boolean,
            default: false,
        },
        staffLogin: {
            type: Boolean,
            default: true,
        },
        logo: {
            type: Boolean,
            default: true,
        },
        bankInfo: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

const gymInfoConnection = mongoose.model('gymInfo', GymInfoSchema);

export default gymInfoConnection;
