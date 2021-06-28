const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
//const config = require("config");
const session = require("express-session");
const app = express();
var currentdate = moment().format("DD-MM-YYYY");
console.log(currentdate);
module.exports = {
  app: app,
  // router: router,
  nodemailer: nodemailer,
  bcrypt: bcrypt,
  jwt: jwt,
  express: express,
  moment: moment,
  helmet: helmet,
};
