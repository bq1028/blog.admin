/**
 * app 入口
 * @author Philip
 */

const path = require("path")

const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const routes = require("./routes")
const apis = require("./apis")
const middlewareAuth = require("./middleware/auth")
const RedisStore = require("connect-redis")(session);
const { host, port, password } = require("./config/redis")

const app = express()

app.use(session({
    store: new RedisStore({
        host,
        port,
        password,
        db: "blog_login_session"
    }),
	cookie: {
		maxAge: 1000 * 60 * 30
	}
}))

// 使用路由
app.engine("html", ejs.renderFile)
app.set("view engine", "html")
app.set("views", path.join(__dirname, "../../web/dist"))

// 模板设置
app.use("/", routes)
app.use("/", apis)

// 请求 body 解析
app.use(bodyParser.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 登录中间件
app.use(middlewareAuth)

// 请求 cookie 解析
app.use(cookieParser())
app.listen(process.env.NODE_ENV === "dev" ? 8080 : 8082)