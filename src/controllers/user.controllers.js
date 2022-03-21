const { body, validationResult } = require("express-validator");

const express = require("express");

const User = require("../models/user_model");
const Book = require("../models/book_model");
const Publication = require("../models/publication_model");
const Comment = require("../models/comment_model");

const {
    upload,
    uploaddp,
} = require("../middlewares/file-upload");

const req = require("express/lib/request");

const router = express.Router();


router.post(
    "",
    body("id")
        .isNumeric()
        .withMessage("invalid id")
        .bail()
        .custom(async (value) => {
            const user = await User.findOne({ id: value });
            if (user) {
                throw new Error("incorrect id");
            }
            return true;
        }),
    body("first_name")
        .isString()
        .isLength({ min: 3, max: 30 }),
    body("last_name")
        .isString()
        .isLength({ min: 3, max: 30 }),
    body("age")
        .isAlphanumeric()
        .custom((value) => {
            if (value > 1 || value < 150) {
                throw new Error("age must be between 1 and 150")
            }
            return true
        }),
    body("email")
        .isString(),
    body("profile_pic")
        .isAlphanumeric(),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let newErrors;
                newErrors = errors.array().map((err) => {
                    return { key: err.param, message: err.msg };
                });
                return res.status(400).send({ errors: newErrors });
            }
            const user = await User.create(req.body);
            return res.send(user);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    }
);


router.post("/dp", uploaddp("profile_pic"), async (req, res) => {
    try {
        const user = await User.create({
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,

            profile_pic: req.file.path,
        });

        return res.send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});


router.get("", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const pagesize = req.query.pagesize || 10;

        const users = await User.find().skip().limit(pagesize).lean().exec();

        const totalPages = Math.ceil(
            (await Product.find().countDocuments()) / pagesize
        );
        return res.send({users, totalpages});
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

module.exports = router;