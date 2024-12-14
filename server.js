// /** Server startup for Message.ly. */


// const app = require("./app");


// app.listen(3000, function () {
//   console.log("Listening on 3000");
// });

///////////////////////////////////////////////

// RUN THIS FILE TO START THE SERVER, NOT APP.JS!
const app = require('./app');
const db_client = require("./connection");

app.listen(3000, function () {
  console.log("Server started on 3000");
});

db_client.connect();