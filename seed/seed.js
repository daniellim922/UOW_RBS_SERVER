const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://localhost:27017/UOW_RBS");

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const Staff = require("../app/api/user/staff.model");
const Student = require("../app/api/user/student.model");

const staffs = require("./staffs");
const students = require("./students");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/staff", async (req, res) => {
    await Staff.deleteMany();
    for (let i = 0; i < staffs.length; i++) {
        const newStaff = new Staff({
            staff_details: {
                username: staffs[i].username,
                password: staffs[i].password,
                contact_number: staffs[i].contact_number,
                email_address: staffs[i].email_address,
                staff: staffs[i].staff,
            },
        });
        await newStaff.save();
    }
    res.send("Saved!");
});

app.get("/student", async (req, res) => {
    await Student.deleteMany();
    for (let i = 0; i < staffs.length; i++) {
        const newStudent = new Student({
            student_details: {
                username: students[i].username,
                password: students[i].password,
                contact_number: students[i].contact_number,
                email_address: students[i].email_address,
                student: students[i].staff,
            },
        });
        await newStudent.save();
    }
    res.send("Saved!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
