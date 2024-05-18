const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authController = require("./controllers/authController");
const fileController = require("./controllers/fileController");
const scrapeController = require("./controllers/scrapeController");
const authMiddleware = require("./middleware/authMiddleware");
const { server } = require("./controllers/graphqlController");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
    res.send({ user: "utkarsh" });
});

app.post("/login", authController.login);
app.post("/profile", authMiddleware, authController.profile);
app.post("/logout", authController.logout);

app.post("/upload", fileController.upload, fileController.uploadFile);
app.get("/scrape", scrapeController.scrape);

server.listen().then(({ url }) => {
    console.log(`🚀 GraphQL Server ready at ${url}`);
});

app.listen(5001, () => {
    console.log("App running on port 5001");
});
