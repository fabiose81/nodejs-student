module.exports = function(app){

    var subjectService = require('../services/subject');
    var studentService = require('../services/student');
    var subjects = [];
    var subjectDetail = undefined;
    var students = [];
  

    var SubjectController = {
        index : function(req, res){
            var callback = function(data) {
                subjects = data;
                res.render('subject/index',
                            {
                                subjectController : {
                                    getAll : subjects,
                                    add : undefined
                                }
                            });
                };
                subjectService.getAll(req, res, callback);
        },

        add : function(req, res){
            var callback = function(data) {
               subjects.message.push(data.message);
               res.render('subject/index',
                         {
                            subjectController : {
                                getAll : subjects,
                                add : data
                            }
                         });
            };
            subjectService.add(req, res, callback);
        },

        detail : function(req, res){      
            var callback = function(data) {
                students = data;
            
                subjectDetail = {
                                  status : 0,
                                  message : {
                                            id : req.params.id,
                                            name : req.params.name
                                        }
                                };

                  res.render('subject/detail',
                                { 
                                    subjectController : {
                                            update : subjectDetail,
                                            students : students
                                        }
                                    });
                    }

             subjectService.getStudents(req, res, callback);  
        },

        subject_student_associate : function(req, res){
            var _subject = req.params.subject;
            var _student = req.params.student;
            
            var callback = function(data) {

                students.message.forEach(function(student){
                    if(student.id_student == _student)
                        student.student_associated = true;  
                });

                    res.render('subject/detail',
                                {
                                    subjectController : {
                                        update : subjectDetail,
                                        students : students                                 
                                    }
                                });
                        
                };

                subjectService.associate(_student, _subject, callback);  
        },
        
         subject_student_desassociate : function(req, res){
            var _subject = req.params.subject;
            var _student = req.params.student;
            
            var callback = function(data) {

                students.message.forEach(function(student){
                    if(student.id_student == _student)
                        student.student_associated = false;  
                });

                    res.render('subject/detail',
                                {
                                    subjectController : {
                                        update : subjectDetail,
                                        students : students                                 
                                    }
                                });
                        
                };

                subjectService.desassociate(_student, _subject, callback);  
        },

         update : function(req, res){
            var callback = function(data) {
               subjectDetail = data;
               res.render('subject/detail',
                         {
                            subjectController : {
                                update : subjectDetail,                                
                                students : students     
                            }
                         });
            };
            subjectService.update(req, res, callback);
        },

         remove : function(req, res){
            var callback = function(data) {
                var index = 0;
                subjects.message.forEach(function(subject){
                    if(subject.id == data.message.id){
                        subjects.message.splice(index,index);
                    }
                    index++;
                });

                res.render('subject/index',
                            {
                                subjectController : {
                                    getAll : subjects,   
                                    add : undefined,
                                }
                            });
            };
            subjectService.remove(req, res, callback);
        }
    };

    return SubjectController;
};