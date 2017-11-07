const controller = require('../controller/index')
const Router = require('koa-router')

const childRouter = new Router()

childRouter.get('/tiles', controller.tiles)
module.exports = childRouter
