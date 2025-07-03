<template>
	<view class="j-sticky" :style="{minHeight:height}">
		<view class="j-sticky--view" :style="viewStyle" ref="stickyRef">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// 页面吸顶组件
	import {addUnit, getDomStyle, getPx, getUuid} from "../../utils/index";
	export default{
		name:'j-sticky',
		props:{
			offsetTop:{
				type:[Number,String],
				default:0
			},
			statusBar:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return {
				height:0,
				width:0,
				isFixed:false,
			}
		},
		computed:{
			viewStyle(){
				let str = "";
				const {isFixed, offsetTop, width} = this;
				if(isFixed){
					str = `position:fixed;top:${addUnit(offsetTop)};z-index:990;width:${width}`
				}
				return str;
			}
		},
		watch:{
			offsetTop(){
				this.getStickyTop();
			}
		},
		created() {
			this.observer = uni.createIntersectionObserver(this,{
				thresholds: [0.95, 0.98, 1]
			});
			this.getStickyTop();
		},
		mounted() {
			this.getHeight();
		},
		beforeDestroy() {
			this.observer?.disconnect();
		},
		methods:{
			getHeight(){
				getDomStyle(this,'stickyRef','.j-sticky--view').then(res=>{
					this.height = res.height+'px';
					this.width = res.width+'px';
				})
			},
			setFixed(top) {
				// 判断是否出于吸顶条件范围
				this.isFixed = top <= this.stickyTop;
			},
			addObserver(){
				if(this.observer){
					this.observer.disconnect();
					this.observer.relativeToViewport({top: -this.stickyTop}).observe('.j-sticky', res => {
						this.setFixed(res.boundingClientRect.top)
					})
				}
			},
			getStickyTop() {
				this.stickyTop = getPx(this.offsetTop);
				this.addObserver();
			},
		}
	}
</script>

<style scoped lang="scss">
@import "../../bem.scss";
	@include b(sticky){
		position: relative;
	}
</style>