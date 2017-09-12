require('dotenv').config()

import mongoose from 'mongoose';
var ObjectId = require('mongodb').ObjectId;

var app = require('./server.js');
var logger = require('./util/logger');

var port = process.env.PORT || 3000;

//Route handlers
var postRoutes = require('./routes/posts.js');
var userRoutes = require('./routes/users.js');

logger.err('Error: ', { a:1});
logger.warning('Warn: ', [2,3]);


mongoose.connect(process.env.DB_LINK, {}, function(err) {
    if(err) {
        logger.err('Unable to connect to database: ', err);
        console.log('Unable to connect to database: ',err)
    } else {
          app
            .get('/status', function(req, res) {
              res.send('OK');
            })
            // Post methods
            .use('/posts', postRoutes)
            .use('/users', userRoutes)
            .listen(port);
            console.log('Listening to port ' + port);
  }
})
