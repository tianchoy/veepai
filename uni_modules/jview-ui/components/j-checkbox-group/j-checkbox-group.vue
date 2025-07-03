<template>
	<view :class="classStr">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'j-checkbox-group',
		props: {
			// 标识符
			name: {
				type: String,
				default: ''
			},
			// #ifdef VUE3
			// 绑定的值
			modelValue: {
				type: Array,
				default: () => []
			},
			// #endif
			// #ifdef VUE2
			// 绑定的值
			value: {
				type: Array,
				default: () => []
			},
			// #endif
			// 形状，circle-圆形，square-方形
			shape: {
				type: String,
				default: 'square'
			},
			// 是否禁用全部checkbox
			disabled: {
				type: Boolean,
				default: false
			},

			// 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			// 未选中的颜色
			inactiveColor: {
				type: String,
				default: '#c8c9cc'
			},

			// 整个组件的尺寸，默认px
			size: {
				type: [String, Number],
				default: '36rpx'
			},
			// 布局方式，row-横向，column-纵向
			placement: {
				type: String,
				default: 'row'
			},
			// label的字体大小，px单位
			labelSize: {
				type: [String, Number],
				default: '28rpx'
			},
			// label的字体颜色
			labelColor: {
				type: [String],
				default: '#303133'
			},
			// 是否禁止点击文本操作
			labelDisabled: {
				type: Boolean,
				default: false
			},
			// 图标颜色
			iconColor: {
				type: String,
				default: '#ffffff'
			},
			// 图标的大小，单位px
			iconSize: {
				type: [String, Number],
				default: ''
			},
			// 勾选图标的对齐方式，left-左边，right-右边
			iconPlacement: {
				type: String,
				default: 'left'
			},
			// 竖向配列时，是否显示下划线
			borderBottom: {
				type: Boolean,
				default: false
			}
		},
		computed:{
			classStr(){
				let str = "j-checkbox-group j-checkbox-group__"+this.placement;
				return str;
			}
		},
		watch:{
			// #ifdef VUE2
			value:{
				handler(newVal) {
					this.initVal();
				},
				deep:true
			},
			// #endif
			// #ifdef VUE3
			modelValue:{
				handler(newVal) {
					this.initVal();
				},
				deep:true
			},
			// #endif
		},
		created() {
			this.children = []
		},
		methods:{
			initVal(){
				if (this.children.length) {
					this.children.map(child => {
						// 判断子组件(u-radio)如果有init方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
						typeof(child.init) === 'function' && child.init()
					})
				}
			},
			checkboxAddChildren(child){
				if(!this.children.includes(child)){
					this.children.push(child);
				}
			},
			// 收集checkbox选中的
			unCheckedOther(childInstance) {
				const values = []
				this.children.map(child => {
					// 将被选中的checkbox，放到数组中返回
					if (child.isChecked) {
						values.push(child.name)
					}
				})
				// 发出事件
				this.$emit('change', values)
				// 修改通过v-model绑定的值
				// #ifdef VUE3
				this.$emit("update:modelValue", values);
				// #endif
				// #ifdef VUE2
				this.$emit("input", values);
				// #endif
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../bem.scss";

	@include b(checkbox-group) {
		@include flexRow(flex-start);
		flex-wrap: wrap;
		@include e(column) {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>