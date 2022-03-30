/*
============================================
; Title:  employee.js
; Author: Professor Krasso
; Date:   3/27/2022
; Modified By: Oksana Kustova
; Description: Employee model
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//task schema
let taskSchema = new Schema({
  header: { type: String },
  body: { type: String },
  status: { type: String },
  dateOfCreation: { type: Date, default: Date.now },
  dateOfDeadline: { type: Date },
  dateOfCompletion: { type: Date },
});

//employee schema
let employeeSchema = new Schema(
  {
    empId: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    email: { type: String },
    tasks: [taskSchema],
  },
  { collection: "employee" }
);

module.exports = mongoose.model("Employee", employeeSchema);
