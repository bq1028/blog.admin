/**
 * 行为
 * @author Philip
 */

module.exports.actions = {
    "VISIT": "访问",
    "ADD": "增加",
    "MODIFIED": "修改",
    "DELETE": "删除",
    "SEARCH": "查询",
    "LOGIN": "登录",
    "LOGOUT": "登出"
}

module.exports.pages = {
    ARTICLES: "文章",
    HOME: "首页",
    LOGIN: "登录",
    LOGOUT: "登出",
    PROJECTS: "计划",
    REGISTER: "注册",
    SERVICES: "服务",
    USER: "用户"
}

module.exports.models = {
    AUTH: "权限",
    CONTENT: "内容",
    FILE: "文件",
    JOURNAL: "日志",
    MESSAGE: "留言",
    ROLE: "角色",
    TAG: "标签",
    USER: "用户"
}

module.exports.resultType = {
    NOAUTH: "没有权限",
    SQLFIALED: "数据库错误",
    SUCCESS: "成功"
}
