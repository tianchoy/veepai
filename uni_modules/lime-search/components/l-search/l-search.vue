<template>
	<view class="l-search" :style="lStyle">
		<slot name="left"></slot>
		<view class="l-search__content" :style="[contextStyle]" 
			:class="[
				'l-search__content--' + shape, {
				'l-search__content--focused': focused,
				'l-search__content--center': center
			}]">
			<slot name="left-icon">
				<view class="l-search__icon">
					<l-icon size="42rpx" :color="iconColor" :name="leftIcon" v-if="leftIcon.length > 0" />
				</view>
			</slot>
			<input  
				name="input"
				class="l-search__keyword"
				:style="[inputStyle]"
				:type="type"
				:maxlength="maxlength"
				:disabled="disabled"
				:focus="focus"
				:value="searchValue"
				:confirm-type="confirmType"
				:confirm-hold="confirmHold"
				:cursor="cursor"
				:cursor-color="cursorColor"
				:adjust-position="adjustPosition"
				:always-embed="alwaysEmbed"
				:selection-start="selectionStart"
				:selection-end="selectionEnd"
				:hold-keyboard="holdKeyboard"
				:cursor-spacing="cursorSpacing"
				:placeholder="placeholder"
				:placeholder-style="placeholderStyle"
				:placeholder-class="placeholderClass + ' ' + 'l-search__placeholder ' + ('l-search__placeholder--' + (center ? 'center': 'normal'))" 
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
				@confirm="handleConfirm"/>
			<view
				class="l-search__clear"
				:class="{
					'l-search__clear--right': $slots['right-icon']
				}"
				v-if="clearable"
				v-show="!!searchValue"
				@click="handleClear"
				aria-role="button"
				aria-label="清除">
				<l-icon class="l-search__icon l-search__clear-icon" name="close-circle-filled" size="48rpx" :color="clearIconColor"  />
			</view>	
			<slot name="right-icon"/>
		</view>
		<slot name="action">
			<text class="l-search__action" 
				:class="{
					'l-search__action--focused': focused
				}" 
				@click="handleActionClick" v-if="action != null"> {{action}}</text>
		</slot>
	</view>
</template>
<script lang="ts">
	// @ts-nocheck
	import { defineComponent, ref, computed } from '@/uni_modules/lime-shared/vue';
	import { characterLimit } from '@/uni_modules/lime-shared/characterLimit';
	import searchProps from './props';
	
	export default defineComponent({
		name: 'l-search',
		props: searchProps,
		emits: ['change', 'blur', 'clear', 'focus', 'submit', 'action-click', 'input', 'update:modelValue'],
		setup(props, {emit}) {
			const focused = ref(props.focus)
			const modelValue = ref('')
			const searchValue = computed({
				set(value: string) {
					modelValue.value = value
					emit('update:modelValue', value)
					emit('change', value)
					// #ifdef VUE2
					emit('input', value)
					// #endif
				},
				get():string {
					return modelValue.value || props.value || props.modelValue
				}
			})
			
			const contextStyle = computed(()=>{
				const style:Record<string, any> = {}
				if(props.padding) {
					style['padding'] = props.padding!
				}
				if(props.radius) {
					style['border-radius'] = props.radius!
				}
				if(props.height) {
					style['height'] = props.height!
				}
				if(props.bgColor) {
					style['background'] = props.bgColor!
				}
				return style
			})
			
			const inputStyle = computed(()=>{
				const style:Record<string, any> = {}
				if(props.fontSize) {
					style['font-size'] = props.fontSize!
				}
				if(props.textColor) {
					style['color'] = props.textColor!
				}
				return style
			})
			
			const handleInput = (e: UniInputEvent) => {
				let { value } = e.detail;
				const { maxlength, maxcharacter } = props;
				if(maxcharacter != null && maxcharacter > 0) {
					const { characters } = characterLimit('maxcharacter', value, maxcharacter)
					value = characters;
				} 
				// else if(maxlength > 0) {
				// 	const { characters } = characterLimit('maxlength', value, maxlength)
				// 	value = characters;
				// }
				searchValue.value = value
			}
			const handleClear = (_e: UniPointerEvent) => {
				searchValue.value = '';
				focused.value = true
				emit('clear')
			}
			const handleFocus = (e: UniInputFocusEvent) => {
				const { value } = e.detail;
				focused.value = true
				emit('focus', value)
			}
			const handleBlur = (e: UniInputBlurEvent) => {
				const { value } = e.detail;
				focused.value = false
				emit('blur', value)
			}
			const handleConfirm = (e: UniInputConfirmEvent) => {
				const { value } = e.detail;
				emit('submit', value)
			}
			const handleActionClick = (e: UniPointerEvent) => {
				emit('action-click')
			}
			return {
				focused,
				searchValue,
				contextStyle,
				inputStyle,
				handleInput,
				handleClear,
				handleFocus,
				handleBlur,
				handleConfirm,
				handleActionClick
			}
		}
	})
	
</script>
<style lang="scss">
	@import './index';
</style>
