<template>
	<view class="j-image" :style="imageViewStyle">
		<image :src="src" :mode="mode" :style="imageStyle" @click="clickFn" :lazy-load="lazyLoad" :show-menu-by-longpress="showMenuByLongpress" @error="imgError" @load="imgLoad"></image>
		<view class="j-image--modal" v-if="showLoading&&loading" :style="{background:bgColor}">
			<slot name="loading">
				<j-loading-icon :size="size" :color="loadingColor"></j-loading-icon>
			</slot>
		</view>
		<view class="j-image--modal" v-else-if="isError" :style="{background:bgColor}">
			<slot name="error">
				<j-icon type="image" :size="size"></j-icon>
			</slot>
		</view>
	</view>
</template>

<script>
	import {addUnit, getPx} from "../../utils/index";
	export default{
		name:'j-image',
		props:{
			src:{
				type:String,
				default:''
			},
			mode:{
				type:String,
				default:'aspectFill'
			},
			shape:{ // 图片形状，circle-圆形，square-方形
				type:String,
				default:'square'
			},
			width:{
				type:[String,Number],
				default:300
			},
			height:{
				type:[String,Number],
				default:300
			},
			showLoading:{ // 是否显示加载样式
				type:Boolean,
				default:true
			},
			lazyLoad:{ // 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效
				type:Boolean,
				default:true
			},
			bgColor:{
				type:String,
				default:'#f3f4f6'
			},
			showMenuByLongpress:{ // 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效
				type:Boolean,
				default:false
			},
			iconSize:{
				type:[String,Number],
				default:''
			},
			loadingColor:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				loading:true,
				isError:false,
				imageMsg:undefined,
			}
		},
		computed:{
			shapeStyle(){
				const {width, height, shape} = this;
				if(!shape || shape === 'square'){
					return {};
				}else if(shape === 'circle'){
					const num = Math.max(getPx(width),getPx(height))*2;
					if(num){
						return {
							borderRadius:num+'px',
						}
					}else{
						return {};
					}
				}else{
					return {
						borderRadius:addUnit(shape),
					}
				}
			},
			imageViewStyle(){
				const {width, height, mode, isError, loading, shapeStyle} = this;
				const style = shapeStyle;
				// #ifdef APP-NVUE
				style.width = addUnit(width);
				style.height = addUnit(height);
				if(this.imageMsg?.width){
					if(mode === 'widthFix'){
						style.height = addUnit(this.imageMsg.height);
					}else if(mode === 'heightFix'){
						style.width = addUnit(this.imageMsg.width);
					}
				}
				// #endif
				// #ifndef APP-NVUE
				if (loading || isError || mode != 'heightFix') {
					style.width = addUnit(width);
				} else {
					style.width = 'fit-content';
				}
				if (loading || isError || mode != 'widthFix') {
					style.height = addUnit(height);
				} else {
					style.height = 'fit-content';
				}
				// #endif
				return style;
			},
			imageStyle(){
				const {width, height, shapeStyle} = this;
				return {
					width:addUnit(width),
					height:addUnit(height),
					...shapeStyle
				}
			},
			size(){
				if(this.iconSize) return this.iconSize;
				const {width, height} = this;
				return Math.floor(Math.min(getPx(width),getPx(height))/3);
			}
		},
		methods:{
			clickFn(event){
				// #ifndef H5||APP
				this.$emit('click', event);
				// #endif
			},
			imgLoad(event){
				this.loading = false;
				this.isError = false;
				this.imageMsg = event.detail;
				this.$emit('load', event);
			},
			imgError(err){
				this.loading = false;
				this.isError = true;
				this.$emit('error', err);
			}
		}
	}
</script>

<style scoped lang="scss">
@import "../../bem.scss";
	@include b(image){
		position: relative;
		overflow: hidden;
		@include m(modal){
			position: absolute;
			top:0;
			right:0;
			left:0;
			bottom:0;
			@include flexRow(center);
			flex-direction: column;
		}
	}
</style>