const mongoose = require("mongoose")
const Configurations = require("../../configurations.json")

class DatabaseServer {
    constructor () {
        mongoose.connect(Configurations.database_string, {useNewUrlParser: true})
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error'));
    }

    async find(model, query, projection, options) {
        return await model.find(query, projection, options)
    }

    async insert(model, data) {
        const newDocument = new model(data)
        return await newDocument.save();
    }

    async delete(model, query) {
        return await model.deleteMany(query)
    }

    async update(model, query, update) {
        return await model.updateMany(query, update)
    }
}

module.exports = DatabaseServer