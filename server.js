const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const { sequelize } = require("./config/db");
const { Userroute } = require("./routes/userRoute");
const { Venderroute } = require("./routes/venderRoute");
const { Tockenroute } = require("./routes/tockenRoute");
const { Nominationroute } = require("./routes/nominationRoute");
const { Notification } = require("./routes/notificationRoute");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorhandler");
const { authMiddleware } = require("./middleware/auth");


const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use(cors({
    origin:"*"
}));

app.get("/",(req,res)=>{
    res.status(200).json({"Gretting" : "Welcome"})
});

app.post("/roportal/sendSMS", logger , authMiddleware , async(req , res ) => {
    const { MOBILE , IP , STATE} = req.body;
    console.log(req.body)
    try {
      const apiUrl = `https://api.ycea.in/ycea/ycea-api/service/iyc/api/v1.0/sendSMS.php?MOBILE=${MOBILE}&AUTH_KEY=PV0091R&SOURCE=PV&MSG_CODE=3&IP=${IP}&STATE=${STATE}`;

       // Making an Axios POST request
       const response = await axios.post(apiUrl);
       res.status(200).send(response.data);
    } catch (error) {
        res.status(400).send(error.message)
      console.error('Error making request:', error.message);
    }
});


app.use("/roportal/tocken",Tockenroute);
app.use("/roportal/user",Userroute);
app.use("/roportal/vender",Venderroute);
app.use("/roportal/nomination",Nominationroute);
app.use("/roportal/notification" , Notification)


// Handle invalid routes
app.use(logger,(req, res) => {
    res.status(404).send({ error: 'Not found' });
});


app.listen(PORT,async()=>{
    try {

        await sequelize;
        console.log("Data base is connected")
    } catch (error) {
        console.log(error.message);
        console.log("Data base is not connected")
    }
    console.log(`server is running over 4000`)
})