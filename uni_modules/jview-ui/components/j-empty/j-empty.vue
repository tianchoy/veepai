<template>
	<view class="j-empty" ref="jEmpty">
		<slot>
			<image v-if="showImg" :style="imgStyle" :src="emptyImg" mode="widthFix"></image>
			<view class="j-empty--text" v-if="text">
				<text>{{ text }}</text>
			</view>
		</slot>
	</view>
</template>
<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	import emptyImg from "../../images/empty.png";
	import {
		addUnit
	} from "../../utils";
	export default {
		name: 'j-empty',
		props: {
			src: {
				type: String,
				default: '',
			},
			text: {
				type: String,
				default: '',
			},
			width: {
				type: [String, Number],
				default: '50%',
			}
		},
		data(){
			return {
				allWidth:0,
			}
		},
		computed: {
			showImg(){
				let bool = true;
				// #ifdef APP-NVUE
				bool = this.allWidth;
				// #endif
				return bool;
			},
			emptyImg() {
				return this.src || emptyImg;
			},
			imgStyle() {
				if(typeof this.width === 'string' && this.width.endsWith('%')){
					// #ifdef APP-NVUE
					const num = Math.floor(this.allWidth*parseInt(this.width)/100);
					return `width:${num}px`;
					// #endif
				}
				return `width:${addUnit(this.width)}`
			}
		},
		mounted(){
			// #ifdef APP-NVUE
			this.getWidth();
			// #endif
		},
		methods:{
			getWidth(){
				const t = setTimeout(()=>{
					clearTimeout(t);
					dom.getComponentRect(this.$refs.jEmpty, res => {
						this.allWidth = res.size.width;
					})
				},50)
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "../../bem.scss";

	@include b(empty) {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		@include flexRow(center);
		flex-direction: column;
		padding: 48rpx;
		box-sizing: border-box;
		@include m(text) {
			margin-top: 32rpx;
			color: $color-info;
		}
	}
</style>