//create a seperate route for user API
const { request, response } = require("express");
const exp = require("express");
const userApp = exp.Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// let users = [];
//body parsing middleware
userApp.use(exp.json());
//create API(request handlers)
//getUsers
userApp.get("/get-users", async (request, response) => {
  //get user collectionObject
  let EmployeeMgtObject = request.app.get("EmployeeMgtObject");
  //find users
  let users = await EmployeeMgtObject.find().toArray();
  //send req
  response.send({ message: "users data", payload: users });
  // response.send({ message: "Users Data", payload: users });
});
//get user by name
userApp.get("/get-user/:username", async (request, response) => {
  let EmployeeMgtObject = request.app.get("EmployeeMgtObject");
  let EmployeeFromUrl = request.params.username;
  //find user
  let userFromDB = await EmployeeMgtObject.findOne({
    username: EmployeeFromUrl,
  });

  if (userFromDB === null) {
    response.send({ message: "User Not found" });
  } else {
    response.send({ message: "User", payload: userFromDB });
  }
});
//create-user
userApp.post("/create-user", async (request, response) => {
  //get user collectionObject
  let EmployeeMgtObject = request.app.get("EmployeeMgtObject");
  //get user obj from client
  let userFromClient = request.body;
  // console.log(userFromClient);
  //search for existing user with given username
  let userFromDB = await EmployeeMgtObject.findOne({
    username: userFromClient.username,
  });
  if (userFromDB !== null) {
    response.send({
      message: "Username has already taken chose another userName",
    });
  } else {
    let hashPassword = await bcryptjs.hash(userFromClient.password, 6);
    userFromClient.password = hashPassword;
    await EmployeeMgtObject.insertOne(userFromClient);
    response.send({ message: "user created" });
  }
  //get user object send by client
  // let userObj = request.body;
  // //push userObj to users
  // try {
  //   users.push(userObj);
  // } catch (err) {
  //   return response.send({ message: "Error", payload: err.message });
  // } // console.log(userObj);
  // response.send({ message: "User Created" });
});
//update-user
userApp.put("/update-user", async (request, response) => {
  //get user collectionObject
  let EmployeeMgtObject = request.app.get("EmployeeMgtObject");
  let modifiedUser = request.body;
  //update
  await EmployeeMgtObject.updateOne(
    { username: modifiedUser.username },
    { $set: { ...modifiedUser } }
  );

  response.send({ message: "User Updated" });
  //get  modified user obj from client
  // let modifidUser = request.body;
  // //update user obj
  // let indexOfUser = users.findIndex((userObj) => userObj.id === modifidUser.id);
  // if (indexOfUser === -1) {
  //   response.end({ message: `No user existed ${modifidUser.id}` });
  // } else {
  //   users.splice(indexOfUser, 1, modifidUser);
  //   response.send({ message: "User Update" });
  // }
});
//remove-user
//here "id " is url parameter
userApp.delete("/remove-user/:id", async (request, response) => {
  //get user collectionObject
  let EmployeeMgtObject = request.app.get("EmployeeMgtObject");
  // let removeProduct = request.body;
  // await EmployeeMgtObject.deleteOne(removeProduct);
  // response.send({ message: "Product Deleted" });
  let deleteUser = request.params.id;
  // console.log(typeof deleteUser);
  //Delete
  let userDelete = await EmployeeMgtObject.findOne({
    id: deleteUser,
  });

  console.log(userDelete);
  if (userDelete === null) {
    response.send({
      message: "Cannot deleted",
    });
  } else {
    await EmployeeMgtObject.deleteOne(userDelete);
    response.send({ message: "User Deleted" });
  }

  // get id of user from url param
  // let userIdToRemove = +request.params.id;
  // //find index of user id
  // let indexOfUser = users.findIndex((userObj) => userObj.id === userIdToRemove);
  // if (indexOfUser === -1) {
  //   response.send({ message: `No user existed ${userIdToRemove}` });
  // } else {
  //   users.splice(indexOfUser, 1);
  //   response.send({ message: "User Removed" });
  // }
  // response.send({ message: "User Removed" });
});
//userlogin
userApp.post("/login", async (request, response) => {
  //get user collectionObject
  let EmployeeMgtObject = request.app.get("EmployeeMgtObject");
  //get userCreditObj
  let userCredObj = request.body;
  // console.log(userCredObj);
  let userFromDB = await EmployeeMgtObject.findOne({
    username: userCredObj.username,
  });
  //if user not existed
  if (userFromDB == null) {
    response.send({ message: "Invalid username" });
  }
  //if user existed verify password
  else {
    //verify password
    let areEqual = await bcryptjs.compare(
      userCredObj.password,
      userFromDB.password
    );
    //if password not matched
    if (areEqual == false) {
      response.send({ message: "Invalid Password" });
    }
    //if credentials are invalid
    else {
      //create JWI token
      let signedToken = jwt.sign(
        { username: userFromDB.username },
        process.env.SECRET,
        {
          expiresIn: 100,
        }
      );
      //send token in response
      response.send({
        message: "success",
        token: signedToken,
        user: userFromDB,
      });
    }
  }
});
const verifyToken = (request, response, next) => {
  //token verification logic

  //get token from header of request object
  let token = request.headers.authorization;
  //if token is not existed
  if (token === undefined) {
    response.send({ message: "Unauthorized request..." });
  }
  //if token is found
  else {
    //verify token
    try {
      jwt.verify(token, process.env.SECRET);
      next();
    } catch {
      response.send({ messsage: "Session Expired Please login to continue" });
    }
  }
};
//private route
userApp.get("/private-route", verifyToken, (request, response) => {
  response.send({ message: "This is private info" });
});
//export userApp
module.exports = userApp;
