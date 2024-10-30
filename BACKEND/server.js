const  express  = require ("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./config/db.js')
// const userModel = require("./models/userModels.js");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/admin",require("./routes/adminRoutes.js"));
app.use("/user", require("./routes/userRoutes.js"));
app.use("/appoint",require("./routes/bookingRoutes.js"))
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
