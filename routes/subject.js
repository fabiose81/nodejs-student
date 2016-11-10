module.exports = function(app){
    var subject = app.controllers.subject;
    app.get('/subject', subject.index);
    app.get('/subject-detail/:id/:name', subject.detail);
    app.get('/subject-remove/:id', subject.remove);
    app.get('/subject-student-associate/:student/:subject',subject.subject_student_associate);
    app.get('/subject-student-desassociate/:student/:subject',subject.subject_student_desassociate);
    app.post('/subject-add', subject.add);
    app.post('/subject-update', subject.update);
};