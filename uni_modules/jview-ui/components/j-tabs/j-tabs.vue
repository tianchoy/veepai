<template>
	<view class="j-tabs" ref="tabsRef" :style="tabsStyle">
		<scroll-view :scroll-x="scrollX" :style="hideStyle" class="j-tabs--s" :scroll-left="scrollLeft" :show-scrollbar="false" scroll-with-animation>
			<view class="j-tabs--div" :style="scrollStyle">
				<view class="j-tabs--scroll" v-if="list.length">
					<view :class="'j-tabs--view '+`j-tabs--view__${item[filedsObj.value]}`" :ref="`tabsView${item[filedsObj.value]}`" :style="viewStyle" @click="choose(item)" v-for="(item,index) in list" :key="index">
						<text class="j-tabs--view--text" :style="{...fontStyle,...(item[filedsObj.value]===activeValue?activeStyle:{})}">{{item[filedsObj.label]}}</text>
						<view class="j-tabs--view--line" v-if="!animation && item[filedsObj.value]===activeValue" :style="lineStr"></view>
					</view>
				</view>
				<j-transition v-if="animation" ref="transition" :option="transitionOption">
					<view class="j-tabs--line" :style="lineStr"></view>
				</j-transition>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {addUnit, getDomStyle, getPx} from "../../utils/index"
	export default {
		name:'j-tabs',
		props: {
			list:{
				type:Array,
				default:()=>{
					return []
				}
			},
			// #ifdef VUE2
			value: {
				type: [String, Number],
				default: () => []
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				type: [String, Number],
				default: () => []
			},
			// #endif
			filedsName: { // 显示的key值
				type: Object,
				default: () => {
					return {}
				}
			},
			fontStyle:{ //字体样式
				type:Object,
				default:()=>{
					return {}
				},
			},
			activeFontStyle:{ //选中字体样式
				type:Object,
				default:()=>{
					return {}
				},
			},
			lineStyle:{ //线的样式
				type:Object,
				default:{
					height:'4rpx',
				},
			},
			scroll:{ // 是否可以滚动
				type:Boolean,
				default:false,
			},
			horizontal:{ // 2边的padding间距
				type:[Number, String],
				default:'24rpx'
			},
			vertical:{ // 上下两边的padding间距
				type:[Number, String],
				default:'16rpx'
			},
			animation:{ // 是否开启动画
				type:Boolean,
				default:false,
			},
		},
		data() {
			return {
				filedsObj: {
					value: 'value',
					label: 'label',
				},
				tabsDom:{},
				tabsItemObj:{},
				scrollLeft:0,
				transitionOption:{
					duration:200
				}
			}
		},
		computed: {
			scrollX(){
				// #ifdef APP-NVUE
				return this.scroll;
				// #endif
				// #ifndef APP-NVUE
				return this.tabsStyle && this.scroll
				// #endif
			},
			activeValue(){
				let val;
				// #ifdef VUE2
				val = this.value;
				// #endif
				// #ifdef VUE3
				val = this.modelValue;
				// #endif
				return val;
			},
			tabsStyle(){
				const {height} = this.tabsDom;
				if(height){
					return `height:${height}px`;
				}
				return '';
			},
			hideStyle(){
				const {height} = this.tabsDom;
				if(height){
					return `height:${height+getPx('20rpx')}px`;
				}
				return '';
			},
			scrollStyle(){
				const {scroll} = this;
				if(scroll){
					return '';
				}
				return 'flex:1;';
			},
			viewStyle(){
				const {scrollStyle, vertical, horizontal} = this;
				return `padding:${addUnit(vertical)} ${addUnit(horizontal)};${scrollStyle}`;
			},
			activeStyle(){
				return {
					color:'#4BB983',
					...this.activeFontStyle
				}
			},
			itemDom(){
				return this.tabsItemObj[this.activeValue]||{};
			},
			lineWidth(){ // 线的宽度
				const {itemDom, lineStyle} = this;
				const {width} = lineStyle;
				let w = width;
				if(!w){
					w = itemDom.width * 0.8;
				}else if(w.endsWith('%')){
					w = itemDom.width*parseInt(w)/100;
				}else{
					w = getPx(w);
				}
				return w;
			},
			lineStr(){
				const {lineWidth, lineStyle, animation} = this;
				const {height='4rpx', color, borderRadius} = lineStyle;
				const h = getPx(height);
				const style = {
					height:h+'px',
					width:Math.round(lineWidth)+'px',
				}
				if(color){
					style.backgroundColor = color
				}
				if(borderRadius){
					style.borderRadius = borderRadius
				}
				if(!animation){
					style.left = Math.round((this.itemDom.width - lineWidth)/2) + 'px';
					style.bottom = h+'px';
				}
				return style;
			}
		},
		watch:{
			activeValue(){
				this.transformLine();
			},
			list(){
				this.getItemsStyle();
			}
		},
		created() {
			this.filedsObj = { ...this.filedsObj, ...this.filedsName };
		},
		mounted() {
			this.getAllStyle();
		},
		methods: {
			getAllStyle(){
				getDomStyle(this, 'tabsRef','.j-tabs--s').then(res=>{
					console.log(res,"--===")
					this.tabsDom = res;
					this.getItemsStyle();
				})
			},
			getItemsStyle(){
				const key = this.filedsObj.value;
				const arr = [];
				const obj = {};
				let scrollWidth = 0;
				this.list.forEach(item=>{
					const val = item[key];
					arr.push(getDomStyle(this, `tabsView${val}`, `.j-tabs--view__${val}`,false).then(res=>{
						obj[val] = res;
						scrollWidth += res.width;
					}))
				})
				Promise.all(arr).then(()=>{
					this.tabsItemObj = obj;
					this.scrollWidth = scrollWidth;
					this.transformLine();
				})
			},
			transformLine(){
				const {tabsDom, itemDom, lineWidth} = this;
				let x = itemDom.left - tabsDom.left;
				this.getScrollLeft(x);
				if(!this.animation) return;
				x = Math.round(x+(itemDom.width - lineWidth)/2);
				// #ifdef APP-NVUE
				this.$refs.transition.nvueAnimation({
					styles:{
						transform: `translateX(${x}px)`,
					}
				})
				// #endif
				// #ifndef APP-NVUE
				this.$refs.transition.vueAnimation({translateX:x})
				// this.$refs.transition.animation.translateX(x).step();
				// this.$refs.transition.animationExport();
				// #endif
			},
			getScrollLeft(x){
				const {tabsDom, itemDom, scrollWidth} = this;
				// const x = itemDom.left - tabsDom.left;
				const moveX = x - tabsDom.width/2;
				if(moveX>0){ // 最大位移量
					this.scrollLeft = Math.min(moveX, this.scrollWidth - tabsDom.width);
				}else{
					this.scrollLeft = 0;
				}
			},
			choose(item){
				const val = item[this.filedsObj.value];
				// #ifdef VUE2
				this.$emit('input', val);
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', val);
				// #endif
				this.$emit('change', val);
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../bem.scss";
	
	@include b(tabs) {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		display: flex;
		flex-direction: row;
		overflow: hidden;
		@include m(s){
			flex:1;
			@include flexRow(flex-start,flex-start);
		}
		@include m(div){
			display: flex;
			flex-direction: column;
		}
		@include m(scroll){
			@include flexRow(flex-start, flex-start);
		}
		@include m(view){
			position: relative;
			@include flexRow(center);
			@include m(text){
				white-space: nowrap;
				font-size: 32rpx;
				color: rgb(96, 98, 102);
			}
			@include m(line){
				position: absolute;
				background-color: $color-success;
			}
		}
		@include m(line){
			background-color: $color-success;
		}
	}
</style>