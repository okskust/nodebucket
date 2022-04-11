/*
============================================
; Title: app.js
; Author: Professor Krasso
; Date: 3/27/2022
; Modified By: Oksana Kustova
; Description: Project Setup
;===========================================
*/

/**
 * Require statements
 */
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Employee = require("./models/employee");

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

/**
 * Variables
 */
const port = 3000; // server port

//database connection string
const conn =
  "mongodb+srv://web420_user:8521@web420db.e6qrv.mongodb.net/nodebucket?retryWrites=true&w=majority";

/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

/**
 * API(s) go here...
 */

//FindEmployeeById
app.get("/api/employees/:empId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

//findAllTasks: /api/employees/:empId/tasks
app.get("/api/employees/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne(
      { empId: req.params.empId },
      "empId tasks",
      function (err, employee) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          if (employee.tasks.length === 0) {
            let response =
              employee.firstName +
              " " +
              employee.lastName +
              " doesn't have any tasks.";
            console.log(response);
            res.send(response);
          } else {
            console.log(employee.tasks);
            res.json(employee.tasks);
          }
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

//createTask: /api/employees/:empId/tasks

app.post("/api/employees/:empId/tasks", async (req, res) => {
  try {
    const employeeId = req.params.empId;

    Employee.findOne({ empId: employeeId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(employee);

        const newTask = {
          header: req.body.header,
          body: req.body.body ? req.body.body : "",
          status: "todo",
          dateOfCreation: new Date(),
          dateOfDeadline: req.body.dateOfDeadline
            ? req.body.dateOfDeadline
            : null,
          dateOfCompletion: null,
        };
        employee.tasks.push(newTask);

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            res.json(updatedEmployee);
          } else {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

//updateTask: /api/employees/:empId/tasks/:taskId.

app.put("/api/employees/:empId/tasks/:taskId", async (req, res) => {
  try {
    const employeeId = req.params.empId;
    const taskIndex = req.params.taskId;

    Employee.findOne({ empId: employeeId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        if (!employee) {
          console.log(err);
          res.status(401).send({
            message: `Invalid employeeId: ${err}`,
          });
        } else {
          console.log(employee);

          const taskItem = employee.tasks.find(
            (item) => item._id.toString() === taskIndex
          );
          if (!taskItem) {
            console.log(err);
            res.status(401).send({
              message: `Invalid taskId: ${err}`,
            });
          } else {
            employee.tasks.id(taskItem._id).status =
              employee.tasks.id(taskItem._id).status === "todo"
                ? "done"
                : "todo";
            employee.tasks.id(taskItem._id).dateOfCompletion =
              !employee.tasks.id(taskItem._id).dateOfCompletion
                ? new Date()
                : null;

            employee.save(function (err, updatedEmployee) {
              if (err) {
                console.log(err);
                res.status(500).send({
                  message: `MongoDB Exception: ${err}`,
                });
              } else {
                console.log(updatedEmployee);
                res.json(updatedEmployee);
              }
            });
          }
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

//reorderTask: /api/employees/:empId/tasks.

app.put("/api/employees/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        if (!employee) {
          console.log(err);
          res.status(401).send({
            message: `Invalid employeeId: ${err}`,
          });
        } else {
          console.log("THERE " + employee);
          console.log("THERE " + req.body.tasks);
          employee.set({
            tasks: req.body.tasks,
          });
          employee.save(function (err, updatedEmployee) {
            if (err) {
              console.log(err);
              res.status(500).send({
                message: `MongoDB Exception: ${err}`,
              });
            } else {
              console.log(updatedEmployee);
              res.json(updatedEmployee);
            }
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

//deleteTask: /api/employees/:empId/tasks/:taskId.

app.delete("/api/employees/:empId/tasks/:taskId", async (req, res) => {
  try {
    const employeeId = req.params.empId;
    const taskIndex = req.params.taskId;

    Employee.findOne({ empId: employeeId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        if (!employee) {
          console.log(err);
          res.status(401).send({
            message: `Invalid employeeId: ${err}`,
          });
        } else {
          console.log(employee);

          const taskItem = employee.tasks.find(
            (item) => item._id.toString() === taskIndex
          );
          if (!taskItem) {
            console.log(err);
            res.status(401).send({
              message: `Invalid taskId: ${err}`,
            });
          } else {
            employee.tasks.id(taskItem._id).remove();
            employee.save(function (err, updatedEmployee) {
              if (err) {
                res.status(501).send({
                  message: `MongoDB Exception: ${err}`,
                });
              } else {
                console.log(updatedEmployee);
                res.json(updatedEmployee);
              }
            });
          }
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
