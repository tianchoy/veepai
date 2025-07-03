<template>
	<view class="j-fixed-view" :style="{height:placeholderH}">
		<view class="j-fixed-view--fixed" ref="jFixedRef" :style="fixedStyle">
			<slot></slot>
			<j-safe-bottom v-if="safeBottom && !isTop"></j-safe-bottom>
		</view>
	</view>
</template>

<script>
	// fixed定位的，且需要站位的
	import {addUnit, getDomStyle} from "../../utils/index";
	export default{
		name:'j-fixed-view',
		props:{
			bottom:{
				type:[String,Number],
				default:0
			},
			top:{
				type:[String,Number],
				default:''
			},
			left:{
				type:[String,Number],
				default:''
			},
			right:{
				type:[String,Number],
				default:''
			},
			background:{
				type:String,
				default:'linear-gradient(to top,#fff, transparent)'
			},
			safeBottom:{
				type: Boolean,
				default:false,
			},
			// 是否生成一个等高元素，以防止塌陷
			placeholder: {
				type: Boolean,
				default: true
			},
			width: {
				type: [String,Number],
				default:''
			},
			height: {
				type: [String,Number],
				default:''
			},
			borderRadius: {
				type: [String,Number],
				default:''
			},
		},
		data(){
			return {
				placeholderH:0,
			}
		},
		computed:{
			isTop(){
				const {top} = this;
				return top || top===0;
			},
			fixedStyle(){
				const {width, height, background, top, bottom, right, left, borderRadius} = this;
				const style = {};
				// #ifdef APP-NVUE
				style.backgroundColor = background;
				// #endif
				// #ifndef APP-NVUE
				style.background = background;
				// #endif
				if(top || top===0){
					style.top=addUnit(top);
				}else if(bottom || bottom===0){
					style.bottom=addUnit(bottom);
				}
				let bool = false;
				if(left||left===0){
					style.left = addUnit(left);
					bool = true;
				}
				if(right || right===0){
					style.right = addUnit(right);
					bool = true;
				}
				if(!bool){
					style.left = 0;
					style.right = 0;
				}
				if(width){
					style.width = addUnit(width);
				}
				if(height){
					style.height = addUnit(height);
				}
				if(borderRadius){
					style.borderRadius = addUnit(borderRadius);
				}
				return style
			},
		},
		mounted(){
			if(this.placeholder){
				this.getHeight();
			}
		},
		methods:{
			getHeight(){
				getDomStyle(this, 'jFixedRef', '.j-fixed-view--fixed').then(res=>{
					this.placeholderH = res.height+'px';
				})
			}
		}
	}
</script>

<style scoped lang="scss">
@import "../../bem.scss";
	@include b(fixed-view){
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex:1;
		/* #endif */
		z-index: 99;
		@include m(fixed){
			position: fixed;
			z-index: 99;
		}
	}
</style>