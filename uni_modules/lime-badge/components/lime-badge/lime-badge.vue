<template>
	<view class="demo-block">
		<text class="demo-block__title-text ultra">徽标</text>
		<text class="demo-block__desc-text">用于告知用户，该区域的状态变化或者待处理任务的数量。</text>	
		<view class="demo-block__body">
			<view class="demo-block card">
				<text class="demo-block__title-text large">基础</text>
				<view class="demo-block__body">
					
					<view class="preview" >
						<l-badge content="500">
							<view class="child"/>
						</l-badge>
						<l-badge :content="10">
							<view class="child" />
						</l-badge>
						<l-badge content="Hot">
							<view class="child" />
						</l-badge>
						<l-badge :dot="true">
							<view class="child" />
						</l-badge>
					</view>
				</view>	
			</view>	
			<view class="demo-block card">
				<text class="demo-block__title-text large">最大值</text>
				<view class="demo-block__body">
					<view class="preview">
						<l-badge content="20" :max="9">
							<view class="child" />
						</l-badge>
						<l-badge content="50" :max="20">
							<view class="child" />
						</l-badge>
						<l-badge content="200" :max="99">
							<view class="child" />
						</l-badge>
					</view>
				</view>	
			</view>	
			<view class="demo-block card">
				<text class="demo-block__title-text large">徽标颜色</text>
				<view class="demo-block__body">
					<view class="preview">
						<l-badge content="5" color="#1989fa">
							<view class="child" />
						</l-badge>
						<l-badge content="10" color="#1989fa">
							<view class="child" />
						</l-badge>
						<l-badge :dot="true" color="#1989fa">
							<view class="child" />
						</l-badge>
					</view>
				</view>	
			</view>	
			<view class="demo-block card">
				<text class="demo-block__title-text large">徽标内容</text>
				<view class="demo-block__body">
					<view class="preview">
						<l-badge>
							<view class="child" />
							<template #content>你好</template>
						</l-badge>
						<l-badge>
							<view class="child" />
							<template #content>999</template>
						</l-badge>
					</view>
				</view>	
			</view>	
			<view class="demo-block card">
				<text class="demo-block__title-text large">徽标位置</text>
				<view class="demo-block__body">
					<view class="preview">
						<l-badge content="10" position="top-left">
							<view class="child" />
						</l-badge>
						<l-badge content="10" position="bottom-left">
							<view class="child" />
						</l-badge>
						<l-badge content="10" position="bottom-right">
							<view class="child" />
						</l-badge>
					</view>
				</view>	
			</view>	
			<view class="demo-block card">
				<text class="demo-block__title-text large">独立展示</text>
				<view class="demo-block__body">
					<view class="preview">
						<l-badge content="20" />
						<l-badge content="200" :max="88" />
					</view>
				</view>	
			</view>	
		</view>	
	</view>
</template>
<script>
</script>
<style lang="scss">
	// *{overflow:visible}
	.preview {
		padding-top: 20px;
		flex-direction: row;
		justify-content: space-around;
		overflow: visible;
		// padding-left: 20px;
	}

	.child {
		width: 50px;
		height: 50px;
		background: #eee;
		border-radius: 4px;
	}
	
	.demo-block {
		margin: 32px 10px 0;
		overflow: visible;
		&.card{
			padding: 30rpx;
			background-color: white;
			margin-bottom: 20rpx !important;
		}
		&__title {
			margin: 0;
			margin-top: 8px;
			&-text {
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