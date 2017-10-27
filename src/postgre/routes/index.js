const router = require('koa-router')()
const Controller = require('../controller/index')

// 查询
router.get('/query', Controller.query)

module.exports = router
