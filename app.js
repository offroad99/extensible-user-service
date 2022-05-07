const express = require("express");
const app = express();
_ = require("./database/database").default;
const userCollection = require("./database/collection/user.collection").default;
const userService = require("./service/user.service");
const { UserValidator } = require("./validators/user.validator");
const ErrorHandler = require("./middlewares/error.middleware").default;

//#region  Middlewares
app.use(express.json());
app.use(ErrorHandler.genericErrorHandler);

app.use((_, res, next) => {
    if (userCollection.isReady) {
        next();
        return;
    }

    setTimeout(() => {
        if (userCollection.isReady) {
            next();
            return;
        }

        res.status(500).json({ message: "Unable to connect to database" });
    }, 1000);
});
//#endregion

app.get("/users/:id", userService.getUserByIdAsync);
app.post("/users", UserValidator.userContract, userService.createUserAsync);
app.post(
    "/users/authorization",
    UserValidator.userContract,
    userService.validateUserAsync
);

// Handle unmatched routes
app.use(ErrorHandler.notFound);

const port = process.env.PORT || 3200;
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
