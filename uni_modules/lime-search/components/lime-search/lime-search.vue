<template>
	<view class="demo-block">
		<text class="demo-block__title-text ultra">Search 搜索框</text>
		<text class="demo-block__desc-text">用于用户输入搜索信息，并进行页面内容搜索</text>
		<view class="demo-block__body">
			<view class="demo-block">
				<text class="demo-block__title-text">基础用法{{value}}</text>
				<view class="demo-block__body search">
					<l-search :value="value" @change="onChange" placeholder="请输入关键字"></l-search>
				</view>
			</view>
			
			<view class="demo-block">
				<text class="demo-block__title-text">事件监听</text>
				<view class="demo-block__body">
					<l-search class="search" v-model="value" @change="onChange" @blur="onBlur" @clear="onClear" @focus="onFocus" @submit="onSubmit" @action-click="onActionClick" placeholder="请输入关键字" action="取消"></l-search>
				</view>
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">搜索框内容对齐</text>
				<view class="demo-block__body">
					<l-search class="search" v-model="value" :center="true" placeholder="请输入关键字" ></l-search>
				</view>
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">禁用</text>
				<view class="demo-block__body">
					<l-search class="search" v-model="value" :disabled="true" placeholder="请输入关键字" ></l-search>
				</view>
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">形状</text>
				<view class="demo-block__body">
					<l-search class="search" v-model="value" shape="round" placeholder="请输入关键字" ></l-search>
				</view>
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">自定义</text>
				<view class="demo-block__body">
					<l-search class="search" padding="16rpx 5rpx 16rpx 24rpx" v-model="value" shape="round" placeholder="请输入关键字" >
						<template #left>
							<text style="padding-right: 10px; color: #666">地址</text>
						</template>
						<template #right-icon>
							<l-button type="primary" size="small" shape="round">搜索</l-button>
						</template>
					</l-search>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		methods:{
			onChange(value) {
				console.log('onChange', value)
			},
			onBlur(value) {
				console.log('onBlur', value)
			},
			onClear(value) {
				console.log('onClear', value)
			},
			onFocus(value) {
				console.log('onFocus', value)
			},
			onSubmit(value) {
				console.log('onSubmit', value)
			},
			onActionClick() {
				console.log('click')
			}
		}
	}
</script>

<style lang="scss">
	.search {
		background-color: white;
		padding: 8px 16px;
	}
	.btn {
		margin-bottom: 20rpx;
		margin-right: 20rpx;
		align-self: center;
	}

	.demo-block {
		margin: 32px 0 0;

		// overflow: visible;
		&.card {
			background-color: white;
			padding: 30rpx;
			margin-left: 10px !important;
			margin-right: 10px !important;
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
				display: flex;
				margin-left: 20px;

				&.large {
					color: rgba(0, 0, 0, 0.9);
					font-size: 18px;
					font-weight: 700;
					line-height: 26px;
					margin-left: 20px;
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
			margin-left: 20px;
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