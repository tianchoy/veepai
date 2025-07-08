<template>
	<view class="l-progress" :class="classes" ref="progressRef">
		<text v-if="showInfo && infoAlign == 'start' && infoType == 'outer'" :style="[textStyle]" >{{percent + '%'}}</text>
		<view class="l-progress__inner">
			<view  class="l-progress-bg" :style="[styles]">
				<text class="l-progress__inner-text" :style="[textStyle]" v-if="showInfo && infoType == 'inner'">{{percent + '%'}}</text>
			</view>
		</view>
		<text :style="[textStyle]" v-if="showInfo && infoAlign == 'end' && infoType == 'outer'">{{percent + '%'}}</text>
	</view>
</template>
<script lang="ts">
	// @ts-nocheck
	/**
	 * Progress 进度条组件
	 * @description 用于展示操作或任务的进度，支持线性进度显示和多种样式配置
	 * <br>插件类型：LProgressComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-progress
	 * 
	 * @property {boolean} showInfo 是否显示进度文本（默认：false）
	 * @property {string} infoType 进度信息显示方式
	 * @value outer 在进度条外部显示
	 * @property {string} infoAlign 文本对齐方式（默认：end）
	 * @value start
	 * @value end
	 * @property {string | string[]} strokeColor 进度条颜色（支持渐变色数组）
	 * @property {string} trailColor 轨道背景色（默认：rgba(0, 0, 0, 0.06)）
	 * @property {string} linecap 进度条端点形状（'round' | 'square'）
	 * @value round 
	 * @value square 
	 * @property {string} infoColor 进度文本颜色
	 * @property {string | number} fontSize 文本字号（支持CSS单位）
	 * @property {string | number} strokeWidth 进度条粗细（支持CSS单位，默认：4px）
	 */
	import {computed, defineComponent } from '@/uni_modules/lime-shared/vue';
	import ProgressProps from './props';
	import {addUnit} from '@/uni_modules/lime-shared/addUnit'
	const name ='l-progress'
	export default defineComponent({
		name,
		props: ProgressProps,
		setup(props) {
			const classes = computed(() => {
				const _class:Record<string, any> = {}
				if(props.infoType == 'outer') {
					_class['l-progress--outer'] = true
				}
				if(props.infoType == 'inner') {
					_class['l-progress--inner'] = true
				}
				return _class
			})
			
			const styles = computed(() => {
				const _style:Record<string, any> ={};
				_style['width'] = `${props.percent}%`
				if(props.strokeColor != null) {
					_style['background-color'] = `var(--l-progress-stroke-color, ${props.strokeColor!})`
				}
				if(props.strokeWidth != null) {
					_style['height'] = `var(--l-progress-stroke-width, ${addUnit(props.strokeWidth)})`
				}
				if(props.infoType == 'inner') {
					if(props.infoAlign == 'end') {
						_style['align-items'] = `flex-end`
					}
				}
				return _style
			})
			const textStyle = computed(() => {
				const _style:Record<string, any> ={};
				if(props.infoColor != null) {
					_style['color'] = props.infoColor!
				}
				return _style
			})
			return {
				classes,
				styles,
				textStyle
			}
		}
	})
</script>
<style lang="scss">
	@import './index';
</style>
