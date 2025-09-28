-Create a repository   (DONE)
-Intialize the repository    (done : npm init)
-node_modules,package .json,package-lock.json'    (DONE)
-Install express  (done) 
-Create a server   (done)
-Listen to port 7777     (done)
-Write request handlers for /test /hello   (done)
-Install nodemon and update scripts inside package.json  (done)
-What are dependencies    (DONE)
-What is the use of "-g" while npm install      (Done)  used to save globally in our system l;ocallt like nodemon and typescript.
-Difference between caret and tilde (^,~)in dependcies version .  (DONE)
>3

EPISODE:4
_Intialize git   (DONE)
-.gitignore       (DONE)
-Create a remote repo on github      (DONE)
-Push all code to remote origin      (DONE)
-Play with routes and route extensions ex /hello,/,hello/2,/xyz   (DONE)
-Order of the routes matter a lot                                 (DONE)
-Install postman app and make a workspace/collections test Api call        (DONE)
-Write logic to handle GET,POST,DELETE API calls and test them on postman   (DONE)
_Explore routing and use 0f ?,+,(),* in the rotes name   (not working in code )
-Use of regex in routes /a/ ,/.*fly$/              (not working in code http method)
-Reaad Documentation of express    (done)

EPISODE_5
-Multiple route handlerds -play with the code  (DONE)
-next() (DONE)
-next function and errors along with res.send(If we wrote in first function there in second route handler function) (DONE)
-app.use("/route",rH,[rh2,rh3],rh4,rh5)-multiple hanler and we keep them in array at anywhere for any route handler. (DONE)
-What is middleware?Why do we need it? (DONE)
-How express Js basically handles requests behind the scenes.
-Difference app.use and app.all
-Write a dummy auth middlewware for admin. (DONE)
-Write adummy auth middleware for all user routes,except /user/login   (DONE)
-Error Handling using app.use("/",(err,req,res,next)={};)

Episode6
-Create a free cluster on mOngodb official website (Mongodb Atlas)
-Install mongoose library
-Connect your application to the Database-url/devtinder
-Call the connectDb function and connectDb to database before starting application on 7777
-Create a userSchema and model
-Create a post /signup API to add data to database
-Push some documents using api calls from postman
-Error Handling using try,catch
