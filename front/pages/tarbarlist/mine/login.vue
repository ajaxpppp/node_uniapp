<template>
  <view class="login-page">
    <view class="form-container">
      <view class="title">用户登录</view>
      <view class="form-item">
        <input v-model="form.username" placeholder="请输入用户名" class="input" />
      </view>
      <view class="form-item">
        <input v-model="form.password" type="password" placeholder="请输入密码" class="input" />
      </view>
      <button class="submit-btn" @click="handleLogin">登录</button>
      <view class="link-section">
        <text class="link" @click="navigateToRegister">没有账号？立即注册</text>
      </view>
	  <view class="link-section">
	    <text class="link" @click="navigateToRegisterps" style="width: 20rpx;">找回密码</text>
	  </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
		
      }
    };
  },
  methods: {
    async handleLogin() {
      const { username, password } = this.form;
      if (!username || !password) {
        uni.showToast({ title: '请输入用户名和密码', icon: 'none' });
        return;
      }
      try {
        const res = await uni.request({
          url: 'http://localhost:3000/api/login',
          method: 'POST',
          data: { username, password },
          header: { 'Content-Type': 'application/json' }
        });
        console.log("res", res[1].data.data.username);
        if (res[1].statusCode == '200') {
          uni.setStorageSync('username', res[1].data.data.username);
          uni.showToast({ title: '登录成功', icon: 'success' });
          uni.switchTab({ url: '/pages/tarbarlist/mine/mine' });
        } else {
          uni.showToast({ title: res[1].data.data.username, icon: 'none' });
        }
      } catch (error) {
        uni.showToast({ title: '登录失败，请检查账号密码', icon: 'none' });
        console.error('Login error:', error);
      }
    },
    navigateToRegister() {
      uni.navigateTo({ url: '/pages/tarbarlist/mine/register' });
    },
	navigateToRegisterps(){
		uni.navigateTo({
			url:'/pages/tarbarlist/mine/pback'
		})
	}
  }
};
</script>

<style lang="scss">
.login-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx;
}

.form-container {
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  width: 100%;
  max-width: 600rpx;
  box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
}

.form-item {
  margin-bottom: 30rpx;
}

.input {
  border: 1rpx solid #ddd;
  border-radius: 10rpx;
  padding: 20rpx;
  font-size: 28rpx;
}

.submit-btn {
  background: #ff5e3a;
  color: #fff;
  font-size: 32rpx;
  border-radius: 10rpx;
  padding: 20rpx 0;
  text-align: center;
  margin-top: 20rpx;
}

.link-section {
  margin-top: 20rpx;
  text-align: center;
}

.link {
  color: #ff9500;
  font-size: 28rpx;
}
</style>