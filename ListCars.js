const { VerifyToken, UserID } = require("../user/VerifyToken");
const { express, jwt } = require("../controller");
const { connection } = require("../db/connect");
const { json } = require("express");
//const { UserID } = require("../user/authuser");
const router = express.Router();
//console.log(UserID);
router.get("/", VerifyToken, (req, res) => {
  const { token } = require("../user/authuser");
  //const check = jwt.verify(token, "jwtprivatekey");
  //if (check) {
  connection.query(
    `SELECT car_id,name,Manufacturer,Model,rent,BookingStatus FROM car`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        var i = 0;
        //  res.json(result);
        while (result[i] != null) {
          //console.log(result[i].BookingStatus);

          if (result[i].BookingStatus == true) {
            i++;
          } else {
            res.write(JSON.stringify(result[i]));
            res.write("\n");
            console.log(result[i]);
            i++;
          }
        }
        res.end();
      }
    }
  );
  // }
});
module.exports = router;
