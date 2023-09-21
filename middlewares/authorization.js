const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const user = {
    username: "fatima",
    password: "Abc123@",
};

const authorize = asyncHandler(async (req, res, next) => {
    console.log("headers==", req.headers)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const tokenSent = req.headers.authorization.split(" ")[1]
            console.log("token sent is ", tokenSent)
            const userDecoded = jwt.verify(tokenSent, process.env.SECRET_KEY)
            console.log("decoded user is ", userDecoded)
            if (user.username === userDecoded.username) {
                req.user = user;
                next();
            }
            else {
                console.log("here in not found else")
                res.status(404)
                throw new Error("Not Found");
            }
        }
        catch (error) {
            console.log("here in unauthorized catch")
            res.status(401)
            throw new Error("Unauthorized");
        }
    }
    else {
        res.status(401)
        throw new Error("Not authorized, token failed");
    }

})

module.exports = { authorize }