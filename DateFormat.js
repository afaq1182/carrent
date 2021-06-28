const { moment } = require("../controller");
function ParseDate(date) {
  console.log(moment().format("YYYY-MM-DD hh:mm:ss"));
  return moment().format("YYYY-MM-DD hh:mm:ss");
}
function ShowDate(date) {
  console.log(moment(date).format("DD-MM-YYYY hh:mm:ss"));
  return moment(date).format("DD-MM-YYYY hh:mm:ss");
}
module.exports.ParseDate = ParseDate;
module.exports.ShowDate = ShowDate;
