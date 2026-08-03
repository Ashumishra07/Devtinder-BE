const Razorpay = require('razorpay');
const dotenv = require('dotenv');

let razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_SECRET_KEY,
});

module.exports ={razorpayInstance};