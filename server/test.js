//updateTask: /api/employees/:empId/tasks.

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
            console.log(taskItem);
            console.log(taskItem.status);
            const newStatus = taskItem.status === "todo" ? "done" : "todo";
            console.log(newStatus);

            employee.updateOne(
              { "tasks._id": taskIndex },
              {
                $set: {
                  "tasks.$.status":newStatus,
                },
              },
              function (err, updatedTask) {
                if (err) {
                  console.log(err);
                  res.status(501).send({
                    message: `MongoDB Exception: ${err}`,
                  });
                } else {
                  console.log(updatedTask);

                }
              }
            );

            employee.save(function (err, updatedEmployee) {
              if (err) {
                console.log(err);
                res.status(501).send({
                  message: `MongoDB Exception: ${err}`,
                });
              } else {
                console.log(updatedEmployee);
                res.json(updatedEmployee);
              }
            });
          }
          //
        }
        //
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

//////////////////




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
        console.log(taskItem);
        console.log(taskItem.status);
        const newStatus = taskItem.status === "todo" ? "done" : "todo";
        console.log(newStatus);

        Employee.updateOne(
          { _id : employeeId, "tasks._id": taskIndex },
          {
            $set: {
              "tasks.$.status":newStatus,
            },
          },
          function (err, updatedTask) {
            if (err) {
              console.log(err);
              res.status(501).send({
                message: `MongoDB Exception 111: ${err}`,
              });
            } else {
              console.log(updatedTask);

            }
          }
        );

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            res.status(501).send({
              message: `MongoDB Exception 222: ${err}`,
            });
          } else {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        });
      }
      //
    }
    //
  }
});
} catch (e) {
console.log(e);
res.status(500).send({
  message: `Server Exception: ${e.message}`,
});
}
});



//////////////////CORRECT!!!!!


app.put("/api/employees/:empId/tasks/:taskId", async (req, res) => {
  try {
    const employeeId = req.params.empId;
    const taskIndex = req.params.taskId;
    let newStatus;


    await Employee.findOne({ empId: employeeId }, function (err, employee) {
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
            console.log(taskItem);
            console.log(taskItem.status);
            newStatus = taskItem.status === "todo" ? "done" : "todo";
            console.log(newStatus);

          }
        }
      }
    });

    await Employee.updateOne(
      { empId: employeeId, "tasks._id": taskIndex },
      {
        $set: {
          "tasks.$.status": newStatus,
        },
      },
      function (err, updatedTask) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception 111: ${err}`,
          });
        } else {


          console.log(updatedTask);
          res.json(updatedTask);

          console.log('result' + newStatus);

          //console.log(Employee.findOne({ empId: employeeId }));
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
