const { pool } = require('./db');
const crypto = require('crypto');

// 用户服务模块，封装数据库操作
const userService = {
  // 注册用户
  async registerUser(username, email, password, phone, nickname) {
    try {
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password, phone, nickname, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [username, email, password, phone || null, nickname || null]
      );
      return { success: true, data: { id: result.insertId } };
    } catch (err) {
      throw new Error(`注册失败: ${err.message}`);
    }
  },

  async loginUser(username, password) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length === 0) {
        throw new Error('用户不存在');
      }
      // 注意：实际开发中需用 bcrypt 比较加密密码
      if (rows[0].password !== password) {
        throw new Error('密码错误');
      }
      await pool.query('UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = ?', [rows[0].id]);
      return { success: true, data: { id: rows[0].id, username: rows[0].username } };
    } catch (err) {
      throw new Error(`登录失败: ${err.message}`);
    }
  },

  // 退出登录（服务端无需数据库操作）
  async logoutUser() {
    try {
      // 实际开发中可能清理 JWT 或 Session
      return { success: true, data: {} };
    } catch (err) {
      throw new Error(`退出登录失败: ${err.message}`);
    }
  },

  // 重置密码
  async resetPassword(email, reset_token, new_password) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expires > NOW()',
        [email, reset_token]
      );
      if (rows.length === 0) {
        throw new Error('无效或过期令牌');
      }
      // 注意：实际开发中需加密 new_password
      await pool.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL, updated_at = NOW() WHERE email = ?',
        [new_password, email]
      );
      return { success: true, data: {} };
    } catch (err) {
      throw new Error(`密码重置失败: ${err.message}`);
    }
  },

  // 请求密码重置
  async requestPasswordReset(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
        throw new Error('邮箱不存在');
      }
      const resetToken = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 3600 * 1000); // 1小时有效期
      await pool.query(
        'UPDATE users SET reset_token = ?, reset_token_expires = ?, updated_at = NOW() WHERE email = ?',
        [resetToken, expires, email]
      );
      // 注意：实际开发中需发送邮件，包含 resetToken
      return { success: true, data: { resetToken } }; // 模拟返回 token
    } catch (err) {
      throw new Error(`请求密码重置失败: ${err.message}`);
    }
  },

  // 获取用户信息
  async getUserProfile(username) {
    try {
      const [rows] = await pool.query(
        'SELECT id, username, email, phone, nickname, avatar, last_login_at, created_at, updated_at FROM users WHERE username = ?',
        [username]
      );
      if (rows.length === 0) {
        throw new Error('用户不存在');
      }
      return { success: true, data: rows[0] };
    } catch (err) {
      throw new Error(`获取用户信息失败: ${err.message}`);
    }
  },

  // 更新用户信息
  async updateUserProfile(username, newUsername, newEmail, newPhone, newNickname, newAvatar) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length === 0) {
        throw new Error('用户不存在');
      }
      // 检查新用户名和邮箱是否已被占用
      const [existing] = await pool.query(
        'SELECT * FROM users WHERE (username = ? OR email = ?) AND username != ?',
        [newUsername, newEmail, username]
      );
      if (existing.length > 0) {
        throw new Error('用户名或邮箱已被占用');
      }
      await pool.query(
        'UPDATE users SET username = ?, email = ?, phone = ?, nickname = ?, avatar = ?, updated_at = NOW() WHERE username = ?',
        [newUsername, newEmail, newPhone || null, newNickname || null, newAvatar || null, username]
      );
      return { success: true, data: { username: newUsername, email: newEmail, phone: newPhone, nickname: newNickname, avatar: newAvatar } };
    } catch (err) {
      throw new Error(`更新用户信息失败: ${err.message}`);
    }
  }
};

module.exports = userService;