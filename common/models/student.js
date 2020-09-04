'use strict';

module.exports = function (Student) {
    console.log("Creating Function")
    Student.grade = function (id, callback) {
        Student.findById(id, function (err, stud) {
            let total = stud.mark;
             let lg = "";
             if (total > 85) {
               lg = "A";
             } else if (total > 65) {
               lg = "B";
             } else if (total > 45) {
               lg = "C";
             } else if (total > 45) {
               lg = "D";
             } else {
               lg = "F";
             }
            stud.save();
             callback(null, lg);
        });
       
    }
     console.log("========Creating remote method")
        Student.remoteMethod('grade', {
            accepts: { arg: "id", type: "string" },
            returns: { arg: "Grade:", type: "string" },
            http: { verb: "get", path: "/grade" },
            description: "converting student total mark to  letter grade"

        })   
    
   
};
