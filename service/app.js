const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('./util/request')
const packageJSON = require('./package.json')
const exec = require('child_process').exec
const cache = require('apicache').middleware
const userService = require('./util/userServce');
const cors = require('cors');


// version check
exec('npm info NeteaseCloudMusicApi version', (err, stdout, stderr) => {
  if(!err){
    let version = stdout.trim()
    if(packageJSON.version < version){
      console.log(`最新版本: ${version}, 当前版本: ${packageJSON.version}, 请及时更新`)
    }
  }
})

const app = express()

// 解析 JSON 请求体
app.use(express.json());
// 用户登录模块

app.use(cors({
  origin: 'http://localhost:8080', // 替换为前端实际域名/端口
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 处理用户注册请求
app.post('/api/register', async (req, res) => {
  const { username, email, password, phone, nickname } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ code: 1, message: '缺少必要参数' });
    }
    const result = await userService.registerUser(username, email, password, phone, nickname);
    res.json({ code: 0, message: '注册成功', data: result.data });
  } catch (err) {
    res.status(500).json({ code: 1, message: err.message });
  }
});

// 处理用户登录请求
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ code: 1, message: '缺少必要参数' });
    }
    const result = await userService.loginUser(username, password);
    res.json({ code: 0, message: '登录成功', data: result.data });
  } catch (err) {
    res.status(401).json({ code: 1, message: err.message });
  }
});

// 处理退出登录请求
app.post('/api/logout', async (req, res) => {
  try {
    const result = await userService.logoutUser();
    res.json({ code: 0, message: '退出登录成功', data: result.data });
  } catch (err) {
    res.status(500).json({ code: 1, message: err.message });
  }
});

// 处理请求密码重置
app.post('/api/request-password-reset', async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ code: 1, message: '缺少邮箱参数' });
    }
    const result = await userService.requestPasswordReset(email);
    res.json({ code: 0, message: '密码重置请求成功，请检查邮箱', data: result.data });
  } catch (err) {
    res.status(400).json({ code: 1, message: err.message });
  }
});

// 获取用户信息
app.get('/api/profile', async (req, res) => {
  console.log('Handling /api/profile with username:', req.query.username);
  const { username } = req.query;
  try {
    if (!username) {
      return res.status(400).json({ code: 1, message: '缺少用户名参数' });
    }
    const result = await userService.getUserProfile(username);
    res.json({ code: 0, message: '获取用户信息成功', data: result.data });
  } catch (err) {
    res.status(400).json({ code: 1, message: err.message });
  }
});

// Update user profile
app.post('/api/update-profile', async (req, res) => {
  const { username, newUsername, newEmail, newPhone, newNickname, newAvatar } = req.body;
  try {
    if (!username || !newUsername || !newEmail) {
      return res.status(400).json({ code: 1, message: '缺少必要参数' });
    }
    const result = await userService.updateUserProfile(
      username,
      newUsername,
      newEmail,
      newPhone,
      newNickname,
      newAvatar
    );
    res.json({ code: 0, message: '更新用户信息成功', data: result.data });
  } catch (err) {
    res.status(400).json({ code: 1, message: err.message });
  }
});

// Handle password reset
app.post('/api/reset-password', async (req, res) => {
  const { email, reset_token, new_password } = req.body;
  try {
    if (!email || !reset_token || !new_password) {
      return res.status(400).json({ code: 1, message: '缺少必要参数' });
    }
    const result = await userService.resetPassword(email, reset_token, new_password);
    res.json({ code: 0, message: '密码重置成功', data: result.data });
  } catch (err) {
    res.status(400).json({ code: 1, message: err.message });
  }
});


// CORS & Preflight request
app.use((req, res, next) => {
  if(req.path !== '/' && !req.path.includes('.')){
    res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8'
    })
  }
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

// cookie parser
app.use((req, res, next) => {
  req.cookies = {}, (req.headers.cookie || '').split(/\s*;\s*/).forEach(pair => {
    let crack = pair.indexOf('=')
    if(crack < 1 || crack == pair.length - 1) return
    req.cookies[decodeURIComponent(pair.slice(0, crack)).trim()] = decodeURIComponent(pair.slice(crack + 1)).trim()
  })
  next()
})

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// cache
app.use(cache('2 minutes', ((req, res) => res.statusCode === 200)))

// static
app.use(express.static(path.join(__dirname, 'public')))

// router
const special = {
  'daily_signin.js': '/daily_signin',
  'fm_trash.js': '/fm_trash',
  'personal_fm.js': '/personal_fm'
}

fs.readdirSync(path.join(__dirname, 'module')).reverse().forEach(file => {
  if(!file.endsWith('.js')) return
  let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
  let question = require(path.join(__dirname, 'module', file))

  app.use(route, (req, res) => {
    let query = Object.assign({}, req.query, req.body, {cookie: req.cookies})
    question(query, request)
      .then(answer => {
        console.log('[OK]', decodeURIComponent(req.originalUrl))
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
      .catch(answer => {
        console.log('[ERR]', decodeURIComponent(req.originalUrl))
        if(answer.body.code == '301') answer.body.msg = '需要登录'
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
  })
})

const port = process.env.PORT || 3000
const host = process.env.HOST || ''

app.server = app.listen(port, host, () => {
  console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})

module.exports = app
