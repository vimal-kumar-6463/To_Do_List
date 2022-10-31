const express = require("express");
const ejs = require("ejs");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/taskdb');
const taskSchema = new mongoose.Schema({
    task : String
})


const task = mongoose.model("task",taskSchema);




const app = express();
app.use(bodyParser.urlencoded({extented : true}));
app.use(express.static("static"));
app.set('view-engine','ejs');

app.get("/",(req,res) => {
   
    task.find({},function(err,result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
            res.render("home.ejs",{taskArray : result })
        }
    });
     
})

app.get("/CONTACT",(req1,res1) => {
    res1.render("ac.ejs",{TEXT : "This is contact page"});
})

app.get("/ABOUT",(req2,res2) => {
    res2.render("ac.ejs",{TEXT : "This is about page"});
})

app.post("/",(req3,res3) => {
    task.insertMany([new task({task : req3.body.taskinput})]);
    console.log("task successfully inserted in the itemsArray");
    res3.redirect("/");
})

app.post("/clear",(req4,res4) => {
    task.deleteMany({},(err) => {
        if(err){
            console.log(err);
        } else {
            console.log("items cleared successfully");
        }
    })

    res4.redirect("/")
})



app.listen("3000",() => {
    console.log(" Started Listening on port 3000");
});


