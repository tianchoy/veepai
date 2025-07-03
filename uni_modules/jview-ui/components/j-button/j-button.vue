<template>
	<!-- #ifdef APP-NVUE -->
	<!-- 	主要解决宽度的问题，让他在nvue中宽度能在父级铺满，@click.capture是为了防止点击该view传递了点击事件 -->
	<view :class="nvueClass" :style="nvueStyle" ref="jButtonView" @click.capture>
	<!-- #endif -->
		<button :class="classStr" :style="styleStr" v-if="show" :type="type" :disabled="disabled" :hover-class="!disabled && !loading ? 'j-button--active' : ''"
			:form-type="formType" :open-type="openType" @click.stop="handlerClick" @getphonenumber="getphonenumber" @getuserinfo="getuserinfo"
			@error="error" @opensetting="opensetting" @launchapp="launchapp"
			@agreeprivacyauthorization="agreeprivacyauthorization">
			<template v-if="loading">
				<slot name="loading">
					<view class="j-button--icon">
						<j-loading-icon  :color="loadingColor" :size="iconSizeStr"></j-loading-icon>
					</view>
				</slot>
				<text class="j-button--text" :style="textStyle">
					{{ loadingText || text }}
				</text>
			</template>
			<template v-else>
				<slot name="icon">
					<view v-if="icon" class="j-button--icon">
						<j-icon :type="icon" :color="iconColor" :size="iconSizeStr"></j-icon>
					</view>
				</slot>
				<view class="j-button--text" :style="textStyle">
					<slot>
						<text class="j-button--text" :style="textStyle">
							{{ text }}
						</text>
					</slot>
				</view>
			</template>
		</button>
	<!-- #ifdef APP-NVUE -->
	</view>
	<!-- #endif -->
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	// #endif
	import {
		sleep,
		preventEvent,
		addUnit,
		getPx
	} from "../../utils/index.js"
	/**
	 * @property {String}			type					按钮的预置样式，info，primary，error，warning，success (默认 'info' )
	 * @property {String}			size					按钮尺寸，large，normal，small, mini （默认 normal）
	 * @property {String}			text					文字内容
	 * @property {String}			loadingText		loading状态下显示的文字
	 * @property {Boolean}			disabled			是否禁用（默认false）
	 * @property {Boolean}			loading				是我显示加载中
	 * @property {Boolean}			plain					是否为镂空状态按钮
	 * @property {Boolean}			shape					是否带圆角按钮
	 * @property {String}			icon					icon图标
	 * @property {String}			iconSize		loading时的图标大小
	 * @property {String}			formType			用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
	 * @property {String}			openType			开放能力，具体请看uniapp稳定关于button组件部分说明
	 * @property {Boolean}			stop					是否阻止冒泡（默认true）
	 * @property {String|Number}			throttleTime	click节流，一定时间内只能触发一次
	 * @property {String|Number}			padding	按钮的padding
	 * @property {Boolean}			full 是否横向铺满，不然就是内容的宽度，默认铺满
	 * 
	 * @event {Function}	click			非禁止并且非加载中，才能点击
	 * @event {Function}	getphonenumber	open-type="getPhoneNumber"时有效
	 * @event {Function}	getuserinfo		用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
	 * @event {Function}	error			当使用开放能力时，发生错误的回调
	 * @event {Function}	opensetting		在打开授权设置页并关闭后回调
	 * @event {Function}	launchapp		打开 APP 成功的回调
	 * @event {Function}	agreeprivacyauthorization	用户同意隐私协议事件回调
	 */
	export default {
		name: 'j-button',
		props: {
			type: {
				type: String,
				default: 'info',
			},
			size: {
				type: String,
				default: 'normal',
			},
			text: {
				type: String,
				default: '',
			},
			fontSize: {
				type: [Number,String],
				default: '28rpx'
			},
			loadingText: {
				type: String,
				default: '',
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			loading: {
				type: Boolean,
				default: false,
			},
			plain: {
				type: Boolean,
				default: false,
			},
			shape:{
				type:Boolean,
				default:false,
			},
			icon: {
				type: String,
				default: '',
			},
			iconSize: {
				type: [Number,String],
				default: '40rpx'
			},
			formType: {
				type: String,
				default: '',
			},
			openType: {
				type: String,
				default: '',
			},
			stop: { // 是否阻止冒泡
				type: Boolean,
				default: true,
			},
			// 节流，一定时间内只能触发一次
			throttleTime: {
				type: [String, Number],
				default: 0
			},
			padding:{
				type:[Number, String],
				default:''
			},
			full:{ // 是否横向铺满，不然就是内容的宽度，默认铺满
				type:Boolean,
				default:true
			}
		},
		data(){
			return {
				width:0,
			}
		},
		computed: {
			show(){
				let bool = true;
				// #ifdef APP-NVUE
				if(this.full && !this.width){
					bool = false;
				}
				// #endif
				return bool;
			},
			nvueClass(){
				let str = 'j-button__nvue';
				if(this.full){
					str += ` ${this.classStr}`;
				}
				return str;
			},
			nvueStyle(){
				let str = ''
				if(this.full){
					str += 'flex:1;';
				}
				if(this.shape){
					str += `border-radius:100rpx;`;
				}
				return str;
			},
			styleStr(){
				let str = '';
				if(this.padding){
					str += `padding:${addUnit(this.padding)};`;
				}
				if(this.shape){
					str += `border-radius:100rpx;`;
				}
				if(!this.full){
					// #ifndef APP-NVUE
					str += `width:fit-content`;
					// #endif
				}else if(this.width){
					str += `width:${this.width}px;`;
				}
				return str;
			},
			classStr(){
				let str = "j-button j-button__reset";
				if(this.type){
					str+= ' j-button--'+this.type;
				}
				if(this.size){
					str+= ' j-button--'+this.size;
				}
				if(this.plain){
					str+= ' j-button--plain';
				}
				if(this.disabled){
					str+= ' j-button--disabled';
				}
				return str
			},
			iconSizeStr() {
				let num = getPx(this.iconSize);
				if (this.size === 'large') {
					num *= 1;
				} else if (this.size === 'small') {
					num *= 0.7;
				} else if (this.size === 'mini') {
					num *= 0.5;
				} else {
					num *= 0.8;
				}
				return Math.round(num);
			},
			iconColor() {
				if (this.type === "info") {
					return "#c9c9c9";
				}
				return "#fff";
			},
			loadingColor() {
				if (this.type === "info") {
					return "#aaaaaa";
				}
				return "#c9c9c9";
			},
			textStyle(){
				let {
					size,
					fontSize
				} = this;
				let num = 1;
				if (size === "large") num = 1.143;
				if (size === "small") num = 0.857;
				if (size === "mini") num = 0.714;
				return {
					fontSize:Math.round(getPx(fontSize)*num)+'px'
				};
			}
		},
		mounted(){
			// #ifdef APP-NVUE
			if(this.full){
				const t = setTimeout(()=>{
					clearTimeout(t);
					dom.getComponentRect(this.$refs.jButtonView, res => {
						this.width = res.size.width;
					})
				},50)
			}
			// #endif
		},
		methods: {
			handlerClick(e) {
				// 非禁止并且非加载中，才能点击
				if (!this.disabled && !this.loading && !this.clickBool) {
					// 进行节流控制，每this.throttle毫秒内，只在开始处执行
					this.clickBool = true;
					this.$emit("click", e);
					sleep(this.throttleTime).then(() => {
						this.clickBool = false;
					})
				}
				// 是否阻止事件传播
				this.stop && preventEvent(e)
			},
			getphonenumber(e) {
				this.$emit('getphonenumber', e);
			},
			getuserinfo(res) {
				this.$emit("getuserinfo", res);
			},
			error(res) {
				this.$emit("error", res);
			},
			opensetting(res) {
				this.$emit("opensetting", res);
			},
			launchapp(res) {
				this.$emit("launchapp", res);
			},
			agreeprivacyauthorization(res) {
				this.$emit("agreeprivacyauthorization", res);
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "../../bem.scss";
	.j-button__nvue{
		@include flexRow(center);
	}
	@include b(button) {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		@include e(reset){
			&::after{
				border: none !important;
			}
		}
		@include m(icon) {
			margin-right: 8rpx;
		}
		@include m(text) {
			white-space: nowrap;
		}
	}
</style>