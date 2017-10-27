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

// 数据修改
const edit = async (ctx, next) => {
  // 同步创建连接
  let connect = await pool.connect()
  const name = ctx.query.name
  const reName = ctx.query.reName
  const age = ctx.query.age
  try {
    // 同步等待结果
    await connect.query('UPDATE test SET age=$1, name=$2 WHERE name=$3', [age, reName, name]).then(res => {
      return connect.query('Select * FROM test WHERE name = $1', [reName])
    }).then(res => {
      ctx.status = 200
      ctx.body = {
        success: true,
        data: res.rows || []
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

// 新增数据
const addData = async (ctx, next) => {
  // 同步创建连接
  let connect = await pool.connect()
  const name = ctx.query.name
  const age = ctx.query.age
  try {
    // 同步等待结果
    await connect.query('INSERT INTO test(name, age) VALUES($1::varchar, $2::int)', [name, age]).then(res => {
      return connect.query('Select * FROM test WHERE name = $1', [name])
    }).then(res => {
      ctx.status = 200
      ctx.body = {
        success: true,
        data: res.rows || []
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

// 删除数据
const delData = async (ctx, next) => {
  // 同步创建连接
  let connect = await pool.connect()
  const name = ctx.query.name
  const age = ctx.query.age
  try {
    // 同步等待结果
    await connect.query('DELETE FROM test WHERE name=$1 OR age=$2', [name, age]).then(res => {
      ctx.status = 200
      ctx.body = {
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
  edit,
  addData,
  delData
}
