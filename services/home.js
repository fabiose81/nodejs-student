var pg = require('pg');
var connect = "postgres://postgres:admin@localhost:5432/postgres";

module.exports.count = function(req, res, callback){
     pg.connect(connect, function(err, client, done){
            if(err){
                callback({status : 500, message : err });
            }else{
                client.query(' SELECT SUM(count_student) AS count_student, SUM (count_subject) AS count_subject '+
                             ' FROM ( '+
                             '          SELECT COUNT(*) AS count_student, 0 AS count_subject FROM student '+
                             '              UNION  '+
                             '          SELECT 0 AS count_student, count(*) AS count_subject FROM subject '+
                             '      ) AS result', function(err, result){
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