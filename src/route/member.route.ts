import express from 'express';
import subscriptionConnection from '../model/subscription.model';
import accountsConnection from '../model/accounts.model';
const member = express.Router();

member.post('/', async (req, res) => {
    try {
        console.log(req.body);

        const subscriptionData = {
            newMemberId: req.body.newMemberId,
            registrationFee: req.body.registrationFee,
            membershipPackage: req.body.membershipPackage,
            basicPrice: req.body.basicPrice,
            gstPrice: req.body.gstPrice,
            netPrice: req.body.netPrice,
            discount: req.body.discount,
            netPayable: req.body.netPayable,
            membershipFrom: req.body.membershipFrom,
            membershipTill: req.body.membershipTill,
            remarks: req.body.remarks,
        };
        const newSubscription = new subscriptionConnection(subscriptionData);

        await newSubscription.save();

        const accountsDebitData = {
            newMemberId: req.body.newMemberId,
            amount: req.body.netPayable,
            remarks: req.body.remarks,
            entryType: 'debit',
        };
        const newAccountsDebit = new accountsConnection(accountsDebitData);

        await newAccountsDebit.save();

        const accountsCreditData = {
            newMemberId: req.body.newMemberId,
            amount: req.body.paidAmount,
            paymentMethod: req.body.paymentMethod,
            remarks: req.body.remarks,
            entryType: 'credit',
        };
        const newAccountsCredit = new accountsConnection(accountsCreditData);
        const saveData3 = await newAccountsCredit.save();

        res.status(201).json({
            message: 'new subscription saved',
            data: saveData3,
        });
    } catch (error: any) {
        console.log('save error', error);
        res.status(400).json({ message: error.message });
    }
});
export default member;
