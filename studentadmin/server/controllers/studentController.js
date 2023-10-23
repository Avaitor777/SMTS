const student = require('../models/student');
const mongoose = require('mongoose');



/** 
 * GET /
 * Homepage
*/

exports.homepage = async (req, res) => {

    const locals = {
        title: 'SMTS',
        description: 'testing test management system'
    }

    let perPage = 6;
    let page = req.query.page || 1;



    try {
        const students = await student.aggregate([ { $sort: { updateAt: -1} } ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await student.count();

        res.render('index', { 
            locals, 
            students,
            current: page,
            pages: Math.ceil(count / perPage)
        });
             

    } catch (error) {
        console.log(error);
    }

    
}

/** 
 * GET /
 * new student form
*/

exports.addstudent = async (req, res) => {


    


    const locals = {
        title: 'add new user - student(SMTS)',
        description: 'testing test management system'
    }

    res.render('student/add', locals)
}



exports.poststudent = async (req, res) => {
    console.log(req.body);
    
    const newStudent = new student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        dept: req.body.dept
    });


    try {
        await student.create(newStudent);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}



exports.view = async (req, res) => {
    try {
        const studentData = await student.findOne({ _id: req.params.id });

        const locals = {
            title: "viewing student data",
            description: "student management system testing",
        };

        res.render('student/view', {
            locals,
            student: studentData // Pass the student data to the view
        });
    } catch (error) {
        console.log(error);
    }
}

