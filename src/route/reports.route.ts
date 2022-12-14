import express from "express";
import moment from "moment";
import subscriptionConnection from "../model/subscription.model";
import accountsConnection from "../model/accounts.model";
import newMemberConnection from "../model/newMember.model";

const reports = express.Router();

reports.get("/paymentRecord/:startDate/:endDate", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await accountsConnection
            .find({
                "$and": [{ createdAt: { $gte: moment(req.params.startDate).startOf('day') } },
                { createdAt: { $lte: moment(req.params.endDate).endOf('day') } }]
            }).populate("newMemberId", { "name": 1, "contact": 1 })
        res.send({ message: "all reports", data: mongoData });
        console.log();
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/birthday", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await newMemberConnection
            .find({
                "$expr": {
                    "$and": [
                        { "$eq": [{ "$dayOfMonth": "$dateOfBirth" }, { "$dayOfMonth": new Date() }] },
                        { "$eq": [{ "$month": "$dateOfBirth" }, { "$month": new Date() }] }
                    ]
                }
            });
        res.send({ message: "all reports", data: mongoData });
        console.log("hello");
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/anniversary", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await newMemberConnection
            .find({
                "$expr": {
                    "$and": [
                        { "$eq": [{ "$dayOfMonth": "$dateOfAnniversary" }, { "$dayOfMonth": new Date() }] },
                        { "$eq": [{ "$month": "$dateOfAnniversary" }, { "$month": new Date() }] }
                    ]
                }
            });
        res.send({ message: "all reports", data: mongoData });
        console.log("hello");
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/newSubscription/:startDate/:endDate", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await subscriptionConnection
            .find({
                "$and": [{ createdAt: { $gte: moment(req.params.startDate).startOf('day') } },
                { createdAt: { $lte: moment(req.params.endDate).endOf('day') } }]
            })
        res.send({ message: "all report", data: mongoData });
        console.log(moment("2022-12-10").endOf('day'));
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/pendingPayment", async (req, res) => {
    try {
        let memberData = []
        const nowBody = req.body;

        const mongoData = await newMemberConnection
            .find({})

        for (let loopCount = 0; loopCount < mongoData.length; loopCount++) {
            let memberId = mongoData[loopCount]._id


            const accountsData = await accountsConnection
                .find({ newMemberId: memberId })

            let debit = 0;
            let credit = 0;

            for (let loopCount2 = 0; loopCount2 < accountsData.length; loopCount2++) {
                let amount: number = accountsData[loopCount2].amount || 0;

                if (accountsData[loopCount2].entryType == "debit") {
                    debit += amount
                } else {
                    credit += amount
                }
            }
            let pendingPayment = debit - credit
            if (pendingPayment != 0) {
                let nowData = JSON.parse(JSON.stringify(mongoData[loopCount]))
                memberData.push({ ...nowData, balance: pendingPayment })
                console.log(pendingPayment, mongoData[loopCount].name)
            }
        }


        res.send({ message: "all reports", data: memberData });
        console.log("");
        //get all members,for loop all member,get all accounts for each member,sum of n number- dr cr,total dr - total cr != 0
        // membershiptill subsription
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/activeMembers", async (req, res) => {
    try {
        let memberData = []
        const nowBody = req.body;

        const mongoData = await newMemberConnection
            .find({})

        for (let loopCount = 0; loopCount < mongoData.length; loopCount++) {
            let memberId = mongoData[loopCount]._id


            const subscriptionData = await subscriptionConnection
                .find({ newMemberId: memberId })

            const todayDate = moment();

            let isActive = false

            for (let loopCount2 = 0; loopCount2 < subscriptionData.length; loopCount2++) {
                let membershipTill = subscriptionData[loopCount2].membershipTill || todayDate;

                if (moment(membershipTill) >= todayDate) {
                    isActive = true
                }
            }
            if (isActive) {
                let nowData = JSON.parse(JSON.stringify(mongoData[loopCount]))
                memberData.push({ ...nowData, })

            }
        }
        res.send({ message: "all reports", data: memberData });
        console.log("hello");
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/expiringIn7Days", async (req, res) => {
    try {
        let memberData = []
        const nowBody = req.body;

        const mongoData = await newMemberConnection
            .find({})

        for (let loopCount = 0; loopCount < mongoData.length; loopCount++) {
            let memberId = mongoData[loopCount]._id


            const subscriptionData = await subscriptionConnection
                .find({ newMemberId: memberId })

            const todayDate = moment();
            const sevenDays = moment().add(7, 'days');

            let expiringIn7Days = false

            for (let loopCount2 = 0; loopCount2 < subscriptionData.length; loopCount2++) {
                let membershipTill = subscriptionData[loopCount2].membershipTill || todayDate;

                if (moment(membershipTill) >= todayDate && moment(membershipTill) <= sevenDays) {
                    expiringIn7Days = true
                }
            }
            if (expiringIn7Days) {
                let nowData = JSON.parse(JSON.stringify(mongoData[loopCount]))
                memberData.push({ ...nowData, })

            }
        }
        res.send({ message: "all reports", data: memberData });
        console.log("hello");
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/expiredMembers", async (req, res) => {
    try {
        let memberData = []
        const nowBody = req.body;

        const mongoData = await newMemberConnection
            .find({})

        for (let loopCount = 0; loopCount < mongoData.length; loopCount++) {
            let memberId = mongoData[loopCount]._id


            const subscriptionData = await subscriptionConnection
                .find({ newMemberId: memberId })

            const todayDate = moment();

            let isActive = false

            for (let loopCount2 = 0; loopCount2 < subscriptionData.length; loopCount2++) {
                let membershipTill = subscriptionData[loopCount2].membershipTill || todayDate;

                if (moment(membershipTill) >= todayDate) {
                    isActive = true
                }
            }
            if (!isActive) {
                let nowData = JSON.parse(JSON.stringify(mongoData[loopCount]))
                memberData.push({ ...nowData, })

            }
        }
        res.send({ message: "all reports", data: memberData });
        console.log("hello");
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/nonActiveMembers", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await subscriptionConnection
            .find({ amount: { $gte: 4000 } }).populate("newMemberId")
        res.send({ message: "all reports", data: mongoData });
        console.log("hello");
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/attendance", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await accountsConnection
            .find({ amount: { $gte: 4000 } }).populate("newMemberId")
        res.send({ message: "all reports", data: mongoData });
        console.log("hello");
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});

export default reports;