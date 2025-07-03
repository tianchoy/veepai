<template>
	<view class="j-form-item">
		<view class="j-form-item--body" 
		:class="{
			'j-form-item__top':labelPositionTop
		}"
		:style="bodyStyle"
		>
			<view class="j-form-item--body--label" 
			v-if="required || leftIcon || label"
			:style="bodyLabelStyle">
				<text
					v-if="required"
					class="j-form-item--body--label--required"
				>*</text>
				<slot name="icon">
					<j-icon v-if="leftIcon" :type="leftIcon" :color="leftIconStyle.color" :size="leftIconStyle.size" :fontFamily="leftIconStyle.fontFamily"></j-icon>
				</slot>
				<view class="j-form-item--body--label--view">
					<text class="j-form-item--body--label--text" :style="parentData.labelStyle">{{label}}</text>
				</view>
				
			</view>
			<view class="j-form-item--body--right">
				<view class="j-form-item--body--right--content">
					<slot></slot>
				</view>
				<view class="j-form-item--body--right--slot" v-if="$slots.right">
					<slot name="right"></slot>
				</view>
			</view>
		</view>
		<slot name="error">
			<view class="j-form-item--error" v-if="message && parentData.errorType === 'message'" :style="errorViewStyle">
				<text
					class="j-form-item--message"
					:style="errorStyle"
				>{{ message }}</text>
			</view>
		</slot>
		<view v-if="borderBottom" :style="{marginTop:message && parentData.errorType === 'message'?'10rpx':''}">
			<j-line
				:color="message && parentData.errorType === 'border-bottom' ? 'red' : '#dadbde'"
			></j-line>
		</view>
		
	</view>
</template>

<script>
	import {addUnit, error, $parent, getProperty, setProperty } from "../../utils/index.js"
	export default {
		name:'j-form-item',
		props: {
			// input的label提示语
			label: {
				type: String,
				default: ""
			},
			// 绑定的值
			prop: {
				type: String,
				default: ""
			},
			// 绑定的规则
			rules: {
				type: Array,
				default: () => {
					return []
				}
			},
			// 是否显示表单域的下划线边框
			borderBottom: {
				type: Boolean,
				default: true
			},
			// label的位置，left-左边，top-上边
			labelPosition: {
				type: String,
				default: ""
			},
			alignItems:{ // flex-start, center,  flex-end
				type: String,
				default: ""
			},
			// label的宽度，单位px
			labelWidth: {
				type: [String, Number],
				default: ""
			},
			errorAlign:{ // start, center,  end
				type: String,
				default: ""
			},
			// 左侧图标
			leftIcon: {
				type: String,
				default: ""
			},
			// 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
			required: {
				type: Boolean,
				default: false
			},
			leftIconStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			horizontal:{ // 2边的padding间距
				type:[Number, String],
				default:'32rpx'
			},
			vertical:{ // 上下两边的padding间距
				type:[Number, String],
				default:'24rpx'
			}
		},
		data(){
			return {
				// 错误提示语
				message: '',
				parentData: {
					// 提示文本的位置
					labelPosition: 'left',
					// 提示文本对齐方式
					labelAlign: 'left',
					// 提示文本的样式
					labelStyle: {},
					// 提示文本的宽度
					labelWidth: 45,
					// 错误提示方式
					errorType: 'message'
				},
				itemRules: []
			}
		},
		computed:{
			labelPositionTop(){
				return this.labelPosition==='top'||this.parentData.labelPosition === 'top';
			},
			bodyStyle(){
				let alignItems = 'center'
				if(this.alignItems){
					alignItems = this.alignItems;
				}
				if(this.labelPositionTop){
					alignItems ='flex-start';
				}
				return `align-items:${alignItems}; padding:${addUnit(this.vertical)} ${addUnit(this.horizontal)};`
			},
			bodyLabelStyle(){
				const {labelWidth, parentData} = this;
				return `width:${addUnit(labelWidth || parentData.labelWidth)};
				margin-bottom:${parentData.labelPosition === 'left' ? 0 : '10rpx'};
				justify-content:${parentData.labelAlign === 'left' ? 'flex-start' : parentData.labelAlign === 'center' ? 'center' : 'flex-end'};
				`;
			},
			errorViewStyle(){
				let justifyContent = '';
				switch(this.errorAlign){
					case 'center':
						justifyContent = 'center';
						break;
					case 'end':
					case 'right':
						justifyContent = 'flex-end';
						break;
					default:
						break;
				}
				let str = `padding:0 ${addUnit(this.horizontal)};`;
				if(justifyContent){
					str += `justify-content:${justifyContent};`;
				}
				return str;
			},
			errorStyle(){
				const {labelPositionTop, labelWidth, parentData, errorAlign} = this;
				if(!errorAlign || errorAlign === 'start'){
					return `margin-left:${addUnit(labelPositionTop ? 0 : (labelWidth || parentData.labelWidth))}`
				}else{
					return ""
				}
			}
		},
		watch: {
			// 监听规则的变化
			rules: {
				immediate: true,
				handler(n) {
					this.setRules(n);
				},
			},
		},
		mounted() {
			this.init()
		},
		methods:{
			addUnit,
			init() {
				this.parent = $parent.call(this, 'j-form');
				if (!this.parent?.formAddChildren) {
					error('j-form-item需要结合j-form组件使用')
				}else{ // 让父组件收集子组件
					this.parent.formAddChildren(this);
					const obj = {...this.parentData};
					for(const key in obj){
						obj[key] = this.parent[key]
					}
					this.parentData = obj;
				}
			},
			// 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
			setRules(rules) {
				// 判断是否有规则
				if (rules.length === 0) {
					this.itemRules = [];
					return
				};
				this.itemRules = rules;
			},
			// 移除j-form-item的校验结果
			clearValidate() {
				this.message = null
			},
			// 清空当前的组件的校验结果，并重置为初始值
			resetField() {
				// 找到原始值
				const value = getProperty(this.parent.originalModel, this.prop)
				// 将j-form的model的prop属性链还原原始值
				setProperty(this.parent.model, this.prop, value)
				// 移除校验结果
				this.message = null
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../bem.scss";
	@include b(form-item){
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		@include m(body){
			@include flexRow;
			/* #ifndef APP-NVUE */
			width: 100%;
			/* #endif */
			box-sizing: border-box;
			@include m(label){
				@include flexRow;
				box-sizing: border-box;
				padding-right: 10rpx;
				@include m(required){
					color:red
				}
				@include m(view){
					flex:1;
				}
				@include m(text){
					color:#303133;
				}
			}
			@include m(right){
				flex:1;
				@include flexRow;
				@include m(content){
					flex:1;
				}
				@include m(slot){
					padding-left:8rpx;
					line-height: 0;
					color:rgb(96, 98, 102);
				}
			}
		}
		@include e(top){
			flex-direction: column;
			align-items: flex-start;
			.j-form-item--body--right{
				/* #ifndef APP-NVUE */
				width: 100%;
				/* #endif */
			}
		}
		@include m(error){
			@include flexRow(flex-start);
		}
		@include m(message){
			font-size: 24rpx;
			line-height: 24rpx;
			color: red;
		}
	}
</style>