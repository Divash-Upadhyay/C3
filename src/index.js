const express= require("express");

const connect=require("./configs/db");

const userController= require("./controllers/user.controllers")

const app= express();

app.use(express.json());

app.use("/users", userController);
app.use("/books", userController);
app.use("/publications", userController);
app.use("/comments", userController);

app.listen(2348, async () => {
    try{
        await connect();
        console.log("Listening on port 2348");
    }
    catch (e){
        console.log(e.message)
    }
       
    })