/**
 * 路由
 * @author Philip
 */
const express = require("express")
const router = express.Router()
const { securedRoute, unsecured } = require("./services/secure")

router.get("/", securedRoute, (req, res) => {
    res.render("index.html")
})

router.get("/logout", unsecured, async (req, res) => {
    await req.session.destroy()
})

module.exports = router