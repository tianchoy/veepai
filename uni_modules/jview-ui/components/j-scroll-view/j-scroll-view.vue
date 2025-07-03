<template>
	<scroll-view :scroll-y="true" class="j-scroll-view"
	  :refresher-threshold="100" 
		@refresherrefresh="refresherrefresh"
		:refresher-triggered="isRefresher"
		refresher-background="transparent"
		:refresher-enabled="true"
		@touchmove="move"
		@touchend="end"
		@scroll="scroll"
		@scrolltolower="scrolltolower">
		<view v-if="refreshBool" class="j-scroll-view-vt" :style="{height:refresherNum+'px'}">
			<slot name="refresh">
				<j-loading-icon size="50rpx"></j-loading-icon>
			</slot>
		</view>
		<view class="j-scroll-view-v" :style="listViewStyle" v-if="loading || !empty">
			<slot></slot>
			<view class="j-scroll-view-load" v-if="loading">
				<text class="j-scroll-view-load-t">{{moreLabel}}</text>
			</view>
		</view>
		<slot v-else name="empty">
			<view class="j-scroll-view-empty">
				<j-empty class="j-scroll-view-empty-v"></j-empty>
			</view>
		</slot>
	</scroll-view>
</template>

<script>
	/**
	 * 使用注意事项
	 * 支付宝等需要禁用页面的下拉刷新，不然无法触发，pages.json中对应页面加一下属性
	 * "enablePullDownRefresh": false,
	 * "allowsBounceVertical":"NO"
	 */
	
	export default{
		name:'j-scroll-view',
		props:{
			isRefresher:{ //是否在刷新
				type:Boolean,
				default:false,
			},
			showLoading:{ // 是否显示加载遮挡层
				type:Boolean,
				default:false,
			},
			loading:{ //是否在加载数据
				type:Boolean,
				default:false,
			},
			empty:{ //是否显示无数据
				type:Boolean,
				default:false,
			},
			listViewStyle:{ //滑动内的盒子样式
				type:String,
				default:""
			},
			moreLabel:{
				type:String,
				default:"加载中..."
			}
		},
		data(){
			return {
				refresherNum:0, // 下拉刷新的高度
				refreshBool:false, // 是否需要开启监听下拉刷新，主要是兼容平台
			}
		},
		watch:{
			loading(){
				this.show();
			},
			isRefresher(){
				if(!this.isRefresher){
					this.refresherNum = 0
				}
			}
		},
		created() {
			this.top = 0; // 顶部滑动的距离
			this.startY = ''; // 记录开始的位置
			this.refresherCount = 68;
			this.dampingFactor = 0.8; // 阻尼系数，值越大阻尼越明显
			
			// #ifndef APP-VUE || H5 || MP-WEIXIN
			this.refreshBool = true;
			// #endif
			this.show();
		},
		methods:{
			show(){
				if(this.showLoading){
					if(this.loading){
						uni.showLoading({
							title:this.moreLabel
						})
					}else{
						uni.hideLoading();
					}
				}
			},
			move(e){ // 主要是为了兼容下拉刷新的
				if(!this.refreshBool) return;
				if(this.top){
					this.refresherNum = 0;
					return ;
				}
				const touches = e.touches||e.changedTouches;
				const obj = touches[0];
				if(obj){
					if(this.top===0 && this.startY === ""){
						this.startY = obj.pageY;
					}
					let num = 0;
					if(this.top === 0){
						num = (obj.pageY - this.startY)*this.dampingFactor;
					}
					if(num<0){
						if(this.refresherNum === 0) return ;
						num = 0;
					}
					const count = num - this.refresherCount;
					if(count>0){
						num = this.refresherCount+count*0.5
					}
					this.refresherNum = num;
				}
			},
			end(){ // 主要是为了兼容下拉刷新的
				if(!this.refreshBool) return;
				if(this.refresherNum >= this.refresherCount){
					this.refresherNum = this.refresherCount;
					this.refresherrefresh();
				}else{
					this.refresherNum = 0;
				}
				this.startY = "";
			},
			refresherrefresh() {
				this.$emit("refresh")
			},
			scroll(e){
				if(!this.refreshBool) return;
				const {scrollTop} = e.detail;
				if(scrollTop<=0 && this.top){
					this.top = 0;
				}else if(scrollTop>0 && !this.top){
					this.top = scrollTop
				}
			},
			scrolltolower(){
				this.$emit("loadData")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../bem.scss";
	.j-scroll-view{
		/* #ifdef APP-NVUE */
		flex:1;
		/* #endif */
		height:100%;
		&-v{
			&t{
				@include flexRow(center);
				/* #ifndef APP-NVUE */
				transition:0.1s;
				/* #endif */
				overflow: hidden;
			}
		}
		&-empty{
			/* #ifdef APP-NVUE */
			flex:1;
			/* #endif */
			height: 100%;
			@include flexRow(center);
			&-v{
				/* #ifdef APP-NVUE */
				flex:1;
				/* #endif */
				/* #ifndef APP-NVUE */
				height: 100%;
				width: 100%;
				/* #endif */
			}
		}
		&-load{
			display: flex;
			@include flexRow(center);
			padding: 30rpx 0;
			&-t{
				color:$color-info;
			}
		}
	}
</style>