const generateToken = require("../configurations/generateToken");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const user = {
    username: "fatima",
    password: "Abc123@",
};

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log("body", req.body);

    if (username === user.username && password === user.password) {
        const accessToken = generateToken(username, 20);
        const refreshToken = generateToken(password, 365);
        //set httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });
        res.status(200).json({
            accessToken
        });
    }

    else {
        res.status(404);
        throw new Error("Not Found");
    }
});

const refreshToken = (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    console.log("refreshToken===", refreshToken)
    if (req.user) {
        const accessToken = generateToken(req.user.username, 20);
        return res.json({ accessToken });
    }
    else if (refreshToken) {
        jwt.verify(refreshToken, process.env.SECRET_KEY,
            (err, result) => {
                if (err || !result) {
                    res.status(401);
                    throw new Error("Unauthorized");
                }
                else if (result.username === user.username) {
                    const accessToken = generateToken(username, 20);
                    return res.json({ accessToken });
                }
            })
    }
    else {
        res.status(401);
        throw new Error("Unauthorized");
    }
}


module.exports = { loginUser, refreshToken };
