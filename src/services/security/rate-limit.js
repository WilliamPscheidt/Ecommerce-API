const CacheServer = require('../../adapters/cache-server')
const cacheServer = new CacheServer()

class RateLimit {
    static async check(req, res, next) {
        const attempts = await cacheServer.get("rate-limit-system:"+req.socket.remoteAddress)

        if (attempts >= 5) {
            return res.status(429).send({error: "rate-limit"})
        }

        await cacheServer.set("rate-limit-system:"+req.socket.remoteAddress, Number(attempts)+1, 50)

        next()
    }
}

module.exports = RateLimit