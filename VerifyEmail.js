const { jwt, express } = require("../controller");
const { nodemailer, bcrypt } = require("../controller");
const { VerifyToken } = require("../user/VerifyToken");
const { SendEmail } = require("../user/SendEmail");
const router = express.Router();
router.get("/result/:jwt", VerifyToken, async (req, res) => {
  const check = req.params.jwt;
  const bool = jwt.verify(check, "jwtprivatekey");
  console.log(bool);
  const decoded = jwt.decode(check);
  console.log(decoded.hash);
  const checkverify = await bcrypt.compare("mypass", decoded.hash);
  if (checkverify) {
    res.json("Email Verification Status : " + checkverify);
    console.log("Email Verification Status : " + checkverify);
  } else {
    res.json("Wrong Token or Token may have expired..!!!");
    console.log("Wrong Token or Token may have expired..!!!");
  }
});
router.post("/email", VerifyToken, async (req, res) => {
  res.json("sending email");
  SendEmail();
});
module.exports = router;
