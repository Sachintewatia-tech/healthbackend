const express = require("express");
const { UserModel } = require("../Models/UserModel");
const userRoutes = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcryt = require("bcrypt");

userRoutes.post("/register",async(req,res)=>{
    const {name,mail,password} = req.body;
        try {
            const hashPassword = await bcryt.hash(password,5);
            const newUser = new UserModel({name,mail,password:hashPassword});
            await newUser.save();
            res.status(200).json({"msg":newUser});
    } catch (error) {
        res.status(400).json({"msg":"Error in register user"});
    }
});

userRoutes.post("/login",async(req,res)=>{
    const {mail,password} = req.body;
        const user = await UserModel.findOne({mail});
        if(!user || !bcryt.compareSync(password,user.password)){
            return res.status(400).json({"msg":"Invalid username or password"});
        }
        const token = jwt.sign({mail:user.mail,password:user.password},process.env.jwt);
        res.json({"token":token});
});

module.exports = {
    userRoutes
}