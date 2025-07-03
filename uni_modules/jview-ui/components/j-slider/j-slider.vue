<template>
	<view v-if="show">
		<view  class="j-slider" @tap="onClick" :class="[disabled ? 'j-slider__disabled' : '']" :style="sliderStyle">
			<view
				class="j-slider--border"
				:style="[
					barStyle,
					{
						height: addUnit(sliderH),
						backgroundColor: activeColor
					}
				]"
			>
				<view class="j-slider--icon" @touchstart="onTouchStart" 
					@touchmove="onTouchMove" @touchend="onTouchEnd" 
					@touchcancel="onTouchEnd">
					<slot name="icon">
						<view class="j-slider--icon--dian" :style="blockStyle"></view>
					</slot>
				</view>
			</view>
		</view>
	</view>
	<slider v-else :value="sliderVal" :disabled="disabled" :min="min" :max="max" :activeColor="activeColor" :blockSize="getPx(blockSize)" :blockColor="blockColor" :backgroundColor="inactiveColor" @change="changeVal" @changing="changing" :step="step" />
</template>

<script>
import {getDomStyle, addUnit, getPx} from "../../utils/index"
/**
 * slider 滑块选择器
 * @property {Number | String} value 滑块默认值（默认0）
 * @property {Number | String} min 最小值（默认0）
 * @property {Number | String} max 最大值（默认100）
 * @property {Number | String} step 步长（默认1）
 * @property {Number | String} blockSize 滑块宽度，高等于宽（36rpx）
 * @property {Number | String} height 滑块条高度，单位rpx（默认6）
 * @property {String} inactiveColor 底部条背景颜色（默认#c0c4cc）
 * @property {String} activeColor 底部选择部分的背景颜色（默认#2979ff）
 * @property {String} blockColor 滑块颜色（默认#ffffff）
 * @property {Boolean} disabled 是否禁用滑块(默认为false)
 * @event {Function} touchStart 滑动触发
 * @event {Function} touchmove 正在滑动中
 * @event {Function} touchEnd 滑动结束
 * @example <j-slider v-model="value" />
 */
export default {
	name: 'j-slider',
	props: {
		// 当前进度百分比值，范围0-100
		// #ifdef VUE3
		// 当前取值
		modelValue: {
			type: [String, Number],
			default: 0
		},
		// #endif
		// #ifdef VUE2
		// 当前取值
		value: {
			type: [String, Number],
			default: 0
		},
		// #endif
		// 是否禁用滑块
		disabled: {
			type: Boolean,
			default: false
		},
		// 滑块宽度，高等于宽，单位rpx
		blockSize: {
			type: [Number, String],
			default: '36rpx'
		},
		// 最小值
		min: {
			type: [Number, String],
			default: 0
		},
		// 最大值
		max: {
			type: [Number, String],
			default: 100
		},
		// 步进值
		step: {
			type: [Number, String],
			default: 1
		},
		// 滑块条高度
		height: {
			type: [Number, String],
			default: 0
		},
		// 进度条的激活部分颜色
		activeColor: {
			type: String,
			default: '#2979ff'
		},
		// 进度条的背景颜色
		inactiveColor: {
			type: String,
			default: '#c0c4cc'
		},
		// 滑块的背景颜色
		blockColor: {
			type: String,
			default: '#ffffff'
		}
	},
	data() {
		return {
			startX: 0,
			status: 'end',
			newValue: 0,
			distanceX: 0,
			startValue: 0,
			barStyle: {},
			sliderRect: {
				left: 0,
				width: 0
			},
			sliderH:0
		};
	},
	computed:{
		show(){
			let bool = false;
			// #ifndef APP-NVUE
			if(this.sliderH){
				bool = true;
			}
			// #endif
			return bool;
		},
		sliderVal(){
			// #ifdef VUE2
			return this.value;
			// #endif
			// #ifdef VUE3
			return this.modelValue;
			// #endif
		},
		sliderStyle(){
			const {inactiveColor,sliderH} = this;
			return {
				borderRadius:addUnit(sliderH),
				backgroundColor: inactiveColor
			}
		},
		blockStyle(){
			const {blockSize, blockColor} = this;
			return {
				height: addUnit(blockSize),
				width: addUnit(blockSize),
				backgroundColor: blockColor
			}
		}
	},
	watch: {
		// #ifdef VUE2
		value:{
			immediate: true,
			handler:function(newVal){
				// 只有在非滑动状态时，才可以通过value更新滑块值，这里监听，是为了让用户触发
				if(this.status == 'end') this.updateValue(newVal, false);
			}
		},
		// #endif
		// #ifdef VUE3
		modelValue:{
			immediate: true,
			handler:function(newVal){
				// 只有在非滑动状态时，才可以通过value更新滑块值，这里监听，是为了让用户触发
				if(this.status == 'end') this.updateValue(newVal, false);
			}
		},
		// #endif

	},
	created(){
		this.sliderH = this.height;
		// #ifndef APP-NVUE
		if(this.$slots.icon && !this.height){
			this.sliderH = '6rpx';
		}
		// #endif
	},
	mounted() {
		// #ifndef APP-NVUE
		// 获取滑块条的尺寸信息
		getDomStyle(this, null, '.j-slider').then(rect => {
			this.sliderRect = rect;
		});
		// #endif
	},
	methods: {
		getPx,
		addUnit,
		changing(e){
			const val = e.detail.value;
			// #ifdef VUE2
			this.$emit("input", val);
			// #endif
			// #ifdef VUE3
			this.$emit("update:modelValue", val);
			// #endif
		},
		changeVal(){
			this.$emit('touchEnd');
		},
		onTouchStart(event) {
			if (this.disabled) return;
			this.startX = 0;
			// 触摸点集
			let touches = event.touches[0];
			// 触摸点到屏幕左边的距离
			this.startX = touches.clientX;
			// 此处的this.value虽为props值，但是通过$emit('input')进行了修改
			let val;
			// #ifdef VUE3
			// 当前取值
			val = this.modelValue;
			// #endif
			// #ifdef VUE2
			// 当前取值
			val = this.value;
			// #endif
			this.startValue = this.format(val);
			// 标示当前的状态为开始触摸滑动
			this.status = 'start';
		},
		onTouchMove(event) {
			if (this.disabled) return;
			// 连续触摸的过程会一直触发本方法，但只有手指触发且移动了才被认为是拖动了，才发出事件
			// 触摸后第一次移动已经将status设置为moving状态，故触摸第二次移动不会触发本事件
			if (this.status == 'start') this.$emit('touchStart');
			let touches = event.touches[0];
			// 滑块的左边不一定跟屏幕左边接壤，所以需要减去最外层父元素的左边值
			this.distanceX = touches.clientX - this.sliderRect.left;
			// 获得移动距离对整个滑块的百分比值，此为带有多位小数的值，不能用此更新视图
			// 否则造成通信阻塞，需要每改变一个step值时修改一次视图
			this.newValue = (this.distanceX / this.sliderRect.width) * 100;
			this.status = 'moving';
			// 发出moving事件
			this.$emit('touchMove');
			this.updateValue(this.newValue, true);
		},
		onTouchEnd() {
			if (this.disabled) return;
			if (this.status === 'moving') {
				this.updateValue(this.newValue, false);
				this.$emit('touchEnd');
			}
			this.status = 'end';
		},
		updateValue(value, drag) {
			
			// 去掉小数部分，同时也是对step步进的处理
			const width = this.format(value);
			// 不允许滑动的值超过max最大值，百分比也不能超过100
			if(width > this.max || width > 100) return;
			// 设置移动的百分比值
			let barStyle = {
				width: width + '%'
			};
			// 移动期间无需过渡动画
			if (drag == true) {
				barStyle.transition = 'none';
			} else {
				// 非移动期间，删掉对过渡为空的声明，让css中的声明起效
				delete barStyle.transition;
			}
			// 修改value值
			// #ifdef VUE2
			this.$emit("input", width);
			// #endif
			// #ifdef VUE3
			this.$emit("update:modelValue", width);
			// #endif
			this.barStyle = barStyle;
		},
		format(value) {
			// 将小数变成整数，为了减少对视图的更新，造成视图层与逻辑层的阻塞
			return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step;
		},
		onClick(event) {
			if (this.disabled) return;
			// 直接点击滑块的情况，计算方式与onTouchMove方法相同
			const value = ((event.detail.x - this.sliderRect.left) / this.sliderRect.width) * 100;
			this.updateValue(value, false);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../bem.scss";
@include b(slider){
	position: relative;
	@include e(disabled){
		opacity: 0.5;
	}
	@include m(border){
		position: relative;
		border-radius: inherit;
		transition: 0.2s;
	}
	@include m(icon){
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate3d(50%, -50%, 0);
		@include m(dian){
			width: 24px;
			height: 24px;
			border-radius: 50%;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
			cursor: pointer;
		}
	}
}
</style>
