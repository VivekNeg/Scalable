const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
// const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const connectDB = require("./config/connectDB");
const authRoute = require("./routes/userRoute");
const videoRoute = require("./routes/videoRoute");
const commentRoute = require("./routes/commentRoute");
const Comment = require("./models/Comment");
const Video = require("./models/Video");
const User = require("./models/User");
// User Middlewares
app.use(cors());
app.use(express.json());
connectDB();
colors.enable();

app.get("/", async (req, res) => {
  res.send(
    "<h2 style='color:green;box-sizing:border-box; margin:0; background: #f3f3f9; height: 95vh;'>Server is Running!<h2>"
  );
});
// --------------------
// ---------------
// ----------
// -----
// Routes
app.use("/api/v1/user", authRoute);
app.use("/api/v1", videoRoute);
app.use("/api/v1", commentRoute);
// -----
// ----------
// ---------------
// --------------------
// Not Found Or 404 error Page

// Handle Error
// -----
// ----------
// ---------------
// -------------------

// Listen Application
mongoose.connection.once("open", () => {
  console.log(
    colors.green.underline(`📗Connected`),
    colors.yellow.underline("to Server!")
  );
  app.listen(PORT, () => console.log(`Server running in port no : ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(colors.red("📕", err));
});
