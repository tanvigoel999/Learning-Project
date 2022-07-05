//create express application
// const { response } = require("express");

const exp = require("express");
const app = exp();
const path = require("path");
require("dotenv").config(); //process .env
//connect react build
app.use(exp.static(path.join(__dirname, "./build")));
const mc = require("mongodb").MongoClient;
const db_url = process.env.DATABASE_URL;
//connect with mongodb Atlas
mc.connect(db_url)
  .then((client) => {
    //get database object
    const dbObj = client.db("Employee-Mgt");
    //get userCollection object
    const EmployeeMgtObject = dbObj.collection("userCollection");
    //get userCollection object
    const productCollectionObject = dbObj.collection("productCollection");
    //share user collection object
    app.set("EmployeeMgtObject", EmployeeMgtObject);
    //share product collection object
    app.set("productCollectionObject", productCollectionObject);
    console.log("Connected to be successfully");
  })
  .catch((err) => {
    console.log("error", err);
  });
//import APIs
const userApp = require("./APIs/userAPI");
const productApp = require("./APIs/productAPI");
//to parse body of request object
app.use("/user", userApp);
app.use("/product", productApp);
app.use(exp.json());
//dealing with page refresh
app.use("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./build/index.html"));
});

//handling invalid paths
app.use((request, response, next) => {
  response.send({ message: `path ${request.url} is invalid` });
});

//error handling middleware
app.use((error, request, response, next) => {
  response.send({ message: "Error occurred", reason: `${error.message}` });
});
//create a test middleware
// const testMiddleWare1 = (request, response, next) => {
//   console.log("Middleware executed-1");
//   //send response
//   //response.send({ message: "This reply is from,middleware" });
//   //forward req to next middleware
//   // next();
//   response.send({ message: "Hello" });
// };
// const testMiddleWare2 = (request, response, next) => {
//   console.log("Middleware executed-2");
//   next();
//   //send response
//   //response.send({ message: "This reply is from,middleware" });
//   //forward req to next middleware
// };
// //use middleware each req
// app.use(testMiddleWare1);
// app.use(testMiddleWare2);

//Sample user data

//Product API
const port = process.env.port;
//assign port
app.listen(port, () => console.log(`Server on port ${port}...`));
