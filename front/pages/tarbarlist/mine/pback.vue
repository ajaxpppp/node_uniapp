<template>
  <view class="reset-page">
    <view class="form-container">
      <view class="title">找回密码</view>
      <!-- Email Verification -->
      <view v-if="!isVerified">
        <view class="form-item">
          <input v-model="form.email" placeholder="请输入注册邮箱" class="input" />
        </view>
        <button class="submit-btn" @click="handleRequestReset">验证邮箱</button>
      </view>
      <!-- Password Reset -->
      <view v-else>
        <view class="form-item">
          <input v-model="form.email" placeholder="注册邮箱" class="input" disabled />
        </view>
        <view class="form-item">
          <input v-model="form.resetToken" placeholder="请输入重置令牌" class="input" />
        </view>
        <view class="form-item">
          <input v-model="form.newPassword" type="password" placeholder="请输入新密码" class="input" />
        </view>
        <button class="submit-btn" @click="handleResetPassword">重置密码</button>
      </view>
      <view class="link-section">
        <text class="link" @click="navigateToLogin">返回登录</text>
      </view>
      <text v-if="error" class="error">{{ error }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        resetToken: '',
        newPassword: ''
      },
      error: '',
      isVerified: false
    };
  },
  methods: {
    async handleRequestReset() {
      const { email } = this.form;
      if (!email) {
        uni.showToast({ title: '请输入邮箱', icon: 'none' });
        this.error = '请输入邮箱';
        return;
      }
      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        uni.showToast({ title: '请输入有效的邮箱地址', icon: 'none' });
        this.error = '请输入有效的邮箱地址';
        return;
      }

      try {
        const res = await uni.request({
          url: 'http://localhost:3000/api/request-password-reset',
          method: 'POST',
          data: { email },
          header: { 'Content-Type': 'application/json' }
        });

        const result = res[1].data;

        if (res[1].statusCode === 200 && result.code === 0) {
          uni.showToast({ title: '邮箱验证成功', icon: 'success' });
          this.error = '';
          this.form.resetToken = result.data.resetToken; // Pre-fill token for testing
          this.isVerified = true;
        } else {
          this.error = result.message || '请求失败';
          uni.showToast({ title: this.error, icon: 'none' });
        }
      } catch (error) {
        this.error = '请求失败，请检查网络';
        uni.showToast({ title: this.error, icon: 'none' });
        console.error('Password reset request error:', error);
      }
    },
    async handleResetPassword() {
      const { email, resetToken, newPassword } = this.form;
      if (!email || !resetToken || !newPassword) {
        uni.showToast({ title: '请输入所有必填字段', icon: 'none' });
        this.error = '请输入所有必填字段';
        return;
      }
      // Basic password validation
      // if (newPassword.length < 6) {
      //   uni.showToast({ title: '密码长度至少6位', icon: 'none' });
      //   this.error = '密码长度至少6位';
      //   return;
      // }

      try {
        const res = await uni.request({
          url: 'http://localhost:3000/api/reset-password',
          method: 'POST',
          data: { email, reset_token: resetToken, new_password: newPassword },
          header: { 'Content-Type': 'application/json' }
        });

        const result = res[1].data;

        if (res[1].statusCode === 200 && result.code === 0) {
          uni.showToast({ title: '密码重置成功', icon: 'success' });
          this.error = '';
          // Redirect to login after a delay
          setTimeout(() => {
            uni.navigateTo({
            	url:'/pages/tarbarlist/mine/login'
            })
          }, 2000);
        } else {
          this.error = result.message || '密码重置失败';
          uni.showToast({ title: this.error, icon: 'none' });
        }
      } catch (error) {
        this.error = '请求失败，请检查网络';
        uni.showToast({ title: this.error, icon: 'none' });
        console.error('Password reset error:', error);
      }
    },
    navigateToLogin() {
      uni.navigateTo({ url: '/pages/login/login' });
    }
  }
};
</script>

<style lang="scss">
.reset-page {
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

.input[disabled] {
  background-color: #f5f5f5;
  color: #999;
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

.error {
  color: #ff5e3a;
  font-size: 26rpx;
  margin-top: 20rpx;
  text-align: center;
}
</style>