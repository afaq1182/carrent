const { jwt } = require("../controller");
function CheckToken(req, res, next) {
  const { token } = require("./authuser");
  const check = jwt.verify(token, "jwtprivatekey");
  const decoded = jwt.decode(token);
  //console.log(decoded.id);
  if (check) {
    const UserID = decoded.id;
    module.exports.UserID = UserID;
    next();
  } else {
    return console.log("Invalid Token...!!!!");
  }
}
module.exports.VerifyToken = CheckToken;
