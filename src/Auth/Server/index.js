const express = require("express");
const cors = require("cors");
const uuid = require("short-uuid");
const app = express();
const PORT = 4000;
const { Novu } = require("@novu/node");
const novu = new Novu("38d9f0a56599c2941e9efb6d178555fe");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req,res) => {
   return res.json({ message: "Hello world" });
});

const users = [];
//REGISTER ROUTE

app.post("/api/register", (req, res) => {
  const { email, password, tel, username } = req.body;
  let result = users.filter
  ((user) => user.email === email || user.tel === tel
  );

  if(result.length === 0) {
    const newUser = {id: uuid.generate(), email, password, username, tel};
    users.push(newUser);

    return res.json({
      message:"Account created successfully!",
    });
  }
  res.json({
    error_message: "User already exists",
  });
});

//LOGIN ROUTE
let code;

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
  sendNovuNotification(result[0].tel, code);
  res.json({
      message: "Login successful",
      data: {
          username: result[0].username,
      },
  });
});

//2FA 

const generateCode = () => Math.random().toString(36).substring(2, 12);

const sendNovuNotification = async (recipient, verificationCode) => {
    try {
        let response = await novu.trigger("<NOTIFICATION_TEMPLATE_ID>", {
            to: {
                subscriberId: recipient,
                phone: recipient,
            },
            payload: {
                code: verificationCode,
            },
        });
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};

app.post("/api/verification", (req, res) => {
  if (code === req.body.code) {
      return res.json({ message: "You're verified successfully" });
  }
  res.json({
      error_message: "Incorrect credentials",
  });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});