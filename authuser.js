const { bcrypt, express, jwt } = require("../controller");
const { connection } = require("../db/connect");
const session = require("express-session");
//const router = express.Router();
const router = express.Router();
var vrs = null;
var lrs = 1;
// const cookie = app.use(
//   session({
//     secret: "mysecret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 600000, sameSite: "strict" },
//   })
// );
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var isAdmin = false;
  connection.query(
    `Select id,password,Admin FROM users where email="${email}"`,
    async (err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        const check = await bcrypt.compare(password, result[0].password);
        if (check == true) {
          const gentoken = jwt.sign({ id: result[0].id }, "jwtprivatekey", {
            expiresIn: 60 * 60,
          });
          res.json("Correct...!!!!!");
          module.exports.token = gentoken;
          module.exports.UserID = result[0].id;
          //console.log(this.UserID);
          if (result[0].Admin == 1) {
            isAdmin = 1;
            module.exports.isAdmin = isAdmin;
          }
        } else {
          res.json("Wrong..!!!!!!!");
          //console.log(req.sessionID);
        }
      }
    }
  );
});
router.get("/logout", (req, res) => {
  //req.session.destroy();
  console.log(req.sessionID);
  res.json("session destroyed....!!!!");
  console.log("session destroyed...!!!");
  vrs = null;
  lrs = null;
  module.exports.lrs = lrs;
});
//module.exports.express = express;
module.exports.lrs = lrs;
module.exports = router;
module.exports.session = session;
