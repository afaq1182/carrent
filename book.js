const { connection } = require("../db/connect");
const { express } = require("../controller");
const { VerifyToken } = require("../user/VerifyToken");
const { ParseDate, ShowDate } = require("../db/DateFormat");
const router = express.Router();
var CarRent = 0;
router.post("/", VerifyToken, async (req, res) => {
  const { UserID } = require("../user/VerifyToken");
  const car_id = req.body.car_id;
  const days = req.body.days;
  var BookedTill = req.body.BookedTill;
  connection.query(
    `SELECT Rent from car WHERE car_id="${car_id}"`,
    (err, result) => {
      CarRent = days * result[0].Rent;
      console.log(CarRent);
    }
  );
  const date = ParseDate();
  BookedTill = ShowDate(BookedTill);
  connection.query(
    `UPDATE car SET booker_id="${UserID}",BookingStatus=1,BookedFrom="${date}" WHERE car_id="${car_id}" `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("Car Booked...!!!");
        console.log(result);
        console.log("Car Booked...!!!");
        //res.json(result);
      }
      connection.query(
        `UPDATE users SET current_car_id="${car_id}", Bill_pending="${CarRent}" WHERE id="${UserID}" `
      );
    }
  );
});
module.exports = router;
