const mysql = require('mysql2/promise');

// 创建数据库连接池
const pool = mysql.createPool({
  host: '110.41.70.141', // 数据库主机
  user: 'root', // 数据库用户名
  password: 'ShenJun2002!HWMYSQL', // 数据库密码
  database: 'music_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试连接
async function testConnection() {
  try {
    const w = await pool.getConnection();
    console.log('数据库连接成功!');
    connection.release();
    return true;
  } catch (error) {
    console.error('数据库连接失败:', error);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};