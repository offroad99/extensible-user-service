const { pbkdf2, randomBytes } = require("crypto");

const hashIterations = Number(process.env.HASH_ITERATIONS);
const hashLength = Number(process.env.HASH_LENGTH);
const saltLength = Number(process.env.SALT_LENGTH);

const passwordToHashAsync = async (password) => {
    const salt = randomBytes(saltLength).toString("hex");

    return await passwordHashFromSaltAsync(password, salt);
};

const passwordHashFromSaltAsync = (password, salt) => {
    const hashPromise = new Promise((resolve, reject) => {
        pbkdf2(
            password,
            salt,
            hashIterations,
            hashLength,
            "sha512",
            (err, derivedKey) => {
                if (err) {
                    reject(err);
                }

                resolve({ hash: derivedKey.toString("hex"), salt });
            }
        );
    });

    return hashPromise;
};

module.exports = { passwordHashFromSaltAsync, passwordToHashAsync };
