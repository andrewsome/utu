require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  PORT = process.env.PORT || 4000,
  app = express(),
  routes = require("./router/routes"),
  mongoose = require("mongoose"),
  db = mongoose.connection,
  url =
    "mongodb+srv://andrew:8wy177640@cluster0.jwodi.mongodb.net/crypto";

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
