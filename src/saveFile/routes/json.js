import Router from 'koa-router'
import controller from '../controller/index'
const router = Router()

// 上传
router.post('/upload', controller.json_.upload)

router.post('/uploads', controller.json_.uploadM)

router.get('/read', controller.json_.read_)

export default router
