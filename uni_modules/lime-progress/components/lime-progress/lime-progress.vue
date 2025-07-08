<template>
	<view class="demo-block">
		<text class="demo-block__title-text ultra">进度条</text>
		<text class="demo-block__desc-text">用于展示任务当前的进度。</text>	
		<view class="demo-block__body">
			<view class="demo-block">
				<text class="demo-block__title-text large">基础</text>
				<view class="demo-block__body">
					<view style="height: 10px;"></view>
					<l-progress :percent="percent"></l-progress>
					<view style="height: 10px;"></view>
				</view>	
			</view>	
			
			<view class="demo-block">
				<text class="demo-block__title-text large">显示百分比</text>
				<view class="demo-block__body">
					<l-progress :percent="percent" :show-info="true"></l-progress>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text large">改变进度数值位置</text>
				<view class="demo-block__body">
					<l-progress :percent="percent" info-type="inner" info-align="start" :show-info="true" info-color="white"></l-progress>
					<view style="height: 15px;"></view>
					<l-progress :percent="percent" info-type="inner" info-align="end" :show-info="true" info-color="white"></l-progress>
					<view style="height: 15px;"></view>
					<l-progress :percent="percent" info-align="start" :show-info="true"></l-progress>
					<view style="height: 15px;"></view>
					<l-progress :percent="percent" info-align="end" :show-info="true"></l-progress>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text large">颜色</text>
				<view class="demo-block__body">
					<l-progress :percent="percent" strokeColor="#7232dd"></l-progress>
					<view style="height: 15px;"></view>
					<l-progress :percent="percent" strokeColor="#7232dd" info-type="inner" info-align="end" :show-info="true" info-color="white" ></l-progress>
				</view>	
			</view>	

			<button @touchstart="onClick(10)">增加</button>
			<button @touchstart="onClick(-10)">减少</button>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				percent: 50
			}
		},
		methods: {
			onClick(number) {
				this.percent = Math.max(Math.min(100, this.percent + number), 0)
			}
		}
	}
</script>

<style lang="scss">
	.demo-block {
		margin: 32px 20px 0;
		// overflow: visible;
		&.card{
			background-color: white;
			padding: 30rpx;
			margin-bottom: 20rpx;
		}
		&__title {
			margin: 0;
			margin-top: 8px;
			&-text {
				display: block;
				color: rgba(0, 0, 0, 0.6);
				font-weight: 400;
				font-size: 14px;
				line-height: 16px;
				
				&.large {
					color: rgba(0, 0, 0, 0.9);
					font-size: 18px;
					font-weight: 700;
					line-height: 26px;
				}
				&.ultra {
					color: rgba(0, 0, 0, 0.9);
					font-size: 24px;
					font-weight: 700;
					line-height: 32px;
				}
			}
		}
		&__desc-text {
			color: rgba(0, 0, 0, 0.6);
			margin: 8px 16px 0 0;
			font-size: 14px;
			line-height: 22px;
		}
		&__body {
			margin: 16px 0;
			overflow: visible;
			.demo-block {
				// margin-top: 0px;
				margin: 0;
			}
		}
	}
</style>