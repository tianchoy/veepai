<template>
	<view class="j-preview">
		<slot>
			<j-navbar :title="title" leftIconSize="40rpx" titleStyle="font-weight:600;font-size:32rpx;" leftText="返回"
				bgColor="#000" leftIconColor="#ffffff" titleColor="#ffffff" :autoBack="false"
				@leftClick="cancel"></j-navbar>
		</slot>
		<view class="j-preview-v" ref="previewRef">
			<video v-if="isVideo" class="j-preview-view" id="video" loop
				:src="list[current].url" :enable-progress-gesture="false"></video>
			<j-swiper v-else :list="swiperList" v-model="currentIndex" :height="height+'px'" :showAction="showAction"></j-swiper>
		</view>
	</view>
</template>

<script>
import { getDomStyle } from '../../utils';

/**
 * 预览图片或视频
 * 使用该组件需独立的一个页面，不然支付宝小程序顶部导航栏会有问题
 */
export default {
	name: 'j-preview',
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		},
		current: {
			type: Number,
			default: 0
		},
		autoVideo: { // 是否自动播放video
			type: Boolean,
			default: true
		},
		showAction:{ // 是否显示左右两边的操作按钮
			type:Boolean,
			default:false,
		},
	},
	data() {
		return {
			currentIndex: 0,
			title:'',
			height:0,
		}
	},
	computed: {
		isVideo(){
			return this.list[this.current]?.type === 'video'
		},
		swiperList(){
			const arr = [];
			const {list, current} = this;
			let num = current;
			list.forEach((item,index)=>{
				if(item.type === 'video'){
					if(index<current){
						num--;
					}
				}else{
					arr.push({
						image:item.url,
						mode:'aspectFit',
						bgColor:'#000'
					});
				}
			})
			this.currentIndex = num;
			return arr;
		}
	},
	watch:{
		currentIndex:{
			immediate: true,
			handler(newVal) {
				this.getTitle();
			},
		},
		swiperList(){
			this.getTitle();
		}
	},
	beforeDestroy() {
		this.pauseVideo();
	},
	mounted() {
		if (this.isVideo) {
			this.playVideo();
		}else{
			this.getHeight();
		}
	},
	methods: {
		getTitle(){
			const {isVideo, swiperList, currentIndex} = this;
			this.title = isVideo?'1/1':`${currentIndex + 1}/${swiperList.length}`;
		},
		getHeight(){
			getDomStyle(this, 'previewRef', '.j-preview-v').then(res=>{
				this.height = res.height
			})
		},
		playVideo() {
			this.videoContext = uni.createVideoContext('video', this);
			this.autoVideo && this.videoContext.play();
		},
		pauseVideo() {
			if (this.videoContext) {
				this.videoContext.pause();
				this.videoContext.stop();
				this.videoContext = undefined;
			}
		},
		cancel() {
			this.pauseVideo();
			this.$emit('cancel');
		},
	}
}
</script>

<style scoped lang="scss">
@import "../../bem.scss";
@mixin flexColumn {
		display: flex;
		flex-direction: column;
	}
@include b(preview) {
	/* #ifdef APP-NVUE */
	flex:1;
	/* #endif */
	/* #ifndef APP-NVUE */
	height: 100%;
	width: 100%;
	/* #endif */
	@include flexColumn;
	background-color: #000;
	&-v {
		flex: 1;
		@include flexColumn;
	}
	&-view{
		flex:1;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}
}
</style>