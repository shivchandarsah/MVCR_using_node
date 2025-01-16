const express = require('express');
const routes =  express.Router();

const multerHelper = require('./../helper/multer-file-helper');
//controller calling
const studentController =  require('./../controller/student/index');
const uploadFile = require('./../helper/multer-file-helper');

routes.get('/add-student', studentController.getAddStudent)
routes.get('/all-students', studentController.getAllStudent)
routes.get('/delete-student/:id', studentController.deleteStudent)
routes.get('/edit-student/:id', studentController.getEditStudent)
routes.get("/add-fine/:id", studentController.addFine)
routes.get("/reduce-fine/:id", studentController.reduceFine)
routes.get('/',studentController.getStudents)

routes.post('/save-student', studentController.postStudentData )
routes.post('/update-student/:id', studentController.updateStudent)
routes.post('/add-student',uploadFile, studentController.getAddStudent)



module.exports = routes;