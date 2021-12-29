const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const publicRoutes = require("./routes/post");
const bodyParser = require("body-parser");
const path = require("path");
dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, "./images")));
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database connected"))
  .catch((error) => console.log(error));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/post", adminRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/public/post", publicRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running on port", process.env.PORT);
});
