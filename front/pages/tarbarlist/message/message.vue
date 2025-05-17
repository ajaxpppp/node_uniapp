<template>
  <view class="message-page">
    <view class="header">
      <text class="title">消息</text>
      <view class="search-bar">
        <uni-icons type="search" size="18" color="#999"></uni-icons>
        <input class="search-input" placeholder="搜索消息" />
      </view>
    </view>

    <view class="content">
      <view class="message-section">
        <text class="section-title">最近联系</text>
        <scroll-view class="recent-contacts" scroll-x>
          <view class="contact-avatar" v-for="contact in recentContacts" :key="contact.id">
            <image class="avatar" :src="contact.avatar" mode="aspectFill"></image>
            <text class="contact-name">{{ contact.name }}</text>
          </view>
        </scroll-view>
      </view>

      <view class="message-list">
        <view class="message-item" v-for="msg in messages" :key="msg.id" @click="handleMessageClick(msg.id)">
          <image class="avatar" :src="msg.avatar" mode="aspectFill"></image>
          <view class="message-content">
            <view class="message-header">
              <text class="message-sender">{{ msg.sender }}</text>
              <text class="message-time">{{ msg.time }}</text>
            </view>
            <text class="message-text">{{ msg.text }}</text>
            <view class="message-badge" v-if="msg.unread">{{ msg.unread }}</view>
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
      recentContacts: [
        { id: 1, name: '音乐达人', avatar: 'https://picsum.photos/id/1005/200/200' },
        { id: 2, name: '节奏大师', avatar: 'https://picsum.photos/id/1006/200/200' },
        { id: 3, name: '旋律小调', avatar: 'https://picsum.photos/id/1009/200/200' },
        { id: 4, name: '和声之美', avatar: 'https://picsum.photos/id/1010/200/200' },
        { id: 5, name: '钢琴诗人', avatar: 'https://picsum.photos/id/1011/200/200' },
        { id: 6, name: '吉他手', avatar: 'https://picsum.photos/id/1012/200/200' }
      ],
      messages: [
        {
          id: 1,
          sender: '音乐分享群',
          text: '大家最近有什么好听的歌推荐吗？',
          time: '12:30',
          unread: 5,
          avatar: 'https://picsum.photos/id/1040/200/200'
        },
        {
          id: 2,
          sender: '节奏大师',
          text: '我刚上传了一首新作品，快来听听看！',
          time: '昨天',
          unread: 0,
          avatar: 'https://picsum.photos/id/1044/200/200'
        },
        {
          id: 3,
          sender: '音乐电台',
          text: '本周热门歌曲榜单已更新',
          time: '昨天',
          unread: 0,
          avatar: 'https://picsum.photos/id/1047/200/200'
        },
        {
          id: 4,
          sender: '和声之美',
          text: '关于你分享的那首歌，我有一些想法...',
          time: '周二',
          unread: 2,
          avatar: 'https://picsum.photos/id/1051/200/200'
        },
        {
          id: 5,
          sender: '钢琴诗人',
          text: '下周末有个钢琴演奏会，要一起参加吗？',
          time: '周一',
          unread: 0,
          avatar: 'https://picsum.photos/id/1055/200/200'
        },
        {
          id: 6,
          sender: '吉他手',
          text: '我改编了你喜欢的那首歌的吉他版',
          time: '周日',
          unread: 0,
          avatar: 'https://picsum.photos/id/1060/200/200'
        },
        {
          id: 7,
          sender: '音乐制作人',
          text: '关于你上次问的制作问题，我整理了一些资料',
          time: '上周',
          unread: 0,
          avatar: 'https://picsum.photos/id/1062/200/200'
        }
      ]
    }
  },
  onLoad(options) {
    if (options.songId) {
      console.log('Song ID:', options.songId);
    }
  },
  methods: {
    handleMessageClick(id) {
      console.log('Message clicked:', id);
      uni.navigateTo({
        url: '/pages/chat/chat?id=' + id
      });
    }
  }
}
</script>

<style lang="scss">
.message-page {
  padding: 0;
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    padding: 30rpx 30rpx 20rpx;
    background-color: #fff;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

    .title {
      font-size: 40rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
      display: block;
    }

    .search-bar {
      display: flex;
      align-items: center;
      background-color: #f1f1f1;
      border-radius: 50rpx;
      padding: 15rpx 25rpx;

      .search-input {
        flex: 1;
        margin-left: 15rpx;
        font-size: 28rpx;
        color: #333;
      }
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 20rpx;

    .message-section {
      background-color: #fff;
      padding: 20rpx 30rpx;
      margin-bottom: 20rpx;

      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
        display: block;
      }

      .recent-contacts {
        white-space: nowrap;

        .contact-avatar {
          display: inline-block;
          margin-right: 30rpx;
          text-align: center;

          .avatar {
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
            margin-bottom: 10rpx;
            border: 2rpx solid #f1f1f1;
          }

          .contact-name {
            font-size: 24rpx;
            color: #666;
            display: block;
            width: 100rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

    .message-list {
      background-color: #fff;

      .message-item {
        display: flex;
        padding: 25rpx 30rpx;
        position: relative;
        border-bottom: 1rpx solid #f1f1f1;

        .avatar {
          width: 90rpx;
          height: 90rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }

        .message-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .message-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10rpx;

            .message-sender {
              font-size: 32rpx;
              font-weight: bold;
              color: #333;
            }

            .message-time {
              font-size: 24rpx;
              color: #999;
            }
          }

          .message-text {
            font-size: 28rpx;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 500rpx;
          }

          .message-badge {
            position: absolute;
            right: 30rpx;
            top: 50%;
            transform: translateY(-50%);
            background-color: #ff5a5f;
            color: #fff;
            font-size: 22rpx;
            width: 36rpx;
            height: 36rpx;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>