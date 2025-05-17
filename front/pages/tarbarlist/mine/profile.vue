<template>
  <view class="profile-page">
    <view class="form-container">
      <view class="title">个人信息</view>
      <view class="avatar-container" v-if="profile.avatar">
        <image :src="profile.avatar" class="avatar" />
      </view>
      <view class="profile-item">
        <text class="label">用户名：</text>
        <text class="value">{{ profile.username || '未加载' }}</text>
      </view>
      <view class="profile-item">
        <text class="label">昵称：</text>
        <text class="value">{{ profile.nickname || '未设置' }}</text>
      </view>
      <view class="profile-item">
        <text class="label">邮箱：</text>
        <text class="value">{{ profile.email || '未加载' }}</text>
      </view>
      <view class="profile-item">
        <text class="label">手机号：</text>
        <text class="value">{{ profile.phone || '未设置' }}</text>
      </view>
      <view class="profile-item">
        <text class="label">最后登录：</text>
        <text class="value">{{ profile.last_login_at || '未加载' }}</text>
      </view>
      <button class="submit-btn" @click="handleLogout">退出登录</button>
      <view class="link-section">
        <text class="link" @click="navigateToEditProfile">修改个人信息</text>
        <text class="link" @click="navigateToResetPassword">修改密码</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        username: '',
        nickname: '',
        email: '',
        phone: '',
        avatar: '',
        last_login_at: ''
      }
    };
  },
  onLoad() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      const username = uni.getStorageSync('username');
      if (!username) {
        uni.showToast({ title: '请先登录', icon: 'none' });
        uni.navigateTo({ url: '/pages/tarbarlist/mine/login' });
        return;
      }
      try {
        const res = await uni.request({
          url: 'http://localhost:3000/api/profile',
          method: 'GET',
          data: { username },
          header: { 'Content-Type': 'application/json' }
        });
        if (res[1].statusCode === 200) {
          this.profile = res[1].data.data;
          uni.showToast({ title: '用户信息加载成功', icon: 'success' });
        } else {
          uni.showToast({ title: res[1].data.message || '加载失败', icon: 'none' });
        }
      } catch (error) {
        uni.showToast({ title: '加载用户信息失败', icon: 'none' });
        console.error('Load profile error:', error);
      }
    },
    async handleLogout() {
      try {
        const res = await uni.request({
          url: 'http://localhost:3000/api/logout',
          method: 'POST',
          header: { 'Content-Type': 'application/json' }
        });
        if (res[1].statusCode === 200) {
          uni.removeStorageSync('username');
          uni.showToast({ title: '退出登录成功', icon: 'success' });
          uni.navigateTo({ url: '/pages/tarbarlist/mine/login' });
        } else {
          uni.showToast({ title: res[1].data.message || '退出失败', icon: 'none' });
        }
      } catch (error) {
        uni.showToast({ title: '退出登录失败', icon: 'none' });
        console.error('Logout error:', error);
      }
    },
    navigateToEditProfile() {
      uni.navigateTo({ url: '/pages/tarbarlist/mine/edit-profile' });
    },
    navigateToResetPassword() {
      uni.navigateTo({ url: '/pages/tarbarlist/mine/reset-password' });
    }
  }
};
</script>

<style lang="scss">
.profile-page {
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

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 1rpx solid #ddd;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
  font-size: 28rpx;
}

.label {
  color: #333;
  font-weight: bold;
}

.value {
  color: #666;
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
  margin: 0 20rpx;
}
</style>