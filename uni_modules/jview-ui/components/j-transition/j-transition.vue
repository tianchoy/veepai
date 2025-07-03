<template>
	<view :animation="animationData" ref="animation">
		<view v-if="show" class="j-transition" >
			<slot></slot>
		</view>
	</view>
	
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	export default{
		name:'j-transition',
		props:{
			show:{ // 是否显示/隐藏组件
				type:Boolean,
				default:true,
			},
			option:{
				type:Object,
				default:()=>{
					return {};
				},
			}
		},
		data(){
			return {
				animationOption:{}, // 创建动画时的参数
				animationData:{}, // 动画效果
				timingFunction:'linear',
			}
		},
		created() {
			this.times = {};
			const animationOption = {
				transformOrigin: "50% 50% 0",
				duration: 0,
				timingFunction: "linear",
				delay: 0,
			};
			for(const key in animationOption){
				if(this.option.hasOwnProperty(key)){
					animationOption[key] = this.option[key];
				}
			}
			this.animationOption = animationOption;
			this.init();
		},
		beforeDestroy() {
			for(var key in this.times){
				clearTimeout(this.times[key]);
			}
		},
		methods:{
			init(){
				// #ifndef APP-NVUE
				this.animation = uni.createAnimation(this.animationOption);
				// #endif
			},
			nvueAnimation(params,callback){
				const ref = this.$refs.animation.ref
				const {duration, timingFunction} = this.animationOption;
				const obj = {
					duration,
					// 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
					// needLayout: true,
					timingFunction,
					...params
				}
				animation.transition(ref, obj,()=>{
					callback&&callback()
				})
			},
			vueAnimation(params={},callback,stepParams={}){
				let animation = this.animation;
				for(const key in params){
					if(typeof animation[key] === 'function'){
						animation = animation[key](params[key]);
					}
				}
				animation.step(stepParams);
				this.animationData = this.animation.export();
				let {duration, delay} = stepParams;
				if(typeof duration !== 'number'){
					duration = this.animationOption.duration;
				}
				if(typeof delay !== 'number'){
					delay = this.animationOption.delay;
				}
				const t = setTimeout(()=>{
					clearTimeout(t);
					delete this.times[t];
					callback && callback();
				},duration+delay);
				this.times[t] = t;
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "../../bem.scss";
	.j-transition{
		@include flexRow(flex-start);
	}
</style>