<template>
	<view class="j-notice" @click="clickHandler">
		<slot name="icon">
			<view
				class="j-notice--icon"
				v-if="icon"
			>
				<j-icon
					:type="icon"
					:color="color"
					:size="addUnit(iconSize)"
				></j-icon>
			</view>
		</slot>
		<view class="j-notice--content" ref="noticeBoxRef">
			<view class="j-notice--content--text" ref="noticeTextRef" :style="animationStyle">
				<text v-for="(item,index) in textList" :key="index" :style="textStyle">
					{{ item }}
				</text>
			</view>
			<!-- #ifdef APP-NVUE -->
			<view class="j-notice--view" ref="noticeViewRef">
				<text v-for="(item,index) in textList" :key="index" :style="textStyle">
					{{item}}
				</text>
			</view>
			<!-- #endif -->
		</view>
		<view class="j-notice--close" v-if="close" @click.stop="closeFn">
			<j-icon
				type="close"
				:color="color"
				:size="addUnit(iconSize)"
			></j-icon>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation')
	// #endif
	// 横行滚动的通知栏
	import {addUnit, getDomStyle} from "../../utils/index";
	export default{
		name:'j-notice',
		props:{
			text: { // 标题
			  type: String,
			  default: ''
			},
			icon:{
				type:String,
				default:'sound'
			},
			iconSize:{
				type:[String,Number],
				default:'36rpx'
			},
			color:{
				type:String,
				default:'#f9ae3d'
			},
			fontSize:{
				type:[String,Number],
				default:''
			},
			speed:{
				type:[String,Number],
				default:80
			},
			close:{
				type:Boolean,
				default:false,
			}
		},
		data(){
			return {
				boxWidth:0,
				textWidth:0,
				animationDuration: '0', // 动画执行时间
				animationPlayState: 'paused', // 动画的开始和结束执行
			}
		},
		computed:{
			textList(){ // 防止过长，性能低的手机会出现抖动的问题
				const result = [];
				// 每组text标签的字符长度
				const len = 15;
				const textArr = this.text.split('')
				for (let i = 0; i < textArr.length; i += len) {
					// 对拆分的后的text进行slice分割，得到的为数组再进行join拼接为字符串
					result.push(textArr.slice(i, i + len).join(''))
				}
				return result
			},
			animationStyle(){
				const style = {
					// #ifdef APP-NVUE
					opacity:this.boxWidth?1:0
					// #endif
				}
				// #ifdef APP-NVUE
				if(this.textWidth){
					style.width = this.textWidth+'px';
				}
				// #endif
				style.animationDuration = this.animationDuration
				style.animationPlayState = this.animationPlayState
				return style
			},
			textStyle(){
				const {color, fontSize} = this;
				const style = {}
				style.whiteSpace = 'nowrap'
				style.color = color
				if(this.fontSize){
					style.fontSize = addUnit(this.fontSize);
				}
				return style;
			}
		},
		watch:{
			text(){
				// #ifdef APP-NVUE
				this.nvueInit = true;
				// #endif
				// #ifndef APP-NVUE
				this.init();
				// #endif
			}
		},
		mounted(){
			// #ifdef APP-NVUE
			this.initNvue();
			// #endif
			// #ifndef APP-NVUE
			this.init();
			// #endif
		},
		beforeUnmount() {
			this.stopAnimation = true
		},
		methods:{
			addUnit,
			init(){
				let textWidth = 0;
				getDomStyle(this, null, '.j-notice--content--text').then(res=>{
					textWidth = res.width;
					this.animationDuration = `${textWidth / this.speed}s`;
					// 这里必须这样开始动画，否则在APP上动画速度不会改变
					this.animationPlayState = 'paused';
					const t = setTimeout(() => {
						clearTimeout(t);
						this.animationPlayState = 'running'
					}, 10)
				});
			},
			initNvue(){
				this.nvueInit = false;
				let textWidth = 0, boxWidth=0;
				const getTextDom = ()=>{
					// 获取文本的宽度
					getDomStyle(this, 'noticeViewRef', null, false).then(res => {
						textWidth = res.width;
						this.textWidth = textWidth;
						this.toMoveRight(textWidth, boxWidth);
					})
				}
				if(this.boxWidth){
					boxWidth = this.boxWidth;
					getTextDom();
				}else{
					getDomStyle(this, 'noticeBoxRef').then(res => {
						boxWidth = res.width;
						getTextDom();
					})
				}
			},
			// 将文本移动到盒子的右边
			toMoveRight(textWidth, boxWidth){
				if(this.stopAnimation) return;
				animation.transition(this.$refs.noticeTextRef, {
					styles: {
						// 重新将文字移动到盒子的右边沿
						transform: `translateX(${boxWidth}px)`
					},
				}, () => {
					if(!this.boxWidth){
						this.boxWidth = boxWidth;
					}
					// 如果非禁止动画，则继续下一轮滚动
					if (!this.stopAnimation) {
						// 判断是否需要初始化计算尺寸
						if (this.nvueInit) {
							this.initNvue()
						} else {
							this.loopAnimation(textWidth, boxWidth)
						}
					}
				});
			},
			loopAnimation(textWidth, boxWidth) { // 向左开始移动
				// #ifdef APP-NVUE
				animation.transition(this.$refs.noticeTextRef, {
					styles: {
						// 目标移动终点为-textWidth，也即当文字的最右边贴到盒子的左边框的位置
						transform: `translateX(-${textWidth}px)`
					},
					// 滚动时间的计算
					duration: textWidth / this.speed * 1000,
					delay: 10,
					timingFunction:'linear'
				}, () => {
					this.toMoveRight(textWidth, boxWidth);
				})
				// #endif
			},
			// 点击通告栏
			clickHandler(event) {
				// #ifndef H5||APP
				this.$emit('click',event);
				// #endif
			},
			// 点击右侧按钮，需要判断点击的是关闭图标还是箭头图标
			closeFn() {
				this.$emit('close')
			}
		}
	}
</script>

<style scoped lang="scss">
@import "../../bem.scss";
	@include b(notice){
		@include flexRow;
		@include m(icon){
			margin-right: 10rpx;
		}
		@include m(content){
			position: relative;
			flex:1;
			text-align: right;
			flex-wrap: nowrap;
			overflow: hidden;
			@include m(text){
				@include flexRow(flex-start);
				word-break: keep-all;
				white-space: nowrap;
				/* #ifndef APP-NVUE */
				padding-left: 100%;
				width: fit-content;
				animation: noticeAnimation 10s linear infinite both;
				line-height: 100%;
				/* #endif */
			}
		}
		@include m(view){
			position: absolute;
			@include flexRow(flex-start);
			opacity: 0;
		}
		@include m(close){
			margin-left: 10rpx;
		}
	}
	/* #ifndef APP-NVUE */
	@keyframes noticeAnimation {
		0% {
			transform: translate3d(0, 0, 0);
		}
	
		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}
	/* #endif */
</style>