const mongoose = require("mongoose");
const commentModel = new mongoose.Schema({
    body: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true,
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model("comment", commentModel);







