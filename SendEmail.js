const { nodemailer, bcrypt, jwt } = require("../controller");
var checkhash = null;
var token = null;
async function name() {
  checkhash = await bcrypt.hash("mypass", 10);
  token = jwt.sign({ hash: checkhash }, "jwtprivatekey", {
    expiresIn: 60 * 60,
  });
}
name();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "my email",
    pass: "",
  },
});

function SendEmail() {
  //console.log("afaq hash : " + checkhash);
  // console.log("afaq token : " + token);
  var mailOptions = {
    from: "",
    to: "",
    subject: "Sending Email using Node.js",
    text: "This is a verification Email Please Click on the Given Link to verify Your email",
    html:
      "<h1>Please Click on the following Link to verify your email</h1>" +
      `<a href=http://localhost:3000/verifyemail/result/${token}>CLick On This LINK</a>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports.SendEmail = SendEmail;
