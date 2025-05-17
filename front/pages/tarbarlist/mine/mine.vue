<template>
  <view class="mine-page">
    <!-- 用户信息区域 -->
    <view class="profile-section" @click="handleProfileClick">
      <view class="profile-bg"></view>
      <view class="profile-content">
        <image src="../../../static/avtar/p1.jpg"  class="avatar" mode="aspectFill" />
        <view class="user-info">
          <text class="username">{{ isLoggedIn ? username : '未登录' }}</text>
          <text class="user-level" v-if="isLoggedIn">VIP会员</text>
        </view>
        <view class="edit-btn" v-if="isLoggedIn" @click.stop="navigateToEditProfile">
          <text>编辑资料</text>
        </view>
      </view>
    </view>

    <!-- 数据统计 -->
    <view class="stats-section" v-if="isLoggedIn">
      <view class="stat-item" v-for="item in stats" :key="item.id">
        <text class="stat-value">{{ item.value }}</text>
        <text class="stat-label">{{ item.label }}</text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-section" v-if="isLoggedIn">
      <view class="menu-title">我的服务</view>
      <view class="menu-grid">
        <view class="menu-item" v-for="item in menuItems" :key="item.id" @click="handleMenuItemClick(item)">
          <image :src="item.icon" class="menu-icon" />
          <text class="menu-text">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- 设置区域 -->
    <view class="settings-section" v-if="isLoggedIn">
      <view class="menu-title">系统设置</view>
      <view class="settings-list">
        <view class="setting-item" v-for="item in settings" :key="item.id" @click="handleSettingClick(item)">
          <text>{{ item.name }}</text>
          <image src="https://cdn-icons-png.flaticon.com/512/271/271210.png" class="arrow-icon" />
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-btn" v-if="isLoggedIn" @click="handleLogout">
      <text>退出登录</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: true,
      username: '张三',
      stats: [
        { id: 1, value: '128', label: '收藏' },
        { id: 2, value: '56', label: '关注' },
        { id: 3, value: '892', label: '粉丝' },
        { id: 4, value: '24', label: '动态' }
      ],
      menuItems: [
        { id: 1, name: '我的收藏', icon: 'https://cdn-icons-png.flaticon.com/512/2965/2965300.png' },
        { id: 2, name: '播放历史', icon: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png' },
        { id: 3, name: '我的订单', icon: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png' },
        { id: 4, name: '我的钱包', icon: 'https://cdn-icons-png.flaticon.com/512/2961/2961957.png' },
        { id: 5, name: '优惠券', icon: '../../../static/mine/优惠券_文字.png' },
        { id: 6, name: '地址管理', icon: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png' }
      ],
      settings: [
        { id: 1, name: '账号与安全' },
        { id: 2, name: '通知设置' },
        { id: 3, name: '隐私设置' },
        { id: 4, name: '通用设置' },
        { id: 5, name: '关于我们' }
      ]
    };
  },
  onLoad() {
    this.checkLoginStatus();
  },
  onShow() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const username = uni.getStorageSync('username');
      this.isLoggedIn = !!username;
      this.username = username || '';
    },
    handleProfileClick() {
      if (!this.isLoggedIn) {
        uni.navigateTo({ url: '/pages/tarbarlist/mine/login' });
      }
    },
    navigateToEditProfile() {
      uni.navigateTo({ url: '/pages/tarbarlist/mine/reuser' });
    },
    handleMenuItemClick(item) {
      console.log('点击菜单:', item.name);
      switch (item.id) {
        case 1:
          uni.navigateTo({ url: '/pages/user/collect' });
          break;
        case 2:
          uni.navigateTo({ url: '/pages/user/history' });
          break;
        case 3:
          uni.navigateTo({ url: '/pages/user/orders' });
          break;
        case 4:
          uni.navigateTo({ url: '/pages/user/wallet' });
          break;
        case 5:
          uni.navigateTo({ url: '/pages/user/coupons' });
          break;
        case 6:
          uni.navigateTo({ url: '/pages/user/address' });
          break;
      }
    },
    handleSettingClick(item) {
      console.log('点击设置:', item.name);
      switch(item.id) {
        case 1:
          uni.navigateTo({ url: '/pages/settings/account' });
          break;
        case 2:
          uni.navigateTo({ url: '/pages/settings/notification' });
          break;
        case 3:
          uni.navigateTo({ url: '/pages/settings/privacy' });
          break;
        case 4:
          uni.navigateTo({ url: '/pages/settings/general' });
          break;
        case 5:
          uni.navigateTo({ url: '/pages/settings/about' });
          break;
      }
    },
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            uni.removeStorageSync('username');
            uni.removeStorageSync('token');
            this.isLoggedIn = false;
            this.username = '';
            uni.showToast({
              title: '退出成功',
              icon: 'success'
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.mine-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 40rpx;
}

/* 用户信息区域 */
.profile-section {
  position: relative;
  height: 300rpx;
  margin-bottom: 120rpx;

  .profile-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200rpx;
    background: linear-gradient(to right, #ff9500, #ff5e3a);
    border-radius: 0 0 20rpx 20rpx;
  }

  .profile-content {
    position: absolute;
    bottom: -100rpx;
    left: 30rpx;
    right: 30rpx;
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 5rpx 15rpx rgba(0,0,0,0.1);
  }

  .avatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    border: 5rpx solid #fff;
    margin-right: 30rpx;
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .username {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }

    .user-level {
      font-size: 24rpx;
      color: #ff9500;
      background: #fff8e6;
      padding: 5rpx 15rpx;
      border-radius: 20rpx;
      align-self: flex-start;
    }
  }

  .edit-btn {
    padding: 10rpx 20rpx;
    border: 1rpx solid #ddd;
    border-radius: 30rpx;
    font-size: 26rpx;
    color: #666;
  }
}

/* 数据统计区域 */
.stats-section {
  display: flex;
  justify-content: space-around;
  background: #fff;
  margin: 20rpx 30rpx;
  padding: 30rpx 0;
  border-radius: 15rpx;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  .stat-value {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
  }

  .stat-label {
    font-size: 26rpx;
    color: #999;
  }
}

/* 菜单区域 */
.menu-section {
  background: #fff;
  margin: 30rpx;
  border-radius: 15rpx;
  padding: 20rpx 0;
}

.menu-title {
  font-size: 30rpx;
  font-weight: bold;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20rpx 0;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;

  .menu-icon {
    width: 60rpx;
    height: 60rpx;
    margin-bottom: 15rpx;
  }

  .menu-text {
    font-size: 26rpx;
    color: #666;
  }
}

/* 设置区域 */
.settings-section {
  background: #fff;
  margin: 30rpx;
  border-radius: 15rpx;
}

.settings-list {
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25rpx 30rpx;
    border-bottom: 1rpx solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .arrow-icon {
      width: 30rpx;
      height: 30rpx;
      opacity: 0.5;
    }
  }
}

/* 退出按钮 */
.logout-btn {
  margin: 50rpx 30rpx 0;
  background: #fff;
  color: #ff5e3a;
  text-align: center;
  padding: 25rpx 0;
  border-radius: 15rpx;
  font-size: 30rpx;
  font-weight: bold;
}
</style>