const mongoose = require("mongoose");
const schema = mongoose.Schema({
    image:{type:String,required:true},
    name:{type:String,required:true},
    age:{type:Number,required:true},
    address:{type:String,required:true},
    gender:{type:String,required:true}
},{
    versionKey:false
});

const PatientModel = mongoose.model("patient",schema);

module.exports = {
    PatientModel
}