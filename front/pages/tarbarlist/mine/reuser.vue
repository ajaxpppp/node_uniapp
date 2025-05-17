<template>
  <view class="mine-page">
    <!-- Profile Details or Edit Form -->
    <view class="details-section" v-if="profile">
      <view class="menu-title">{{ isEditing ? '编辑个人信息' : '个人信息' }}</view>
      <view class="details-list">
        <!-- View Mode -->
        <template v-if="!isEditing">
          <view class="detail-item">
            <text class="detail-label">ID:</text>
            <text class="detail-value">{{ profile.id }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">用户名:</text>
            <text class="detail-value">{{ profile.username }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">邮箱:</text>
            <text class="detail-value">{{ profile.email }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">电话:</text>
            <text class="detail-value">{{ profile.phone || '无' }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">昵称:</text>
            <text class="detail-value">{{ profile.nickname || '无' }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">头像:</text>
            <text class="detail-value">{{ profile.avatar || '无' }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">最后登录:</text>
            <text class="detail-value">{{ formatDate(profile.last_login_at) }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">创建时间:</text>
            <text class="detail-value">{{ formatDate(profile.created_at) }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">更新时间:</text>
            <text class="detail-value">{{ formatDate(profile.updated_at) }}</text>
          </view>
          <view class="detail-item">
            <button class="edit-button" @click="toggleEditMode">编辑个人信息</button>
          </view>
        </template>
        <!-- Edit Mode -->
        <template v-else>
          <view class="detail-item">
            <text class="detail-label">用户名:</text>
            <input
              type="text"
              v-model="editForm.newUsername"
              placeholder="请输入新用户名"
              class="input-field"
            />
          </view>
          <view class="detail-item">
            <text class="detail-label">邮箱:</text>
            <input
              type="text"
              v-model="editForm.newEmail"
              placeholder="请输入新邮箱"
              class="input-field"
            />
          </view>
          <view class="detail-item">
            <text class="detail-label">电话:</text>
            <input
              type="text"
              v-model="editForm.newPhone"
              placeholder="请输入电话（可选）"
              class="input-field"
            />
          </view>
          <view class="detail-item">
            <text class="detail-label">昵称:</text>
            <input
              type="text"
              v-model="editForm.newNickname"
              placeholder="请输入昵称（可选）"
              class="input-field"
            />
          </view>
          <view class="detail-item">
            <text class="detail-label">头像URL:</text>
            <input
              type="text"
              v-model="editForm.newAvatar"
              placeholder="请输入头像URL（可选）"
              class="input-field"
            />
          </view>
          <view class="detail-item">
            <button class="save-button" @click="saveProfile">保存修改</button>
            <button class="cancel-button" @click="toggleEditMode">取消</button>
          </view>
        </template>
      </view>
      <text v-if="error" class="error">{{ error }}</text>
    </view>

    <!-- Logout Button -->
    <view class="logout-btn" v-if="profile && !isEditing" @click="handleLogout">
      <text>退出登录</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      profile: null,
      error: '',
      defaultAvatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      isEditing: false,
      editForm: {
        newUsername: '',
        newEmail: '',
        newPhone: '',
        newNickname: '',
        newAvatar: ''
      }
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
      if (username) {
        this.username = username;
        this.fetchProfile();
      } else {
        // No username in storage, redirect to login
        this.redirectToLogin();
      }
    },
    async fetchProfile() {
      this.error = '';
      if (!this.username.trim()) {
        this.redirectToLogin();
        return;
      }

      try {
        const response = await uni.request({
          url: 'http://localhost:3000/api/profile',
          method: 'GET',
          data: { username: this.username },
          header: { 'Content-Type': 'application/json' }
        });

        const result = response[1].data;

        if (result.code === 0) {
          this.profile = result.data;
          uni.setStorageSync('username', this.profile.username);
          // Initialize edit form with current profile data
          this.editForm = {
            newUsername: this.profile.username,
            newEmail: this.profile.email,
            newPhone: this.profile.phone || '',
            newNickname: this.profile.nickname || '',
            newAvatar: this.profile.avatar || ''
          };
        } else {
          this.error = result.message || '获取个人信息失败';
          this.profile = null;
          if (result.message === '用户不存在') {
            uni.removeStorageSync('username');
            this.redirectToLogin();
          }
        }
      } catch (error) {
        this.error = '请求失败，请检查网络';
        this.profile = null;
        this.redirectToLogin();
      }
    },
    toggleEditMode() {
      this.isEditing = !this.isEditing;
      this.error = '';
      if (this.isEditing) {
        // Ensure edit form is populated
        this.editForm = {
          newUsername: this.profile.username,
          newEmail: this.profile.email,
          newPhone: this.profile.phone || '',
          newNickname: this.profile.nickname || '',
          newAvatar: this.profile.avatar || ''
        };
      }
    },
    async saveProfile() {
      this.error = '';
      if (!this.editForm.newUsername.trim() || !this.editForm.newEmail.trim()) {
        this.error = '用户名和邮箱不能为空';
        return;
      }

      try {
        const response = await uni.request({
          url: 'http://localhost:3000/api/update-profile',
          method: 'POST',
          data: {
            username: this.profile.username, // Original username
            newUsername: this.editForm.newUsername,
            newEmail: this.editForm.newEmail,
            newPhone: this.editForm.newPhone || null,
            newNickname: this.editForm.newNickname || null,
            newAvatar: this.editForm.newAvatar || null
          },
          header: { 'Content-Type': 'application/json' }
        });

        const result = response[1].data;

        if (result.code === 0) {
          uni.showToast({ title: '更新成功', icon: 'success' });
          // Update profile with new data
          this.profile = {
            ...this.profile,
            username: result.data.username,
            email: result.data.email,
            phone: result.data.phone,
            nickname: result.data.nickname,
            avatar: result.data.avatar
          };
          uni.setStorageSync('username', this.profile.username);
          this.isEditing = false;
          // Refresh profile to get updated timestamps
          await this.fetchProfile();
        } else {
          this.error = result.message || '更新个人信息失败';
        }
      } catch (error) {
        this.error = '更新失败，请检查网络';
      }
    },
    formatDate(date) {
      if (!date) return '无';
      return new Date(date).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    },
    async handleLogout() {
      try {
        const response = await uni.request({
          url: 'http://localhost:3000/api/logout',
          method: 'POST',
          header: { 'Content-Type': 'application/json' }
        });

        const result = response[1].data;

        if (result.code === 0) {
          uni.removeStorageSync('username');
          this.profile = null;
          this.username = '';
          this.isEditing = false;
          uni.showToast({ title: '退出成功', icon: 'success' });
          this.redirectToLogin();
        } else {
          this.error = result.message || '退出失败';
        }
      } catch (error) {
        this.error = '退出失败，请检查网络';
      }
    },
    redirectToLogin() {
      uni.switchTab({
        url: '/pages/index/index' // Adjust to your login page path
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

/* Details Section */
.details-section {
  background: #fff;
  margin: 30rpx;
  border-radius: 15rpx;

  .menu-title {
    font-size: 30rpx;
    font-weight: bold;
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #f5f5f5;
  }

  .details-list {
    .detail-item {
      display: flex;
      align-items: center;
      padding: 25rpx 30rpx;
      border-bottom: 1rpx solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      .detail-label {
        font-size: 28rpx;
        color: #666;
        width: 150rpx;
      }

      .detail-value {
        font-size: 28rpx;
        color: #333;
        flex: 1;
        text-align: right;
      }

      .input-field {
        flex: 1;
        padding: 15rpx 20rpx;
        border: 1rpx solid #ddd;
        border-radius: 10rpx;
        font-size: 28rpx;
      }

      .edit-button,
      .save-button,
      .cancel-button {
        width: 48%;
        padding: 15rpx 0;
        border-radius: 10rpx;
        font-size: 30rpx;
        text-align: center;
      }

      .edit-button,
      .save-button {
        background: #ff9500;
        color: #fff;
      }

      .cancel-button {
        background: #ddd;
        color: #333;
        margin-left: 4%;
      }
    }
  }

  .error {
    color: #ff5e3a;
    font-size: 26rpx;
    padding: 20rpx 30rpx;
    text-align: center;
  }
}

/* Logout Button */
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