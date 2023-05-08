const express =  require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dcConnect");
// const {userRegisterCtrl} = require("./controllers/users/userCtrl");
const userRoutes = require("./route/user/userRoute");
const { errorHandler , notFound} = require("./middleware/error/errorHandler");
const postRoute = require("./route/post/postRoute");
const commentRoutes = require("./route/comments/commentRoute");
const cors = require("cors")
const emailRoutes = require("./route/email/emailRoute");
const categoryRoute = require("./route/category/categoryRoute");

const app =  express();
//db
dbConnect();
// console.log(process.env);

//middleware
app.use(express.json());
//cors
app.use(cors())

//custom middleware
// const logger =(req , res , next)=>{
//     console.log("am a logger");
//     next();
// }
// app.use(logger)


//register
app.use('/api/users',userRoutes)
//post route 
app.use('/api/posts',postRoute)
//comment route
app.use('/api/comments',commentRoutes)
//email route
app.use('/api/email',emailRoutes)
//category route
app.use('/api/category',categoryRoute)
//error handler 
app.use(notFound)
app.use(errorHandler)


//login
// app.post("/api/users/login", (req ,res)=>{
//     res.json({user : "User Login"})
// })
// //fetch all user
// app.get("/api/users", (req , res)=>{
//     res.json({user : "User List"})
// })
// app.delete("/api/users", (req , res)=>{
//     res.json({user : "User List"})
// })
//fetch single user



//server
const PORT = process.env.PORT || 5000 ;

// console.log(app);
// express().post()

// app.listen(5000,console.log(`server is running`));
app.listen(PORT,console.log(`server is running ${PORT}`));

// Wtm2V4Zu8AYaBzu2
//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