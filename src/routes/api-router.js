const express = require('express'); 
const router = express.Router(); 
const controller = require('../api/controller'); 

router.post('/', controller.getImage);

module.exports = router