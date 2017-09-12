var express = require('express')
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var User = require('../models/users');
var Logger = require('le_node');

var errorLog = new Logger({
  token:process.env.ERRORLOGS_TOKEN
});
var log = new Logger({
  token:process.env.LOGENTRIES_TOKEN
});
router.post('/', function(req, res){
        var newUser = new User(req.body);
        newUser.save(function(err, user) {
          if(err) {
            errorLog.error('Unable to save user.')
            res.json({
               'status': 'fail',
               'message': 'Unable to save user'
             });
          } else {
            log.log('New user has signed up: ' + user.name);
            res.json({
               status: 'ok',
               data: user
             });
          }
        })
      })
      .get('/', function(req, res) {
        var limit = req.query.qty || 5;
        var query = User.find().limit(limit).exec(function(err, users) {
          if(err) {
            res.json({
             'status': 'fail',
             'message': 'Unable to show users'
            });
          } else {
            res.json({
             status: 'ok',
             data: users
            });
          }
        });
      })
      .get('/:userID', function(req, res) {
        User.findOne(ObjectId(req.params.userID)).exec(function(err, user) {
          if(err) {
            res.json({
             'status': 'fail',
             'message': 'Unable to show user'
            });
          } else {
            res.json({
             status: 'ok',
             data: user
            });
          }
        });
      })
      .put('/:userID', function (req, res) {
        var data = req.body;
        User.findById(ObjectId(req.params.userID), function(err, user){
          if(err) {
              res.json({
               'status': 'fail',
               'message': 'Unable to modify user'
              });
            } else {
              for(var prop in data) {
                    for(var userProp in user){
                      if(userProp == prop) {
                          user[userProp] = data[prop];
                          user.save(function(err, updatedUser) {
                            if(err){
                              res.json({'status': 'fail'})
                          } else {
                            log.log('User has been updated');
                            res.json({
                              'status': 'ok',
                               data: updatedUser
                            })
                          }
                          })
                      }
                   }
                }
            }
        });
      })
      .delete('/:userID', function(req, res) {
          User.findByIdAndRemove(req.params.userID, function(err, user) {
            if(err) {
                errorLog.err('Failed to delete user: ', user.name, user.surname);
                res.json({
                 'status': 'fail',
                 'message': 'Unable to delete user'
                });
            } else {
                log.log('User has been deleted')
                res.json({
                 status: 'ok',
                 data: user
                });
            }
          });
        })

module.exports = router;
