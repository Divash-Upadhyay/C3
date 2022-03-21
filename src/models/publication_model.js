const mongoose=require("mongoose");
const publicationModel= new mongoose.Schema({
    name:{type:String,required:true}
},
{
    versionKey: false,
    timestamps:true
}
)

module.exports=mongoose.model("publication", publicationModel);







