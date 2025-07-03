<template>
	<view class="j-stat__select">
		<view class="j-stat-box">
			<view class="j-select" :style="{height:heightStr}" :class="{'j-select--disabled':disabled,'j-select--border':border}">
				<view class="j-select__input-box" :style="{height:heightStr}" :class="{'j-select--v':showSelector}" @click="toggleSelector">
					<view v-if="search" class="j-select__input-text">
						<input class="j-select__input-v" :style="{textAlign:textAlign}" :value="searchText" :placeholder="placeholderText" @input="searchInput" @blur="blur"/>
					</view>
					<view v-else-if="hasValue" class="j-select__input-text" :style="{textAlign:textAlign}">
						<text class="j-select__input-textc">{{searchText}}</text>
					</view>
					<view v-else class="j-select__input-text j-select__input-placeholder" :style="{textAlign:textAlign}">
						<text class="j-select__input-textc">{{placeholder}}</text>
					</view>
					<view v-if="hasValue && clear && !focus && !disabled && !readonly" @click.stop="clearVal">
						<j-icon type="clear" color="#c0c4cc" size="48rpx" />
					</view>
					<view v-else>
						<j-icon :type="showSelector? 'top' : 'bottom'" :size="iconStyle.size||'28rpx'" :color="iconStyle.color||'#999'" />
					</view>
				</view>
				<view class="j-select--mask" v-if="showSelector" @click="hide" />
				<view class="j-select__selector" :style="getOffsetByPlacement" v-if="showSelector">
					<view :class="placement=='bottom'?'j-popper__arrow_bottom':'j-popper__arrow_top'"></view>
					<scroll-view scroll-y="true" class="j-select__selector-scroll">
						<view class="j-select__selector-empty" v-if="mixinDatacomResData.length === 0">
							<text class="j-select__selector-text">{{emptyTips}}</text>
						</view>
						<view v-else class="j-select__selector-item" :class="{'j-select__selector-active': multiple?myValue.includes(item.value):myValue===item.value}" v-for="(item,index) in mixinDatacomResData" :key="index"
							@click="change(item)">
							<text class="j-select__selector-text" :class="{'j-select__selector__disabled': item.disable}">{{formatItemName(item)}}</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formValidate,
		addUnit,
		getPx
	} from "../../utils/index.js"
	/**
	 * DataChecklist 数据选择器
	 * @description 通过数据渲染的下拉框组件
	 * @tutorial https://uniapp.dcloud.io/component/uniui/j-data-select
	 * @property {String} value 默认值
	 * @property {Array} list 本地数据 ，格式 [{label:'',value:''}]
	 * @property {Boolean} clear 是否可以清空已选项
	 * @property {Boolean} emptyText 没有数据时显示的文字 ，本地数据无效
	 * @property {String} placeholder 输入框的提示文字
	 * @property {Boolean} disabled 是否禁用
	 * @property {String} placement 弹出位置
	 * 	@value top   		顶部弹出
	 * 	@value bottom		底部弹出（default)
	 */

	export default {
		name: "j-select",
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			height:{
				type:[String,Number],
				default:'74rpx',
			},
			multiple:{ // 是否为多选
				type: Boolean,
				default: false
			},
			// #ifdef VUE2
			value: {
				type: [String, Number, Array],
				default: ''
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				type: [String, Number, Array],
				default: ''
			},
			// #endif
			search:{ // 是否开启搜素
				type: Boolean,
				default: false,
			},
			border:{ // 是否显示边框
				type: Boolean,
				default: true,
			},
			placeholder: {
				type: String,
				default: '请选择'
			},
			emptyTips: { // 无选项的显示
				type: String,
				default: '无选项'
			},
			clear: { // 是否显示清除
				type: Boolean,
				default: true
			},
			disabled: { // 是否禁用
				type: Boolean,
				default: false
			},
			readonly:{ // 是否只读
				type: Boolean,
				default: false
			},
			textAlign: { //显示字体的位置
				type: String,
				default: 'start'
			},
			// 格式化输出 用法 field="_id as value, version as text, uni_platform as label" format="{label} - {value}"
			format: {
				type: String,
				default: ''
			},
			placement: { // 下拉框显示位置
				type: String,
				default: 'bottom'
			},
			iconStyle: {
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		data() {
			return {
				showSelector: false,
				mixinDatacomResData: [],
				searchText:'',
				lastSearch:'',
				time:undefined,
				focus:false,
			};
		},
		computed: {
			myValue(){
				let val=[];
				// #ifdef VUE2
				val = this.value;
				// #endif
				// #ifdef VUE3
				val = this.modelValue;
				// #endif
				return val;
			},
			getOffsetByPlacement() {
				switch (this.placement) {
					case 'top':
						return `top:-8px;transform:translateY(-100%);`;
					default:
						return `top:${addUnit(getPx(this.height) + 8)}`;
				}
			},
			placeholderText(){
				return this.getText()||this.placeholder;
			},
			hasValue(){ // 是否算有值
				if(this.multiple){
					return this.myValue.length;
				}else{
					return this.myValue;
				}
			},
			heightStr(){
				return addUnit(this.height);
			}
		},
		watch: {
			list:{
				immediate: true,
				handler() {
					this.filterList(this.search&&this.searchText);
					this.getText();
				}
			},
			myValue() {
				this.getText();
			},
		},
		methods: {
			addUnit,
			searchInput(e){ // 搜索
				const {value} = e.detail;
				this.searchText = value;
				clearTimeout(this.time);
				this.time = setTimeout(()=>{
					clearTimeout(this.time);
					this.lastSearch = value;
					this.filterList(value);
				},300)
			},
			filterList(value){ // 过滤下拉列表
				if(!value){
					this.mixinDatacomResData = this.list;
				}else{
					this.mixinDatacomResData = this.list.filter(item=>item.label.includes(value));
				}
			},
			toggleSelector() { // 显示选项
				if (this.disabled || this.readonly) {
					return
				}
				if(this.search){
					this.focus = true;
					this.searchText = this.lastSearch;
					this.showSelector = true;
				}else{
					this.showSelector = !this.showSelector
				}
			},
			hide(){ // 隐藏选项
				this.focus = false;
				this.showSelector = false;
				clearTimeout(this.time);
				this.getText();
			},
			blur(){ // 搜索失去焦点
				if(!this.focus) return ;
				this.focus = false;
				this.time = setTimeout(()=>{
					clearTimeout(this.time);
					this.getText();
					this.showSelector = false;
				},300)
			},
			getText(){
				let str = "";
				let val = this.myValue;
				if(!this.multiple){
					val = [val]
				}
				this.list.forEach(item=>{
					if(val.includes(item.value)){
						const s = this.formatItemName(item)
						if(str){
							str = str+'、'+s;
						}else{
							str = s;
						}
					}
				})
				this.searchText = str;
				return str;
			},
			clearVal() { // 清除
				if(this.search){
					this.searchText = "";
					this.lastSearch = "";
					this.filterList(this.searchText);
				}
				this.emit(this.multiple?[]:undefined)
			},
			change(item) { // 点击选项
				if (!item.disable) {
					if(this.multiple){
						if(this.search){
							this.focus = false;
							clearTimeout(this.time);
						}
						const arr = [...this.myValue]
						const index = arr.indexOf(item.value)
						if(index===-1){
							arr.push(item.value);
						}else{
							arr.splice(index,1);
						}
						this.emit([...arr])
					}else{
						this.showSelector = false
						this.emit(item.value)
					}
				}
			},
			emit(val) {
				// #ifdef VUE2
				this.$emit('input', val);
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', val);
				// #endif
				this.$nextTick(() => {
					// 尝试调用u-form的验证方法
					formValidate(this, "change");
				})
			},
			formatItemName(item) {
				let {
					label,
					value,
				} = item

				if (this.format) {
					// 格式化输出
					let str = "";
					str = this.format;
					for (let key in item) {
						str = str.replace(new RegExp(`{${key}}`, "g"), item[key]);
					}
					return str;
				} else {
					return label
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	$j-base-color: #6a6a6a !default;
	$j-main-color: #333 !default;
	$j-secondary-color: #909399 !default;
	$j-border-3: #e5e5e5;
	$j-font-size: 30rpx;

	.j-stat__select {
		display: flex;
		flex-direction: row;
		align-items: center;
		// padding: 15px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		flex: 1;
		box-sizing: border-box;
	}

	.j-stat-box {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		flex: 1;
	}

	.j-select {
		font-size: $j-font-size;
		box-sizing: border-box;
		border-radius: 4px;
		padding: 0 5px;
		padding-left: 10px;
		position: relative;
		/* #ifndef APP-NVUE */
		user-select: none;
		width: 100%;
		/* #endif */
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		&--v{
			position: absolute;
			left:0;
			z-index: 3;
		}
		&--disabled {
			background-color: #f5f7fa;
			cursor: not-allowed;
			.j-select__input-textc{
				color: $color-form-placeholder;
			}
		}
		&--border{
			border: 2rpx solid $j-border-3;
		}
	}
	.j-select__input-v{
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		background-color:transparent;
	}
	.j-select__input-box {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		position: relative;
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.j-select__selector {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		width: 100%;
		/* #endif */
		position: absolute;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		border: 2rpx solid #EBEEF5;
		border-radius: 6px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		z-index: 999;
		padding: 4px 0;
	}

	.j-select__selector-scroll {
		/* #ifndef APP-NVUE */
		max-height: 200px;
		box-sizing: border-box;
		/* #endif */
	}

	/* #ifdef H5 */
	@media (min-width: 768px) {
		.j-select__selector-scroll {
			max-height: 600px;
		}
	}

	/* #endif */

	.j-select__selector-empty,
	.j-select__selector-item {
		/* #ifndef APP-NVUE */
		cursor: pointer;
		/* #endif */
		display: flex;
		flex-direction: row;
		font-size: $j-font-size;
		// text-align: center;
		/* border-bottom: solid 2rpx $j-border-3; */
		padding:16rpx 20rpx;
	}

	.j-select__selector-item:hover {
		background-color: #f9f9f9;
	}

	.j-select__selector-empty:last-child,
	.j-select__selector-item:last-child {
		/* #ifndef APP-NVUE */
		border-bottom: none;
		/* #endif */
	}
	.j-select__selector-text{
		font-size: $j-font-size;
	}
	.j-select__selector-active{
		.j-select__selector-text{
			color:#409eff
		}
	}
	
	.j-select__selector__disabled {
		opacity: 0.4;
		cursor: default;
	}

	/* picker 弹出层通用的指示小三角 */
	.j-popper__arrow_bottom,
	.j-popper__arrow_bottom::after,
	.j-popper__arrow_top,
	.j-popper__arrow_top::after
	{
	position: absolute;
	display: block;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
	border-width: 6px;
	}

	.j-popper__arrow_bottom {
		filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
		top: -6px;
		left: 10%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #EBEEF5;
	}

	.j-popper__arrow_bottom::after {
		content: " ";
		top: 2rpx;
		margin-left: -6px;
		border-top-width: 0;
		border-bottom-color: #fff;
	}

	.j-popper__arrow_top {
		filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
		bottom: -6px;
		left: 10%;
		margin-right: 3px;
		border-bottom-width: 0;
		border-top-color: #EBEEF5;
	}

	.j-popper__arrow_top::after {
		content: " ";
		bottom: 2rpx;
		margin-left: -6px;
		border-bottom-width: 0;
		border-top-color: #fff;
	}


	.j-select__input-text {
		flex:1;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		&c{
			font-size: $j-font-size;
			color: $j-main-color;
			overflow: hidden; /* 隐藏溢出的内容 */
			text-overflow: ellipsis; /* 显示省略号来表示溢出 */
			white-space: nowrap; /* 防止文本换行 */
		}
	}

	.j-select__input-placeholder {
		.j-select__input-textc{
			color: $color-form-placeholder;
			font-size: $j-font-size;
		}
	}

	.j-select--mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 2;
	}
</style>
