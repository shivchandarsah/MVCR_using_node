const db = require("./../../model/index")
const STUDENT = db.Student

exports.getStudents = (req,res) => {
    res.render("student/index")
}
exports.getAddStudent = (req, res) => {
    res.render("student/add-student");
}

exports.postStudentData = async (req, res) => {
    
        const process = await STUDENT.create({ ...req.body });
       
         res.redirect("/all-students"); 
    
};


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

exports.updateStudent = async (req, res) => {
    let data = await STUDENT.update({ ...req.body, }, {
        where: {
            id: req.params.ramey,
        },
    })
    res.redirect('/all-students')
}


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

