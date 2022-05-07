const userCollection =
    require("../database/collection/user.collection").default;
const hashService = require("./hash.service");

const DbErrors = {
    DUPLICATE_KEY: 11000,
};

async function createUserAsync(req, res) {
    try {
        const { password } = req.body;
        const { hash, salt } = await hashService.passwordToHashAsync(password);

        delete req.body.password;
        const user = {
            hash,
            salt,
            ...req.body,
        };

        const result = await userCollection.addAsync(user);

        res.status(201).json({ _id: result.insertedId }).end();
    } catch (e) {
        if (e.code === DbErrors.DUPLICATE_KEY) {
            res.status(409)
                .json({
                    message: "Username is taken",
                })
                .end();

            return;
        }

        console.log(e);
        res.status(500).json({ message: e.message }).end();
    }
}

async function getUserByIdAsync(req, res) {
    try {
        const user = await userCollection.findByIdAsync(req.params.id);

        if (!user) {
            res.status(404)
                .json({
                    message: `No user with id ${req.params.id} was found.`,
                })
                .end();
            return;
        }

        res.status(200).json(filterUser(user)).end();
    } catch (e) {
        res.status(500).json({ message: e.message }).end();
    }
}

async function validateUserAsync(req, res) {
    try {
        const { username, password } = req.body;

        const user = await userCollection.findByUsernameAsync(username);

        if (!user) {
            res.status(404)
                .json({
                    success: false,
                    message: `No user found for username ${username}.`,
                })
                .end();
            return;
        }

        const { hash: passHash } = await hashService.passwordHashFromSaltAsync(
            password,
            user.salt
        );

        if (passHash !== user.hash) {
            res.status(400)
                .json({
                    success: false,
                    message: `Invalid credentials provided.`,
                })
                .end();
            return;
        }

        const response = filterUser(user);

        res.status(200).json(response).end();
    } catch (e) {
        res.status(500).json({ message: e.message }).end();
    }
}

const filterUser = (user) => {
    delete user.hash;
    delete user.salt;

    return user;
};

module.exports = { createUserAsync, getUserByIdAsync, validateUserAsync };
