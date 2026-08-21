const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionrequest.model");
const sendEmail = require("../utility/sendEmail");

cron.schedule("0 30 10 * * *",async () => {
    
    try{
       const yesterday = subDays(new Date(),1);
       const yesterdayStart = startOfDay(yesterday);
       const yesterdayEnd = endOfDay(yesterday);

       const previousRequests = await ConnectionRequestModel.find({
            Status:"Interested",
            createdAt:{
                $gte: yesterdayStart,
                $lte : yesterdayEnd
            }
       }).populate("fromUserId toUserId")

       const listOfEmails = [
        ...new Set(previousRequests.map((req) => req.toUserId.emailId))
       ]
       console.log(listOfEmails);

       for(emails of listOfEmails){
        try{
        const res = await sendEmail.run(
          "New Friend Requests pending for " + emails,
          "Ther eare so many friend requests pending, please login to my-devTinder.in and accept or reject the requests."
        );
        console.log(res);
        }catch(err){
            console.error(err);
        }
       }

    }catch(err){
      console.error(err)
    }


})