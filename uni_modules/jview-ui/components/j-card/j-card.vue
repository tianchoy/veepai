<template>
	<view v-if="$slots.default" class="j-card" :style="style" @click="choose">
		<view v-if="title || $slots.action" class="j-card-t" :class="{'j-card-t__border':border}" :style="titleStyle">
			<text class="j-card-tt">{{title||''}}</text>
			<slot name="action"></slot>
		</view>
		<view :style="paddingStyle">
			<slot></slot>
		</view>
	</view>
</template>

<script>
import {addUnit} from "../../utils/index"
	export default{
		name:'j-card',
		props:{
			title:{
				type:String,
				default:''
			},
			border:{ // 标题下的线
				type:Boolean,
				default:true
			},
			size:{
				type:String,
				default:'',
			}
		},
		computed:{
			interval(){
				const obj = {
					'small':24,
					'mini':16,
					'none':0,
				}
				let val = 32;
				if(obj.hasOwnProperty(this.size)){
					val = obj[this.size];
				}
				return val;
			},
			style(){
				const {interval} = this;
				// 当size匹配不上或者为none时要默认为16
				const radius = interval?interval/2:16;
				return `border-radius: ${radius}rpx;`;
			},
			paddingStyle(){
				return `padding: ${this.interval}rpx;`;
			},
			titleStyle(){
				const {interval,paddingStyle,border} = this;
				let str = paddingStyle;
				if(!border){
					str += 'padding-bottom: 0';
				}
				return str;
			}
		},
		methods:{
			choose(event){
				// #ifndef H5||APP
				this.$emit('click', event);
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../bem.scss";
	$interval:var(--interval);
	.j-card{
		/* #ifndef APP-NVUE */
		width: 100%;
		box-shadow: 0px 4rpx 4rpx 0px rgba(0, 0, 0, 0.1);
		/* #endif */
		background-color: #fff;
		overflow: hidden;
	}
	.j-card-t{
		@include flexRow(space-between);
		&t{
			font-size: 32rpx;
			font-weight: 600;
		}
		&__border{
			border:1rpx solid $color-border-placeholder;
		}
	}
</style>