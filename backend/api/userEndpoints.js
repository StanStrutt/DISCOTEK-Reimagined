import User from "../models/User.js "
import router from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const Router = router()

const salt = 10



const verifyUserLogin = async (username, password) => {
    try {
        const user = await User.findOne({username}).lean()
        if (!user) {
            return {
                status: "error",
                error: "user not found",
            }
        }
        // if (await bcrypt.compare(password, user.password)) {
        //     const token = jwt.sign({id: user._id, username: user.username, type: "user"}, "JWT_SECRET", { expiresIn: "2h"})
        //     return {status: "ok", data: token}
        // }
        return {
            status: "error",
            error: "invalid password"
        }
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            error: "timed out",
        }
    }
}

Router.post("/login2", async (req,res) => {
    const {username, password} = req.body
    const user = await User.findOne({username}).lean()

    try {
        const login = await bcrypt.compare(password, user.password)
        const token = jwt.sign({id: user._id, username: user.username, type: "user"}, "JWT_SECRET", { expiresIn: "2h"})
        if (login) {
            res.send({
                status: "ok",
                token: token,
            })
        } else {
            res.json({ message: "Invalid Password" })
        }
    } catch(e) {
        console.log(e)
    } 
})

Router.post("/login", async (req,res) => {
    const {username, password} = req.body
    const response = await verifyUserLogin(username, password)
    console.log(response)
    const login = await bcrypt.compare(password, user.password)
    const token = jwt.sign({id: user._id, username: user.username, type: "user"}, "JWT_SECRET", { expiresIn: "2h"})
    if (login) {
        res.json({ token: token })
        console.log(token)
        return {status: "ok", data: token}
    }
    if(response.status === "ok") {
        res.cookie("token", token, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
        // res.redirect("/")
    } else {
        res.json(response)
    }
})

Router.post("/signup", async (req, res) => {
    const {username, password: plainTextPassword} = req.body
    const password = await bcrypt.hash(plainTextPassword, salt)
    try {
        const response = await User.create({
            username,
            password
        })
        return res.send({status: "ok"})
    } catch (error) {
        console.log(JSON.stringify(error))
        if (error.code === 11000) {
            return res.send({status: "error", error: "username already exists"})
        }
        throw error
    }
})

export default Router