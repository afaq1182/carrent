const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "carrent",
  stringifyObjects: true,
});
connection.connect((err) => {
  if (err) console.log(err);
  else {
    console.log("Connected....!!!!");
    //module.exports = connection;
  }
});
module.exports = { connection };
