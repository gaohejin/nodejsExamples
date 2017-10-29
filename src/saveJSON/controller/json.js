import fs from 'fs-promise'
import path from 'path'
const upload = async (ctx, next) => {
  try {
    if (ctx.method !== 'POST') {
      return await next()
    } else {
      console.log(ctx.request)
      const file = ctx.request.body.files.file
      const reader = fs.createReadStream(file.path)
      const stream = fs.createWriteStream(path.join(__dirname, '../assets'))
      reader.pipe(stream)
      console.log('uploading %s -> %s', file.name, stream.path)
      ctx.redirect('/')
    }
  } finally {
  }
}

const read_ = async (ctx, next) => {
  // 同步创建连接
  let connect = await pool.connect()
  const name = ctx.query.name
  try {
    // 同步等待结果
    await connect.query('Select * FROM test WHERE name = $1', [name]).then(data => {
      ctx.status = 200
      ctx.body = {
        success: true,
        data: data.rows || []
      }
    }).catch(error => {
      ctx.status = 500
      ctx.body = {
        success: false,
        data: error
      }
    })
  } finally {
    connect.release()
  }
}

export default {
  upload,
  read_
}
