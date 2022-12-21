import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gymInfoConnection from '../model/gymInfo.model';
import staffInfoConnection from '../model/staffInfo.model';
import accessLevelConnection from '../model/accessLevel.model';
import { jwtSecretKey } from '../utils/common.utils';
// import { mongoSave, mongoUpdate } from '../utils/mongo.utils';

const entryPoint = express.Router();

entryPoint.post('/signUp', async (req, res) => {
    try {
        console.log(req.body);

        const signUpData = {
            businessContact: req.body.businessContact,
            businessName: req.body.businessName,
            businessEmailId: req.body.businessEmailId,
            businessAddress: req.body.businessAddress,
            state: req.body.state,
            country: req.body.country,
        };
        const newGymInfo = new gymInfoConnection(signUpData);

        await newGymInfo.save();

        const accessLevelData = {
            accessLevelName: 'Master',
        };
        const newAccessLevel = new accessLevelConnection(accessLevelData);
        const saveData2 = await newAccessLevel.save();

        const bcryptPassword = await bcrypt.hash(`${req.body.businessContact}`, 12);

        const staffInfoData = {
            accessLevelName: saveData2._id,
            name: 'Master User',
            businessContact: req.body.businessContact,
            password: bcryptPassword,
        };
        const newStaffInfo = new staffInfoConnection(staffInfoData);
        const saveData3 = await newStaffInfo.save();

        res.status(201).json({
            message: 'new gymInfo saved',
            data: saveData3,
        });
    } catch (error: any) {
        console.log('save error', error);
        res.status(400).json({ message: error.message });
    }
});

entryPoint.post('/login', async (req, res) => {
    try {
        console.log(req.body);

        const saveData = await staffInfoConnection
            .findOne({
                businessContact: req.body.userName,
            })
            .lean();

        if (!saveData) {
            throw new Error('gymInfo not registered');
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, saveData.password);

        if (!isPasswordMatch) {
            throw new Error('invalid credential');
        }

        const payLoad = { staffID: saveData._id };
        const token = jwt.sign(payLoad, jwtSecretKey);

        await staffInfoConnection.updateOne(
            { _id: saveData._id },
            {
                $addToSet: {
                    loginToken: { token },
                },
            },
        );

        res.status(201).json({
            message: ' login successful',
            data: {
                token,
                businessContact: saveData.businessContact,
            },
        });
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});

entryPoint.put('/forgetPassword', async (req, res) => {
    try {
        const bcryptPassword = await bcrypt.hash(`${req.body.password}`, 12);
        const saveData = await staffInfoConnection.updateOne(
            { businessContact: req.body.userName },
            {
                password: bcryptPassword,
            },
        );

        res.status(201).json({ message: 'new password success ', data: saveData });
    } catch (error: any) {
        console.log('save error', error);
        res.status(400).json({ message: error.message });
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}-${Date.now()}.jpg`);
        },
    }),
}).single('photo_name');

// mime.extension(mime.lookup(file.originalname)) ? mime.extension(mime.lookup(file.originalname)) : mime.extension(file.mimetype);
// import mime from 'mime-types';

entryPoint.post('/mediaUpload', upload, async (req, res) => {
    try {
        // const bcryptPassword = await bcrypt.hash(`${req.body.password}`, 12);
        // const saveData = await staffInfoConnection.updateOne(
        //     { businessContact: req.body.userName },
        //     {
        //         password: bcryptPassword,
        //     },
        // );

        res.status(201).json({ message: 'file uploaded ', data: { path: req.file?.filename } });
    } catch (error: any) {
        console.log('save error', error);
        res.status(400).json({ message: error.message });
    }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
entryPoint.get('/email', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'rritikssharma1920@gmail.com',
                pass: 'zgbaxrzxeudqezky',
            },
        });

        const mailOptions = await transporter.sendMail({
            from: 'rritikssharma1920@gmail.com',
            to: 'rritikssharma1920@gmail.com',
            subject: 'Hello ✔',
            text: 'Hello world?',
        });

        res.status(201).json({ message: 'email sent  ', data: mailOptions });
    } catch (error: any) {
        console.log('save error', error);
        res.status(400).json({ message: error.message });
    }
});

export default entryPoint;
