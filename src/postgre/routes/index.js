const router = require('koa-router')()
const Controller = require('../controller/index')

// 查询
router.get('/query', Controller.query)

// 编辑
router.get('/edit', Controller.edit)

// 新增
router.get('/add', Controller.addData)

// 删除数据
router.get('/del', Controller.delData)

module.exports = router
