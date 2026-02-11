const express = require("express");
const authRoute = require("./routes/auth.route");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }),
);

app.use(express.json());

app.use("/auth", authRoute);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
