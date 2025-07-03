<template>
	<view class="j-divider" ref="jDividerRef" :style="dividerStyle">
		<view :style="lineLeftStyle">
			<j-line :dashed="dashed" :color="color" :hairline="hairline" :lineWidth="lineWidth"></j-line>
		</view>
		<view class="j-divider--text">
			<slot>
				<text class="j-divider--text--name" :style="nameStyle">
				{{ text }}
				</text>
			</slot>
		</view>
		<view :style="lineRightStyle">
			<j-line :dashed="dashed" :color="color" :hairline="hairline" :lineWidth="lineWidth"></j-line>
		</view>
	</view>
</template>

<script>
	import {addUnit} from "../../utils/index";
	export default{
		name:'j-divider',
		props:{
			color:{
				type:[String, undefined],
				default:undefined
			},
			lineWidth:{
				type:[String, Number],
				default:'2rpx'
			},
			// 是否显示细边框
			hairline: {
			    type: Boolean,
			    default: true
			},
			padding:{
				type:[String, Number],
				default:'32rpx 0'
			},
			// 是否虚线，true-虚线，false-实线
			dashed: {
			    type: Boolean,
			    default: false
			},
			text:{
				type:String,
				default:''
			},
			interval:{ // 字体边的空白间隔
				type:[String, Number],
				default:'32rpx'
			},
			fontSize:{
				type:[String, Number],
				default:''
			},
			fontColor:{
				type:String,
				default:''
			},
			start:{ // 字体开始的位置
				type:[String, Number],
				default:'50%'
			}
		},
		computed:{
			dividerStyle(){
				return `padding:${addUnit(this.padding)}`
			},
			lineLeftStyle(){
				const {start} = this;
				if(start.endsWith('%')){
					return {
						flex:start.substring(0,start.length-1)
					}
				}else{
					return {width:addUnit(start)}
				}
				
			},
			lineRightStyle(){
				const {start} = this;
				if(start.endsWith('%')){
					return {
						flex:100 - start.substring(0,start.length-1)
					}
				}else{
					return {
						flex:1
					}
				}
			},
			nameStyle(){
				const {interval, fontColor, fontSize} = this;
				const style = {};
				if(interval){
					style.padding = `0 ${addUnit(interval)}`
				}
				if(fontColor){
					style.color = fontColor;
				}
				if(fontSize){
					style.fontSize = addUnit(fontSize);
				}
				return style;
			}
		}
	}
</script>

<style scoped lang="scss">
@import "../../bem.scss";

	@include b(divider){
		@include flexRow(center);
		@include m(text){
			width: fit-content;
			@include m(name){
				white-space: nowrap;
				color:$color-info;
			}
		}
	}
</style>