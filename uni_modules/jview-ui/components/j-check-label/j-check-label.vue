<template>
	<view class="j-check-label">
		<view class="j-check-label--item" v-for="(item,index) in list" :key="index" @click="choose(item)" :style="selectVal.includes(item[filedsObj.value])?activeItemStyle:itemStyle" :class="{'j-check-label--item__active':selectVal.includes(item[filedsObj.value])}">
			<text :style="selectVal.includes(item[filedsObj.value])?activeTextStyle:textStyle">
				{{item[filedsObj.label]}}
			</text>
		</view>
	</view>
</template>

<script>
	import {addUnit} from "../../utils/index";
	import {formValidate} from "../../utils/index.js"
	export default{
		name:'j-check-label',
		props:{
			// #ifdef VUE2
			value: {
				type: Array,
				default: () => []
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				type: Array,
				default: () => []
			},
			// #endif
			list:{
				type:Array,
				default:()=>{
					return []
				}
			},
			filedsName: { // 显示的key值
				type: Object,
				default: () => {
					return {}
				}
			},
			auto:{ // 是否自动更新值
				type:Boolean,
				default:true,
			},
			vertical:{ // 上下两边的padding间距
				type:[Number, String],
				default:'12rpx'
			},
			horizontal:{ // 2边的padding间距
				type:[Number, String],
				default:'32rpx'
			},
			borderColor:{
				type:String,
				default:''
			},
			fontSize:{
				type:[Number, String],
				default:''
			},
			color:{
				type:String,
				default:''
			},
			bgColor:{
				type:String,
				default:''
			},
			activeBgColor:{
				type:String,
				default:''
			},
			activeColor:{
				type:String,
				default:'#fff'
			},
			borderRadius:{
				type:[Number, String],
				default:'16rpx'
			},
			// 互斥的value（auto为true时生效），如无、病1、病2选项，选择了无就不能有其他选择，有其他选择就不能存在无
			mutualExclusion:{
				type:Array,
				default:()=>{
					return []
				}
			}
		},
		data(){
			return {
				filedsObj: {
					value: 'value',
					label: 'label',
				},
			}
		},
		computed:{
			selectVal(){
				let arr = [];
				// #ifdef VUE2
				arr = this.value;
				// #endif
				// #ifdef VUE3
				arr = this.modelValue;
				// #endif
				return arr;
			},
			padding(){
				const {horizontal, vertical} = this;
				if(horizontal || vertical){
					return `${vertical?addUnit(vertical):''} ${horizontal?addUnit(horizontal):''}`
				}
				return "";
			},
			itemStyle(){
				const {padding, fontSize, borderColor, bgColor, borderRadius} = this;
				const style = {};
				if(padding){
					style.padding = padding;
				}
				if(fontSize){
					style.fontSize = addUnit(fontSize);
				}
				if(borderColor){
					style.borderColor = borderColor;
				}
				if(bgColor){
					style.background = bgColor;
				}
				if(borderRadius){
					style.borderRadius = addUnit(borderRadius);
				}
				return style;
			},
			activeItemStyle(){
				const {itemStyle, borderColor, activeBgColor} = this;
				const style = {...itemStyle};
				if(borderColor){
					style.borderColor = activeBgColor;
				}
				if(activeBgColor){
					style.background = activeBgColor;
				}
				return style;
			},
			textStyle(){
				const {color} = this;
				return `color:${color||'#000000'}`;
			},
			activeTextStyle(){
				const {activeColor} = this;
				if(activeColor){
					return `color:${activeColor}`;
				}
				return '';
			}
		},
		created() {
			this.filedsObj = { ...this.filedsObj, ...this.filedsName };
		},
		methods:{
			choose(item){
				const {filedsObj, auto, selectVal, mutualExclusion} = this;
				const val = item[filedsObj.value];
				if(auto){
					let arr = [...selectVal];
					const index = arr.findIndex(ite=>ite===val);
					if(mutualExclusion.includes(val)){
						if(index === -1){
							arr = [val];
						}else{
							arr = [];
						}
					}else{
						if(mutualExclusion.length){
							arr = arr.filter(ite=>!mutualExclusion.includes(ite));
						}
						if(index === -1){
							arr.push(val);
						}else{
							arr.splice(index,1);
						}
					}
					// #ifdef VUE2
					this.$emit('input', arr);
					// #endif
					// #ifdef VUE3
					this.$emit('update:modelValue', arr);
					// #endif
					this.$nextTick(() => {
						// 尝试调用u-form的验证方法
						formValidate(this, "change");
					})
				}else{
					this.$emit('change',val);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
@import "../../bem.scss";
	@include b(check-label){
		/* #ifndef APP-NVUE */
		width:100%;
		/* #endif */
		display:flex;
		flex-direction: row;
		flex-wrap:wrap;
		@include m(item){
			@include flexRow(center);
			border-width: 2rpx;
			border-style: solid;
			border-color:$color-border-placeholder;
			margin:0 24rpx 24rpx 0;
			background-color: #fff;
			@include e(active){
				border-color: $color-success;
				background-color: $color-success;
			}
		}
	}
</style>