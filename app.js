'use strict';

const express    = require('express');        
const app        = express();                
const bodyParser = require('body-parser');
const logger 	   = require('morgan');
const router 	   = express.Router();
const port 	   = process.env.PORT || 3000;

app.use(bodyParser.json());

require('./routes')(router);
app.use('/duckchat', router);

app.listen(port);

console.log(`App Runs on ${port}`);