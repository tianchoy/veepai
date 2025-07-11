<template>
	<view class="l-switch">
		<view
			class="l-switch__rail"
			ref="rootRef" 
			:hover-start-time="20" 
			:hover-stay-time="70" 
			:hover-class="rubberBand && !isDisabled && !loading ? 'l-switch--hover' : ''" 
			:class="{
				'l-switch--checked' : innerValue,
				'l-switch--unchecked' : !innerValue,
				'l-switch--disabled' : isDisabled,
				'l-switch--round' : round,
				'l-switch--square' : !round,
			}" 
			:style="[styles]" 
			aria-role="switch" 
			@click="handleClick">
			<view class="l-switch__children-placeholder" v-if="placeholder.length > 0">
				<view class="l-switch__rail-placeholder" v-for="item in placeholder" :key="item">
					{{item}}
				</view>
			</view>
			<view class="l-switch__dot" 
				:class="{
					'l-switch__dot--disabled' : isDisabled,
					'l-switch__dot--round' : round,
					'l-switch__dot--square' : !round,
				}"  
				ref="dotRef">
				<text class="l-switch__placeholder l-switch__placeholder--checked"
					ref="checkedRef"  v-if="placeholder.length > 0">
					{{placeholder[0]}}
				</text>
				<text class="l-switch__placeholder l-switch__placeholder--unchecked" 
					ref="uncheckedRef" v-if="placeholder.length > 1">
					{{placeholder[1]}}
				</text>
				<l-loading v-if="loading && $slots['icon'] == null"></l-loading>
				<slot name="icon" :checked="innerValue"></slot>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	// @ts-nocheck
	/**
	 * Switch 开关组件
	 * @description 用于表示两种相互对立的状态切换，支持多种自定义样式和交互效果
	 * <br>插件类型：LSwitchComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-switch
	 * 
	 * @property {boolean} modelValue 绑定值（推荐使用v-model）
	 * @property {boolean} value 绑定值（兼容旧版）
	 * @property {boolean} defaultValue 默认值（非受控属性）
	 * @property {boolean} disabled 禁用状态（默认：false）
	 * @property {boolean} readonly 只读状态（默认：false）
	 * @property {boolean} loading 加载状态（默认：false）
	 * @property {boolean} round 圆形外观（默认：true）
	 * @property {boolean} rubberBand 弹性动画效果（默认：false）
	 * @property {string} name 表单字段名
	 * @property {string[]} placeholder 状态提示文本（格式：[关闭状态文本, 开启状态文本]）
	 * @property {string} fontSize 文本字号（支持CSS单位）
	 * @property {string} width 开关宽度（支持CSS单位）
	 * @property {string} height 开关高度（支持CSS单位）
	 * @property {string} dotSize 圆形滑块尺寸（支持CSS单位）
	 * @property {string} dotPressedSize 按下时滑块缩放比例
	 * @property {string} checkedColor 开启状态颜色
	 * @property {string} disabledColor 禁用状态背景色
	 * @property {string} checkedDisabledColor 禁用时开启状态颜色
	 * @property {string} uncheckedColor 关闭状态颜色
	 * @event {Function} change 状态变化时触发（返回当前状态）
	 */
	import { defineComponent, ref, computed, inject  } from '@/uni_modules/lime-shared/vue';
	import switchProps from './props';
	
	export default defineComponent({
		name: 'l-switch',
		props: switchProps,
		emits: ['change', 'update:modelValue', 'input'],
		setup(props, {emit}) {
			const formDisabled = inject<Ref<boolean|null>|null>('formDisabled', null)
			const formReadonly = inject<Ref<boolean|null>|null>('formReadonly', null)
			const isReadonly= computed(():boolean=>{
				if (props.readonly) return props.readonly;
				return formReadonly?.value ?? false;
			})
			const isDisabled= computed(():boolean=>{
				if (props.disabled) return props.disabled;
				return formDisabled?.value ?? false;
			})
			
			// 设置默认值
			const modelValue = ref((props.modelValue ?? false) || (props.defaultValue ?? false))
			const innerValue = computed({
				set(value: boolean){
					if(value == modelValue.value) return
					modelValue.value = value;
					emit('change', value)
					emit('update:modelValue', value)
					// #ifdef VUE2
					emit('input', value)
					// #endif
				},
				get():boolean {
					return (props.value ?? props.modelValue ?? false) || modelValue.value
				},
			} as WritableComputedOptions<boolean>)
			
			const styles = computed(()=>{
				const style: Record<string, any> = {}
				
				if(props.width) {
					style['--l-switch-width'] = props.width!
				}
				if(props.height) {
					style['--l-switch-height'] = props.height!
				}
				if(props.fontSize) {
					style['--l-swtich-font-size'] = props.fontSize!
				}
				if(props.dotSize) {
					style['--l-switch-dot-size'] = props.dotSize!
				}
				if(props.dotPressedSize) {
					style['--l-switch-dot-size-pressed'] = props.dotPressedSize!
				}
				if(props.checkedColor) {
					style['--l-switch-checked-color'] = props.checkedColor!
				}
				if(props.checkedDisabledColor) {
					style['--l-switch-checked-disabled-color'] = props.checkedDisabledColor!
				}
				if(props.disabledColor) {
					style['--l-switch-unchecked-disabled-color'] = props.disabledColor!
				}
				if(props.uncheckedColor) {
					style['--l-switch-unchecked-color'] = props.uncheckedColor!
				}
				
				if(isDisabled.value && props.checkedColor && !props.checkedDisabledColor) {
					style['--l-switch-checked-disabled-color'] = props.checkedColor!
					style['--l-switch-disabled-opacity'] = 0.5
				}
				return style
			})
			const handleClick = (e: UniPointerEvent) => {
				if (isDisabled.value || props.loading || isReadonly.value) return
				innerValue.value = !innerValue.value;
			}
			
			
			return {
				isDisabled,
				innerValue,
				styles,
				handleClick
			}
		}
	})
	
</script>
<style lang="scss">
	@import './index-u';
</style>
