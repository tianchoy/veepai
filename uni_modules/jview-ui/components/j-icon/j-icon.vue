<template>
	<!-- #ifdef APP-NVUE -->
	<text :style="styleObj" class="uni-icons" @click="clickHandler">{{unicode}}</text>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<text :style="styleObj" class="uni-icons" :class="['uniui-'+type,customPrefix,customPrefix?type:'']" @click="clickHandler">
		<slot></slot>
	</text>
	<!-- #endif -->
</template>

<script>
	import { fontData } from './uniicons_file_vue.js';

	const getVal = (val) => {
		const reg = /^[0-9]*$/g
		return (typeof val === 'number' || reg.test(val)) ? val + 'px' : val;
	}

	// #ifdef APP-NVUE
	var domModule = weex.requireModule('dom');
	import iconUrl from './uniicons.ttf'
	domModule.addRule('fontFace', {
		'fontFamily': "uniicons",
		'src': "url('" + iconUrl + "')"
	});
	// #endif

	/**
	 * Icons 图标
	 * @description 用于展示 icons 图标
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=28
	 * @property {Number} size 图标大小
	 * @property {String} type 图标图案，参考示例
	 * @property {String} color 图标颜色
	 * @property {String} customPrefix 自定义图标
	 * @event {Function} click 点击 Icon 触发事件
	 */
	export default {
		name: 'j-icon',
		emits: ['click'],
		props: {
			type: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			size: {
				type: [Number, String],
				default: 16
			},
			customPrefix: {
				type: String,
				default: ''
			},
			fontFamily: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				icons: fontData
			}
		},
		computed: {
			unicode() {
				let code = this.icons.find(v => v.font_class === this.type)
				if (code) {
					return code.unicode
				}
				return ''
			},
			iconSize() {
				return getVal(this.size)
			},
			styleObj() {
				let str = `font-size: ${this.iconSize};line-height: ${this.iconSize};`
				if(this.color){
					str += `color: ${this.color};`
				}
				if (this.fontFamily) {
					str += `font-family: ${this.fontFamily};`
				}
				return str
			}
		},
		methods: {
			clickHandler(event) { // 这个不管是h5还是app都不会触发2次，所以就不加if判断了
				this.$emit('click',event);
			}
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	@import './uniicons.css';

	@font-face {
		font-family: uniicons;
		src: url('./uniicons.ttf');
	}

	/* #endif */
	.uni-icons {
		font-family: uniicons;
		text-decoration: none;
		text-align: center;
	}
</style>
