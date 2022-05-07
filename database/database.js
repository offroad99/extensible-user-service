const { MongoClient, Db, Collection } = require("mongodb");
// const { DbStatus, StartupTasks } = require("../config/startup-tasks");
const { mongoOptions } = require("./configuration");
const userCollection = require("./collection/user.collection").default;

class Database {
    #db;

    constructor() {
        console.log("Starting db");

        const client = new MongoClient(
            `mongodb://${mongoOptions.host}:${mongoOptions.port}`
        );

        client
            .connect()
            .then((cli) => {
                this.#db = cli.db(mongoOptions.dbName);
                userCollection.initialize(this);
                console.log("Connected to the database.");
            })
            .catch((e) => {
                console.log("Could not connect to the database.", e);
            });
    }

    /**
     * Get a collection by its name
     * @param {string} name Collection name
     * @returns {Collection} The collection
     */
    getCollection(name) {
        return this.#db.collection(name);
    }
}

module.exports = { default: new Database() };
