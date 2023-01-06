class UserController {
    static async login(req, res) {
        res.send({"ok": "login"})
    }

    static async register(req, res) {
        res.send({"ok": "register"})
    }
}

module.exports = UserController