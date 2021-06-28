require("./db/connect");
const { express, helmet } = require("./controller");
const RegisterUser = require("./user/createuser");
const AuthenticateUser = require("./user/authuser");
const CreateCar = require("./booking/CreateCar");
const ShowCars = require("./booking/ListCars");
const BookCar = require("./booking/book");
const CheckOut = require("./booking/checkout");
const ParseDate = require("./db/DateFormat");
const VerifyEmail = require("./user/VerifyEmail");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(helmet());
app.use(express.json());
app.use(express.static(__dirname));
app.use("/createuser", RegisterUser);
app.use("/auth", AuthenticateUser);
app.use("/createcar", CreateCar);
app.use("/showcars", ShowCars);
app.use("/bookcar", BookCar);
app.use("/checkout", CheckOut);
app.use("/verifyemail", VerifyEmail);
app.listen(PORT, console.log(`Listening on Port ${PORT}..!!!`));
