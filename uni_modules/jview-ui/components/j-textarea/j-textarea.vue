<template>
	<view :class="classStr">
		<textarea
		  class="j-textarea--field"
		  :value="innerValue"
		  :style="{ height: addUnit(height) }"
		  :placeholder="placeholder"
		  :placeholder-style="placeholderStr"
		  :disabled="disabled"
		  :focus="focus"
		  :autoHeight="autoHeight"
		  :fixed="fixed"
		  :cursorSpacing="cursorSpacing"
		  :cursor="cursor"
		  :showConfirmBar="showConfirmBar"
		  :selectionStart="selectionStart"
		  :selectionEnd="selectionEnd"
		  :adjustPosition="adjustPosition"
		  :disableDefaultPadding="disableDefaultPadding"
		  :holdKeyboard="holdKeyboard"
		  :maxlength="maxlength"
		  :confirm-type="confirmType"
		  :ignoreCompositionEvent="ignoreCompositionEvent"
		  @focus="onFocus"
		  @blur="onBlur"
		  @linechange="onLinechange"
		  @input="onInput"
		  @confirm="onConfirm"
		  @keyboardheightchange="onKeyboardheightchange"
		></textarea>
		<!-- #ifndef MP-ALIPAY -->
		  <text
		    class="j-textarea--count"
		    :style="{
		      'background-color': disabled ? 'transparent' : '#fff',
		    }"
		    v-if="count">
				{{ innerValue.length }}/{{ maxlength }}
			</text>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		formValidate,
		sleep,
		addUnit
	} from "../../utils/index.js"
	export default {
		name: 'j-textarea',
		props: {
			placeholder: {
				type: String,
				default: '请输入'
			},
			placeholderStyle: {
				type: String,
				default: ""
			},
			height: { // 高度
				type: [String, Number],
				default: 70
			},
			disabled: { // 是否禁锢
				type: Boolean,
				default: false
			},
			// #ifdef VUE2
			value: {
				type: String,
				default: ""
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				type: String,
				default: ""
			},
			// #endif
			// 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
			confirmType: {
				type: String,
				default: 'done',
			},
			// 是否显示统计字数
			count: {
				type: Boolean,
				default: false
			},
			focus: { // 焦点
				type: Boolean,
				default: false
			},
			// 是否自动增加高度
			autoHeight: {
				type: Boolean,
				default: () => false
			},
			// 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
			fixed: {
				type: Boolean,
				default: () => false
			},
			
			// 指定光标与键盘的距离
			cursorSpacing: {
				type: Number,
				default: 0
			},
			// 指定focus时的光标位置
			cursor: {
				type: [String, Number],
				default: ""
			},
			// 是否显示键盘上方带有”完成“按钮那一栏，
			showConfirmBar: {
				type: Boolean,
				default: true
			},
			// 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
			selectionStart: {
				type: Number,
				default: -1
			},
			// 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
			selectionEnd: {
				type: Number,
				default: -1
			},
			// 键盘弹起时，是否自动上推页面
			adjustPosition: {
				type: Boolean,
				default: true
			},
			// 是否去掉 iOS 下的默认内边距，只微信小程序有效
			disableDefaultPadding: {
				type: Boolean,
				default: false
			},
			// focus时，点击页面的时候不收起键盘，只微信小程序有效
			holdKeyboard: {
				type: Boolean,
				default: false
			},
			// 最大输入长度，设置为 -1 的时候不限制最大长度
			maxlength: {
				type: [String, Number],
				default: 140
			},
			// 边框类型，surround-四周边框，bottom-底部边框
			border: {
				type: String,
				default: 'surround'
			},
			// 是否忽略组件内对文本合成系统事件的处理
			ignoreCompositionEvent: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				innerValue: '',
				isCreate:true,
			}
		},
		computed: {
			classStr() {
				let classes = ['j-textarea'],
				    { border, disabled, count, autoHeight } = this;
				border === "surround" && classes.push("j-textarea__border");
				border === "bottom" && classes.push("j-textarea__bottom");
				disabled && classes.push("j-textarea__disabled");
				count && autoHeight && classes.push("j-textarea__count");
				return classes.join(" ");
			},
			placeholderStr(){
				return 'color:#c0c4cc;font-size: 30rpx;'+this.placeholderStyle;
			},
		},
		watch: {
			// #ifdef VUE2
			value:{
				immediate: true,
				handler:function(){
					if(this.innerValue === this.value) return;
					this.innerValue = this.value;
					this.valueChange(true);
				}
			},
			// #endif
			// #ifdef VUE3
			modelValue:{
				immediate: true,
				handler:function(){
					if(this.innerValue === this.modelValue) return;
					this.innerValue = this.modelValue;
					this.valueChange(true);
				}
			},
			// #endif
			innerValue(){
				this.valueChange();
			}
		},
		methods: {
			addUnit,
			onInput(e) {
				this.innerValue = e.detail.value;
				this.valueChange();
			},
			valueChange(notChange) {
				if(this.isCreate){
					this.isCreate = false;
					return ;
				}
				if(!notChange){
					// #ifdef VUE2
					this.$emit("input", this.innerValue);
					// #endif
					// #ifdef VUE3
					this.$emit("update:modelValue", this.innerValue);
					// #endif
				}
				this.$nextTick(() => {
					// 尝试调用j-form的验证方法
					formValidate(this, "change");
				})
			},
			onFocus(e) {
			  this.$emit("focus", e);
			},
			onBlur(e) {
			  this.$emit("blur", e);
			  // 尝试调用u-form的验证方法
			  formValidate(this, "blur");
			},
			onLinechange(e) {
			  this.$emit("linechange", e);
			},
			onConfirm(e) {
				this.$emit('confirm', e.detail.value);
			},
			onKeyboardheightchange(e) {
				this.$emit("keyboardheightchange", e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../bem.scss";

	@include b(textarea) {
		@include flexRow;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		box-sizing: border-box;
		border-radius: 4px;
		background-color: #fff;
		position: relative;
		padding: 18rpx 12rpx;
		@include e(border) {
			border: 1rpx solid #dadbde;
		}
		
		@include e(bottom) {
			border-radius: 0;
			border-bottom: 1rpx solid #dadbde;
		}
		@include e(disabled) {
		  background-color: #f5f7fa;
		}
		@include e(count) {
			padding-bottom: 36rpx;
		}
		@include m(field) {
		  flex: 1;
		  font-size: 30rpx;
		  /* #ifndef APP-NVUE */
		  width: 100%;
		  /* #endif */
		}
		
		@include m(count) {
		  position: absolute;
		  right: 10rpx;
		  bottom: 4rpx;
		  font-size: 24rpx;
		  background-color: #ffffff;
		  padding: 2rpx;
		}
	}
</style>