const mongoose = require("mongoose");
const bookModel = new mongoose.Schema({
    likes: { type: Number, min: 0 },
    coverImage: { type: String, required: true, max: 1 },
    content: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    publicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "publication",
        required: true,
    },
},

    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model("book", bookModel);







