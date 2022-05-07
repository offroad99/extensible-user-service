class ErrorMiddleware {
    /**
     * Error response middleware for 404 not found.
     *
     * @param {Object} req
     * @param {Object} res
     */
    static notFound = (_req, res) => {
        res.status(404).json({
            code: 404,
            message: "Ooops, route not found",
        });
    };

    /**
     * Generic error response middleware for internal server errors.
     *
     * @param  {Object}   err
     * @param  {Object}   req
     * @param  {Object}   res
     * @param  {Function} next
     */
    static genericErrorHandler = (req, res, next) => {
        try {
            next();
        } catch (e) {
            res.status(500)
                .json({
                    code: 500,
                    data: "",
                    message: err.message,
                })
                .end();
        }
    };
}

module.exports = { default: ErrorMiddleware };
