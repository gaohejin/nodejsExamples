import formParse from 'co-busboy'
import fs from 'fs'
import path from 'path'
import config from '../config/config'
const upload = async (ctx, next) => {
  try {
    if (ctx.method !== 'POST') {
      return await next()
    } else {
      const files = ctx.request.body.files
      const file = files.file
      const reader = fs.createReadStream(file.path)
      // // 解析为generator对象
      // let parts = formParse(ctx.request)
      // let part = yield parts
      // 此数组用于存储图片的url
      let fileNames = []
      // 此时part为返回的流对象
      let filename = file.name
      fileNames.push(filename)
      let homeDir = path.resolve(__dirname, '..')
      let newpath = homeDir + '/static/'+ filename
      // 生成存储路径，要注意这里的newpath必须是绝对路径，否则Stream报错
      let stream = fs.createWriteStream(newpath)
      // 写入文件流
      reader.pipe(stream)
      if(fileNames.length > 0){
        console.log('fileNames', fileNames)
        let imgUrls = []
        for (let item of fileNames){
          imgUrls.push('http://localhost:' + config.port + '/static/' + item)
        }
        ctx.status = 200
        ctx.body = {
          code:0,
          success: true,
          message:'上传成功',
          data: {
            urls:imgUrls
          }
        }
      }
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      code: 500,
      success: true,
      message: error,
      data: {}
    }
  } finally {
  }
}

const uploadM = async (ctx, next) => {
  try {
    if (ctx.method !== 'POST') {
      return await next()
    } else {
      const files = ctx.request.body.files.file
      let fileNames = []
      if (Array.isArray(files)) {
        files.forEach(file => {
          const reader = fs.createReadStream(file.path)
          let filename = file.name
          fileNames.push(filename)
          let homeDir = path.resolve(__dirname, '..')
          let newpath = homeDir + '/static/'+ filename
          // 生成存储路径，要注意这里的newpath必须是绝对路径，否则Stream报错
          let stream = fs.createWriteStream(newpath)
          // 写入文件流
          reader.pipe(stream)
        })
      }
      if(fileNames.length > 0){
        console.log('fileNames', fileNames)
        let imgUrls = []
        for (let item of fileNames){
          imgUrls.push('http://localhost:' + config.port + '/static/' + item)
        }
        ctx.status = 200
        ctx.body = {
          code:0,
          success: true,
          message:'上传成功',
          data: {
            urls:imgUrls
          }
        }
      }
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      code: 500,
      success: true,
      message: error,
      data: {}
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
  uploadM,
  read_
}
