module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student', {
        std_name: {
            type: Sequelize.STRING
        },
        std_image: {
            type: Sequelize.STRING
        },
        std_address: {
            type: Sequelize.STRING
        },
       
        std_age: {
            type: Sequelize.STRING
        },
        std_fees: {
            type: Sequelize.STRING
        },
        std_level: {
            type: Sequelize.STRING
        }
        
    })

  
Student.beforeCreate((student, options) => {
    let fees = parseFloat(student.std_fees);
    if (fees >= 45000) {
        student.std_fees = fees * 0.75; 
    } else if (fees >= 25000 && fees < 45000) {
        student.std_fees = fees * 0.90; 
    }
});

return Student;
};