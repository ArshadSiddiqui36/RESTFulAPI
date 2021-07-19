const express = require("express");

require("./db/conn");
const Student = require("./models/students");

const studentRouter = require("./routers/student");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter);

app.get("/", (req, res) => {
    res.send("Hello from the other side");
});

// ------------------------------------------

// 1: => Create a new router
// const router = new express.Router();

// 2: => We need to define the router
// router.get("/arsad", (req, res) => {
//     res.send("Hello, What's up guys");
// });

// 3: => We need to register the router
// app.use(router);

// ------------------------------------------

// Create a new students
// Promise...
/*
app.post("/students", (req, res) => {
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
app.post("/students", async(req, res) => {
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);

    }catch(e){
        res.status(400).send(e);
    }
});


// Get/Read the data of registered students
app.get("/students", async(req, res) => {
    try{
       const studentsData = await Student.find();
       res.send(studentsData);
    }catch(e){
        res.status(500).send(e);
    };
});

// Get/Read the individual student data using id
app.get("/students/:id", async(req, res) => {
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
app.patch("/students/:id", async(req, res) => {
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
app.delete("/students/:id", async(req, res) => {
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




app.listen(port, () => {
    console.log(`connection is setup at port ${port}`);
});