<template>
	<view v-if="show" class="j-popup" @click="hideModel(true)" @touchmove.stop.prevent :style="{alignItems}">
		<slot name="body">
			<view class="j-popup--body" :style="bodyStyle" @click.stop>
				<view class="j-popup--body-t" v-if="type!=='close'">
					<text class="j-popup--body-tl" @click="hideModel" :style="{color:cancelColor}">{{cancelText}}</text>
					<text class="j-popup--body-tv">{{title}}</text>
					<text class="j-popup--body-tr" @click="confirm" :style="{color:confirmColor}">{{confirmText}}</text>
				</view>
				<view class="j-popup--body-close" v-else>
					<view class="j-popup--body-close-v"></view>
					<view class="j-popup--body-close-c"><text class="j-popup--body-close-ct">{{title}}</text></view>
					<view class="j-popup--body-close-v"><j-icon type="closeempty" size="30rpx" @click="hideModel"></j-icon></view>
				</view>
				<slot></slot>
				<j-safe-bottom></j-safe-bottom>
			</view>
		</slot>
	</view>
</template>

<script>
	import {addUnit} from "../../utils/index";
	export default{
		name:'j-popup',
		props:{
			show:{
				type:Boolean,
				default:false,
			},
			title: { // 标题
			  type: String,
			  default: ''
			},
			// 取消按钮的文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确认按钮的文字
			confirmText: {
				type: String,
				default: '确认'
			},
			// 取消按钮的颜色
			cancelColor: {
				type: String,
				default: '#909193'
			},
			// 确认按钮的颜色
			confirmColor: {
				type: String,
				default: '#3c9cff'
			},
			// 是否允许点击遮罩关闭选择器
			closeOnClickOverlay: {
				type: Boolean,
				default: true
			},
			alignItems: {
				type: String,
				default: 'flex-end'
			},
			round:{ // 圆角
				type:[String,Number],
				default:0
			},
			type:{ // 模式，默认有取消和确定， close：关闭模式
				type: String,
				default: ''
			}
		},
		computed:{
			bodyStyle(){
				const radius = addUnit(this.round);
				return {
					'border-top-left-radius':radius,
					'border-top-right-radius':radius,
				}
			}
		},
		methods:{
			hideModel(e){
				if(e === true && !this.closeOnClickOverlay) return;
				this.$emit('cancel');
			},
			confirm() {
				if(this.hide) return;
				this.$emit('confirm');
			}
		}
	}
</script>

<style scoped lang="scss">
@import "../../bem.scss";
	@include b(popup){
		position: fixed;
		top: 0;
		left: 0;
		bottom:0;
		right:0;
		transition-duration: 300ms;
		transition-timing-function: ease-out;
		z-index: 10075;
		background-color: rgba(0, 0, 0, 0.5);
		@include flexRow(center);
		@include m(body){
			width: 100%;
			flex:1;
			background-color: #fff;
			&-t{
				@include flexRow;
				padding: 20rpx 30rpx 0;
				&l{
					padding: 4rpx 8rpx;
					// color:rgb(144, 145, 147);
				}
				&v{
					font-weight: 600;
				}
				&r{
					padding: 4rpx 8rpx;
					// color:rgb(60, 156, 255);
				}
			}
			&-close{
				@include flexRow(flex-end);
				padding: 32rpx;
				&-v{
					width: 36rpx;
				}
				&-c{
					flex:1;
					padding: 0 32rpx;
					text-align: center;
					&t{
						font-size: 32rpx;
						font-weight: 600;
					}
				}
			}
		}
	}
</style>