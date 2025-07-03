<template>
	<view class="j-swiper" :style="{height:addUnit(height)}">
		<swiper class="j-swiper-c" :style="{height:addUnit(height)}" :current="current" :circular="circular" :indicator-dots="indicatorDots" 
		:autoplay="autoplay" :interval="interval" :duration="duration" :vertical="vertical" @change="change">
			<swiper-item class="j-swiper-item" v-for="(item,index) in list" :key="index" @click="choose(item)">
				<view class="j-swiper-item-v" :style="{backgroundColor:item.bgColor||'#f3f4f6'}">
					<image class="j-swiper-item-vc" v-if="item.image" :src="item.image" :mode="item.mode||'aspectFill'" ></image>
					<video class="j-swiper-item-vc" v-else-if="item.url" :src="item.url" :poster="item.poster"></video>
				</view>
			</swiper-item>
		</swiper>
		<view v-if="showAction" class="j-swiper-v j-swiper-l" :style="iconStyle" :class="{'j-swiper--disabled':current===0}" @click="last">
			<j-icon type="left" color="#fff" :size="iconSize"></j-icon>
		</view>
		<view v-if="showAction" class="j-swiper-v j-swiper-r" :style="iconStyle" :class="{'j-swiper--disabled':current===(list.length-1)}">
			<j-icon type="right" color="#fff" :size="iconSize" @click="next"></j-icon>
		</view>
	</view>
</template>

<script>
	import {addUnit, getPx} from "../../utils/index.js"
	export default {
		name:'j-swiper',
		props:{
			height:{
				type:[String,Number],
				default:'300rpx'
			},
			list:{
				type:Array,
				default:()=>{
					return [];
				}
			},
			circular:{ // 是否为无缝轮播
				type:Boolean,
				default:true,
			},
			indicatorDots:{ // 是否显示面板指示点
				type:Boolean,
				default:false,
			},
			autoplay:{ // 是否自动切换
				type:Boolean,
				default:false,
			},
			interval:{ // 自动切换时间间隔
				type:Number,
				default:5000,
			},
			duration:{ // 滑动动画时长 ，app-nvue不支持
				type:Number,
				default:500,
			},
			vertical:{ // 滑动方向是否为纵向
				type:Boolean,
				default:false,
			},
			// #ifdef VUE3
			// 绑定的值
			modelValue: {
				type:Number,
				default:0,
			},
			// #endif
			// #ifdef VUE2
			// 绑定的值
			value: {
				type:Number,
				default:0,
			},
			// #endif
			showAction:{ // 是否显示左右两边的操作按钮
				type:Boolean,
				default:false,
			},
			iconSize:{ // 左右按钮的大小
				type:[String,Number],
				default:'36rpx'
			}
		},
		data() {
			return {
				current:0,
			}
		},
		computed:{
			iconStyle(){
				const {iconSize, height} = this;
				const size = getPx(iconSize)+6;
				const style = {
					width:size+'px',
					height:size+'px',
					borderRadius:size*2+'px',
					top:getPx(height)/2-size/2+'px'
				}
				return style;
			}
		},
		watch:{
			// #ifdef VUE2
			value:{
				immediate:true,
				handler:function(val){
					this.initVal(val);
				}
			},
			// #endif
			// #ifdef VUE3
			modelValue:{
				immediate:true,
				handler:function(val){
					this.initVal(val);
				}
			},
			// #endif
		},
		methods: {
			addUnit,
			initVal(val){
				if(this.current === val) return;
				this.current = val;
			},
			change(e){
				this.current = e.detail.current;
				this.emitChange();
			},
			last(){
				if(this.current === 0) return;
				this.current -= 1;
				this.emitChange();
			},
			next(){
				if(this.current === (this.list.length-1)) return;
				this.current += 1;
				this.emitChange();
			},
			emitChange(){
				const val = this.current;
				// #ifdef VUE2
				this.$emit('input',val);
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue',val);
				// #endif
				this.$emit('change',val);
			},
			choose(e){
				this.$emit('choose',e);
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../bem.scss";
	@mixin flexColumn {
		display: flex;
		flex-direction: column;
	}
	.j-swiper {
		position: relative;
		@include flexColumn;
		&-c{
			flex:1;
			@include flexColumn;
			/* #ifndef APP-NVUE */
			width: 100%;
			/* #endif */
		}
		&-item{
			flex:1;
			@include flexColumn;
			&-v{
				flex:1;
				@include flexColumn;
				/* #ifndef APP-NVUE */
				align-items: center;
				/* #endif */
				&c{
					/* #ifndef APP-NVUE */
					width: 100%;
					/* #endif */
					flex:1;
				}
			}
		}
		&-v{
			position: absolute;
			@include flexRow(center);
			background-color: rgba(235,235,235,0.3);
			box-shadow: 0 0 4rpx 0 rgba(235,235,235,0.5);
			overflow: hidden;
		}
		&-l{
			left:26rpx;
		}
		&-r{
			right:26rpx;
		}
		&--disabled{
			opacity: 0.5;
		}
	}
</style>