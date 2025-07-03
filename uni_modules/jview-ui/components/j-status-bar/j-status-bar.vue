<template>
	<view :class="classStr" :style="styleStr">
		<slot></slot>
	</view>
</template>
<script>
	import {
		addUnit,
		getWindowInfo
	} from "../../utils/index"
	export default {
		name: 'j-status-bar',
		props: {
			bgColor: {
				type: String,
				default: 'transparent'
			}
		},
		data() {
			return {
				isH5: false
			}
		},
		computed: {
			classStr() {
				let str = 'j-status-bar';
				// if(this.isH5){
				// 	str+= ' j-safe-area-inset-top'
				// }
				return str;
			},
			styleStr() {
				let style = `background-color:${this.bgColor};`;
				// 状态栏高度，由于某些安卓和微信开发工具无法识别css的顶部状态栏变量，所以使用js获取的方式
				let sheight = getWindowInfo().statusBarHeight
				if (sheight == 0) {
					this.isH5 = true
				} else {
					style += `height:${addUnit(sheight, 'px')};`;
				}
				return style
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "../../bem.scss";
	@include b(status-bar) {
		width: 100%;
	}
</style>