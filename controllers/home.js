module.exports = function(app){

    var homeService = require('../services/home');

    var HomeController = {
        index : function(req, res){
            var callback = function(data) {
              res.render('home/index',{homeController :data});
            };
            homeService.count(req, res, callback);
        }
    };
    return HomeController;
};