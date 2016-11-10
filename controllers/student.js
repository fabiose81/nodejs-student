module.exports = function(app){
   
    var studentService = require('../services/student');
    var subjectService = require('../services/subject');

    var students = [];
    var studentDetail = undefined;
    var subjects = [];
    var StudentController = {
      
        index : function(req, res){
            var callback = function(data) {
                students = data;
                res.render('student/index',
                            {
                                studentController : {
                                    getAll : students,
                                    add : undefined
                                }
                            });
                };
                studentService.getAll(req, res, callback);
        },

        add : function(req, res){
           var callback = function(data) {
               students.message.push(data.message);
               res.render('student/index',
                         {
                            studentController : {
                                getAll : students,
                                add : data
                            }
                         });
            };
            studentService.add(req, res, callback);
        },

        detail : function(req, res){      
            var callback = function(data) {
                subjects = data;
                studentDetail = {
                                  status : 0,
                                  message : {
                                            id : req.params.id,
                                            name : req.params.name
                                        }
                                };

                    res.render('student/detail',
                                { 
                                    studentController : {
                                            update : studentDetail,
                                            subjects : subjects
                                        }
                                    });
                    }

             studentService.getSubjects(req, res, callback);  
        },

        update : function(req, res){
            var callback = function(data) {
               studentDetail = data;
               res.render('student/detail',
                         {
                            studentController : {
                                update : studentDetail,                                
                                subjects : subjects     
                            }
                         });
            };
            studentService.update(req, res, callback);
        },

        remove : function(req, res){
            var callback = function(data) {
                var index = 0;
                
                students.message.forEach(function(student){
                    if(student.id == data.message.id){
                        students.message.splice(index,index);
                    }
                    index++;
                });

                res.render('student/index',
                            {
                                studentController : {
                                    getAll : students,   
                                    add : undefined,
                                }
                            });
            };
            studentService.remove(req, res, callback);
        },

        student_subject_associate : function(req, res){
          var _subject = req.params.subject;
          var _student = req.params.student;
           
          var callback = function(data) {

               subjects.message.forEach(function(subject){
                   if(subject.id_subject == _subject)
                     subject.subject_associated = true;  
               });

                 res.render('student/detail',
                            {
                                studentController : {
                                    update : studentDetail,
                                    subjects : subjects                                 
                                }
                            });
                    
             };

             studentService.associate(_student, _subject, callback);  
        },
        
         student_subject_desassociate : function(req, res){
            var _subject = req.params.subject;
            var _student = req.params.student;
            
            var callback = function(data) {

                 subjects.message.forEach(function(subject){
                   if(subject.id_subject == _subject)
                      subject.subject_associated = false;
                    
               });

               res.render('student/detail',
                                {
                                    studentController : {
                                        update : studentDetail,
                                        subjects : subjects                                 
                                    }
                                });
                        
                };

                studentService.desassociate(_student, _subject, callback);  
        }
    };

    return StudentController;
};
