const mongoose = require("mongoose");
const schema = mongoose.Schema({
    name:{type:String,required:true},
    mail:{type:String,required:true},
    password:{type:String,required:true}
},{
    versionKey:false
});

const UserModel = mongoose.model("user",schema);

module.exports = {
    UserModel
}