import Router from 'koa-router'
import json from './json'

const router = Router()

// routes表示的是路由的嵌套处理
router.use(json.routes(), json.allowedMethods())

export default router
