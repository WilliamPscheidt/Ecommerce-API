const { createClient } = require("redis");

class CacheServer {
    constructor() {
        this.client = createClient()

        this.client.on("error", (err) => {
            console.log("Reddis ->", err)
        })

        this.client.connect()

        this.client.on("connect", (err) => {
            console.log("Reddis ->", err)
        })
    }

    async set(key, value, expire) {
        await this.client.set(key, value, {EX: expire})
    }

    async get(key) {
        return await this.client.get(key)
    }
}

module.exports = CacheServer