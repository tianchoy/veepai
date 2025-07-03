<template>
	<view class="j-cell" :class="{'j-cell__border':border}" :style="styleStr" :hover-class="readonly?'':'j-click__hover'" :hover-stay-time="200"  @tap="clickHandler">
		<view class="j-cell-l">
			<slot name="icon"></slot>
			<slot name="title">
				<text class="j-cell-lt" v-if="title">
					{{title}}
				</text>
			</slot>
		</view>
		<view class="j-cell-r">
			<slot name="value">
				<text class="j-cell-rt" v-if="value">{{value}}</text>
			</slot>
			<j-icon v-if="icon" class="j-cell-ri" :size="addUnit(iconSize)" :type="icon" :color="iconColor"></j-icon>
		</view>
	</view>
</template>

<script>
	import { addUnit } from "../../utils/index"
	export default{
		name:'j-cell',
		props:{
			title:{
				type:String,
				default:''
			},
			value:{
				type:String,
				default:''
			},
			icon:{
				type:String,
				default:'right'
			},
			iconSize:{
				type:[String,Number],
				default:'28rpx'
			},
			iconColor:{
				type:String,
				default:'#909399'
			},
			border:{
				type:Boolean,
				default:false,
			},
			vertical:{
				type:[String, Number],
				default:'32rpx',
			},
			horizontal:{
				type:[String, Number],
				default:'32rpx',
			},
			background:{
				type:String,
				default:'transparent'
			},
			// 是否只读,不会出现点击交互
			readonly: {
				type: Boolean,
				default: false
			},
		},
		computed:{
			styleStr(){
				return `padding:${addUnit(this.vertical)} ${addUnit(this.horizontal)};background:${this.background}`;
			}
		},
		methods:{
			addUnit,
			clickHandler(event){
				// #ifndef H5||APP
				this.$emit('click', event);
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
@import "../../bem.scss";
	.j-cell{
		@include flexRow;
		&-l{
			@include flexRow(flex-start);
			flex:1;
			&t{
				flex:1;
				line-height: 44rpx;
				font-size: 30rpx;
				color: #303133;
			}
		}
		&-r{
			@include flexRow(flex-start);
			&t{
				font-size: 28rpx;
				color: #606266;
			}
			&i{
				margin-left: 6rpx;
			}
		}
	}
	.j-cell__border{
		border-bottom: 1px solid $color-border-placeholder;
	}
</style>