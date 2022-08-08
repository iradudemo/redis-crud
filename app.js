var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config/config");
var appDao = require("./controller/controller");
var app = express();

var resp = function (res, data, code, next) {
  res.status(code).json(data);
  return next();
};

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(5000);

console.log("Application is listening on port ", 5000);

app.post("/user/add", function (req, res, next) {
  var body = req.body;

  appDao.add_user(body, function (response, code) {
    resp(res, response, code, next);
  });
});
// to be work on
// app.get("/user", function (req, res, next) {
//   appDao.get_user(function (response, code) {
//     resp(res, response, code, next);
//   });
// });
app.get("/user/:id", function (req, res, next) {
  var param = req.params;

  appDao.get_userId(param, function (response, code) {
    resp(res, response, code, next);
  });
});
app.put("/user/:id", function (req, res, next) {
  var id = req.params.id;
  var param = req.body;

  appDao.update_user(id, param, function (response, code) {
    resp(res, response, code, next);
  });
});
app.delete("/user/:id", function (req, res, next) {
  var param = req.params;

  appDao.delete_user(param, function (response, code) {
    resp(res, response, code, next);
  });
});
