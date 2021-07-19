const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

// Router Define
router.get("/arsad", (req, res) => {
    res.send("Hello, What's up guys");
});


// Create a new students
// Promise...
/*
router.post("/students", (req, res) => {
    console.log(req.body);
    const user = new Student(req.body);

    user.save().then( () => {
        res.status(201).send(user);
    }).catch( (e) => {
        res.status(400).send(e);
    });
});
*/

// Async-await...
router.post("/students", async(req, res) => {
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);

    }catch(e){
        res.status(400).send(e);
    }
});


// Get/Read the data of registered students
router.get("/students", async(req, res) => {
    try{
       const studentsData = await Student.find();
       res.send(studentsData);
    }catch(e){
        res.status(500).send(e);
    };
});

// Get/Read the individual student data using id
router.get("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }

    }catch(e){
        res.status(500).send(e);
    };
})


// Update/Patch the student data using id
router.patch("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStudent);
    }catch(e){
        res.status(404).send(e);
    };
});


// Delete the student data using id
router.delete("/students/:id", async(req, res) => {
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    };
});




// Export Router
module.exports = router;
