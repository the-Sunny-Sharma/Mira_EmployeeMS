const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const AdminCredentials = require("./AdminCredentials");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to authenticate admin credentials
app.post("/admin/login", (req, res) => {
  const { id, password } = req.body;

  if (id === AdminCredentials.id && password === AdminCredentials.password) {
    // Credentials match
    res.send("Admin authenticated successfully.");
    console.log("Admin Login Activity detected");
  } else {
    // Invalid credentials
    res.send("Invalid Credentials.");
    console.log("Unauthorized access rejected");
  }
});
//Adding a new employee data
app.post("/addStaff", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("userDetails");
  const record = {
    fName: req.body.fName,
    lName: req.body.lName,
    dob: req.body.dob,
    gender: req.body.gender,
    mail: req.body.mail,
    phone: req.body.phone,
    address: req.body.address,
    empId: req.body.empId,
    department: req.body.department,
    position: req.body.position,
    hireDate: req.body.hireDate,
    salary: req.body.salary,
    bonus: req.body.bonus,
    payMethod: req.body.payMethod,
    managerID: req.body.managerID,
    status: req.body.status,
    emergencyNo: req.body.emergencyNo,
    comment: req.body.comment,
  };
  coll
    .insertOne(record)
    .then((result) => {
      res.send(result);
      console.log(
        req.body.fName +
          " " +
          req.body.lName +
          " added to employee list sucessfully."
      );
    })
    .catch((error) => {
      res.send(error);
    });
});

app.put("/updateStaff", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("userDetails");
  coll
    .updateOne(
      { empId: req.body.empId }, // Search by the employee ID
      { $set: { 
        dob: req.body.dob,
        gender: req.body.gender,
        mail: req.body.mail,
        phone: req.body.phone,
        address: req.body.address,
        department: req.body.department,
        position: req.body.position,
        hireDate: req.body.hireDate,
        salary: req.body.salary,
        bonus: req.body.bonus,
        payMethod: req.body.payMethod,
        managerID: req.body.managerID,
        status: req.body.status,
        emergencyNo: req.body.emergencyNo,
        comment: req.body.comment, } } 
    )
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

//add new leave data request
app.post("/apply-leave", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("leaveManagement");
  const record = {
    empId: req.body.empId,
    name: req.body.name,
    department: req.body.department,
    reason: req.body.reason,
    from: req.body.from,
    to: req.body.to,
    description: req.body.description,
    status: req.body.status,
    appliedOn: req.body.appliedOn,
  };
  coll
    .insertOne(record)
    .then((result) => {
      res.send(result);
      console.log(
        req.body.name + " has applied for leave.\nReason : " + req.body.reason
      );
    })
    .catch((error) => {
      res.send(error);
    });
});

//view the leave data for specific user
app.get("/viewLeave", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("leaveManagement");
  const empId = req.query.empId;
  coll
    .find({ empId })
    .toArray()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("/getStaffData", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("userDetails");
  const department = req.query.departmentNamex;
  coll
    .find({ department })
    .toArray()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/getAllStaff", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("userDetails");
  coll
    .find({}) // Use object shorthand
    .toArray()
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((error) => {
      // console.log(error)
      res.send(error);
    });
});
app.get("/leaveData", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("leaveManagement");
  coll
    .find({}) // Use object shorthand
    .toArray()
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((error) => {
      // console.log(error)
      res.send(error);
    });
});
app.get("/getStaffDetails/:empId", (req, res) => {
  const empId = req.params.empId; // Retrieve empId from URL params
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("userDetails");
  coll
    .findOne({ empId }) // Use object shorthand
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/login/employee", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("userDetails");
  const { empId, password } = req.body;

  coll
    .findOne({ empId })
    .then((result) => {
      if (!result) {
        return res.send({ message: "User not found" });
      }

      const expectedPassword = result.lName + result.fName;

      if (password !== expectedPassword) {
        return res.send({ message: "Invalid credentials" });
      }

      res.send({ message: "Login successful", user: result });
    })
    .catch((err) => {
      res.send({ message: "Invalid credentials" });
    });
});

app.delete("/deleteStaff", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("userDetails");
  const data = { empId: req.body.empId };
  coll
    .deleteOne(data)
    .then((result) => {
      res.send(result);
      console.log(req.body.empId + "'s data deleted from database.");
    })
    .catch((error) => res.send(error));
});

app.post("/addDepartment", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("allDepartment");
  const record = {
    departmentName: req.body.departmentName,
  };
  coll
    .insertOne(record)
    .then((result) => {
      res.send(result);
      console.log(
        req.body.departmentName + " added to department list sucessfully."
      );
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/getDepartments", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("allDepartment");
  coll
    .find({})
    .toArray()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.delete("/deleteDepartment", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("allDepartment");
  const data = { departmentName: req.body.departmentName };
  coll
    .deleteOne(data)
    .then((result) => {
      res.send(result);
      console.log(req.body.departmentName + " removed");
    })
    .catch((error) => res.send(error));
});

app.put("/updateDepartment", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("allDepartment");
  coll
    .updateOne(
      { departmentName: req.body.oldDepartmentName }, // Search by the old department name
      { $set: { departmentName: req.body.newDepartmentName } } // Set the new department name
    )
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

app.put("/updateLeaveStatus", (req, res) => {
  const { empId, appliedOn, status } = req.body;
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("synEmployeeSystem");
  const coll = db.collection("leaveManagement");

  coll
    .updateOne(
      { empId: empId, appliedOn: appliedOn },
      { $set: { status: status } }
    )
    .then((result) => {
      if (status === "Rejected") {
        console.log("Leave Rejected");
      } else {
        console.log("Leave Approved");
      }
      res.send(result);
    })
    .catch((error) => res.send(error));
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
