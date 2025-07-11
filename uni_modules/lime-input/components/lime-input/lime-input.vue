<template>
	<view class="demo-block">
		<text class="demo-block__title-text ultra">Input 输入框</text>
		<text class="demo-block__desc-text">用于文本信息输入。</text>	
		<view class="demo-block__body">
			<view class="demo-block">
				<text class="demo-block__title-text">基础使用</text>
				<view class="demo-block__body">
					<l-input placeholder="请输入文字"></l-input>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text">标题</text>
				<view class="demo-block__body">
					<l-input label="标签文字" placeholder="请输入文字"></l-input>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text">字数限制</text>
				<view class="demo-block__body">
					<l-input label="标签文字" placeholder="请输入文字" :maxlength="10" tips="最大输入10个字符"></l-input>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text">前置图标</text>
				<view class="demo-block__body">
					<l-input label="标签文字" placeholder="请输入文字" prefix-icon="fingerprint-2" ></l-input>
				</view>	
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">前置图标插槽</text>
				<view class="demo-block__body">
					<l-input label="标签文字" placeholder="请输入文字" prefix-icon="fingerprint-2">
						<template #prefix-icon>
							<l-icon name="fingerprint-2" size="44rpx"></l-icon>
						</template>
					</l-input>
				</view>	
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">后置图标</text>
				<view class="demo-block__body">
					<l-input label="标签文字" placeholder="请输入文字" suffix-icon="info-circle-filled"></l-input>
				</view>	
			</view>
			 
			<view class="demo-block">
				<text class="demo-block__title-text">后置插槽</text>
				<view class="demo-block__body">
					<l-input label="标签文字" placeholder="请输入文字" >
						<template #suffix>
						     <l-button type="primary" size="mini"> 操作按钮 </l-button>
						</template>
					</l-input>
				</view>	
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">后置图标插槽</text>
				<view class="demo-block__body">
					<l-input label="标签文字" placeholder="请输入文字" >
						<template #suffix-icon>
							<l-icon name="user-avatar" size="44rpx"></l-icon>
						</template>
					</l-input>
				</view>	
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">密码</text>
				<view class="demo-block__body">
					<l-input label="输入密码" placeholder="请输入密码" v-model="value" type="password" clearable></l-input>
				</view>	
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">错误状态</text>
				<view class="demo-block__body">
					<l-input label="标签文字" placeholder="请输入文字" value="已输入文字" status="error" tips="辅助说明"></l-input>
				</view>	
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">禁用状态</text>
				<view class="demo-block__body">
					<l-input label="不可编辑" placeholder="请输入文字" value="不可编辑文字" disabled></l-input>
				</view>	
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">竖向布局</text>
				<view class="demo-block__body">
					<l-input label="标签文字" layout="vertical" placeholder="请输入文字"></l-input>
				</view>	
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 'password'
			}
		}
	}
</script>

<style lang="scss">
	.row{
		display: flex;
		// #ifndef APP-IOS || APP-ANDROID
		gap: 20rpx;
		// #endif
		flex-direction: row;
		flex-wrap: wrap;
	}
	.tag{
		// #ifdef APP-IOS || APP-ANDROID
		margin-right: 20rpx;
		// #endif
	}
	.demo-block {
		margin: 32px 0 0;
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
				margin-left: 16px;
				&.large {
					color: rgba(0, 0, 0, 0.9);
					font-size: 18px;
					font-weight: 700;
					line-height: 26px;
					display: flex;
				}
				&.ultra {
					color: rgba(0, 0, 0, 0.9);
					font-size: 24px;
					font-weight: 700;
					line-height: 32px;
					display: flex;
				}
			}
		}
		&__desc-text {
			color: rgba(0, 0, 0, 0.6);
			margin: 8px 16px 0 0;
			font-size: 14px;
			line-height: 22px;
			margin-left: 16px;
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