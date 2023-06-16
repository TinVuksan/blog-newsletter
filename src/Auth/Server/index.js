const express = require("express");
const cors = require("cors");
const app = express();
//const {sendSMS} = require('./sendSMS');
require("dotenv").config();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  return res.json({ message: "Hello world" });
});

const users = [];

const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/register", (req, res) => {
  const { email, password, tel, username } = req.body;

  let result = users.filter((user) => user.email === email || user.tel === tel);

  if (result.length === 0) {
    const newUser = { id: generateID(), email, password, username, tel };

    users.push(newUser);
    return res.json({
      message: "Account created successfully!",
    });
  }
  res.json({
    error_message: `User already exists ${result}`,
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );

  if (result.length !== 1) {
    return res.json({
      error_message: "Incorrect credentials",
    });
  }

  res.json({
    message: "Login successfully",
    data: {
      username: result[0].username,
    },
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
