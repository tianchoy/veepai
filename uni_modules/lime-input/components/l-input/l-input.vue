<template>
	<view class="l-input" 
		:style="[styles, lStyle]"
		:class="[
			'l-input--' + layout,
			classic ? 'l-input--classic-' + status : '',
			{'l-input--classic': classic},
			{'l-input--classic-disabled':  classic && disabled},
			{'l-input--classic-focused':  classic && disabled},
			{'l-input--border': bordered && !classic}]">
		<view class="l-input__wrap--prefix" v-if="label || $slots['label'] || $slots['prefix-icon'] || prefixIcon">
			<view class="l-input__icon--prefix" v-if="$slots['prefix-icon'] || prefixIcon">
				<slot name="prefix-icon">
					<l-icon :name="prefixIcon" v-if="prefixIcon" :color="prefixIconColor" :size="prefixIconSize"></l-icon>
				</slot>
			</view>
			<text class="l-input__label" 
				:style="[lableStyle]"
				:class="{ 'l-input__label--gap': prefixIcon || $slots['prefix-icon']}"
				v-if="label || $slots['label'] ">
				<slot name="label">{{label}}</slot>
			</text>
		</view>
		<view class="l-input__wrap">
			<view class="l-input__content">
				<input
					class="l-input__control"
					:style="[inputStyle]"
					:class="[
						'l-input--' + align,
						{
							'l-input__control--disabled': isDisabled,
							'l-input__control--read-only': isReadonly,
						}
					]"
					:maxlength="maxlength"
					:disabled="isDisabled || isReadonly"
					:placeholder="placeholder"
					:placeholder-style="placeholderStyle"
					:placeholder-class="!placeholderStyle ?  (isDisabled || isReadonly ? 'l-input__placeholder--disabled' : 'l-input__placeholder') : ''"
					:value="innerValue"
					:password="type == 'password'"
					:type="type == 'password' ? 'text' : type"
					:focus="focus"
					:confirm-type="confirmType"
					:confirm-hold="confirmHold"
					:cursor="cursor"
					:cursor-color="cursorColor"
					:cursor-spacing="cursorSpacing"
					:adjust-position="adjustPosition"
					:auto-focus="autoFocus"
					:always-embed="alwaysEmbed"
					:selection-start="selectionStart"
					:selection-end="selectionEnd"
					:hold-keyboard="holdKeyboard"
					:safe-password-cert-path="safePasswordCertPath"
					:safe-password-length="safePasswordLength"
					:safe-password-time-stamp="safePasswordTimeStamp"
					:safe-password-nonce="safePasswordNonce"
					:safe-password-salt="safePasswordSalt"
					:safe-password-custom-hash="safePasswordCustomHash"
					:aria-label="label"
					:aria-roledescription="label"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardHeightChange"
					@nicknamereview="onNickNameReview" />
				<view class="l-input__wrap--clearable-icon" v-if="clearable" @click="clearInput" v-show="showClearIcon">
					<l-icon name="close-circle-filled" :size="clearIconSize"></l-icon>
				</view>
				<view class="l-input__wrap--suffix" @click="onSuffixClick" v-if="suffix || $slots['suffix']">
					<slot name="suffix">
						<text class="l-input__wrap--suffix-text">{{suffix}}</text>
					</slot>
				</view>
				<view class="l-input__wrap--suffix-icon" v-if="suffixIcon || $slots['suffix-icon']">
					<slot name="suffix-icon">
						<l-icon :name="suffixIcon" @click="onSuffixIconClick" :size="suffixIconSize" :color="suffixIconColor" v-if="suffixIcon"></l-icon>
					</slot>
				</view>
			</view>
			<text class="l-input__tips" :style="[tipsStyle]" :class="['l-input__tips--' + status]" v-if="tips && tips!.length > 0 || $slots['tips']">
				<slot name="tips">{{tips}}</slot>
			</text>
		</view>
	</view>
</template>
<script lang="ts">
	// @ts-nocheck
	/**
	 * Input 输入框组件
	 * @description 增强版输入组件，支持安全加密输入、多类型验证和智能交互
	 * <br> 插件类型：LInputComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-input
	 * 
	 * @property {boolean} adjustPosition 键盘弹起时页面自动上推
	 * @property {'left'|'center'|'right'} align 文本对齐方式
	 * @value left   
	 * @value center  
	 * @value right    
	 * @property {boolean} alwaysEmbed iOS强制同层渲染（仅iOS生效）
	 * @property {boolean} autoFocus 自动聚焦（即将废弃，建议使用focus）
	 * @property {boolean} bordered 无边框模式
	 * @property {'always'|'focus'} clearTrigger 清空按钮显示规则
	 * @value always
	 * @value focus     
	 * @property {boolean} clearable 显示清空按钮
	 * @property {boolean} confirmHold 点击确认按钮保持键盘
	 * @property {'send'|'search'|'next'|'go'|'done'} confirmType 确认按钮类型
	 * @value send    显示"发送"
	 * @value search  显示"搜索"
	 * @value next    显示"下一个"
	 * @value go      显示"前往"
	 * @value done    显示"完成"
	 * @property {number} cursor 初始光标位置（需配合selectionStart/End）
	 * @property {string} cursorColor 光标颜色
	 * @property {number} cursorSpacing 光标与键盘间距（单位px）
	 * @property {boolean} disabled 禁用状态
	 * @property {boolean} focus 强制聚焦
	 * @property {boolean} focused 是否显示获焦样式，用于结合自定义键盘使用时显示高亮效果
	 * @property {boolean} holdKeyboard 聚焦时保持键盘不收起
	 * @property {string} label 左侧标签文本
	 * @property {'horizontal'|'vertical'} layout 标签布局
	 * @value horizontal 
	 * @value vertical
	 * @property {number} maxcharacter 最大字符长度（中文算2字符）
	 * @property {number} maxlength 最大输入长度（中文算1字符）
	 * @property {string} placeholder 占位文本
	 * @property {string} placeholderStyle 占位符内联样式
	 * @property {string} placeholderClass 占位符CSS类名
	 * @property {boolean} readonly 只读模式
	 * @property {string} safePasswordCertPath 安全证书路径（仅App）
	 * @property {string} safePasswordCustomHash 自定义哈希算法（仅App）
	 * @property {number} safePasswordLength 安全密码长度（仅App）
	 * @property {string} safePasswordNonce 加密随机数（仅App）
	 * @property {string} safePasswordSalt 加密盐值（仅App）
	 * @property {number} safePasswordTimeStamp 加密时间戳（仅App）
	 * @property {'default'|'success'|'warning'|'error'} status 校验状态
	 * @value default
	 * @value success
	 * @value warning
	 * @value error
	 * @property {string} prefixIcon 前缀图标（支持图片路径/字体图标）
	 * @property {string} prefixIconSize 前缀图标尺寸（带单位）
	 * @property {string} prefixIconColor 前缀图标颜色
	 * @property {string} suffix 后缀文本内容
	 * @property {string} suffixIcon 后缀图标（支持图片路径/字体图标）
	 * @property {string} suffixIconSize 后缀图标尺寸（带单位）
	 * @property {string} clearIconSize 删除图标尺寸
	 * @property {string} suffixIconColor 后缀图标颜色
	 * @property {string} tips 底部提示文本（根据status变色）
	 * @property {'text'|'number'|'idcard'|'digit'|'safe-password'|'password'|'nickname'} type 输入类型
	 * @value text           普通文本
	 * @value number         数字键盘（非强制）
	 * @value idcard         身份证键盘（带X）
	 * @value digit          强制数字键盘
	 * @value safe-password  安全加密输入
	 * @value password       密码输入
	 * @value nickname       昵称输入（过滤特殊字符）
	 * @property {string} value 输入值（支持v-model）
	 * @property {string} modelValue 输入值（支持v-model）
	 * @property {string} lStyle 根节点自定义样式
	 * @property {string} lableStyle 标签样式
	 * @property {string} tipsStyle 提示文本样式
	 * @property {string} inputStyle 输入域样式
	 * @property {string} borderColor 边框颜色（bordered时生效）
	 * @property {string} focusedBorderColor 聚焦时边框颜色（bordered时生效）
	 * @event {Function} change 输入时触发
	 * @event {Function} focus 聚焦时触发
	 * @event {Function} blur 失焦时触发
	 * @event {Function} confirm 点击完成按钮触发
	 * @event {Function} clear 点击清空按钮触发
	 * @event {Function} click-icon 点击触发
	 */
	import { defineComponent,  computed, watchEffect, inject, ref } from '@/uni_modules/lime-shared/vue';
	import inputProps from './props';
	
	export default defineComponent({
		name: 'l-input',
		props: inputProps,
		emits: ['change', 'focus', 'blur', 'confirm', 'clear', 'click', 'input', 'update:modelValue'],
		options: {
			behaviors: ['wx://form-field']
		},
		setup(props, {emit}) {
			const formItemBlur = inject<(() => void)|null>('formItemBlur', null);
			const formDisabled = inject<Ref<boolean|null>|null>('formDisabled', null)
			const formReadonly = inject<Ref<boolean|null>|null>('formReadonly', null)
			
			const isDisabled = computed(():boolean => props.disabled || formDisabled?.value)
			const isReadonly = computed(():boolean => props.readonly || formReadonly?.value)
			
			const calculateValue = (value: string):CharacterLengthResult => {
				const { maxlength, maxcharacter } = props;
				if(maxcharacter != null && maxcharacter > 0) {
					return characterLimit('maxcharacter', value, maxcharacter)
				} 
				// else if(maxlength > 0) {
				// 	return characterLimit('maxlength', value, maxlength)
				// }
				return {
					characters: value,
					length: value.length
				} as CharacterLengthResult
			}
			
			let _innerValue = '';
			const innerFocused = ref(props.focus || props.focused);
			const innerValue = computed({
				set(value: string|number) {
					// modelValue.value = value;
					_innerValue = value;
					emit('update:modelValue', value)
					emit('change', value)
					// #ifdef VUE2
					emit('input', value)
					// #endif
				},
				get():string|number {
					const _value = props.value ?? props.modelValue
					if(_innerValue != _value) {
						const { characters } = calculateValue(props.value ?? props.modelValue ?? '');
						return props.type != 'number' ? characters : characters && Number(characters)
					}
					return props.type != 'number' ? _value : _value && Number(_value)
				}
			} as WritableComputedOptions<string>)
			const styles = computed(() =>{
				const style:Record<string, any> = {}
				if(props.borderColor) {
					style['--l-input-border-color'] = props.borderColor
				}
				if(props.focusedBorderColor) {
					style['--l-input-focused-border-color'] = props.focusedBorderColor
				}
				return style
			})
			const showClearIcon = computed(():boolean => {
				const { clearTrigger, disabled, readonly } = props;
				if(disabled || readonly) {
					return false
				}
				return innerValue.value.length > 0 || clearTrigger == 'always' 
			})
			const onInput = (e: UniInputEvent) => {
				const { value, cursor, keyCode } = e.detail;
				
				if(props.type == 'number') {
					const _v = (typeof value == 'string' ? parseFloat(value) : value) //as number
					innerValue.value = isNaN(_v) ? '' : _v;
				} else {
					const { characters } = calculateValue(value);
					innerValue.value = characters;
				}
				
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
			const onKeyboardHeightChange = (event: UniInputKeyboardHeightChangeEvent) => {
				emit('keyboardheightchange', event)
			}
			const onNickNameReview = (event: any) => {
				emit('nicknamereview', event)
			}
			const clearInput = () => {
				innerValue.value = '';
				emit('clear')
			}
			const onSuffixClick = () => {
				emit('click', { trigger: 'suffix' })
			}
			const onSuffixIconClick = () => {
				emit('click', { trigger: 'suffix-icon' })
			}
			
			watchEffect(()=> {
				innerFocused.value = props.focus || props.focused;
			})
			
			return {
				isDisabled,
				isReadonly,
				styles,
				showClearIcon,
				innerValue,
				innerFocused,
				onInput,
				onFocus,
				onBlur,
				onConfirm,
				onKeyboardHeightChange,
				onNickNameReview,
				clearInput,
				onSuffixClick,
				onSuffixIconClick
			}
		}
	})
</script>
<style lang="scss">
	@import './index';
</style>
