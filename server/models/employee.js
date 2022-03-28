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

let employeeSchema = new Schema(
  {
    empId: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    email: { type: String },
  },
  { collection: "employee" }
);

module.exports = mongoose.model("Employee", employeeSchema);
