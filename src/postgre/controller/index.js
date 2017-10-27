/**
 * Created by FDD on 2017/10/27.
 * @desc 控制器
 */
const pool = require('../db/db')
// 查询
const query = async (ctx, next) => {
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

module.exports = {
  query,
}
