<template>
	<!-- #ifndef APP-NVUE -->
	<view class="j-loading-icon" :style="viewStyle">
		<view class="j-loading-icon--view" v-for="index in num" :key="index" :style="`${dotStyle}`">
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<loading-indicator :style="viewStyle" :animating="true" class="j-loading-icon__nvue"></loading-indicator>
	<!-- #endif -->
</template>

<script>
	import {
		getPx
	} from "../../utils"
	export default {
		name: 'j-loading-icon',
		props: {
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
				num: 10,
				dotWidth: 0,
			}
		},
		computed: {
			radius() {
				return (getPx(this.size) - this.dotWidth) / 2 + 'px';
			},
			viewStyle() {
				const width = getPx(this.size);
				let str = `width:${width}px;height:${width}px;`;
				// #ifdef APP-NVUE
				if (this.color) {
					str += `color:${this.color};`
				}
				// #endif
				return str;
			},
			dotStyle() {
				const width = this.dotWidth;
				const top = getPx(this.size) / 2 - width / 2;
				let str = `width:${width}px;height:${width}px;border-radius:${width * 2}px;top:${top}px;left:${top}px;`;
				if (this.color) {
					str += `background-color:${this.color};`;
				}
				return str;
			}
		},
		watch: {
			// #ifndef APP-NVUE
			size: {
				immediate: true,
				handler() {
					this.dotWidth = getPx(this.size) / 5;
				},
			}
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	$color-primary: #2979ff !default;
	@import "../../bem.scss";

	/* #ifndef APP-NVUE */
	@include b(loading-icon) {
		position: relative;
		animation: spinnerAnimation 1.2s linear infinite;

		@include m(view) {
			position: absolute;
			transform-origin: center;
			background-color: $color-primary;
		}

		@for $i from 1 through 10 {
			.j-loading-icon--view:nth-of-type(#{$i}) {
				// 在这里定义你的样式
				transform: rotate(($i*36)+deg) translateX(v-bind(radius)) scale(0.45+$i*0.05);
				opacity: $i*0.1;
			}
		}
	}

	@keyframes spinnerAnimation {
		0% {
			transform: rotate(0deg)
		}

		100% {
			transform: rotate(360deg)
		}
	}

	/* #endif */

	/* #ifdef APP-NVUE */
	.j-loading-icon__nvue {
		color: $color-primary;
	}

	/* #endif */
</style>