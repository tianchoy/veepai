<template>
	<view 
		class="l-date-strip__item"
		:class="'l-date-strip__item--' + switchMode"
		>
		<view 
			class="l-date-strip__grid" 
			:style="[
				styles,
				item.type == 'selected' && shape == 'square' && activeBgColor != null ? {background: activeBgColor}: {},
				shape == 'square' && radius != null ? {'border-radius': radius} : {}
			]"
			:class="[
				'l-date-strip__grid--' + shape,
				{
					'l-date-strip__grid--active-bg' : shape == 'square' && item.type == 'selected',
					'l-date-strip__grid--disabled': item.type == 'disabled',
					'l-date-strip__grid--selected': item.type == 'selected'
				}
			]"
			v-for="item in dates" 
			@click="onClick(item)"
			:key="item.key">
			<text 
				class="l-date-strip__grid-prefix" 
				:class="{
					'l-date-strip__grid--active-text' : item.type == 'selected' && shape == 'square',
					'l-date-strip__grid--active-text-none' : item.type == 'selected' && shape == 'none',
				}"
				:style="[
					item.type == 'selected' && activeColor ? { color: activeColor} : {},
				]">{{item.prefix}}</text>
			<view 
				class="l-date-strip__grid-info"
				:class="{
					'l-date-strip__grid--active-bg' : shape == 'circle' &&  item.type == 'selected',
				}"
				:style="[
					item.type == 'selected' && shape == 'circle' && activeBgColor ? {background: activeBgColor}: {},
					shape == 'square' && radius ? {'border-radius': radius}: {}
				]">
				<text 
					class="l-date-strip__grid-day" 
					:class="{
						'l-date-strip__grid--active-text' : item.type == 'selected' && shape != 'none',
						'l-date-strip__grid--active-text-none' : item.type == 'selected' && shape == 'none',
					}"
					:style="[
						item.type == 'selected' && activeColor ? { color: activeColor} : {},
					]">{{item.text}}</text>
				<text 
					class="l-date-strip__grid-suffix" 
					:class="{
						'l-date-strip__grid--active-text' : item.type == 'selected' && shape != 'none',
						'l-date-strip__grid--active-text-none' : item.type == 'selected' && shape == 'none',
					}"
					:style="[
						item.type == 'selected' && activeColor ? { color: activeColor} : {},
					]" v-if="item.suffix">{{item.suffix}}</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	// @ts-nocheck
	import { defineComponent, computed } from '@/uni_modules/lime-shared/vue';
	import dateStripItemProps from './props';
	import { DateStriPDay } from '../l-date-strip/type';
	
	export default defineComponent({
		props: dateStripItemProps,
		emits: ['click'],
		setup(props, {emit}) {
			const styles = computed(()=>{
				const style = {}
				
				if(props.gridWidth && props.switchMode == 'none') {
					style['width'] =  props.gridWidth
				}
				return style
			})
			const onClick = (day) => {
				emit('click', day)
			}
			return {
				onClick,
				styles
			}
		}
	})
	
	
	
</script>

<style lang="scss">
	@import '../l-date-strip';
</style>