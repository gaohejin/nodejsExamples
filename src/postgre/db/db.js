/**
 * Created by FDD on 2017/10/27.
 * @desc 数据库连接
 */

const pg = require('pg')

// 数据库配置
const config = {
  user: 'postgres',
  database: 'koaexample',
  password: 'admin',
  port: 5432,
  // 扩展属性
  max: 20, // 连接池最大连接数
  idleTimeoutMillis: 3000 // 连接最大空闲时间 3s
}

// 创建连接池
const pool = new pg.Pool(config)

module.exports = pool
