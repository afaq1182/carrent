const { VerifyToken } = require("../user/VerifyToken");
const { express, session } = require("../controller");
const { connection } = require("../db/connect");
const router = express.Router();
var tbill = 0;
router.get("/bill", VerifyToken, (req, res) => {
  const { UserID } = require("../user/VerifyToken");
  connection.query(
    `SELECT Bill_pending FROM users WHERE id="${UserID}"`,
    (err, result) => {
      if (err) throw err;
      else {
        res.json("Your Pending Amount is : " + result[0].Bill_pending);
        console.log("Your Pending Amount is : " + result[0].Bill_pending);
        tbill = result[0].Bill_pending;
      }
    }
  );
});
router.post("/pay", VerifyToken, (req, res) => {
  const { UserID } = require("../user/VerifyToken");
  const amount = req.body.amount;
  if (amount == tbill) {
    connection.query(
      `UPDATE users SET Bill_pending=Bill_pending-"${amount}",current_car_id=null WHERE id="${UserID}"`,
      (err, result) => {
        if (err) throw err;
        else {
          //res.json(result);
          console.log(result);
        }
      }
    );
    connection.query(
      `UPDATE car SET booker_id=null,BookingStatus=null WHERE booker_id="${UserID}"`,
      (err, result) => {
        if (err) throw err;
        else {
          res.json(result);
          console.log(result);
        }
      }
    );
  } else {
    res.json("Please Enter the Amount equal to the Total Bill");
  }
});
module.exports = router;
