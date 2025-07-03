<template>
	<j-popup alignItems="center" :show="show" :closeOnClickOverlay="closeOnClickOverlay" @cancel="cancel">
		<!-- #ifdef VUE2 -->
		<template slot="body">
		<!-- #endif -->
		<!-- #ifdef VUE3 -->
		<template #body>
		<!-- #endif -->
			<view class="j-slider-code" @click.stop>
				<j-card>
					<slot name="top">
						<view class="j-slider-code--top">
							<slot name="title">
								<view class="j-slider-code--title">
									{{ title }}
								</view>
							</slot>
							<slot name="right">
								<view class="j-slider-code--right">
									<j-icon type="refreshempty" size="32rpx" @click="refresh"></j-icon>
									<j-icon type="closeempty" size="32rpx" @click="cancel"></j-icon>
								</view>
							</slot>
						</view>
					</slot>
					<view class="j-slider-code--body" ref="sliderCodeRef" :style="{width:imgWidthStyle}">
						<view class="j-slider-code--img" >
							<j-loading :loading="loading" size="68rpx" opacity="0.3">
								<image :src="bgUrl" class="j-slider-code--img--bg" mode="widthFix"></image>
								<image mode="widthFix" :style="sliderStyle" class="j-slider-code--img--slider" :src="sliderObj.url"></image>
							</j-loading>
						</view>
						<view v-if="maxWidth" class="j-slider-code--body--footer">
							<j-slider v-model="sliderVal"  @touchEnd="confirm">
								<!-- #ifdef VUE2 -->
								<template slot="icon">
								<!-- #endif -->
								<!-- #ifdef VUE3 -->
								<template #icon>
								<!-- #endif -->
									<view class="j-slider-code--icon">
										<j-icon type="arrow-right" size="32rpx" color="#fff"></j-icon>
									</view>
								<!-- #ifdef VUE2 -->
								</template>
								<!-- #endif -->
								<!-- #ifdef VUE3 -->
								</template>
								<!-- #endif -->
							</j-slider>
						</view>
					</view>
				</j-card>
			</view>
		<!-- #ifdef VUE2 -->
		</template>
		<!-- #endif -->
		<!-- #ifdef VUE3 -->
		</template>
		<!-- #endif -->
	</j-popup>
</template>

<script>
	// 图形滑动验证码
	import {addUnit, getDomStyle, getPx} from "../../utils/index";
	export default{
		name:'j-slider-code',
		props:{
			show:{
				type:Boolean,
				default:false,
			},
			title: { // 标题
			  type: String,
			  default: '请拖动滑块完成拼图'
			},
			// 是否允许点击遮罩关闭选择器
			closeOnClickOverlay: {
				type: Boolean,
				default: true
			},
			bgUrl:{ // 背景的图片
				type: String,
			 	default: ''
			},
			slider:{ // 背景上的小滑块
				type: Object,
			 	default: ()=>{
					return {};
				}
			},
			loading:{ // 是否在加载中
				type:Boolean,
				default: false,
			},
			multiple:{ // 倍数，屏幕的分配率
				type:Number,
				default:1
			},
			imgWidth:{ // 背景图的原始宽度
				type:[Number,String],
				default:'300px'
			}
		},
		data(){
			return {
				sliderVal:0,
				sliderObj:{
					url:'',
					startY:0,
					startX:0,
					width:0,
					left:0,
				},
				maxWidth:0,
				iconWidth:50,
			}
		},
		watch:{
			slider:{
				immediate:true,
				handler:function(newVal){
					this.sliderObj = {...this.sliderObj, ...newVal};
					this.init();
				}
			},
			show(newVal){
				if(newVal){
					this.init();
					!this.maxWidth && this.getMaxWidth();
				}
			}
		},
		computed:{
			xMove(){
				return Math.round((this.sliderVal * this.maxWidth) + this.sliderObj.startX*this.multiple*100)/100;
			},
			imgWidthStyle(){
				return getPx(this.imgWidth)*this.multiple+'px';
			},
			sliderStyle(){
				const {width, height, startY} = this.sliderObj;
				const multiple = this.multiple;
				const style = {
					width:width*multiple+'px',
					height:height*multiple+'px',
					top:startY*multiple+'px',
					left:addUnit(this.xMove)
				}
				return style;
			},
		},
		methods:{
			addUnit,
			init(){
				this.sliderVal = 0;
			},
			getMaxWidth(){ // 获取宽度
				if(this.maxWidth) return;
				getDomStyle(this, 'sliderCodeRef','.j-slider-code--body').then(res=>{
					this.maxWidth = res.width;
				})
			},
			refresh(){
				this.$emit('refresh');
			},
			cancel(){
				this.$emit('cancel');
			},
			confirm(){
				this.$emit('confirm', this.xMove);
			},
		}
	}
</script>

<style scoped lang="scss">
@import "../../bem.scss";

	$iconHeight:60rpx;
	@include b(slider-code){
		width: fit-content;
		margin: auto;
		overflow: hidden;
		@include m(top){
			@include flexRow;
		}
		@include m(title){
			font-size: 28rpx;
			font-weight: 600;
		}
		@include m(right){
			@include flexRow;
			min-width: 80rpx;
		}
		@include m(body){
			margin-top: 32rpx;
			@include m(footer){
				padding-top: 32rpx;
				height: $iconHeight;
			}
		}
		@include m(img){
			position: relative;
			overflow: hidden;
			@include m(size){
				position: absolute;
				top:0;
				left:0;
				opacity: 0;
			}
			@include m(bg){
				/* #ifndef APP-NVUE */
				width: 100%;
				/* #endif */
				height: auto;
				min-height: 100rpx;
			}
			@include m(slider){
				position: absolute;
			}
		}
		@include m(icon){
			width: 96rpx;
			height: $iconHeight;
			@include flexRow(center);
			transform: translateX(50%);
			border-radius: 16rpx;
			background-color: $color-success;
		}
	}
</style>