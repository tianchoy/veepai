<template>
	<view class="j-line" :style="[lineStyle]"></view>
</template>

<script>
	import {
		addUnit
	} from "../../utils/index.js"
	export default {
		name: 'j-line',
		props: {
			color: {
				type: String,
				default: '#d6d7d9'
			},
			// 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
			length: {
				type: [String, Number],
				default: '100%'
			},
			// 线条方向，col-竖向，row-横向
			direction: {
				type: String,
				default: 'row'
			},
			// 是否显示细边框
			hairline: {
				type: Boolean,
				default: true
			},
			// 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
			margin: {
				type: [String, Number],
				default: 0
			},
			// 是否虚线，true-虚线，false-实线
			dashed: {
				type: Boolean,
				default: false
			},
			lineWidth: {
				type: [String, Number],
				default: '2rpx'
			},
		},
		computed: {
			lineStyle() {
				const style = {}
				if (this.margin) {
					style.margin = addUnit(this.margin)
				}
				// 如果是水平线条，边框高度为1px，再通过transform缩小一半，就是0.5px了
				if (this.direction === 'row') {
					// 此处采用兼容分开写，兼容nvue的写法
					style.borderBottomWidth = addUnit(this.lineWidth);
					style.borderBottomStyle = this.dashed ? 'dashed' : 'solid'
					style.width = addUnit(this.length)
					if (this.hairline) style.transform = 'scaleY(0.5)'
				} else {
					// 如果是竖向线条，边框宽度为1px，再通过transform缩小一半，就是0.5px了
					style.borderLeftWidth = addUnit(this.lineWidth);
					style.borderLeftStyle = this.dashed ? 'dashed' : 'solid'
					style.height = addUnit(this.length)
					if (this.hairline) style.transform = 'scaleX(0.5)'
				}
				if (this.color) {
					style.borderColor = this.color
				}
				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../bem.scss";

	@include b(line) {
		/* #ifndef APP-NVUE */
		vertical-align: middle;
		/* #endif */
		border-color: $color-border-placeholder;
	}
</style>