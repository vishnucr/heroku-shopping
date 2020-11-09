require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./_routes/routes');
const exp = express();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
//Set up default mongoose connection
const mongoDB = `mongodb://127.0.0.1/${process.env.DB_NAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, });

//Get the default connection
const db = mongoose.connection;

// needs to be before router
exp.use(cors());
exp.use(bodyParser.json());
exp.use(bodyParser.urlencoded({ extended: true }));


// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // make sure we go to the next routes and don't stop here
});

exp.get('/', (req, res) => res.send('Root URL Responding, Hello....!!!') )
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
exp.use('/api', router);

// DB Connection--------------------------------------
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => {
    console.log('DB Connected');
    exp.listen(process.env.PORT, ()=> console.log(`serving on port ${process.env.PORT}`))
})
routes(router,db);