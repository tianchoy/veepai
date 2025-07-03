<template>
	<view class="j-navbar">
		<view class="j-navbar--placeholder" v-if="fixed && placeholder" :style="navbarStyle"></view>
		<view :class="{'j-navbar--fixed':fixed}" :style="viewStyle">
			<j-status-bar v-if="safeAreaInsetTop"></j-status-bar>
			<view class="j-navbar--content" :class="{'j-navbar--content__border':border}" :style="{height:addUnit(height)}">
				<view class="j-navbar--content--v">
					<view v-if="!isNative" @click="leftClick" class="j-navbar--content--vc">
						<slot name="left">
							<j-icon v-if="leftIcon" :type="leftIcon" style="line-height:0" :size="leftIconSize"
								:color="leftIconColor"></j-icon>
							<text class="j-navbar--content--text" v-if="leftText" :style="{color:leftIconColor}">{{ leftText }}</text>
						</slot>
					</view>
				</view>
				<slot name="center">
					<text v-if="!isNative || (leftText&&title)" class="j-navbar--content--title"
						:style="centerStyle">{{ title }}</text>
				</slot>
				<view class="j-navbar--content--v j-navbar--content--v__right">
					<view @click="rightClick" class="j-navbar--content--vc">
						<slot name="right">
							<text class="j-navbar--content--text" v-if="rightText"
								:style="{color:rightIconColor}">{{ rightText }}</text>
							<j-icon v-if="rightIcon" :type="rightIcon" style="line-height:0" :size="rightIconSize"
								:color="rightIconColor"></j-icon>
						</slot>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		addUnit,
		getPx,
		getWindowInfo,
		addStyle
	} from "../../utils/index"
	export default {
		name: 'j-navbar',
		props: {
			// 是否开启顶部安全区适配
			safeAreaInsetTop: {
				type: Boolean,
				default: true
			},
			// 固定在顶部时，是否生成一个等高元素，以防止塌陷
			placeholder: {
				type: Boolean,
				default: true
			},
			// 是否固定在顶部
			fixed: {
				type: Boolean,
				default: true
			},
			// 是否显示下边框
			border: {
				type: Boolean,
				default: false
			},
			// 左边的图标
			leftIcon: {
				type: String,
				default: 'left'
			},
			// 左边的提示文字
			leftText: {
				type: String,
				default: ''
			},
			// 左右的提示文字
			rightText: {
				type: String,
				default: ''
			},
			// 右边的图标
			rightIcon: {
				type: String,
				default: ''
			},
			// 标题
			title: {
				type: [String, Number],
				default: ''
			},
			// 标题颜色
			titleColor: {
				type: String,
				default: '#000000'
			},
			// 背景颜色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			bgStyle: { // 设备背景图片这些会用到
				type: [String, Object],
				default: ''
			},
			// 标题的宽度
			titleWidth: {
				type: [String, Number],
				default: '400rpx'
			},
			// 导航栏高度
			height: {
				type: [String, Number],
				default: '44px'
			},
			// 左侧返回图标的大小
			leftIconSize: {
				type: [String, Number],
				default: 20
			},
			// 左侧返回图标的颜色
			leftIconColor: {
				type: String,
				default: 'rgb(48, 49, 51)'
			},
			// 左侧返回图标的大小
			rightIconSize: {
				type: [String, Number],
				default: 20
			},
			// 左侧返回图标的颜色
			rightIconColor: {
				type: String,
				default: 'rgb(48, 49, 51)'
			},
			// 点击左侧区域(返回图标)，是否自动返回上一页
			autoBack: {
				type: Boolean,
				default: true
			},
			// 标题的样式，对象或字符串
			titleStyle: {
				type: [String, Object],
				default: ''
			}
		},
		data() {
			return {
				isNative: false, // 支付宝原生导航就无法完全隐藏
			}
		},
		computed: {
			navbarStyle() {
				return `height:${addUnit(getPx(this.height) + getWindowInfo().statusBarHeight,'px')}`;
			},
			centerStyle() {
				return `width:${addUnit(this.titleWidth)}; color:${this.titleColor}; ${addStyle(this.titleStyle, 'string')}`;
			},
			viewStyle() {
				return `background-color:${this.bgColor};${addStyle(this.bgStyle, 'string')};`;
			}
		},
		created() {
			// #ifdef MP-ALIPAY
			this.isNative = true;
			const title = this.leftText && this.title ? this.leftText : this.title;
			const backgroundColor = (this.bgColor === '#000000' || this.bgColor === '#000') ? '#000000' : '#ffffff';
			if(my.setNavigationBarTitle){
				my.setNavigationBarTitle({
					title,
				});
				my.setNavigationBarColor({
					frontColor: this.titleColor,
					backgroundColor,
				})
			}else if(my.setNavigationBar){ // 钉钉小程序
				my.setNavigationBar({
					title,
					backgroundColor,
				})
			}
			// #endif
		},
		methods: {
			addUnit,
			// 点击左侧区域
			leftClick() {
				// 如果配置了autoBack，自动返回上一页
				this.$emit('leftClick');
				if (this.autoBack) {
					try {
						uni.navigateBack();
					} catch (err) {}
				}
			},
			// 点击右侧区域
			rightClick() {
				this.$emit('rightClick')
			},
		}
	}
</script>
<style scoped lang="scss">
	@import "../../bem.scss";

	@include b(navbar) {
		@include m(fixed) {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			z-index: 11;
		}

		@include m(content) {
			@include flexRow;

			@include m(v) {
				@include flexRow;
				flex: 1;
				width: 0;
				padding: 0 24rpx;

				&c {
					@include flexRow;
					width: fit-content;
				}

				@include e(right) {
					justify-content: flex-end;
				}
			}

			@include m(text) {
				font-size: 15px;
				margin-left: 3px;
			}

			@include m(title) {
				font-size: 16px;
				text-align: center;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>