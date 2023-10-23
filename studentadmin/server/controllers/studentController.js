const student = require("../models/student");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  const locals = {
    title: "SMTS",
    description: "testing test management system",
  };

  let perPage = 6;
  let page = req.query.page || 1;

  try {
    const students = await student
      .aggregate([{ $sort: { updateAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await student.count();

    res.render("index", {
      locals,
      students,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * new student form
 */

exports.addstudent = async (req, res) => {
  const locals = {
    title: "add new user - student(SMTS)",
    description: "testing test management system",
  };

  res.render("student/add", locals);
};

exports.poststudent = async (req, res) => {
  console.log(req.body);

  const newStudent = new student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    dept: req.body.dept,
  });

  try {
    await student.create(newStudent);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.view = async (req, res) => {
  try {
    const studentData = await student.findOne({ _id: req.params.id });

    const locals = {
      title: "viewing student data",
      description: "student management system testing",
    };

    res.render("student/view", {
      locals,
      student: studentData, // Pass the student data to the view
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * edit student form
 */

exports.edit = async (req, res) => {
  try {
    const studentData = await student.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Student Data",
      description: "Student management system testing",
    };

    res.render("student/edit", {
      locals,
      student: studentData,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * update student form
 */

exports.editpost = async (req, res) => {
  try {
    await student.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      dept: req.body.dept,
      updatedAt: Date.now(),
    });

    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Customer Data
 */
exports.deletestudent = async (req, res) => {
  try {
    await student.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Customer Data
 */
/**
 * Get /
 * Search Customer Data
 */
exports.searchstudent = async (req, res) => {
  const locals = {
    title: "Search student data",
    description: "Student management system testing",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const studentData = await student.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      student: studentData, // Use studentData here instead of student
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
