var express = require('express')
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var log = require('../util/logger');

//Mongoose models
var User = require('../models/users');
var Post = require('../models/posts');


router.post('/', function(req, res) {
           var userId = req.query.userid;

           req.body["userID"] = userId;
           var newPost = new Post(req.body);
           User.findById(userId).exec(function(err, user) {
             if(!user) {
               res.json({
                 'status': 'fail',
                 'message': 'User doesn\'t exist'
               })
             } else {
               newPost.save(function(err, post) {
                 if(err) {
                   res.json({
                     'status': 'fail',
                     'message': 'User doesn\'t exist'
                   })
                 } else {
                   log.log('Succesfully posted: ' + userId);
                   res.json({
                     'status': 'ok',
                      data: post
                   })
                 }
               })
             }
           })
         })
      .get('/', function(req, res) {
          var userId = req.query.userid;
          console.log(userId);
          User.findOne(ObjectId(userId)).exec(function(err, user) {
            if(err) {
              res.json({
               'status': 'fail',
               'message': 'Unable to find user'
              });
            } else {
                Post.find({userID: ObjectId(userId)}, function(err, posts) {
                  if(err) {
                    res.json({
                     'status': 'fail',
                     'message': 'Unable to show posts'
                    });
                } else {
                    res.json({
                      'status': 'ok',
                       data: posts
                      })
                  }
                })
              }
            });
          })
      .put('/', function (req, res) {
            var data = req.body;

            Post.findById(req.query.postid).exec(function(err, post) {
              if(err || post == null) {
                res.json({
                 'status': 'fail',
                 'message': 'Unable to find post'
                });
                return;
              } else {
              if(req.query.userid != post['userID']) {
                res.json({
                 'status': 'fail',
                 'message': 'Unauthorized user'
                });
              } else {
                for(var prop in data) {
                      for(var postProp in post){
                        if(postProp == prop) {
                            post[postProp] = data[prop];
                            post.save(function(err, updatedPost) {
                              if(err){
                                res.json({'status': 'fail'})
                            } else {
                              log.log('Succesfully updated post');
                              res.json({
                                'status': 'ok',
                                 data: updatedPost
                               })
                              }
                            })
                        }
                     }
                  }
                }
              }
            })
          })
      .delete('/', function (req, res) {
            Post.findById(req.query.postid).exec(function(err, post) {
              if(err || post == null) {
                res.json({
                 'status': 'fail',
                 'message': 'Unable to find post'
                });
                return;
              } else {
              if(req.query.userid != post['userID']) {
                res.json({
                 'status': 'fail',
                 'message': 'Unauthorized user'
                });
              } else {
                  post.remove(function(err) {
                    if(err) {
                      res.json({
                       'status': 'fail',
                       'message': 'Unable to find post'
                      });
                    } else {
                      log.log('Succesfully deleted post');
                      res.json({
                        status: 'ok',
                        data: post
                      })
                    }
                  })
                }
              }
            })
          })
module.exports = router;
