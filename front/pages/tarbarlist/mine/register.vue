<template>
  <view class="register-page">
    <view class="form-container">
      <view class="title">用户注册</view>
      <view class="form-item">
        <input v-model="form.username" placeholder="请输入用户名" class="input" />
      </view>
      
      <view class="form-item">
        <input v-model="form.password" type="password" placeholder="请输入密码" class="input" />
      </view>
	  <view class="form-item">
	    <input v-model="form.email" placeholder="请输入邮箱" class="input" />
	  </view>
      <button class="submit-btn" @click="handleRegister">注册</button>
      <view class="link-section">
        <text class="link" @click="navigateToLogin">已有账号？立即登录</text>
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
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async handleRegister() {
      const { username, email, password } = this.form;
      if (!username || !email || !password) {
        uni.showToast({ title: '请填写所有字段', icon: 'none' });
        return;
      }
      try {
        const res = await uni.request({
          url: 'http://localhost:3000/api/register',
          method: 'POST',
          data: { username, email, password },
          header: { 'Content-Type': 'application/json' }
        });
		console.log("res",res[1])
        if (res[1].statusCode == 200) {
          uni.showToast({ title: '注册成功，请登录', icon: 'success' });
          uni.navigateTo({ url: '/pages/tarbarlist/mine/login' });
        } else {
          uni.showToast({ title: res[1].errMsg, icon: 'none' });
        }
      } catch (error) {
        uni.showToast({ title: '注册失败，请检查网络', icon: 'none' });
        console.error('Register error:', error);
      }
    },
    navigateToLogin() {
      uni.navigateTo({ url: '/pages/tarbarlist/mine/login' });
    }
  }
};
</script>

<style lang="scss">
.discover-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 30rpx;
}
.form-container {
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  width: 100%;
  max-width: 600rpx;
  box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 50rpx;
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