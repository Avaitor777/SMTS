const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student routes
router.get('/', studentController.homepage);
router.get('/add', studentController.addstudent);
router.post('/add', studentController.poststudent);
router.get('/view/:id', studentController.view);


router.get('/edit/:id', studentController.edit);
router.put('/edit/:id', studentController.editpost);
router.delete('/edit/:id', studentController.deletestudent);

router.post('/search', studentController.searchstudent);

module.exports = router;
