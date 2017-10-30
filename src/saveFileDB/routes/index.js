const router = require('koa-router')()
const Controller = require('../controller/index')

// 上传
router.post('/upload', Controller.upload)

// 查询
router.get('/query', Controller.query)

// 删除数据
router.get('/del', Controller.delData)

module.exports = router
