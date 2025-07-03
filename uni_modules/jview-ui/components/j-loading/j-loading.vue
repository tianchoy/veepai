<template>
	<view class="j-loading" ref="loadingRef">
		<slot></slot>
		<view class="j-loading--view" v-if="show" :class="{'j-loading--view__mask':mask}" :style="maskStyle">
			<j-loading-icon :color="color" :size="size"></j-loading-icon>
			<view class="j-loading--view--div" v-if="text">
				<text class="j-loading--view--text">{{ text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { addUnit, getPx } from "../../utils"
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif
export default {
	name: 'j-loading',
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
		mask: { // 是否显示遮罩层
			type: Boolean,
			default: false,
		},
		opacity: {
			type: [Number, String],
			default: 0.1,
		},
		text: {
			type: String,
			default: '',
		},
		size: {
			type: [Number, String],
			default: '80rpx',
		},
		color: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			allStyle:undefined,
		}
	},
	computed: {
		show(){
			let bool = this.loading;
			// #ifdef APP-NVUE
			if(bool){
				bool = !!this.allStyle;
			}
			// #endif
			return bool;
		},
		maskStyle(){
			let str = '';
			if(this.mask){
				str = `top:0;left:0;background-color: rgba(50, 50, 50,${this.opacity});`;
			}else{
				str = `${this.viewStyle}`;
				const s = getPx(this.size)/2;
				// #ifdef APP-NVUE
				const {width=0,height=0} = this.allStyle||{};
				if(width){
					str += `left:${width/2-s}px;top:${height/2-s}px;`;
				}
				// #endif
				// #ifndef APP-NVUE
				const val = `calc(50% - ${s}px)`;
				str += `left:${val};top:${val};`;
				// #endif
			}
			return str;
		},
		viewStyle(){
			const width = addUnit(this.size);
			let str = `width:${width};height:${width};`;
			return str;
		}
	},
	mounted(){
		// #ifdef APP-NVUE
		this.init();
		// #endif
	},
	methods:{
		init(){
			const t = setTimeout(()=>{
				clearTimeout(t);
				dom.getComponentRect(this.$refs.loadingRef, res => {
					this.allStyle = res.size;
				})
			},50)
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../bem.scss";

@include b(loading) {
	position: relative;
	/* #ifndef APP-NVUE */
	width: 100%;
	height: 100%;
	/* #endif */
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */
	@include m(view){
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 999;
		@include e(mask){
			bottom: 0;
			right: 0;

		}
		@include m(div){
			@include flexRow;
			flex-wrap: nowrap;
			/* #ifndef APP-NVUE */
			margin-top: 24rpx;
			/* #endif */
		}
		@include m(text){
			color: $color-info;
			white-space: nowrap;
		}
	}
}
</style>