<template>
	<view :class="classStr" :style="styleStr" hover-class="j-click__hover" :hover-stay-time="200"
		@tap.stop="clickHandler">
		<slot></slot>
	</view>
</template>
<script>
import { $parent, addUnit } from "../../utils/index.js"

export default {
	name: 'j-grid-item',
	props: {
		// 宫格的name
		name: {
			type: [String, Number, null],
			default: null
		},
		// 背景颜色
		bgColor: {
			type: String,
			default: 'transparent'
		}
	},
	data() {
		return {
			parentData: {
				col: 0, // 父组件划分的宫格数
				border: true, // 是否显示边框，根据父组件决定
				childWidth:0,
				autoHeight:false,
			},
			width: 0,
			classes: [],
		};
	},
	computed: {
		classStr() {
			return 'j-grid-item ' + this.classes.join(' ');
		},
		styleStr() {
			const {width, bgColor, parentData} = this;
			const w = addUnit(width);
			const style = {
				background: bgColor,
				width:w,
				height: parentData.autoHeight?undefined:w,
				opacity: width?1:0,
			}
			return style;
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.parent = $parent.call(this, 'j-grid');
			if (this.parent) { // 让父组件收集子组件
				const obj = {
					...this.parentData
				};
				for (const key in obj) {
					obj[key] = this.parent[key]
				}
				this.parentData = obj;
				if (typeof this.parent.gridAddChildren === 'function') {
					this.parent.gridAddChildren(this);
				}
				this.width = obj.childWidth
			}else{
				throw new Error("j-grid-item需配合j-grid使用");
			}
		},
		gridItemClasses(index) {
			if (this.parentData.border) {
				let classes = []
				const len = this.parent.children.length;
				// 贴近右边屏幕边沿的child，并且最后一个（比如只有横向2个的时候），无需右边框
				if ((index + 1) % this.parentData.col !== 0 ) {
					classes.push('j-grid-item__br')
				}
				// 总的宫格数量对列数取余的值
				// 如果取余后，值为0，则意味着要将最后一排的宫格，都不需要下边框
				const lessNum = len % this.parentData.col === 0 ? this.parentData.col : len % this.parentData.col
				// 最下面的一排child，无需下边框
				if (index < len - lessNum) {
					classes.push('j-grid-item__bb')
				}
				this.classes = classes
			}
		},
		clickHandler() {
			let name = this.name
			if (this.parent) {
				// 如果没有设置name属性，历遍父组件的children数组，判断当前的元素是否和本实例this相等，找出当前组件的索引
				const children = this.parent.children
				if (children && this.name === null) {
					name = children.findIndex(child => child === this)
				}
				// 调用父组件方法，发出事件
				this.parent.childClick(name)
			}
			this.$emit('choose', name);
		},
		setWidth(val){
			this.width = val;
		}
	}
}
</script>
<style scoped lang="scss">
@import "../../bem.scss";

@include b(grid-item) {
	@include flexRow(center);
	flex-direction: column;
	overflow: hidden;
	box-sizing: border-box;
	@include e(br) {
		border-right: 1rpx solid $color-border-placeholder;
	}
	@include e(bb) {
		border-bottom: 1rpx solid $color-border-placeholder;
	}
}
</style>