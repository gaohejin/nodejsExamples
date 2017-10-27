/**
 * Created by FDD on 2017/10/27.
 * @desc 连接postgre数据库
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
// pool.connect((err, client, done) => {
//   if (err) {
//     return console.error('数据库连接出错', err)
//   } else {
//     console.error('数据库连接成功')
//   }
// })

// const query = async () => {
//   // 同步创建连接
//   let connect = await pool.connect()
//   try {
//     // 同步等待结果
//     let res = await connect.query('SELECT $1::varchar AS OUT', ['Hello World By FDD'])
//     console.log(res.rows[0].out)
//   } finally {
//     connect.release()
//   }
// }

// 异步进行数据库处理
// query().catch(e => console.error(e.message, e.stack))

// 在表test中插入、修改、删除数据，共两个字段 (name, age)
pool.connect().then((client) => {
  console.error('数据库连接成功')
  // insert 数据
  client.query('INSERT INTO test(name, age) VALUES($1::varchar, $2::int)', ['FDD', '23']).then(res => {
    console.log('插入成功')
    // 如果是自增ID，有返回值的，在res里
    return res
  }).then(res => {
    // 查询
    return client.query('Select * FROM test WHERE name = $1', ['FDD'])
  }).then(res => {
    // 输出结果，看是否插入成功
    console.log(res.rows[0])
  }).then(res => {
    // update 数据，将age改为21
    return client.query('UPDATE test SET age=$1 WHERE name=$2', [21, 'FDD'])
  }).then(res => {
    // 再查询一次
    return client.query('Select * FROM test WHERE name = $1', ['FDD'])
  }).then(res => {
    // 再输出结果，看是否改为了21
    console.log(res.rows[0])
  }).then(res => {
    // 删除数据
    client.query('Select * FROM test WHERE name = $1', ['FDD'])
  }).then(res => {
    // 最后再查询一次
    res = client.query('Select * FROM test WHERE name = $1', ['FDD']);
    // 释放连接
    client.release()
    return res
  }).then(res => {
    // 再输出结果，没数据 undefined
    console.log(res.rows[0])
  })
})

pool.on('error', (err, client) => {
  console.log('error --> ', err)
})

pool.on('acquire', (client) => {
  console.log('acquire Event')
})

pool.on('connect', () => {
  console.log('connect Event')
})

module.exports = pool
