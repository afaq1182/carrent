const { connection } = require("../db/connect");
const { express, bcrypt } = require("../controller");
const router = express.Router();

//console.log(require("../controller"));
//Create User
router.post("/", async (req, res) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const email = req.body.email;
  const password = req.body.password;
  const Admin = 0;
  const hashed = await bcrypt.hash(password, 11);
  connection.query(
    // `INSERT INTO users(FirstName,LastName,email,password,Admin)values(:FirstName,:LastName,:email,:password,:Admin),
    // {FirstName:FirstName,LastName:LastName,email:email,password:hashed,Admin:Admin}`,
    `INSERT INTO users(FirstName,LastName,email,password,Admin)VALUES("${FirstName}","${LastName}","${email}","${hashed}","${Admin}")`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result[0]);
        res.json("User Registered...!!");
      }
    }
  );
});
module.exports = router;
