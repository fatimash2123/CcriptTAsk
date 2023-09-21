const jwt = require("jsonwebtoken");

const generateToken = (username, timeToExpire) => {
    return jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: `${timeToExpire}d` });
}

module.exports = generateToken;