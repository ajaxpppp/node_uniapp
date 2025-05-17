<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<view v-if="isLoading">
					<m-for-skeleton
						:avatarSize="200"
						:row="3"
						:loading="isLoading"
						isarc="square"
						v-for="(item,key) in 4"
						:titleStyle="{}"
						:title="false"
						:key="key">
					</m-for-skeleton>
				</view>
				<view class="index-list" v-else>
					<view class="index-list-item" v-for="(item,index) in recommendedList" :key="index" @tap="handleToList(item.listId)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{ item.updateFrequency }}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(track,trackIndex) in item.tracks" :key="trackIndex">{{ trackIndex + 1 }}.{{ track.first }} - {{ track.second }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css';
	import musichead from '../../components/musichead/musichead.vue';
	import { topList } from '../../common/api.js';
	import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton";

	export default {
		data() {
			return {
				topList: [],
				recommendedList: [],
				isLoading: true
			};
		},
		components: {
			musichead,
			mForSkeleton
		},
		onLoad() {
			topList().then((res) => {
				if (res.length) {
					setTimeout(() => {
						this.topList = res;
						this.generateRecommendations();
						this.isLoading = false;
					}, 1000);
				}
			});
		},
		methods: {
			generateRecommendations() {
				const userHistory = uni.getStorageSync('userHistory') || {
					favoriteArtists: ['单依纯'],
					favoriteSongs: ['珠玉'],
					listenCount: { '珠玉': 10 }
				};
				const { favoriteArtists, favoriteSongs, listenCount } = userHistory;

				const scoredLists = this.topList.map(list => {
					let score = 0;
					const tracks = list.tracks || [];
					tracks.forEach(track => {
						if (favoriteArtists.includes(track.second)) score += 10;
						if (favoriteSongs.includes(track.first)) score += 15;
						if (listenCount[track.first]) score += listenCount[track.first] * 2;
					});
					score += (list.playCount / 1000000) + (list.subscribedCount / 10000);
					return { ...list, score };
				});

				const sortedLists = scoredLists.sort((a, b) => b.score - a.score);
				const topLists = sortedLists.slice(0, 10); // 取前10个歌单
				const randomizedLists = this.shuffleArray([...topLists]);
				this.recommendedList = randomizedLists;
			},
			shuffleArray(array) {
				for (let i = array.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[array[i], array[j]] = [array[j], array[i]];
				}
				return array;
			},
			handleToList(listId) {
				uni.navigateTo({
					url: '/pages/list/list?listId=' + listId
				});
			},
			handleToSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			}
		}
	};
</script>

<style scoped>
	.index {}
	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}
	.index-search text {
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}
	.index-search input {
		font-size: 28rpx;
		flex: 1;
	}
	.index-list {
		margin: 0 30rpx;
	}
	.index-list-item {
		display: flex;
		margin-bottom: 34rpx;
	}
	.index-list-img {
		width: 212rpx;
		height: 212rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}
	.index-list-img image {
		width: 100%;
		height: 100%;
	}
	.index-list-img text {
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color: white;
		font-size: 20rpx;
	}
	.index-list-text {
		font-size: 24rpx;
		line-height: 66rpx;
	}
</style>