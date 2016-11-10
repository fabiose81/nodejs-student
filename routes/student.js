module.exports = function(app){
    var student = app.controllers.student;
    app.get('/student', student.index);
    app.get('/student-detail/:id/:name', student.detail);
    app.get('/student-remove/:id', student.remove);
    app.get('/student-subject-associate/:student/:subject',student.student_subject_associate);
    app.get('/student-subject-desassociate/:student/:subject',student.student_subject_desassociate);
    app.post('/student-add', student.add);
    app.post('/student-update', student.update);
};