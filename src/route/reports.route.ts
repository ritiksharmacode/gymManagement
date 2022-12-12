import express from "express";
import subscriptionConnection from "../model/subscription.model";
import accountsConnection from "../model/accounts.model";
import newMemberConnection from "../model/newMember.model";

const reports = express.Router();

reports.get("/paymentRecord", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await accountsConnection
            .find({ amount: { $lte: 5000 } }).populate("newMemberId", { "name": 1, "contact": 1 })
        res.send({ message: "all reports", data: mongoData });
        console.log("hello");
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
reports.get("/newSubscription", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await subscriptionConnection
            .find({
                "$and": [{ createdAt: { $gte: "2022-12-09" } },
                { createdAt: { $lte: "2022-12-10T23:59:59.000+00:00" } }]
            })
        res.send({ message: "all report", data: mongoData });
        console.log("hello");
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/pendingPayment", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await subscriptionConnection
            .find({ balanceAmount: { $gte: 5000 } })
        // for (let loopCount = 0; loopCount < mongoData.length; loopCount++)
        //    = mongoData[loopCount]._id

        res.send({ message: "all reports", data: mongoData });
        console.log("hello");
        //get all members,for loop all member,get all accounts for each member,sum of n number- dr cr,total dr - total cr != 0
    } catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
});
reports.get("/activeMembers", async (req, res) => {
    try {
        const nowBody = req.body;

        const mongoData = await subscriptionConnection
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
reports.get("/expiringIn7Days", async (req, res) => {
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
reports.get("/expiredMembers", async (req, res) => {
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