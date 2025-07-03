<template>
	<text v-if="show && ((Number(value) === 0 ? showZero : true) || isDot)" :class="classStr"
		:style="styleStr">{{ isDot ? '' :showValue }}</text>
</template>
<script>
	import {
		addUnit
	} from "../../utils/index"
	export default {
		name: 'j-badge',
		props: {
			// 是否显示圆点
			isDot: {
				type: Boolean,
				default: false
			},
			// 显示的内容
			value: {
				type: [Number, String],
				default: ""
			},
			// 是否显示
			show: {
				type: Boolean,
				default: true
			},
			// 最大值，超过最大值会显示 '{max}+'
			max: {
				type: [Number, String],
				default: 999
			},
			// 主题类型，error|warning|success|primary
			type: {
				type: String,
				default: 'error'
			},
			// 当数值为 0 时，是否展示 Badge
			showZero: {
				type: Boolean,
				default: false
			},
			// 背景颜色，优先级比type高，如设置，type参数会失效
			bgColor: {
				type: [String, null],
				default: null
			},
			// 字体颜色
			color: {
				type: [String, null],
				default: null
			},
			// 徽标形状，circle-四角均为圆角，horn-左下角为直角
			shape: {
				type: String,
				default: 'circle'
			},
			// 设置数字的显示方式，overflow|ellipsis|limit
			// overflow会根据max字段判断，超出显示`${max}+`
			// ellipsis会根据max判断，超出显示`${max}...`
			// limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
			numberType: {
				type: String,
				default: 'overflow'
			},
			// 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
			offset: {
				type: Array,
				default: []
			},
			// 是否反转背景和字体颜色
			inverted: {
				type: Boolean,
				default: false
			},
			// 是否绝对定位
			absolute: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			showValue() {
				switch (this.numberType) {
					case "overflow":
						return Number(this.value) > Number(this.max) ? this.max + "+" : this.value
						break;
					case "ellipsis":
						return Number(this.value) > Number(this.max) ? "..." : this.value
						break;
					case "limit":
						return Number(this.value) > 999 ? Number(this.value) >= 9999 ?
							Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value /
								1e3 * 100) / 100 + "k" : this.value
						break;
					default:
						return Number(this.value)
				}
			},
			classStr() {
				const {
					isDot,
					shape,
					type,
					inverted
				} = this;
				const str =
					`j-badge ${isDot ? 'j-badge__dot' : 'j-badge__notdot'} ${shape === 'horn' ? 'j-badge__horn':''} j-badge__${type}${inverted ? '__inverted' : ''}`;
				return str;
			},
			styleStr() {
				const style = {}
				if (this.color) {
					style.color = this.color
				}
				if (this.bgColor && !this.inverted) {
					style.backgroundColor = this.bgColor
				}
				if (this.absolute) {
					style.position = 'absolute'
					// 如果有设置offset参数
					if (this.offset.length) {
						// top和right分为为offset的第一个和第二个值，如果没有第二个值，则right等于top
						const top = this.offset[0]
						const right = this.offset[1] || top
						style.top = addUnit(top)
						style.right = addUnit(right)
					}
				}
				return style
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "../../bem.scss";

	$u-badge-dot-radius: 100px !default;
	$u-badge-dot-size: 16rpx !default;
	$u-badge-dot-right: 8rpx !default;
	$u-badge-dot-top: 0 !default;
	$u-badge-text-font-size: 22rpx !default;
	$u-badge-text-right: 20rpx !default;
	$u-badge-text-padding: 4rpx 10rpx !default;
	$u-badge-text-align: center !default;
	$u-badge-text-color: #FFFFFF !default;

	@include b(badge) {
		border-top-right-radius: $u-badge-dot-radius;
		border-top-left-radius: $u-badge-dot-radius;
		border-bottom-left-radius: $u-badge-dot-radius;
		border-bottom-right-radius: $u-badge-dot-radius;
		@include flexRow;
		line-height: $u-badge-text-font-size;
		text-align: $u-badge-text-align;
		font-size: $u-badge-text-font-size;
		color: $u-badge-text-color;

		@include e(dot) {
			height: $u-badge-dot-size;
			width: $u-badge-dot-size;
		}

		@include e(notdot) {
			padding: $u-badge-text-padding;
		}

		@include e(inverted) {
			font-size: 26rpx;
		}

		@include e(horn) {
			border-bottom-left-radius: 0;
		}

		@include e(primary) {
			background-color: $color-primary;

			@include e(inverted) {
				color: $color-primary;
			}
		}

		@include e(error) {
			background-color: $color-error;

			@include e(inverted) {
				color: $color-error;
			}
		}

		@include e(success) {
			background-color: $color-success;

			@include e(inverted) {
				color: $color-success;
			}
		}

		@include e(info) {
			background-color: $color-info;

			@include e(inverted) {
				color: $color-info;
			}
		}

		@include e(warning) {
			background-color: $color-warning;

			@include e(inverted) {
				color: $color-warning;
			}
		}
	}
</style>