<template>
	<view 
		class="l-textarea" 
		:style="[lStyle]"
		:class="[
			'l-textarea--' + layout,
			// classic ? 'l-textarea--classic-' + status : '',
			{
				'l-textarea--classic': classic,
				'l-textarea--classic-disabled':  classic && isDisabled,
				'l-textarea--classic-focused':  classic && !isDisabled && innerFocused,
				'l-textarea--border': bordered && !classic
			}]">
		<text 
			class="l-textarea__label" 
			:style="[labelStyle]"
			:class="[
				'l-textarea__label--' + layout,
			]"
			v-if="label != null || $slots['label'] != null">
			<slot>{{label}}</slot>
		</text>
		<view class="l-textarea__wrapper">
			<!-- #ifdef APP || WEB -->
			<textarea 
				class="l-textarea__wrapper-inner"
				:style="[innerStyle]"
				:class="{'is-disabled': isDisabled}"
				:maxlength="maxlength"
				:disabled="isDisabled || isReadonly"
				:placeholder="placeholder"
				placeholder-class="l-textarea__placeholder"
				:placeholder-style="placeholderStyle"
				:value="innerValue"
				:auto-height="autosize"
				:auto-focus="autofocus"
				:fixed="fixed"
				:focus="focus"
				:cursor="cursor"
				:cursor-spacing="cursorSpacing"
				:adjust-position="adjustPosition"
				:confirm-type="confirmType"
				:confirm-hold="confirmHold"
				:disable-default-padding="disableDefaultPadding"
				:show-confirm-bar="showConfirmBar"
				:selection-start="selectionStart"
				:selection-end="selectionEnd"
				:hold-keyboard="holdKeyboard"
				@input="onInput"
				@focus="onFocus"
				@blur="onBlur"
				@confirm="onConfirm"
				@linechange="onLineChange"
				@keyboardheightchange="onKeyboardHeightChange">
			</textarea>
			<!--  #endif -->
			<!-- #ifndef APP || WEB -->
			<textarea 
				class="l-textarea__wrapper-inner"
				:style="[innerStyle]"
				:class="{'is-disabled': isDisabled}"
				:maxlength="maxlength"
				:disabled="isDisabled || isReadonly"
				:value="innerValue"
				:auto-height="autosize"
				:auto-focus="autofocus"
				:fixed="fixed"
				:focus="focus"
				:cursor="cursor"
				:cursor-spacing="cursorSpacing"
				:adjust-position="adjustPosition"
				:confirm-type="confirmType"
				:confirm-hold="confirmHold"
				:disable-default-padding="disableDefaultPadding"
				:show-confirm-bar="showConfirmBar"
				:selection-start="selectionStart"
				:selection-end="selectionEnd"
				:hold-keyboard="holdKeyboard"
				@input="onInput"
				@focus="onFocus"
				@blur="onBlur"
				@confirm="onConfirm"
				@linechange="onLineChange"
				@keyboardheightchange="onKeyboardHeightChange">
			</textarea>
			<!-- 微信小程序 placeholder 不支持line-height 导致无法对齐，使用text模拟 -->
			<text class="l-textarea__placeholder" :style="placeholderStyle" v-if="innerValue.length == 0">{{placeholder}}</text>
			<!--  #endif -->
			
			<text class="l-textarea__indicator" :style="[indicatorStyle]" v-if="indicator && (maxcharacter > 0 || maxlength > 0 )">{{count}} / {{maxcharacter || maxlength}}</text>
		</view>
	</view>
</template>
<script lang="ts">
	// @ts-nocheck
	/**
	 * Textarea 多行输入框组件
	 * @description 用于多行文本输入场景，支持自适应高度和多种键盘控制选项
	 * <br>插件类型：LTextareaComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-textarea
	 * 
	 * @property {boolean} adjustPosition 键盘弹起自动上推页面（默认：true）
	 * @property {boolean} autofocus 自动聚焦（默认：false）
	 * @property {boolean} autosize 自动调整高度（默认：false）
	 * @property {boolean} bordered 显示外边框（默认：true）
	 * @property {boolean} confirmHold 点击确认保持键盘不收起（默认：false）
	 * @property {'return' | 'send' | 'search' | 'next' | 'go' | 'done'} confirmType 键盘确认按钮类型（默认："done"）
	 * @value return
	 * @value send
	 * @value search
	 * @value next
	 * @value go
	 * @value done
	 * @property {number} cursor 聚焦时初始光标位置
	 * @property {number} cursorSpacing 键盘与输入框间距（单位px，默认：0）
	 * @property {boolean} disableDefaultPadding 禁用iOS默认内边距（默认：false）
	 * @property {boolean} disabled 禁用状态（默认：false）
	 * @property {boolean} readonly 只读（默认：false）
	 * @property {boolean} classic 经典边框（默认：false）
	 * @property {boolean} fixed 在fixed定位区域使用（默认：false）
	 * @property {boolean} focused 是否显示获焦样式，用于结合自定义键盘使用时显示高亮效果
	 * @property {boolean} defaultFixed 默认fixed模式（兼容旧版）
	 * @property {boolean} focus 自动聚焦（默认：false）
	 * @property {boolean} holdKeyboard 点击页面不收起键盘（默认：false）
	 * @property {boolean} indicator 显示字数统计（默认：false）
	 * @property {string} label 左侧标签文本
	 * @property {number} maxcharacter 最大字符长度（中文算2个）
	 * @property {number} maxlength 最大输入长度（默认：-1不限制）
	 * @property {string} placeholder 占位文字
	 * @property {number} selectionEnd 光标结束位置（需搭配selectionStart）
	 * @property {number} selectionStart 光标起始位置（需搭配selectionEnd）
	 * @property {boolean} showConfirmBar 显示键盘完成栏（默认：true）
	 * @property {string} value 输入值（支持v-model）
	 * @property {'vertical' | 'horizontal'} layout 标签布局方式（默认："horizontal"）
	 * @value vertical
	 * @value horizontal
	 * @property {string} placeholderStyle 占位文字样式（仅支持color/font-size/font-weight）
	 * @property {string} lStyle 自定义组件样式（CSS字符串）
	 * @property {string} labelStyle 标签样式（CSS字符串）
	 * @property {string} indicatorStyle 字数统计样式（CSS字符串）
	 * @property {string} innerStyle 输入区域样式（CSS字符串）
	 * @property {string} borderColor 边框颜色
	 * @property {string} focusedBorderColor 聚焦时边框颜色
	 * @event {Function} focus 聚焦时触发
	 * @event {Function} blur 失焦时触发
	 * @event {Function} confirm 点击完成按钮触发
	 * @event {Function} linechange 行数变化时触发
	 * @event {Function} change 
	 * @event {Function} keyboardheightchange 
	 */
	import textareaProps from './props';
	import { characterLimit, type CharacterLengthResult } from '@/uni_modules/lime-shared/characterLimit';
	import { defineComponent, ref, computed, watchEffect, inject  } from '@/uni_modules/lime-shared/vue';
	
	export default defineComponent({
		name: 'l-textarea',
		emits: ['change', 'focus', 'blur', 'confirm', 'linechange', 'keyboardheightchange', 'input', 'update:modelValue'],
		props: textareaProps,
		setup(props, {emit}) {
			const formItemBlur = inject<(() => void)|null>('formItemBlur', null);
			const formDisabled = inject<Ref<boolean|null>|null>('formDisabled', null)
			const formReadonly = inject<Ref<boolean|null>|null>('formReadonly', null)
			
			const count = ref(0);
			const calculateValue = (value: string):CharacterLengthResult => {
				const { maxlength, maxcharacter } = props;
				if(maxcharacter != null && maxcharacter > 0) {
					return characterLimit('maxcharacter', value, maxcharacter)
				} else if(maxlength > 0) {
					return characterLimit('maxlength', value, maxlength)
				}
				return {
					characters: value,
					length: value.length
				} as CharacterLengthResult
			}
			let _innerValue = ''
			const innerValue = computed({
				set(v: string) {
					_innerValue = v;
					
					emit('change', v)
					emit('update:modelValue', v)
					// #ifdef VUE2
					emit('input', v)
					// #endif
				},
				get():string {
					const _value = props.value ?? props.modelValue ?? ''
					if(_innerValue != _value) {
						const {characters, length} = calculateValue(props.value ?? props.modelValue ?? '');
						count.value = length;
						return characters
					}
					return _value
				},
			})
			
			const isReadonly= computed(():boolean=>{
				if (props.readonly) return props.readonly;
				return formReadonly?.value ?? false;
			})
			const isDisabled= computed(():boolean=>{
				if (props.disabled) return props.disabled;
				return formDisabled?.value ?? false;
			})
			
			const innerFocused = ref(props.focus || props.focused);
			
			const styles = computed(()=> {
				const style = {}
				// #ifndef APP
				if(props.borderColor) {
					style['--l-textarea-border-color'] = props.borderColor
				}
				if(props.focusedBorderColor) {
					style['--l-textarea-focused-border-color'] = props.focusedBorderColor
				}
				// #endif
				return style
			})
			
			const onInput = (event: UniInputEvent) => {
				let { value, cursor } = event.detail;
				const {characters, length} = calculateValue(value);
				count.value = length;
				innerValue.value = characters;
			}
			const onFocus = (event: UniInputFocusEvent) => {
				innerFocused.value = true;
				emit('focus', event)
			}
			const onBlur = (event: UniInputBlurEvent) => {
				innerFocused.value = false;
				emit('blur', event)
				formItemBlur?.()
			}
			const onConfirm = (event: UniInputConfirmEvent) => {
				emit('confirm', event)
			}
			const onLineChange = (event: any) => {
				emit('linechange', event)
			}
			const onKeyboardHeightChange = (event: UniInputKeyboardHeightChangeEvent) => {
				emit('keyboardheightchange', event)
			}
			
			watchEffect(()=> {
				innerFocused.value = props.focus || props.focused;
			})
			
			return {
				isDisabled,
				isReadonly,
				styles,
				count,
				innerValue,
				innerFocused,
				onInput,
				onFocus,
				onBlur,
				onConfirm,
				onLineChange,
				onKeyboardHeightChange
			}
		}
	})
	
	
	
	
	
</script>
<style lang="scss">
	@import './index';
</style>
