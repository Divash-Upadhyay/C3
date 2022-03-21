const mongoose=require("mongoose");
const userModel= new mongoose.Schema({
    first_name:{type:String, required: true,min:3,max:30},
    last_name:{type:String, required: true,min:3,max:30},
    age:{type:Number, required:true,min:1,max:150},
    email:{type:String, required: true,unique:true},
    profile_img:[{type:String,required:true}],
},
{
    versionKey: false,
    timestamps:true
}
)

module.exports=mongoose.model("user", userModel);







