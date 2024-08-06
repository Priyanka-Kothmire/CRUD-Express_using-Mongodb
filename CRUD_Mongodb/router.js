let express = require("express");
let dbPromise = require("./database")
let router = express.Router();
let {ObjectId} =require("mongodb")




router.get("/", async(req,res)=>{

    let db = await dbPromise;
    let coll = db.collection("students");
    let students = await coll.find({}).toArray();
    res.send(students)
})

router.get("/:id", async(req,res)=>{
    let db = await dbPromise;
    let singleStudent = await db.collection("students").findOne({_id:new ObjectId(req.params.id)});
    res.send(singleStudent);
})


router.post("/",async(req,res)=>{
    // console.log(req.body);
    let db = await dbPromise;
    let student = await db.collection("students").insertOne(req.body);
    res.send(student);
})

router.delete("/:id",async(req,res)=>{
    let db = await dbPromise;
    let student = await db.collection("students").deleteOne({_id: new ObjectId(req.params.id)})
    res.send(student);
    // res.send("<h1>Student Deleted Sucessfully</h1>")
})


router.patch("/:id",async(req,res)=>{
    let db = await dbPromise;
    let student = await db.collection("students").updateOne({_id: new ObjectId(req.params.id)},{$set:req.body})
    res.send(student);
    // res.send("<h1>Student Updated Sucessfully</h1>")
})

module.exports =router