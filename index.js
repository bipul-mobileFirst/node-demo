const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/admin");
dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database connected"))
  .catch((error) => console.log(error));

app.use("/api/user", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/post", postRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running on port", process.env.PORT);
});
