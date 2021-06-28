const { connection } = require("../db/connect");
const { jwt, express } = require("../controller");
const { VerifyToken } = require("../user/VerifyToken");
const router = express.Router();
router.post("/", VerifyToken, (req, res) => {
  const { isAdmin, token } = require("../user/authuser");
  //console.log(isAdmin);
  //console.log(token);
  const name = req.body.name;
  const Manufacturer = req.body.Manufacturer;
  const Model = req.body.Model;
  const Rent = req.body.Rent;
  if (isAdmin == true) {
    connection.query(
      `INSERT INTO car(name,Manufacturer,Model,Rent)VALUES("${name}","${Manufacturer}","${Model}","${Rent}")`,
      (err, result) => {
        if (err) {
          res.json(err);
        } else {
          console.log(result);
          res.json(result);
        }
      }
    );
  } else if (isAdmin == undefined) {
    res.json("The User has no privilages to modify cars..!!!!");
    console.log("The User has no privilages to modify cars..!!!!");
  }
});
module.exports = router;
