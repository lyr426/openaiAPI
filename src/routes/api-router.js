const express = require('express'); 
const router = express.Router(); 
const controller = require('../api/controller'); 

router.post('/', controller.getImage);
router.post('/translate', controller.getTranslate); 

module.exports = router