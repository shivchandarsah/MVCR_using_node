const db = require("./../../model/index")
const STUDENT = db.Student
const fs = require("fs");
const path = require("path");
const multer = require("multer");

exports.getStudents = (req,res) => {
    res.render("student/index")
}
exports.getAddStudent = (req, res) => {
    res.render("student/add-student");
}



exports.postStudentData = async (req, res) => {
    if (!req.body.title && !req.file.filename) {
        return res.status(400).send("Please Fill the form");
    }

    try {
        const process = await STUDENT.create({
            ...req.body,
            std_image: req.file.filename
        })
        return res.redirect('/all-students')
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error");
    }
}
exports.getAllStudent = async (req, res) => {
    let data = await STUDENT.findAll()
    console.log("This is fina all data la")
    console.log(data)
    res.render('student/view-students', { data })
}


exports.deleteStudent = async (req, res) => {
    let data = await STUDENT.destroy({
        where: {
            id: req.params.id
        }
    })
    

    res.redirect('/all-students')
}

exports.getEditStudent = async (req, res) => {
    let data = await STUDENT.findByPk(req.params.id)
    if (data) {
        res.render('student/edit-student', {
            data: data
        })
    } else {
        res.send("Invalid ID")
    }

}
const upload = multer({ dest: "uploads/" });

// Helper function to handle file uploads
const uploadFile = (req, res, next) => {
    const uploadSingle = upload.single("std_image");
    uploadSingle(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};

exports.updateStudent = async (req, res) => {
    try {
        // Use multer to handle file upload during update
        uploadFile(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            const studentId = req.params.id; // Get student ID from URL
            const profileImage = req.file ? req.file.filename : null; // Get the uploaded file name, if any

            // Prepare updated data (preserving the old image if no new image is uploaded)
            const updatedData = {
                ...req.body,
                std_image: profileImage ? profileImage : req.body.std_image // Preserve old image if no new one
            };

            // If a new image is uploaded, delete the old one
            if (profileImage && req.body.std_image) {
                const oldImagePath = path.join(__dirname, 'uploads', req.body.std_image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }

            // Update the student information in the database
            const result = await STUDENT.update(updatedData, {
                where: {
                    id: studentId
                }
            });

            // If update is successful, redirect to the all-students page
            if (result[0] === 1) {
                res.redirect('/all-students');
            } else {
                res.status(404).send("Student not found");
            }
        });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).send("Failed to update student");
    }
};

exports.postStudentData = async (req, res) => {
    try {
        // Use multer to handle file upload
        uploadFile(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            // Extract the uploaded file name
            const profileImage = req.file ? req.file.filename : null;

            // Create a new student entry with the data from the form
            await STUDENT.create({
                ...req.body,
                std_image: profileImage // Store the file name in the database
            });

            console.log(req.body, profileImage);
            res.redirect("/all-students");
        });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).send("Failed to add student");}
};

exports.addFine = async (req, res) => {
    let id = req.params.id

    let std_data = await STUDENT.findByPk(id)
    console.log(std_data)
    let fine_added_fees = parseFloat(std_data.std_fees) + 100


    let data = await STUDENT.update({ std_fees: fine_added_fees, }, {
        where: {
            id: id,
        },
    })

    res.redirect('/all-students')
}
 exports.reduceFine = async (req, res) => {
    let id = req.params.id


    let set_data = await STUDENT.findByPk(id)
    console.log(set_data)
    let fine_reduced_fees = parseFloat(set_data.std_fees) - 500


    let data = await STUDENT.update({ std_fees: fine_reduced_fees, }, {
        where: {
            id: id,
        },
    })
    res.redirect('/all-students')
}

