const { testConnection } = require('./db'); // 替换为你的 db.js 文件路径

async function runTest() {
  const isConnected = await testConnection();
  console.log('连接状态:', isConnected ? '成功' : '失败');
}

runTest();