const jwt = require("jsonwebtoken");
const secretskey = "FSCD";

const login = (req, res) => {
    const user = {
        id: 1,
        name: "Utkarsh",
        password: "asa",
    };
    jwt.sign(user, secretskey, { expiresIn: "30000s" }, (err, token) => {
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3600000,
        });
        res.send({ token, message: "Logged in successfully" });
    });
};

const profile = (req, res) => {
    jwt.verify(req.token, secretskey, (err, authData) => {
        if (err) {
            res.send({ message: err });
        } else {
            req.userId = authData.userId;
            res.status(200).send({ user: authData });
        }
    });
};

const logout = (req, res) => {
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    res.status(200).send("Logged out successfully");
};

module.exports = { login, profile, logout };
