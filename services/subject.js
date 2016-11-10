var pg = require('pg');
var connect = "postgres://postgres:admin@localhost:5432/postgres";

module.exports.add = function(req, res, callback){
    pg.connect(connect, function(err, client, done){
            if(err){
                callback({status : 500, message : err });
            }else{
                client.query('INSERT INTO subject(name) values($1) RETURNING id',[req.body.name], function(err, result){
                    if(err){
                        callback({status : 500, message : err });
                    }else{
                        done();
                        callback({status : 200, message : {id : result.rows[0].id, name : req.body.name}});
                    }
                });
            }
    });
};

module.exports.update = function(req, res, callback){
       pg.connect(connect, function(err, client, done){
           if(err){
                callback({status : 500, message : err });
            }else{
                client.query('UPDATE subject SET name = $1 WHERE id = $2',[req.body.name , req.body.id], function(err, result){
                    if(err){
                        callback({status : 500, message : err });
                    }else{
                        done();
                        callback({status : 200, message : {id : req.body.id, name : req.body.name}});
                    }
                });
            }
         });
};

module.exports.getAll = function(req, res, callback){
    pg.connect(connect, function(err, client, done){
            if(err){
                callback({status : 500, message : err });
            }else{
                client.query('SELECT * FROM subject', function(err, result){
                    if(err){
                        callback({status : 500, message : err });
                    }else{
                        done();
                        callback({status : 200, message : result.rows});
                    }
                });
            }
    });
};


module.exports.getStudents = function(req, res, callback){
    pg.connect(connect, function(err, client, done){
            if(err){
                console.log(err);
                callback({status : 500, message : err });
            }else{
                client.query('SELECT  s.id AS id_student, s.name AS name_student, result.name_subject AS name_subject, '+
                             '   CASE WHEN (result.id_subject IS NULL) THEN FALSE '+  
                             '   ELSE TRUE '+        
                             '   END AS student_associated '+                   
                             '   FROM student s '+
                             '   LEFT JOIN       '+
                             '        (SELECT ss.id_student, sb.id AS id_subject, sb.name AS name_subject ' +
                             '           FROM student s     '+
                             '           JOIN student_subject ss ON s.id = ss.id_student   '+
                             '           JOIN subject sb ON sb.id = ss.id_subject     '+
                             '           WHERE ss.id_subject = $1) result    '+
                             '   ON result.id_student = s.id',[req.params.id], function(err, result){
                                        if(err){
                                            callback({status : 500, message : err });
                                        }else{
                                            done();
                                            callback({status : 200, message : result.rows});
                                        }
                                    });
            }
    });
};

module.exports.associate = function(student, subject, callback){
    pg.connect(connect, function(err, client, done){
            if(err){
                callback({status : 500, message : err });
            }else{
                client.query('INSERT INTO student_subject(id_student,id_subject) values($1, $2) RETURNING id',[student, subject], function(err, result){
                    if(err){
                        callback({status : 500, message : err });
                    }else{
                        done();
                        callback({status : 200, message : {id : subject, name : undefined}});
                    }
                });
            }
    });
};

module.exports.desassociate = function(student, subject, callback){
    pg.connect(connect, function(err, client, done){
            if(err){
                callback({status : 500, message : err });
            }else{

                console.log('student '+student);
                console.log('subject '+subject);
                client.query('DELETE FROM student_subject WHERE id_student = $1 AND id_subject = $2',[student, subject], function(err, result){
                    if(err){
                        callback({status : 500, message : err });
                    }else{
                        done();
                        callback({status : 200, message : {id : subject, name : undefined}});
                    }
                });
            }
    });
};


module.exports.remove = function(req, res, callback){
      pg.connect(connect, function(err, client, done){
           if(err){
                callback({status : 500, message : err });
            }else{
                client.query('DELETE FROM subject WHERE id = $1',[req.params.id], function(err, result){
                    if(err){
                        callback({status : 500, message : err });
                    }else{
                        done();
                        callback({status : 200, message : {id : req.params.id, name : undefined}});
                    }
                });
            }
         });
};

