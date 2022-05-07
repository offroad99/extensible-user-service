const { ObjectId } = require("mongodb");

class UserCollection {
    static isReady = false;

    #collection;

    initialize(database) {
        this.#collection = database.getCollection("user");
        this.isReady = true;

        this.#collection.createIndexes([
            {
                key: { username: 1 },
                unique: true,
            },
        ]);
    }

    addAsync(user) {
        return this.#collection.insertOne({
            ...user,
            createdDate: new Date(),
        });
    }

    findByIdAsync(id) {
        return this.#collection.findOne({ _id: new ObjectId(id) });
    }

    findByUsernameAsync(username) {
        return this.#collection.findOne({
            username,
        });
    }
}

module.exports = { default: new UserCollection() };
