const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')

/*
 * student routers
*/

router.get('/', studentController.homepage);

router.get('/add', studentController.addstudent);
router.post('/add', studentController.poststudent);
router.get('/view/:id', studentController.view);


module.exports = router;