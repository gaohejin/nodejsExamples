import Router from 'koa-router'
import controller from '../controller/index'
const router = Router()

// 上传
router.post('/upload', controller.json_.upload)

router.get('/read', controller.json_.read_)

export default router
