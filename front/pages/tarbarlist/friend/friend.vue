<template>
  <view class="friends-page">
    <view class="header">
      <text class="title">朋友</text>
      <view class="header-actions">
        <uni-icons type="plus" size="24" color="#333"></uni-icons>
        <uni-icons type="personadd" size="24" color="#333"></uni-icons>
      </view>
    </view>

    <view class="search-bar">
      <uni-icons type="search" size="18" color="#999"></uni-icons>
      <input class="search-input" placeholder="搜索朋友" />
    </view>

    <view class="content">
      <view class="friends-section">
        <text class="section-title">好友请求</text>
        <scroll-view class="request-list" scroll-x>
          <view class="request-item" v-for="request in friendRequests" :key="request.id">
            <image class="avatar" :src="request.avatar" mode="aspectFill"></image>
            <text class="name">{{ request.name }}</text>
            <view class="actions">
              <button class="accept-btn">接受</button>
              <button class="reject-btn">拒绝</button>
            </view>
          </view>
        </scroll-view>
      </view>

      <view class="friends-section">
        <text class="section-title">我的好友</text>
        <view class="friends-list">
          <view class="friend-item" v-for="friend in friends" :key="friend.id">
            <image class="avatar" :src="friend.avatar" mode="aspectFill"></image>
            <view class="friend-info">
              <text class="name">{{ friend.name }}</text>
              <text class="status">{{ friend.status }}</text>
            </view>
            <view class="friend-actions">
              <uni-icons type="chat" size="20" color="#666"></uni-icons>
              <uni-icons type="more" size="20" color="#666"></uni-icons>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      friendRequests: [
        { id: 1, name: '音乐爱好者', avatar: 'https://picsum.photos/id/1027/200/200', mutual: 3 },
        { id: 2, name: '吉他手', avatar: 'https://picsum.photos/id/1025/200/200', mutual: 5 },
        { id: 3, name: '钢琴家', avatar: 'https://picsum.photos/id/103/200/200', mutual: 2 },
        { id: 4, name: '节奏大师', avatar: 'https://picsum.photos/id/1035/200/200', mutual: 8 }
      ],
      friends: [
        { id: 1, name: '张三', avatar: 'https://picsum.photos/id/1005/200/200', status: '在线' },
        { id: 2, name: '李四', avatar: 'https://picsum.photos/id/1011/200/200', status: '最近活跃' },
        { id: 3, name: '王五', avatar: 'https://picsum.photos/id/1012/200/200', status: '3小时前活跃' },
        { id: 4, name: '赵六', avatar: 'https://picsum.photos/id/1015/200/200', status: '在线' },
        { id: 5, name: '钱七', avatar: 'https://picsum.photos/id/1016/200/200', status: '昨天活跃' },
        { id: 6, name: '孙八', avatar: 'https://picsum.photos/id/1018/200/200', status: '在线' },
        { id: 7, name: '周九', avatar: 'https://picsum.photos/id/1019/200/200', status: '1周前活跃' },
        { id: 8, name: '吴十', avatar: 'https://picsum.photos/id/1020/200/200', status: '在线' },
        { id: 9, name: '郑十一', avatar: 'https://picsum.photos/id/1022/200/200', status: '2天前活跃' },
        { id: 10, name: '王十二', avatar: 'https://picsum.photos/id/1024/200/200', status: '在线' }
      ]
    }
  },
  onLoad(options) {
    console.log('Friends page loaded');
  }
}
</script>

<style lang="scss">
.friends-page {
  padding: 0;
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 30rpx 20rpx;
    background-color: #fff;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

    .title {
      font-size: 40rpx;
      font-weight: bold;
    }

    .header-actions {
      display: flex;
      gap: 30rpx;
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #f1f1f1;

    .search-input {
      flex: 1;
      margin-left: 15rpx;
      font-size: 28rpx;
      color: #333;
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 20rpx;

    .friends-section {
      background-color: #fff;
      margin-bottom: 20rpx;

      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        padding: 20rpx 30rpx;
        display: block;
        border-bottom: 1rpx solid #f1f1f1;
      }

      .request-list {
        white-space: nowrap;
        padding: 20rpx 30rpx;

        .request-item {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin-right: 40rpx;
          width: 160rpx;

          .avatar {
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
            margin-bottom: 15rpx;
            border: 2rpx solid #f1f1f1;
          }

          .name {
            font-size: 26rpx;
            margin-bottom: 15rpx;
            width: 100%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .actions {
            display: flex;
            width: 100%;
            justify-content: space-between;

            button {
              flex: 1;
              font-size: 24rpx;
              padding: 8rpx 0;
              line-height: 1.2;

              &.accept-btn {
                background-color: #07c160;
                color: #fff;
                margin-right: 10rpx;
                border-radius: 6rpx;
              }

              &.reject-btn {
                background-color: #f1f1f1;
                color: #666;
                border-radius: 6rpx;
              }
            }
          }
        }
      }

      .friends-list {
        .friend-item {
          display: flex;
          align-items: center;
          padding: 25rpx 30rpx;
          border-bottom: 1rpx solid #f1f1f1;

          .avatar {
            width: 90rpx;
            height: 90rpx;
            border-radius: 50%;
            margin-right: 20rpx;
            border: 2rpx solid #f1f1f1;
          }

          .friend-info {
            flex: 1;

            .name {
              font-size: 32rpx;
              font-weight: 500;
              margin-bottom: 5rpx;
              display: block;
            }

            .status {
              font-size: 24rpx;
              color: #999;
            }
          }

          .friend-actions {
            display: flex;
            gap: 30rpx;
          }
        }
      }
    }
  }
}
</style>