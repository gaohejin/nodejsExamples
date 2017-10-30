/**
 * Created by FDD on 2017/10/27.
 * @desc 控制器
 */
const pool = require('../db/db')
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')
const config = require('../config/config')

// 创建文件存储目录（已存在直接引用不存在则创建）
const mkdirsSync = function (dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
  return false
}

// 获取扩展名
function getSuffix (fileName) {
  return fileName.split('.').pop()
}

// 重命名
function Rename (fileName) {
  return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)
}

// 删除文件
function removeTemImage (path) {
  fs.unlink(path, (err) => {
    if (err) {
      throw err
    }
  })
}

// 上传文件
function uploadFile (ctx, next) {
  const busboy = new Busboy({headers: ctx.req.headers})
  const filePath = path.resolve(__dirname, config.assets)
  const confirm = mkdirsSync(filePath)
  if (!confirm) {
    return
  }
  return new Promise(function (resolve, reject) {
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      console.log(filename)
      const saveTo = path.join(path.join(filePath, filename))
      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', function () {
        let imgPath = 'http://localhost:' + config.port + `/${filePath}/${filename}`
        resolve({
          imgPath: imgPath,
          imgKey: filename
        })
      })
    })
    busboy.on('finish', function () {
      console.log('finished...')
    })
    busboy.on('error', function (err) {
      console.log('err...')
      reject(err)
    })
    ctx.req.pipe(busboy)
  })
}

// 查询
const query = async (ctx, next) => {
  // 同步创建连接
  let connect = await pool.connect()
  const query = ctx.query
  try {
    // 同步等待结果
    await connect.query('Select * FROM imgupload WHERE imgkey=$1', [query.imgkey]).then(data => {
      ctx.status = 200
      ctx.body = {
        code: 200,
        success: true,
        data: data.rows || []
      }
    }).catch(error => {
      ctx.status = 500
      ctx.body = {
        code: 500,
        success: false,
        data: error
      }
    })
  } finally {
    connect.release()
  }
}

// 上传数据
const upload = async (ctx, next) => {
  // 同步创建连接
  let connect = await pool.connect()
  try {
    // 获取上存图片
    const result = await uploadFile(ctx, next)
    // 同步等待结果
    await connect.query('INSERT INTO imgupload(imgkey, imgpath) VALUES($1::text, $2::text)', [result.imgKey, result.imgPath]).then(res => {
      return connect.query('Select * FROM imgupload WHERE imgkey=$1', [result.imgKey])
    }).then(res => {
      ctx.status = 200
      ctx.body = {
        code: 200,
        success: true,
        data: res.rows || []
      }
    }).catch(error => {
      ctx.status = 500
      ctx.body = {
        code: 500,
        success: false,
        data: error
      }
    })
  } finally {
    connect.release()
  }
}

// 删除数据
const delData = async (ctx, next) => {
  // 同步创建连接
  let connect = await pool.connect()
  const imgKey = ctx.query.imgkey
  try {
    // 同步等待结果
    await connect.query('Select * FROM imgupload WHERE imgkey=$1', [imgKey]).then(res => {
      if (res.rows) {
        const filePath = path.resolve(__dirname, config.assets)
        removeTemImage(filePath + '/' + res.rows[0].imgkey + '.' + res.rows[0].imgpath.split('.').pop())
      }
      return connect.query('DELETE FROM imgupload WHERE imgkey=$1', [imgKey])
    }).then(res => {
      ctx.status = 200
      ctx.body = {
        code: 200,
        success: true,
        data: 'success'
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

module.exports = {
  query,
  upload,
  delData
}
