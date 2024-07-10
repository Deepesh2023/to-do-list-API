const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const port = 3000;

mongoose.connect(process.env.MONGODB_URL);
app.listen(port, () => console.log("server started on port 3000"));
