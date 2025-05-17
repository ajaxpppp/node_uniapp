<template>
  <view class="discover-page">
    <!-- 顶部标题和搜索 -->
    <view class="header">
      <text class="title">发现</text>
      <view class="search-box">
        <image src="https://cdn-icons-png.flaticon.com/512/149/149852.png" class="search-icon" />
        <input placeholder="搜索音乐、歌单、歌手" class="search-input" />
      </view>
    </view>

    <!-- 轮播图 -->
    <swiper class="banner" indicator-dots autoplay circular>
      <swiper-item>
        <image src="https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=600" class="banner-image" mode="aspectFill" />
      </swiper-item>
      <swiper-item>
        <image src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600" class="banner-image" mode="aspectFill" />
      </swiper-item>
      <swiper-item>
        <image src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600" class="banner-image" mode="aspectFill" />
      </swiper-item>
    </swiper>

    <!-- 分类入口 -->
    <view class="category-section">
      <view class="section-header">
        <text class="section-title">音乐分类</text>
        <text class="section-more">全部 ></text>
      </view>
      <view class="category-grid">
        <view class="category-item">
          <image src="https://cdn-icons-png.flaticon.com/512/3659/3659899.png" class="category-icon" />
          <text class="category-name">流行</text>
        </view>
        <view class="category-item">
          <image src="https://cdn-icons-png.flaticon.com/512/3659/3659904.png" class="category-icon" />
          <text class="category-name">摇滚</text>
        </view>
        <view class="category-item">
          <image src="https://cdn-icons-png.flaticon.com/512/3659/3659919.png" class="category-icon" />
          <text class="category-name">电子</text>
        </view>
        <view class="category-item">
          <image src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png" class="category-icon" />
          <text class="category-name">民谣</text>
        </view>
        <view class="category-item">
          <image src="https://cdn-icons-png.flaticon.com/512/3659/3659929.png" class="category-icon" />
          <text class="category-name">嘻哈</text>
        </view>
        <view class="category-item">
          <image src="https://cdn-icons-png.flaticon.com/512/3659/3659947.png" class="category-icon" />
          <text class="category-name">爵士</text>
        </view>
        <view class="category-item">
          <image src="https://cdn-icons-png.flaticon.com/512/3659/3659934.png" class="category-icon" />
          <text class="category-name">古典</text>
        </view>
        <view class="category-item">
          <image src="https://cdn-icons-png.flaticon.com/512/3659/3659895.png" class="category-icon" />
          <text class="category-name">R&B</text>
        </view>
      </view>
    </view>

    <!-- 推荐歌单 -->
    <view class="playlist-section">
      <view class="section-header">
        <text class="section-title">推荐歌单</text>
        <text class="section-more">更多 ></text>
      </view>
      <scroll-view scroll-x class="playlist-scroll">
        <view class="playlist-item">
          <image src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300" class="playlist-cover" />
          <text class="playlist-name">2023年度热歌</text>
          <text class="playlist-count">3250万播放</text>
        </view>
        <view class="playlist-item">
          <image src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" class="playlist-cover" />
          <text class="playlist-name">深夜工作必备</text>
          <text class="playlist-count">1280万播放</text>
        </view>
        <view class="playlist-item">
          <image src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" class="playlist-cover" />
          <text class="playlist-name">运动能量站</text>
          <text class="playlist-count">2560万播放</text>
        </view>
        <view class="playlist-item">
          <image src="https://images.unsplash.com/photo-1501612780327-45045538702b?w=300" class="playlist-cover" />
          <text class="playlist-name">华语经典</text>
          <text class="playlist-count">4320万播放</text>
        </view>
        <view class="playlist-item">
          <image src="https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300" class="playlist-cover" />
          <text class="playlist-name">欧美流行</text>
          <text class="playlist-count">1890万播放</text>
        </view>
      </scroll-view>
    </view>

    <!-- 新歌速递 -->
    <view class="new-song-section">
      <view class="section-header">
        <text class="section-title">新歌速递</text>
        <text class="section-more">更多 ></text>
      </view>
      <view class="song-list">
        <view class="song-item">
          <text class="song-index">1</text>
          <view class="song-info">
            <text class="song-name">夏天的风</text>
            <text class="song-artist">周杰伦 · 夏日特辑</text>
          </view>
          <image src="https://cdn-icons-png.flaticon.com/512/2089/2089793.png" class="song-more" />
        </view>
        <view class="song-item">
          <text class="song-index">2</text>
          <view class="song-info">
            <text class="song-name">星辰大海</text>
            <text class="song-artist">张靓颖 · 星空</text>
          </view>
          <image src="https://cdn-icons-png.flaticon.com/512/2089/2089793.png" class="song-more" />
        </view>
        <view class="song-item">
          <text class="song-index">3</text>
          <view class="song-info">
            <text class="song-name">追光者</text>
            <text class="song-artist">岑宁儿 · 电视剧原声</text>
          </view>
          <image src="https://cdn-icons-png.flaticon.com/512/2089/2089793.png" class="song-more" />
        </view>
        <view class="song-item">
          <text class="song-index">4</text>
          <view class="song-info">
            <text class="song-name">起风了</text>
            <text class="song-artist">买辣椒也用券 · 青春</text>
          </view>
          <image src="https://cdn-icons-png.flaticon.com/512/2089/2089793.png" class="song-more" />
        </view>
        <view class="song-item">
          <text class="song-index">5</text>
          <view class="song-info">
            <text class="song-name">平凡之路</text>
            <text class="song-artist">朴树 · 猎户星座</text>
          </view>
          <image src="https://cdn-icons-png.flaticon.com/512/2089/2089793.png" class="song-more" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad(options) {
    if (options.listId) {
      console.log('List ID:', options.listId);
    }
  }
}
</script>

<style>
/* 基础样式 */
.discover-page {
  padding: 20rpx 25rpx;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 头部样式 */
.header {
  margin-bottom: 30rpx;
}

.title {
  font-size: 44rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50rpx;
  padding: 15rpx 25rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.search-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 15rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #666;
}

/* 轮播图样式 */
.banner {
  height: 300rpx;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
}

.banner-image {
  width: 100%;
  height: 100%;
}

/* 分类入口样式 */
.category-section {
  margin-bottom: 40rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25rpx;
}

.section-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

.section-more {
  font-size: 26rpx;
  color: #999;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-icon {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 15rpx;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.category-name {
  font-size: 26rpx;
  color: #666;
}

/* 推荐歌单样式 */
.playlist-section {
  margin-bottom: 40rpx;
}

.playlist-scroll {
  white-space: nowrap;
  width: 100%;
}

.playlist-item {
  display: inline-block;
  width: 220rpx;
  margin-right: 20rpx;
}

.playlist-cover {
  width: 100%;
  height: 220rpx;
  border-radius: 12rpx;
  margin-bottom: 12rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.playlist-name {
  display: block;
  font-size: 28rpx;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-count {
  font-size: 22rpx;
  color: #999;
}

/* 新歌速递样式 */
.new-song-section {
  margin-bottom: 40rpx;
}

.song-list {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 0 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.song-item {
  display: flex;
  align-items: center;
  padding: 25rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.song-item:last-child {
  border-bottom: none;
}

.song-index {
  width: 60rpx;
  text-align: center;
  font-size: 30rpx;
  color: #999;
  font-weight: bold;
}

.song-info {
  flex: 1;
  margin-left: 10rpx;
}

.song-name {
  display: block;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 5rpx;
}

.song-artist {
  font-size: 24rpx;
  color: #999;
}

.song-more {
  width: 40rpx;
  height: 40rpx;
  opacity: 0.6;
}
</style>