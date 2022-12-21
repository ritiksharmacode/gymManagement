import express from 'express';
import bcrypt from 'bcrypt';
import { mongoSave, mongoUpdate } from '../utils/mongo.utils';

import accessLevelConnection from '../model/accessLevel.model';
import accountsConnection from '../model/accounts.model';
import attendanceConnection from '../model/attendance.model';
import exerciseConnection from '../model/exercise.model';
import exercisePlanConnection from '../model/exercisePlan.model';
import measurementConnection from '../model/measurement.model';
import mediaConnection from '../model/media.model';
import newMemberConnection from '../model/newMember.model';
import nutritionChartConnection from '../model/nutritionChart.model';
import packagesConnection from '../model/packages.model';
import paymentMethodConnection from '../model/paymentMethod.model';
import purposeConnection from '../model/purpose.model';
import staffInfoConnection from '../model/staffInfo.model';
import subscriptionConnection from '../model/subscription.model';
import workOutPlanConnection from '../model/workOutPlan.model';

const common = express.Router();
const useMessage = 'common';

const allConnections: any = {
    accessLevel: accessLevelConnection,
    accounts: accountsConnection,
    attendance: attendanceConnection,
    exercise: exerciseConnection,
    exercisePlan: exercisePlanConnection,
    measurement: measurementConnection,
    media: mediaConnection,
    newMember: newMemberConnection,
    nutritionChart: nutritionChartConnection,
    packages: packagesConnection,
    paymentMethod: paymentMethodConnection,
    purpose: purposeConnection,
    staffInfo: staffInfoConnection,
    subscription: subscriptionConnection,
    workOutPlan: workOutPlanConnection,
};

common.post('/', async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await allConnections[nowBody.useModel].find(nowBody.useWhere).sort(nowBody.useSort);

        res.send({ message: `all ${useMessage}`, data: mongoData });
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});

common.post('/save', async (req, res) => {
    const nowBody = req.body;

    if (nowBody.useModel === 'staffInfo') {
        const bcryptPassword = await bcrypt.hash(`${nowBody.businessContact}`, 12);

        nowBody.useData.password = bcryptPassword;
    }

    mongoSave(res, allConnections[nowBody.useModel], useMessage, nowBody.useData);
});

common.put('/update', async (req, res) => {
    const nowBody = req.body;

    mongoUpdate(res, allConnections[nowBody.useModel], useMessage, nowBody.useData, nowBody.useID);
});

common.post('/delete', async (req, res) => {
    try {
        const nowBody = req.body;
        const saveData = await allConnections[nowBody.useModel].deleteOne(nowBody.useWhere);

        res.status(201).json({ message: `${useMessage} deleted`, data: saveData });
    } catch (error: any) {
        console.log('save error', error);
        res.status(401).json({ message: error.message });
    }
});

export default common;
