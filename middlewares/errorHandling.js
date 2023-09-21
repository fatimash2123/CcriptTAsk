const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    console.log("here 2")
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENVIRONMENT === "production" ? null : err.stack
    })
    next(err);
}

module.exports = { errorHandler }