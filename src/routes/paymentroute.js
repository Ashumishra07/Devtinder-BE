const express = require('express');
const { userMiddleware } = require('../middlewares/auth.middleware');
const {razorpayInstance} = require('../utility/payment');
const Payment = require('../models/payment.model');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();
const { membershipAmount } = require('../utility/constant');

const paymentRouter = express.Router();

paymentRouter.post('/payment/create', userMiddleware , async (req,res) =>{
        try{
            const { membershipType } = req.body;
            const { firstName, lastName, emailId } = req.user;
            const order = await razorpayInstance.orders.create({
                amount: membershipAmount[membershipType] * 100,
                currency: 'INR',
                receipt: 'receipt#1',
                notes: {
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    emailId: req.user.emailId,
                    membershipType: membershipType,
                },

            });
            // Save to Database
            const payment = new Payment({
                userId: req.user._id,
                status:order.status,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt,
                orderId: order.id,
                notes: {
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    emailId: req.user.emailId,
                    membershipType: membershipType,
                },
            });

            const savePayment = await payment.save();
            res.status(200).json({...savePayment.toJSON(),keyId: process.env.RAZORPAY_API_KEY
            });

        }catch(err){
            console.error('Error creating order:', err);
            res.status(500).json({ error: 'Failed to create order' });
        }

});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );
    if (!isWebhookValid) {
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    // update payment status in database
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    // Update the user as premium
    const user = await User.findById({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    // return a response to success webhook
    return res.status(200).json({ message: "Webhook received successfully" });
  } catch (err) {
    console.error("Error in payment webhook:", err);
    res.status(500).json({ error: "Failed to process webhook" });
  }
});

module.exports = paymentRouter;