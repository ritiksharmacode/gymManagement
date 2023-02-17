import express from 'express';
import moment from 'moment';
import subscriptionConnection from '../model/subscription.model';
import accountsConnection from '../model/accounts.model';
import newMemberConnection from '../model/newMember.model';

const reports = express.Router();

reports.get('/paymentRecord/:startDate/:endDate', async (req, res) => {
    try {
        // const nowBody = req.body;

        const mongoData = await accountsConnection
            .find({
                $and: [{ date: { $gte: moment(req.params.startDate).startOf('day') } }, { date: { $lte: moment(req.params.endDate).endOf('day') } }],
            })
            .populate('newMemberId', { name: 1, contact: 1 });
        // const responseData = [];

        // const monthName = moment().month('november');

        // console.log(monthName);
        // const prepareData = [
        //     { startDate: moment().month('november').startOf('month'), endDate: moment().month('november').endOf('month'), monthName: 'november' },
        //     { startDate: moment([2022, 12 - 1]).startOf('month'), endDate: moment([2022, 12 - 1]).endOf('month'), monthName: 'december' },
        //     { startDate: moment([2023, 1 - 1]).startOf('month'), endDate: moment([2023, 1 - 1]).endOf('month'), monthName: 'january' },
        //     { startDate: moment([2023, 2 - 1]).startOf('month'), endDate: moment([2023, 2 - 1]).endOf('month'), monthName: 'february' },
        // ];

        // const inputLength = prepareData.length;
        // const allPaymentRecord = await accountsConnection
        //     .find({
        //         $and: [{ date: { $gte: prepareData[0].startDate } }, { date: { $lte: prepareData[prepareData.length - 1].endDate } }],
        //     })
        //     .populate('newMemberId', { name: 1, contact: 1 });

        // for (let i = 0; i < inputLength; i++) {
        //     const nowData = allPaymentRecord.filter(
        //         (singleRecord) => moment(singleRecord.date) >= prepareData[i].startDate && moment(singleRecord.date) <= prepareData[i].endDate,
        //     );
        //     const recordLength = nowData.length;
        //     let totalDebit = 0;
        //     let totalCredit = 0;

        //     for (let loopCount = 0; loopCount < recordLength; loopCount++) {
        //         if (nowData[loopCount].entryType === 'debit') {
        //             totalDebit += nowData[loopCount].amount || 0;
        //         } else {
        //             totalCredit += nowData[loopCount].amount || 0;
        //         }
        //     }

        //     const prepareResponse: any = {};

        //     prepareResponse[prepareData[i].monthName] = { totalDebit, totalCredit, allData: nowData };
        //     responseData.push(prepareResponse);
        // }

        res.send({ message: 'all reports', data: mongoData });
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});
reports.get('/birthday', async (req, res) => {
    try {
        const mongoData = await newMemberConnection.find({
            $expr: {
                $and: [
                    { $eq: [{ $dayOfMonth: '$dateOfBirth' }, { $dayOfMonth: new Date() }] },
                    { $eq: [{ $month: '$dateOfBirth' }, { $month: new Date() }] },
                ],
            },
        });

        res.send({ message: 'all reports', data: mongoData });
        console.log('hello');
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});
reports.get('/anniversary', async (req, res) => {
    try {
        const mongoData = await newMemberConnection.find({
            $expr: {
                $and: [
                    { $eq: [{ $dayOfMonth: '$dateOfAnniversary' }, { $dayOfMonth: new Date() }] },
                    { $eq: [{ $month: '$dateOfAnniversary' }, { $month: new Date() }] },
                ],
            },
        });

        res.send({ message: 'all reports', data: mongoData });
        console.log('hello');
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});
reports.get('/newSubscription/:startDate/:endDate', async (req, res) => {
    try {
        const mongoData = await subscriptionConnection.find({
            $and: [
                { createdAt: { $gte: moment(req.params.startDate).startOf('day') } },
                { createdAt: { $lte: moment(req.params.endDate).endOf('day') } },
            ],
        });

        res.send({ message: 'all report', data: mongoData });
        console.log(moment('2022-12-10').endOf('day'));
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});
reports.get('/pendingPayment', async (req, res) => {
    try {
        const memberData = [];

        const mongoData = await newMemberConnection.find({});

        const memberLength = mongoData.length;

        for (let loopCount = 0; loopCount < memberLength; loopCount++) {
            const memberId = mongoData[loopCount]._id;

            const accountsData = await accountsConnection.find({ newMemberId: memberId });

            let debit = 0;
            let credit = 0;

            const accountLength = accountsData.length;

            for (let loopCount2 = 0; loopCount2 < accountLength; loopCount2++) {
                const amount: number = accountsData[loopCount2].amount || 0;

                if (accountsData[loopCount2].entryType === 'debit') {
                    debit += amount;
                } else {
                    credit += amount;
                }
            }
            const pendingPayment = debit - credit;

            if (pendingPayment !== 0) {
                const nowData = JSON.parse(JSON.stringify(mongoData[loopCount]));

                memberData.push({ ...nowData, balance: pendingPayment });
                console.log(pendingPayment, mongoData[loopCount].name);
            }
        }

        res.send({ message: 'all reports', data: memberData });
        console.log('');
        // get all members,for loop all member,get all accounts for each member,sum of n number- dr cr,total dr - total cr != 0
        // membershiptill subsription
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});
reports.get('/activeMembers', async (req, res) => {
    try {
        const memberData = [];

        const mongoData = await newMemberConnection.find({});
        const memberLength = mongoData.length;

        for (let loopCount = 0; loopCount < memberLength; loopCount++) {
            const memberId = mongoData[loopCount]._id;

            const subscriptionData = await subscriptionConnection.find({ newMemberId: memberId });

            const todayDate = moment();

            let isActive = false;
            const subscriptionLength = subscriptionData.length;

            for (let loopCount2 = 0; loopCount2 < subscriptionLength; loopCount2++) {
                const membershipTill = subscriptionData[loopCount2].membershipTill || todayDate;

                if (moment(membershipTill) >= todayDate) {
                    isActive = true;
                }
            }
            if (isActive) {
                const nowData = JSON.parse(JSON.stringify(mongoData[loopCount]));

                memberData.push({ ...nowData });
            }
        }
        res.send({ message: 'all reports', data: memberData });
        console.log('hello');
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});
reports.get('/expiringIn7Days', async (req, res) => {
    try {
        const memberData = [];
        // const nowBody = req.body;

        const mongoData = await newMemberConnection.find({});
        const memberLength = mongoData.length;

        for (let loopCount = 0; loopCount < memberLength; loopCount++) {
            const memberId = mongoData[loopCount]._id;

            const subscriptionData = await subscriptionConnection.find({ newMemberId: memberId });

            const todayDate = moment();
            const sevenDays = moment().add(7, 'days');

            let expiringIn7Days = false;
            const subscriptionLength = subscriptionData.length;

            for (let loopCount2 = 0; loopCount2 < subscriptionLength; loopCount2++) {
                const membershipTill = subscriptionData[loopCount2].membershipTill || todayDate;

                if (moment(membershipTill) >= todayDate && moment(membershipTill) <= sevenDays) {
                    expiringIn7Days = true;
                }
            }
            if (expiringIn7Days) {
                const nowData = JSON.parse(JSON.stringify(mongoData[loopCount]));

                memberData.push({ ...nowData });
            }
        }
        res.send({ message: 'all reports', data: memberData });
        console.log('hello');
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});
reports.get('/expiredMembers', async (req, res) => {
    try {
        const memberData = [];
        // const nowBody = req.body;

        const mongoData = await newMemberConnection.find({});
        const memberLength = mongoData.length;

        for (let loopCount = 0; loopCount < memberLength; loopCount++) {
            const memberId = mongoData[loopCount]._id;

            const subscriptionData = await subscriptionConnection.find({ newMemberId: memberId });

            const todayDate = moment();

            let isActive = false;
            const subscriptionLength = subscriptionData.length;

            for (let loopCount2 = 0; loopCount2 < subscriptionLength; loopCount2++) {
                const membershipTill = subscriptionData[loopCount2].membershipTill || todayDate;

                if (moment(membershipTill) >= todayDate) {
                    isActive = true;
                }
            }
            if (!isActive) {
                const nowData = JSON.parse(JSON.stringify(mongoData[loopCount]));

                memberData.push({ ...nowData });
            }
        }
        res.send({ message: 'all reports', data: memberData });
        console.log('hello');
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});
reports.get('/nonActiveMembers', async (req, res) => {
    try {
        // const nowBody = req.body;

        const mongoData = await subscriptionConnection.find({ amount: { $gte: 4000 } }).populate('newMemberId');

        res.send({ message: 'all reports', data: mongoData });
        console.log('hello');
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});
reports.get('/attendance', async (req, res) => {
    try {
        // const nowBody = req.body;

        const mongoData = await accountsConnection.find({ amount: { $gte: 4000 } }).populate('newMemberId');

        res.send({ message: 'all reports', data: mongoData });
        console.log('hello');
    } catch (error) {
        console.log('save error', error);
        res.status(401).json({ message: error });
    }
});

export default reports;
