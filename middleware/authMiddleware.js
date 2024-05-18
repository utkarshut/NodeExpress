const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const auth = bearerHeader.split(" ");
        req.token = auth[1];
        next();
    } else {
        res.status(401).send({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
