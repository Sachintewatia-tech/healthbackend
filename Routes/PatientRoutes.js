const express = require("express");
const { PatientModel } = require("../Models/PatientModel");
const { authenticateJWT } = require("../Middelware/jwtAuthentication");
const patientRoute = express.Router();

patientRoute.get("/",async(req,res)=>{
    try {
        const ptnt = await PatientModel.find();
        res.status(200).json({"msg":ptnt});
    } catch (error) {
        res.status(400).json({"msg":error});
    }
});

patientRoute.post("/add",authenticateJWT,async(req,res)=>{
    try {
        const newPtnt = new PatientModel(req.body);
        await newPtnt.save();
        res.status(200).json({"msg":newPtnt});
    } catch (error) {
        res.status(400).json({"msg":"Error in posting new Patient"});
    }
});

patientRoute.delete("/delete/:id",authenticateJWT,async(req,res)=>{
    const id = req.params.id;
    try {
        const deletePtnt = await PatientModel.findByIdAndDelete({_id:id});
        res.status(200).json({"msg":"Deleted successfully"});
    } catch (error) {
        res.status(400).json({"msg":"Error in deleting"});
    }
});

patientRoute.patch("/update/:id",authenticateJWT,async(req,res)=>{
    try {
        const updatePtnt = await PatientModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).json({"msg":updatePtnt});
    } catch (error) {
        res.status(400).json({"msg":"error in updating patnt"});
    }
});

module.exports = {
    patientRoute
}