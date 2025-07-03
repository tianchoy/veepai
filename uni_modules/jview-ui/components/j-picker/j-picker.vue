<template>
	<view class="j-picker">
		<view class="j-picker-v" @click="showModal">
			<slot>
				<view class="j-picker-vc">
					<view class="j-picker-vcl" :style="viewStyle">
						<text class="j-picker-vct" :style="{ color:textColor }" v-if="currentList.length">{{ selectedText}}</text>
						<text class="j-picker-vct j-form-placeholder" v-else>{{ placeholder }}</text>
					</view>
					<view class="j-picker-vcr" v-if="$slots.right">
						<slot name="right"></slot>
					</view>
				</view>
			</slot>
		</view>
		<j-popup :show="showPicker" :style="{ height: this.hide ? '0px' : '' }" :title="title" :cancelColor="cancelColor"
			:cancelText="cancelText" :confirmColor="confirmColor" :confirmText="confirmText" @cancel="hideModel"
			@confirm="confirm">
			<picker-view
				:indicator-style="`height:${itemHeightStyle}`" immediate-change :value="currentIndex"
				@change="onPickerChange" @pickstart="onPickStart" @pickend="onPickEnd"
					:style="{
						height: `${addUnit(visibleItemCount * itemHeight)}`
					}">
				<picker-view-column class="j-picker-cv" v-for="(item, index) in columnCount" :key="index">
					<view class="j-picker-cvc" 
					:style="{	
						height: itemHeightStyle,
						lineHeight: itemHeightStyle
					}" 
					v-for="(ite, dex) in columns[index]" :key="dex">
						<text>{{ ite[filedsObj.label] }}</text>
					</view>
				</picker-view-column>
		      </picker-view>
		</j-popup>
	</view>
</template>

<script>
import {
	addUnit,
	formValidate
} from "../../utils/index.js"
// subset模式写法, list:[{label:'选择1',children:[{label:'选择2'}]}]
// 默认并列模式：list:[[{label:'选择1'}],[{label:'选择2'}]]
export default {
	name: 'j-picker',
	props: {
		type: { // 'subset':'子集模式'，默认并列模式
			type: String,
			default: ''
		},
		list: {
			type: Array,
			default: () => []
		},
		columnNum: { // 有几列，在subset模式下会生效
			type: [String, Number],
			default: 1
		},
		// #ifdef VUE2
		value: {
			type: [Array, String, Number],
			default: () => []
		},
		// #endif
		// #ifdef VUE3
		modelValue: {
			type: [Array, String, Number],
			default: () => []
		},
		// #endif
		filedsName: { // 显示的key值
			type: Object,
			default: () => {
				return {}
			}
		},
		textColor:{
			type: String,
			default: ''
		},
		title: { // 标题
			type: String,
			default: ''
		},
		placeholder: { // 标题
			type: String,
			default: '请选择'
		},
		textAlign: { //显示字体的位置
			type: String,
			default: 'start'
		},
		separatore: { // 分隔符
			type: String,
			default: '/'
		},
		itemHeight:{
			type: [String, Number],
			default:46
		},
		visibleItemCount:{  //每列中可见选项的数量（默认 5 ）
			type:[String, Number],
			default:5
		},
		// 取消按钮的文字
		cancelText: {
			type: String,
			default: '取消'
		},
		// 确认按钮的文字
		confirmText: {
			type: String,
			default: '确认'
		},
		// 取消按钮的颜色
		cancelColor: {
			type: String,
			default: '#909193'
		},
		// 确认按钮的颜色
		confirmColor: {
			type: String,
			default: '#3c9cff'
		},
		// 是否允许点击遮罩关闭选择器
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		},
		readonly:{ // 是否只读
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			hide: false,
			showPicker: false,
			currentIndex: [], // 这个是时实的
			currentList: [], // 这是最终结果
			selectedText: '',
			columnCount: 1,
			filedsObj: {
				value: 'value',
				label: 'label',
				children: 'children'
			},
		};
	},
	computed: {
		options(){ // 消除问题
			if (this.type !== 'subset') {
				if(this.list.length && !Array.isArray(this.list[0])){ //这是为了消除默认传一层数组的问题
					return [this.list];
				}
			}
			return this.list;
		},
		columns() {
			if (this.type === 'subset') {
				const arr = [];
				let index = 0;
				let data = this.options || [];
				let value = this.currentIndex || [];
				if (!Array.isArray(value)) {
					value = [];
				}
				while (index < this.columnCount) {
					const val = value[index] || 0;
					arr.push(data);
					const find = data[val] || {};
					data = find[this.filedsObj.children] || [];
					index++;
				}
				return arr;
			} else {
				return this.options || [];
			}
		},
		itemHeightStyle(){
			return addUnit(this.itemHeight);
		},
		viewStyle(){
			// #ifdef APP-NVUE
			let str = '';
			switch(this.textAlign){
				case 'center':
					str = 'center';
					break;
				case 'end':
				case 'right':
					str = 'flex-end';
					break;
				default:
					break;
			}
			if(str){
				return `justify-content:${str}`;
			}
			return str;
			// #endif
			// #ifndef APP-NVUE
			return `text-align:${this.textAlign}`
			// #endif
			
		},
	},
	watch: {
		// #ifdef VUE2
		value() {
			this.initValue();
		},
		// #endif
		// #ifdef VUE3
		modelValue() {
			this.initValue();
		},
		// #endif
		options(){
			this.init();
		}
	},
	created() {
		this.filedsObj = { ...this.filedsObj, ...this.filedsName };
		this.init();
	},
	methods: {
		addUnit,
		init(){
			if (this.type === 'subset') {
				this.columnCount = +this.columnNum;
			} else {
				this.columnCount = this.options.length;
			}
			this.initValue();
		},
		initValue() {
			let value = [];
			// #ifdef VUE2
			value = this.value;
			// #endif
			// #ifdef VUE3
			value = this.modelValue;
			// #endif
			if(!Array.isArray(value)){
				if(value !== undefined && value !== null){
					value = [value];
				}else{
					value = [];
				}
			}
			const arr = [];
			for (let i = 0; i < this.columnCount; i++) {
				const val = value[i];
				if (val !== undefined) {
					const list = this.columns[arr.length];
					if (list) {
						const findIndex = list.findIndex(item => this.getItemValue(item) === val);
						if (findIndex != -1) {
							arr.push(findIndex);
						} else {
							break;
						}
					} else {
						break;
					}
				}
			}
			this.currentIndex = arr;
			this.currentList = this.currentIndex;
			this.updateSelectedText();
		},
		showModal() {
			if(this.readonly) return;
			this.$emit("onShow");
			this.currentIndex = this.currentList;
			this.showPicker = true;
		},
		updateSelectedText() {
			// 有默认插槽就不会显示值，这就跳过计算显示的值了
			if(this.$slots.default) return;
			const arr = []
			this.currentIndex.forEach((index, colIndex) => {
				const find = this.columns[colIndex][index];
				if (find) {
					arr.push(find[this.filedsObj.label]);
				}
			});
			this.selectedText = arr.join(this.separatore);
		},
		hideModel() {
			clearTimeout(this.time);
			this.showPicker = false;
			this.hide = false;
			this.$emit("cancel");
		},
		onPickStart(e) {
			this.$emit('onPickStart', e);
			this.isPicking = "start";
			this.startEvent = e;
		},
		onPickEnd(e) {
			this.$emit('onPickEnd', e);
			if (this.isPicking !== 'start') return;
			this.isPicking = "end";
			this.change(e);
		},
		onPickerChange(e) {
			if (!this.isPicking || this.isPicking === 'start') {
				this.isPicking = "";
				this.change(e);
			}
		},
		change(e) {
			if (!e.detail.value) return;
			const value = e.detail.value.map(item => {
				if (item < 0) return 0;
				return item;
			});
			let changeColumn = {
				index: 0,
				newVal: 0,
				oldVal: 0,
			}
			let bool = false;
			const data = [];
			value.forEach((item, index) => {
				if (bool && this.type === 'subset') {
					data.push(0);
				} else if (!bool && item !== this.currentIndex[index]) {
					const list = this.columns[index];
					bool = true;
					changeColumn = {
						index,
						newVal: this.getItemValue(list[item]),
						oldVal: this.getItemValue(list[this.currentIndex[index]]),
					}
					data.push(item);
				} else {
					data.push(item);
				}
			})
			this.currentIndex = data;
			changeColumn.value = [...data];
			this.$emit('change', changeColumn)
			if (this.hide) {
				this.hide = false;
				this.confirm();
			}
		},
		confirm() { // 主要是兼容各平台，不然会有延迟，导致数据不对
			if (this.hide) return;
			if (!this.isPicking || this.isPicking === 'end') {
				this.hideModel();
				const arr = [];
				let result = [];
				for (let i = 0; i < this.columnCount; i++) {
					const val = this.currentIndex[i] || 0;
					arr.push(val);
					result.push(this.getItemValue(this.columns[i][val]));
				}
				this.currentList = arr;
				if(this.columnCount === 1){
					result = result[0];
				}
				// #ifdef VUE2
				this.$emit('input', result);
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', result);
				// #endif
				this.$emit('confirm', result);
				this.updateSelectedText();
				this.$nextTick(() => {
					// 尝试调用u-form的验证方法
					formValidate(this, "change");
				})
			} else { // 防止change和end事件都不触发的情况，偶尔会出现
				this.hide = true;
				this.time = setTimeout(() => {
					clearTimeout(this.time);
					this.isPicking = 'end';
					this.change(this.startEvent);
				}, 1000);
			}
		},
		getItemValue(obj = {}) {
			return obj[this.filedsObj.value];
		}
	}
};
</script>
<style scoped lang="scss">
@import "../../bem.scss";
@include b(picker) {
	&-vc {
		@include flexRow(flex-start);
		@include formItemHeight;
		&l{
			flex:1;
			/* #ifdef APP-NVUE */
			@include flexRow(flex-start);
			/* #endif */
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		&t {
			@include formItemFontSize;
		}

		&r {
			margin-left: 8rpx;
		}
	}
}


.j-picker-c {
	background-color: #fff;
	width: 100%;

	&v {
		flex:1;
		&c{
			@include flexRow(center);
		}
	}
}
</style>
