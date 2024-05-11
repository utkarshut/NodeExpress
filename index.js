const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const xlsx = require('xlsx');
const fs = require('fs');
const multer = require('multer');
const app = express();
const secretskey = "FSCD";

// Multer middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

app.use(express.json());
app.use(cookieParser());
//app.use(cors({ origin: "http://localhost:4200" }));
app.get("/", (req, res) => {
  res.send({ user: "utkarsh" });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "Utkarsh",
    password: "asa",
  };
  jwt.sign(user, secretskey, { expiresIn: "30000s" }, (err, token) => {
    res.cookie("access_token", token, {
      httpOnly: true, // Cookie is only accessible by the server
      secure: true, // Cookie is only sent over HTTPS
      sameSite: "strict", // Cookie is not sent in cross-origin requests
      maxAge: 3600000, // Cookie expires in 1 hour
    });
    res.send({
      token: token,
      message: "Logged in successfully",
    });
  });
});
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const auth = bearerHeader.split(" ");
    req.token = auth[1];
    next();
  } else {
    res.status(401).send({
      message: "Invalid token",
    });
  }
}
app.post('/upload', upload, (req, res) => {
    const file = req.file.buffer;
    const workbook = xlsx.read(file, { type: 'buffer' });

    // Assuming the first sheet is the one you want to process
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON format
    const data = xlsx.utils.sheet_to_json(sheet);

    // Do something with the data, such as saving to a database
    console.log(data);

    res.send({
        message: 'File uploaded and processed successfully',
        data: data
    });
});


app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretskey, (err, authData) => {
    if (err) {
      res.send({
        message: err,
      });
    } else {
      req.userId = authData.userId;
      res.status(200).send({
        user: authData
      });
    }
  });
});

app.post("/logout", (req, res) => {
  // Clear the 'access_token' cookie
  res.cookie("access_token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0), // Expire the cookie immediately
  });

  res.status(200).send("Logged out successfully");
});

app.listen(5001, () => {
  console.log("app running");
});
