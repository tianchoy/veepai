<template>
	<view class="j-switch">
		<text class="j-switch-l" v-if="activelabel">{{activelabel}}</text>
		<view class="j-switch-v" :style="switchStyle" :class="{'j-switch-v__disabled':disabled}" @tap="clickHandler">
			<view class="j-switch-v--bg" :style="bgStyle"></view>
			<view class="j-switch-v--node" :style="nodeStyle">
				<j-loading-icon v-if="loading" :size="getPx(size)/2+'px'"></j-loading-icon>
			</view>
		</view>
		<text class="j-switch-r" v-if="inactivelabel">{{inactivelabel}}</text>
	</view>
</template>

<script>
	import {
		addUnit,
		getPx,
		error,
	} from "../../utils/index.js"
	export default{
		name:'j-switch',
		props:{
			// 是否为加载中状态
			loading: {
			    type: Boolean,
			    default: false
			},
			// 是否为禁用装填
			disabled: {
			    type: Boolean,
			    default: false
			},
			// 开关尺寸，单位px
			size: {
			    type: [String,Number],
			    default: '46rpx'
			},
			activelabel:{
				type: String,
				default: ''
			},
			inactivelabel:{
				type: String,
				default: ''
			},
			// 打开时的背景颜色
			activeColor: {
			    type: String,
			    default: '#2979ff'
			},
			// 关闭时的背景颜色
			inactiveColor: {
			    type: String,
			    default: '#ffffff'
			},
			// 通过v-model双向绑定的值
			// #ifdef VUE3
			modelValue: {
			    type: [Boolean, String, Number],
			    default: false
			},
			// #endif
			// #ifdef VUE2
			value: {
			    type: [Boolean, String, Number],
			    default: false
			},
			// #endif
			// switch打开时的值
			activeValue: {
			    type: [String, Number, Boolean],
			    default: true
			},
			// switch关闭时的值
			inactiveValue: {
			    type: [String, Number, Boolean],
			    default: false
			},
			// 圆点与外边框的距离
			space: {
			    type: String,
			    default: '1rpx'
			}
		},
		computed: {
			isActive(){
				let bool = false;
				// #ifdef VUE3
				bool = this.modelValue === this.activeValue;
				// #endif
		    		// #ifdef VUE2
				bool = this.value === this.activeValue;
				// #endif
				return bool;
			},
			customInactiveColor() {
				// 之所以需要判断是否自定义了“非激活”颜色，是为了让node圆点离外边框更宽一点的距离
				return this.inactiveColor !== '#fff' && this.inactiveColor !== '#ffffff'
			},
			switchStyle() {
				const size = getPx(this.size);
				// 这里需要加2，是为了腾出边框的距离，否则圆点node会和外边框紧贴在一起
				const addSize = getPx('4rpx');
				const height = addUnit(size+addSize);
				let style = `width:${addUnit(size * 2 + addSize)};height:${height};border-radius:${height};background-color:${this.isActive ? this.activeColor : this.inactiveColor}`;
				// 如果自定义了“非激活”演示，name边框颜色设置为透明(跟非激活颜色一致)
				// 这里不能简单的设置为非激活的颜色，否则打开状态时，会有边框，所以需要透明
				if(this.customInactiveColor) {
					style+="border-color:rgba(0, 0, 0, 0);"
				}
				return style;
			},
			bgStyle() {
				const size = getPx(this.size);
				return `width:${addUnit(size*2 - size/2)};height:${addUnit(size)};border-radius:${addUnit(size)};background-color:${this.inactiveColor};transform:scale(${this.isActive ? 0 : 1})`;
			},
			nodeStyle() {
				const size = getPx(this.size);
				const space = getPx(this.space)
				// if(space === '0'){ // 为0rpx会导致有些应用无法显示
				// 	space = '1rpx';
				// }
				// 如果自定义非激活颜色，将node圆点的尺寸减少两个像素，让其与外边框距离更大一点
				const translateX = this.isActive ? space : size;
				const w = addUnit(size-space);
				return `width:${w};height:${w};transform:translateX(-${addUnit(translateX)})`;
			},
		},
		watch: {
			// #ifdef VUE3
			modelValue: {
				immediate: true,
				handler(n) {
					if(n !== this.inactiveValue && n !== this.activeValue) {
						error('v-model绑定的值必须为inactiveValue、activeValue二者之一')
					}
				}
			},
			// #endif
		  // #ifdef VUE2
			value: {
				immediate: true,
				handler(n) {
					if(n !== this.inactiveValue && n !== this.activeValue) {
						error('v-model绑定的值必须为inactiveValue、activeValue二者之一')
					}
				}
			}
			// #endif
		},
		methods:{
			getPx,
			clickHandler() {
				if (!this.disabled && !this.loading) {
					const oldValue = this.isActive ? this.inactiveValue : this.activeValue;
					// #ifdef VUE3
					this.$emit("update:modelValue", oldValue);
					// #endif
					// #ifdef VUE2
					this.$emit("input", oldValue);
					// #endif
					// 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
					this.$nextTick(() => {
						this.$emit('change', oldValue);
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../bem.scss";
	@include b(switch) {
		@include flexRow(flex-start);
		@include formItemHeight;
		&-l{
			color:#606266;
			@include formItemFontSize;
			margin-right: 12rpx;
		}
		&-r{
			color:#606266;
			@include formItemFontSize;
			margin-left: 12rpx;
		}
		&-v {
			position: relative;
			width: fit-content;
			box-sizing: border-box;
			background-color: #fff;
			border-width: 2rpx;
			transition: background-color 0.4s;
			border-color: rgba(0, 0, 0, 0.12);
			border-style: solid;
			@include flexRow(flex-end);
			// 由于weex为阿里逗着玩的KPI项目，导致bug奇多，这必须要写这一行，
			// 否则在iOS上，点击页面任意地方，都会触发switch的点击事件
			overflow: hidden;
			@include e(disabled){
				opacity: .6;
			}
			@include m(bg){
				background-color: #FFFFFF;
				transition-property: transform;
				transition-duration: 0.4s;
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
				transition-timing-function: ease;
				box-sizing: border-box;
			}
			@include m(node){
				position: absolute;
				@include flexRow(center);
				background-color: #fff;
				border-radius: 50%;
				box-shadow: 2rpx 2rpx 2rpx 0 rgba(0, 0, 0, 0.25);
				transition-property: transform;
				transition-duration: 0.4s;
				transition-timing-function: cubic-bezier(0.3, 1.05, 0.4, 1.05);
				box-sizing: border-box;
				
			}
		}
	}
	
</style>