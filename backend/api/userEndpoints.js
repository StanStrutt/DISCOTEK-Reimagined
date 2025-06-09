import User from "../models/Login"
import router from "express"

const Router = router()

const verifyUserLogin = async (username, password) => {
    try {
        const user = await User.findOne({username}).lean()
        if (!user) {
            return {status: "error", error: "user not found"}
        }
        if (await bcrypt.compare(password, user.password)) {
            token = jwt.sign({id: user.id, username: user.username, type: "user"}, JWT_SECRET, { expiresIn: "2h"})
            return {status: "ok", data: token}
        }
        return {status: "error", error: "invalid password"}
    } catch (error) {
        console.log(error)
        return {status: "error", error: "timed out"}
    }
}

Router.post("/login", async (req,res) => {
    const {username, password} = req.body
    const response = await verifyUserLogin(username, password)
    if(response.status === "ok") {
        res.cookie("token", token, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
        res.redirect("/")
    } else {
        res.json(response)
    }
})
