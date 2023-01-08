const { createClient } = require("redis");

class CacheServer {
    constructor() {
        this.client = createClient()

        this.client.on("error", (err) => {
            console.log(err)
        })

        this.client.connect()

        this.client.on("connect", () => {
            console.log("Reddis connected", )
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