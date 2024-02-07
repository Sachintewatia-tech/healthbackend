const express = require("express");
const { connect } = require("./db");
const { patientRoute } = require("./Routes/PatientRoutes");
const { userRoutes } = require("./Routes/UserRoutes");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to EHR app");
});

app.use("/patient",patientRoute);
app.use("/user",userRoutes);

app.listen(process.env.port,async()=>{
    try {
        await connect
        console.log('connected to db');
    } catch (error) {
        console.log(error);
        console.log('error in connected to db');
    }
    console.log(`app run on ${process.env.port} port`);
})