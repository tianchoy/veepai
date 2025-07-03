<template>
	<view :class="classStr" :style="viewStyle">
		<view class="j-input--prefix" v-if="prefixIcon || $slots.prefix">
			<slot name="prefix">
				<j-icon style="line-height: 0;" :type="prefixIcon" :size="prefixIconStyle.size||'40rpx'" :color="prefixIconStyle.color||''"
					:fontFamily="prefixIconStyle.fontFamily||''"></j-icon>
			</slot>
		</view>
		<input class="j-input--input" :adjust-position="adjustPosition" :type="type"
			:style="inputStr"
			:disabled="disabled"
			:maxlength="+maxlength"
			:password="password || type === 'password' || false" :value="innerValue" :focus="focus" :placeholder="placeholder"
			:placeholder-style="placeholderStr" @input="input" @focus="focusFn" @blur="blurFn" @confirm="confirm"
			@keyboardheightchange="keyboardheightchange"></input>
		<view class="j-input--clear" v-if="isShowClear" @tap="onClear">
			<j-icon type="close" size="36rpx" color="#c0c4cc" style="line-height: 36rpx;"></j-icon>
		</view>
		<view class="j-input--subfix" v-if="suffixIcon || $slots.suffix">
			<slot name="suffix">
				<j-icon style="line-height: 0;" :type="suffixIcon" :size="suffixIconStyle.size||'40rpx'" :color="suffixIconStyle.color||''"
					:fontFamily="suffixIconStyle.fontFamily||''"></j-icon>
			</slot>
		</view>
		<!-- 加这个是为了解决input点击事件无法冒泡的问题 -->
		<view v-if="readonly" class="j-input--modal"></view>
	</view>

</template>

<script>
	import {
		formValidate,
		sleep
	} from "../../utils/index.js"
	export default {
		name: 'j-input',
		props: {
			placeholder: {
				type: String,
				default: '请输入'
			},
			placeholderStyle: {
				type: String,
				default: ""
			},
			inputStyle: {
				type: String,
				default: ""
			},
			disabled: { // 是否禁锢
				type: Boolean,
				default: false
			},
			disabledColor:{
				type: String,
				default: '#f5f7fa'
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
			focus: { // 焦点
				type: Boolean,
				default: false
			},
			type: { // 类型
				type: String,
				default: 'text'
			},
			password: { // 是否是密码类型
				type: Boolean,
				default: false
			},
			maxlength: {
				type: [Number,String],
				default: 140
			},
			adjustPosition: { // 键盘弹起时，是否自动上推页面
				type: Boolean,
				default: true
			},
			// 输入框前置图标
			prefixIcon: {
				type: String,
				default: ''
			},
			// 前置图标样式，对象或字符串
			prefixIconStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			// 输入框后置图标
			suffixIcon: {
				type: String,
				default: ''
			},
			// 后置图标样式，对象
			suffixIconStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			// 边框类型，surround-四周边框，bottom-底部边框，none-无边框
			border: {
				type: String,
				default: 'surround'
			},
			// 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
			readonly: {
				type: Boolean,
				default: false
			},
			// 是否显示清除控件
			clearable: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				innerValue: '',
				// 是否处于获得焦点状态
				focused: false,
				isCreate:true,
			}
		},
		computed: {
			classStr() {
				let str = "j-input";
				if (this.border) {
					str += ' j-input__' + this.border;
				}
				return str
			},
			viewStyle(){
				if(this.disabled){
					return `background-color:${this.disabledColor}`
				}
				return '';
			},
			inputStr(){
				return "font-size: 30rpx;"+this.inputStyle;
			},
			placeholderStr(){
				return 'color:#c0c4cc;font-size: 30rpx;'+this.placeholderStyle;
			},
			// 是否显示清除控件
			isShowClear() {
				const {
					clearable,
					readonly,
					focused,
					innerValue
				} = this;
				return !!clearable && !readonly && !!focused && innerValue !== "";
			},
		},
		watch: {
			// #ifdef VUE2
			value:{
				immediate: true,
				handler:function(){
					if(this.innerValue === this.value){
						this.isCreate = false;
						return;
					}
					this.innerValue = this.value;
					this.valueChange(true);
				}
			},
			// #endif
			// #ifdef VUE3
			modelValue:{
				immediate: true,
				handler:function(){
					if(this.innerValue === this.modelValue){
						this.isCreate = false;
						return;
					}
					this.innerValue = this.modelValue;
					this.valueChange(true);
				}
			},
			// #endif
		},
		methods: {
			input(e) {
				this.innerValue = e.detail.value||"";
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
					// 尝试调用u-form的验证方法
					formValidate(this, "change");
				})
			},
			focusFn(e) {
				this.focused = true;
				this.$emit('focus', e);
			},
			blurFn(e) {
				this.$emit('blur', e);
				// H5端的blur会先于点击清除控件的点击click事件触发，导致focused
				// 瞬间为false，从而隐藏了清除控件而无法被点击到
				sleep(150).then(() => {
					this.focused = false;
				});
				// 尝试调用u-form的验证方法
				formValidate(this, "blur");
			},
			// 点击清除控件
			onClear() {
				// this.clearInput = true;
				this.innerValue = "";
				this.valueChange();
				this.$emit("clear");
			},
			confirm(e) {
				this.$emit('confirm', e.detail.value);
			},
			keyboardheightchange(e) {
				this.$emit("keyboardheightchange", e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../bem.scss";

	@include b(input) {
		position: relative;
		@include flexRow;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex:1;
		/* #endif */
		box-sizing: border-box;
		@include e(surround) {
			padding: 12rpx 18rpx;
			border: 1rpx solid #dadbde;
			border-radius: 8rpx;
		}

		@include e(bottom) {
			padding: 12rpx 18rpx;
			border-bottom: 1rpx solid #dadbde;
		}

		@include m(prefix) {
			@include flexRow;
			margin-right: 8rpx;
		}

		@include m(input) {
			flex: 1;
			@include formItemFontSize;
			@include formItemHeight;
			padding: 0;
			margin: 0;
			text-indent: 0; 
			background-color: transparent;
		}
		@include m(subfix) {
			@include flexRow;
			margin-left: 8rpx;
		}
		@include m(clear){
			padding: 0 8rpx;
		}
		@include m(modal){
			position: absolute;
			top:0;
			left:0;
			right: 0;
			bottom:0;
			z-index: 5;
		}
	}
</style>