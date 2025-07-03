<template>
	<view class="j-checkbox" @tap.stop="wrapperClickHandler">
		<view 
		@tap.stop="iconClickHandler"
		:class="iconClasses"
		:style="iconWrapStyle"
		>
			<slot name="icon" :size="elIconSize" :color="elIconColor">
				<j-icon
				    class="j-checkbox--icon--icon"
				    type="checkmarkempty"
				    :size="elIconSize"
				    :color="elIconColor||''"
				/>
			</slot>
		</view>
		<view class="j-checkbox--label" @tap.stop="labelClickHandler">
			<slot name="label" :label="label" :disabled="elDisabled">
				<text
					:style="{
						color: elDisabled ? elInactiveColor : elLabelColor,
						fontSize: elLabelSize,
						lineHeight: elLabelSize
					}"
				>{{label}}</text>
			</slot>
		</view>
	</view>
</template>

<script>
	import {preventEvent, $parent, addUnit, formValidate, getPx} from "../../utils/index.js"
	import test from '../../utils/test.js';
	export default {
		name: 'j-checkbox',
		props: {
			// checkbox的名称
			name: {
				type: [String, Number, Boolean],
				default: ""
			},
			// 形状，square为方形，circle为圆型
			shape: {
				type: String,
				default: ''
			},
			// 整体的大小
			size: {
				type: [String, Number],
				default: ''
			},
			// 是否默认选中
			checked: {
				type: Boolean,
				default: false
			},
			// #ifdef VUE3
			// 绑定的值
			modelValue: {
				type: Boolean,
				default: false
			},
			// #endif
			// #ifdef VUE2
			// 绑定的值
			value: {
				type: Boolean,
				default: false
			},
			// #endif
			// 是否禁用
			disabled: {
				type: [String, Boolean],
				default: false
			},
			// 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
			activeColor: {
				type: String,
				default: ''
			},
			// 未选中的颜色
			inactiveColor: {
				type: String,
				default: ''
			},
			// 图标的大小，单位px
			iconSize: {
				type: [String, Number],
				default: ''
			},
			// 图标颜色
			iconColor: {
				type: String,
				default: ''
			},
			// label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
			label: {
				type: [String, Number],
				default: ''
			},
			// label的字体大小，px单位
			labelSize: {
				type: [String, Number],
				default: ''
			},
			// label的颜色
			labelColor: {
				type: String,
				default: ''
			},
			// 是否禁止点击提示语选中复选框
			labelDisabled: {
				type: [String, Boolean],
				default: ''
			},
		},
		data() {
			return {
				isChecked: false,
				usedAlone: false,
				// 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
				// 故只能使用如此方法
				parentData: {
					iconSize: '',
					labelDisabled: null,
					disabled: null,
					shape: 'square',
					activeColor: null,
					inactiveColor: null,
					size: '36rpx',
					// #ifdef VUE2
					value: null,
					// #endif
					// #ifdef VUE3
					modelValue: null,
					// #endif
					iconColor: null,
					placement: 'row',
					borderBottom: false,
					iconPlacement: 'left'
				}
			}
		},
		computed: {
			// 是否禁用，如果父组件j-checkbox-group禁用的话，将会忽略子组件的配置
			elDisabled() {
				return this.disabled !== '' ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled :
					false;
			},
			// 是否禁用label点击
			elLabelDisabled() {
				return this.labelDisabled !== '' ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData
					.labelDisabled :
					false;
			},
			// 组件尺寸，对应size的值，默认值为42rpx
			elSize() {
				return this.size ? this.size : (this.parentData.size ? this.parentData.size : '42rpx');
			},
			// 组件的勾选图标的尺寸，默认24rpx
			elIconSize() {
				return this.iconSize ? this.iconSize : (this.parentData.iconSize ? this.parentData.iconSize : Math.ceil(getPx(this.elSize)*0.57));
			},
			// 组件选中激活时的颜色
			elActiveColor() {
				return this.activeColor ? this.activeColor : (this.parentData.activeColor ? this.parentData.activeColor :
					'#2979ff');
			},
			// 组件选未中激活时的颜色
			elInactiveColor() {
				return this.inactiveColor ? this.inactiveColor : (this.parentData.inactiveColor ? this.parentData.inactiveColor :
					'#c8c9cc');
			},
			// label的颜色
			elLabelColor() {
				return this.labelColor ? this.labelColor : (this.parentData.labelColor ? this.parentData.labelColor : '#606266')
			},
			// 组件的形状
			elShape() {
				return this.shape ? this.shape : (this.parentData.shape ? this.parentData.shape : 'circle');
			},
			// label大小
			elLabelSize() {
				return addUnit(this.labelSize ? this.labelSize : (this.parentData.labelSize ? this.parentData.labelSize :
					'15'))
			},
			elIconColor() {
				const iconColor = this.iconColor ? this.iconColor : (this.parentData.iconColor ? this.parentData.iconColor :
					'#ffffff');
				// 图标的颜色
				if (this.elDisabled) {
					// disabled状态下，已勾选的checkbox图标改为elInactiveColor
					return this.isChecked ? this.elInactiveColor : 'transparent'
				} else {
					return this.isChecked ? iconColor : 'transparent'
				}
			},
			iconClasses() {
				let classes = 'j-checkbox--icon j-checkbox--icon__' + this.elShape;
				if (this.elDisabled) {
					classes += ' j-checkbox--icon__disabled';
				}
				if (this.isChecked && this.elDisabled) {
					classes += ' j-checkbox--icon__disabled__checked';
				}
				return classes
			},
			iconWrapStyle() {
				// checkbox的整体样式
				const backgroundColor = this.isChecked && !this.elDisabled ? this.elActiveColor : '#ffffff'
				const borderColor = this.isChecked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor
				const width = addUnit(this.elSize)
				const height = addUnit(this.elSize)
				let style = `width:${width};height:${height};background-color:${backgroundColor};border-color:${borderColor};`;
				// 如果是图标在右边的话，移除它的右边距
				if (!this.usedAlone) {
					if (this.parentData.iconPlacement === 'right') {
						style+='margin-right:0;'
					}
				}
				return style
			},
		},
		watch:{
			// #ifdef VUE2
			value(newVal) {
				this.initVal(!!newVal);
			},
			// #endif
			// #ifdef VUE3
			modelValue(newVal) {
				this.initVal(!!newVal);
			},
			// #endif
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.parent = $parent.call(this, 'j-checkbox-group');
				if (!this.parent) {
					this.usedAlone = true;
				} else { // 让父组件收集子组件
					if(typeof this.parent.checkboxAddChildren === 'function'){
						this.parent.checkboxAddChildren(this);
					}
					const obj = {
						...this.parentData
					};
					for (const key in obj) {
						obj[key] = this.parent[key]
					}
					this.parentData = obj;
				}
				// #ifdef VUE2
				const value = this.parentData.value
				// #endif
				// #ifdef VUE3
				const value = this.parentData.modelValue
				// #endif
				// 设置初始化时，是否默认选中的状态，父组件j-checkbox-group的value可能是array，所以额外判断
				if (this.checked) {
					this.isChecked = true
				} else if (!this.usedAlone && test.array(value)) {
					// 查找数组是是否存在this.name元素值
					this.isChecked = value.some(item => {
						return item === this.name
					})
				}else if(this.usedAlone){
					// #ifdef VUE2
					const val = this.value
					// #endif
					// #ifdef VUE3
					const val = this.modelValue
					// #endif
					this.initVal(val);
				}
			},
			initVal(val){  // 单独用才生效
				if (this.usedAlone && this.isChecked !== val) {
					this.isChecked = val;
				}
			},
			wrapperClickHandler(e) {
				// if (!this.usedAlone) {
				// 	this.parentData.iconPlacement === 'right' && this.iconClickHandler(e)
				// } else {
				// 	this.iconClickHandler(e)
				// }
				this.iconClickHandler(e)
			},
			// 点击图标
			iconClickHandler(e) {
				preventEvent(e);
				// 如果整体被禁用，不允许被点击
				if (!this.elDisabled) {
					this.setCheckboxCheckedStatus()
				}
			},
			// 点击label
			labelClickHandler(e) {
				preventEvent(e);
				// 如果按钮整体被禁用或者label被禁用，则不允许点击文字修改状态
				if (!this.elLabelDisabled && !this.elDisabled) {
					this.setCheckboxCheckedStatus()
				}
			},
			// 改变组件选中状态
			// 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有j-checkbox实例
			// 将本组件外的其他j-checkbox的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
			setCheckboxCheckedStatus() {
				// 将本组件标记为与原来相反的状态
				this.isChecked = !this.isChecked
				this.emitEvent()
				if (!this.usedAlone) {
					typeof this.parent.unCheckedOther === 'function' && this.parent.unCheckedOther(this)
				}
			},
			emitEvent() {
				// 双向绑定
				if (this.usedAlone) {
					// #ifdef VUE2
					this.$emit('input', this.isChecked);
					// #endif
					// #ifdef VUE3
					this.$emit('update:modelValue', this.isChecked);
					// #endif
				}
				this.$emit('change', this.isChecked)
				// 尝试调用j-form的验证方法，进行一定延迟，否则微信小程序更新可能会不及时
				this.$nextTick(() => {
					formValidate(this, 'change')
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../bem.scss";

	@include b(checkbox) {
		@include flexRow(flex-start);
		@include formItemHeight;
		margin-right: 32rpx;
		cursor: pointer;
		@include m(icon){
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			// nvue下，border-color过渡有问题
			transition-property: border-color, background-color, color;
			transition-duration: 0.2s;
			/* #endif */
			@include flexRow(center);
			color: transparent;
			text-align: center;
			margin-right: 12rpx;
			line-height: normal;
			font-size: 12rpx;
			border-width: 2rpx;
			border-color: #c8c9cc;
			border-style: solid;
			/* #ifdef MP-TOUTIAO */
			// 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
			@include m(icon) {
				line-height: 0;
			}
			/* #endif */
			@include e(circle) {
				border-radius: 100%;
			}
			
			@include e(square) {
				border-radius: 6rpx;
			}
			
			@include e(checked) {
				color:#fff;
				background-color: red;
				border-color: #fff;
			}
			
			@include e(disabled) {
				background-color: #ebedf0 !important;
			}
			
			@include e(disabled--checked) {
				color: #c8c9cc !important;
			}
		}
		@include m(label) {
			/* #ifndef APP-NVUE */
			word-wrap: break-word;
			/* #endif */
			color: #606266;
			@include formItemFontSize;
		
			// @include e(disabled) {
			// 	color: #c8c9cc;
			// }
		}
	}
</style>