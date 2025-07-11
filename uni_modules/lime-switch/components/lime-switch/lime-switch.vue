<template>
	<view class="demo-block">
		<text class="demo-block__title-text ultra">Switch 开关</text>
		<text class="demo-block__desc-text">用于控制某个功能的开启和关闭。</text>	
		<view class="demo-block__body">
			<view class="demo-block card">
				<text class="demo-block__title-text">基础用法</text>
				<view class="demo-block__body">
					<l-switch v-model="checked"></l-switch>
				</view>	
			</view>	
			<view class="demo-block card">
				<text class="demo-block__title-text">禁用状态</text>
				<view class="demo-block__body">
					<l-switch v-model="checked" disabled></l-switch>
				</view>	
			</view>	
			<view class="demo-block card">
				<text class="demo-block__title-text">加载状态</text>
				<view class="demo-block__body">
					<l-switch loading></l-switch>
				</view>	
			</view>	
			
			<view class="demo-block card">
				<text class="demo-block__title-text">形状</text>
				<view class="demo-block__body row">
					<l-switch :round="false" ></l-switch>
					<view style="width: 20px;"></view>
					<l-switch></l-switch>
				</view>	
			</view>
			<view class="demo-block card">
				<text class="demo-block__title-text">占位符</text>
				<view class="demo-block__body">
					<l-switch :defaultValue="true" :placeholder="['人生得意须尽欢', '莫使金樽空对月']"></l-switch>
				</view>	
			</view>	
			<view class="demo-block card">
				<text class="demo-block__title-text">自定义尺寸</text>
				<view class="demo-block__body row">
					<l-switch dotSize="14px" height="18px" width="32px"></l-switch>
					<view style="width: 20px;"></view>
					<l-switch dotSize="14px" height="22px" width="40px"></l-switch>
					<view style="width: 20px;"></view>
					<l-switch dotSize="18px" height="26px" width="48px"></l-switch>
				</view>	
			</view>
			<view class="demo-block card">
				<text class="demo-block__title-text">自定义颜色</text>
				<view class="demo-block__body">
					<l-switch  checkedColor="#ffb300" uncheckedColor="#33c471" :placeholder="['长风破浪会有时', '直挂云帆济沧海']"></l-switch>
				</view>	
			</view>	
			<view class="demo-block card">
				<text class="demo-block__title-text">自定义图标</text>
				<view class="demo-block__body row">
					<l-switch>
						<template #icon="{checked}">
							<text>🤔</text>
						</template>
					</l-switch>
					<view style="width: 20px;"></view>
					<l-switch>
						<template #icon="{checked}">
							<text style="font-size:13px" v-show="checked">开</text>
							<text style="font-size:13px" v-show="!checked">关</text>
						</template>
					</l-switch>
				</view>	
			</view>	
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false
			}
		}
	}
</script>

<style lang="scss">
	.row {
		display: flex;
		flex-direction: row;
	}
	
	.demo-block {
		margin: 32px 14px 0;
		// overflow: visible;
		&.card{
			background-color: white;
			padding: 30rpx;
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
			margin: 16px 0 0;
			overflow: visible;
			.demo-block {
				// margin-top: 0px;
				margin: 0;
			}
		}
	}
</style>