<template>
	<view class="j-datetime">
		<j-picker :list="list" v-model="datetime" :title="title" :cancelText="cancelText"
			:cancelColor="cancelColor" :confirmText="confirmText" :confirmColor="confirmColor"
			:closeOnClickOverlay="closeOnClickOverlay" ref="datetimePicker"
			@onShow="onShowModal" @change="change" @onPickStart="onPickStart"
			@onPickEnd="onPickEnd" @confirm="confirm">
				<view class="j-datetime--view" :style="viewStyle">
					<slot>
						<view class="j-datetime--view-v">
							<view class="j-datetime--view-vl">
								<text class="j-datetime--text" v-if="resultValue">{{resultValue}}</text>
								<text class="j-datetime--text j-form-placeholder" v-else>{{placeholder}}</text>
							</view>
							<view class="j-datetime--view-vr" v-if="$slots.right" >
								<slot name="right"></slot>
							</view>
						</view>
					</slot>
				</view>
		</j-picker>
	</view>
</template>

<script>
	import {
		deepEqual,
		padZero,
		range
	} from "../../utils/index.js"
	import dayjs from 'dayjs';
	const nowDate = new Date();
	export default {
		name: 'j-datetime',
		props: {
			placeholder: {
				type: String,
				default: '请选择'
			},
			// #ifdef VUE2
			// 绑定值
			value: {
				type: [String, Number],
				default: ''
			},
			// #endif
			// #ifdef VUE3
			// 绑定值
			modelValue: {
				type: [String, Number],
				default: ''
			},
			// #endif
			// 顶部标题
			title: {
				type: String,
				default: ''
			},
			// 展示格式，mode=date为日期选择，mode=time为时间选择，mode=year为年选择, mode=year-month为年月选择，mode=datetime为日期时间选择
			mode: {
				type: String,
				default: 'datetime'
			},
			// 可选的最大时间
			maxDate: {
				type: [Number, String],
				// 最大默认值为后10年
				default: new Date(new Date().getFullYear() + 10, 0, 1).getTime()
			},
			minDate: {
				type: [Number, String],
				// 最小默认值为前10年
				default: new Date(new Date().getFullYear() - 10, 0, 1).getTime()
			},
			// 可选的最小小时，仅mode=time有效
			minHour: {
				type: Number,
				default: 0
			},
			// 可选的最大小时，仅mode=time有效
			maxHour: {
				type: Number,
				default: 23
			},
			// 可选的最小分钟，仅mode=time有效
			minMinute: {
				type: Number,
				default: 0
			},
			// 可选的最大分钟，仅mode=time有效
			maxMinute: {
				type: Number,
				default: 59
			},
			formatter: {
				type: [Function, null],
				default: null
			},
			// 选项过滤函数
			// filter: {
			// 	type: [Function, null],
			// 	default: null
			// },
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
			isRange:{ // 是不是必须在范围内的，不在会自动修正
				type: Boolean,
				default: true
			},
			textAlign:{
				type:String,
				default:'start'
			}
		},
		data() {
			return {
				resultValue: '',
				datetime: [],
				columnsObj:{},
				innerFormatter: (type, value) => value,
			}
		},
		computed: {
			list() {
				return Object.values(this.columnsObj);
			},
			viewStyle(){
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
				return '';
			},
			formatStr() {
				let str = "YYYY-MM-DD HH:mm";
				switch (this.mode) {
					case 'time':
						str = "HH:mm"
						break;
					case 'date':
						str = "YYYY-MM-DD"
						break;
					case 'year-month':
						str = "YYYY-MM"
						break;
					case 'year':
						str = "YYYY"
						break;
					default:
						str = "YYYY-MM-DD HH:mm"
						break;
				}
				return str;
			},
			keys(){
				const arr = ['year', 'month', 'date', 'hour', 'minute'];
				if(this.mode === 'date'){
					arr.splice(3);
				}else if(this.mode === 'year-month'){
					arr.splice(2);
				}else if(this.mode === 'year'){
					arr.splice(1);
				}else if(this.mode === 'time'){
					arr.splice(0,3);
				}
				return arr;
			}
		},
		watch: {
			// #ifdef VUE3
			modelValue:{
				immediate:true,
				handler:function(newVal){
					this.initValue(newVal);
				}
			},
			// #endif
			// #ifdef VUE2
			value:{
				immediate:true,
				handler:function(newVal){
					this.initValue(newVal);
				}
			},
			// #endif
			mode(){
				this.initTime();
			}
		},
		created() {
			this.add = 0;
			this.changeValues = [];
			if(typeof this.formatter === 'function'){
				this.innerFormatter = this.formatter;
			}
			this.initTime();
		},
		methods: {
			initTime(){
				let val;
				// #ifdef VUE3
				val = this.modelValue;
				// #endif
				// #ifdef VUE2
				val = this.value;
				// #endif
				this.initColumns(this.correctValue(val));
			},
			getIndexs(date){
				return this.keys.map(item=>{
					const val = date[item]()+(item==='month'?1:0)+'';
					if (val.length<2) {
						return padZero(val);
					}
					return val;
				});
			},
			initValue(newVal) {
				// 如果没得值，就默认打开当前的时间
				const date = dayjs(this.correctValue(newVal));
				this.resultIndexs = this.getIndexs(date);
				this.datetime = this.resultIndexs;
				if(newVal){
					const str = date.format(this.formatStr);
					if(this.isRange){ // 必须在范围内的
						this.resultValue = str;
						if(this.resultValue !== newVal){
							this.updateValue(this.resultValue);
						}
					}else{
						this.resultValue = newVal;
					}
				}else{
					this.resultValue = "";
				}
			},
			initDatetime(innerValue){
				const date = dayjs(innerValue);
				this.datetime = this.getIndexs(date);
			},
			initColumns(innerValue, bool){ //bool为true，会触发计算新的值
				this.ranges = this.getRanges(innerValue);
				const obj = this.updateColumns();
				if(bool){
					this.$nextTick(()=>{
						this.columnsObj = obj;
						this.initDatetime(innerValue);
					})
				}else{
					this.columnsObj = obj;
				}
			},
			getInnerValue(val){
				let result = val;
				if(!Array.isArray(result)){ // 不是数组的，year返回的不是数组
					result = [result];
				}
				let str = '';
				if(this.mode == 'time'){
					str = result.join(':');
				}else{
					result.forEach((item,index)=>{
						if(index === 0){
							str = item;
						}else if(index > 2){
							if(index === 3){
								str = str+' '+item;
							}else{
								str = str+':'+item;
							}
						}else{
							str = str+'-'+item;
						}
					})
				}
				return str;
			},
			updateColumns() { // 初始化列
				const times = (n, iteratee)=>{
					let index = -1
					const result = Array(n < 0 ? 0 : n)
					while (++index < n) {
						result[index] = iteratee(index)
					}
					return result
				}
				const keys = Object.keys(this.ranges);
				if(this.mode === 'date'){
					keys.splice(3);
				}else if(this.mode === 'year-month'){
					keys.splice(2);
				}else if(this.mode === 'year'){
					keys.splice(1);
				}
				const results = {};
				keys.forEach(type => {
					const range = this.ranges[type];
					if(range){
						let values = times(range[1] - range[0] + 1, (index) => {
							let value = range[0] + index
							value = type === 'year' ? `${value}` : padZero(value)
							return {value, label:this.innerFormatter(type, value)}
						})
						// 进行过滤
						// if (this.filter) {
						// 	values = this.filter(type, values)
						// 	if (!values || (values && values.length == 0)) {
						// 		console.log('日期filter结果不能为空')
						// 	}
						// }
						results[type] = values;
					}
				})
				return results;
			},
			change(e) {
				this.changeValues.push(e);
				if (this.add <= 0) {
					this.changeDatetime();
				}
			},
			onPickStart() {
				this.add += 1;
			},
			onPickEnd() {
				this.add--;
				if (this.add <= 0) {
					this.changeDatetime();
				}
			},
			changeDatetime() { // 最终触发更改的数据，因为里面滑动的组件有可能会有延迟
				const val = [...this.datetime];
				this.changeValues.forEach(item => {
					const {
						index,
						newVal
					} = item;
					val[index] = newVal;
				})
				this.changeValues = [];
				if(this.mode !== 'time' && this.mode !== 'year-month' && this.mode !== 'year'){ // 为了消除日期过大，如02-31这种
					const maxDate = this.getMonthMaxDate(`${val[0]}/${val[1]}`);
					if(val[2]>maxDate){
						val[2] = maxDate+""
					}
				}
				const str = this.correctValue(this.getInnerValue(val)); // 将数组拼接成字符串并获得合理的时间
				this.initColumns(str, true);
			},
			onShowModal() {
				if(!deepEqual(this.resultIndexs,this.datetime)){
					this.initTime();
					this.datetime = this.resultIndexs;
				}
			},
			confirm(result) { // 点击确定显示结果
				this.resultIndexs = result;
				const val = this.getInnerValue(result);
				this.resultValue = val;
				this.updateValue(val);
			},
			updateValue(val){
				// #ifdef VUE2
				this.$emit('input', val);
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', val);
				// #endif
			},
			// 得出合法的时间
			correctValue(timeVal) {
				let value = timeVal;
				if(!value){ // 没得时间就默认当前时间
					value = dayjs().format(this.formatStr)
				}
				const isDateMode = this.mode !== 'time'
				// // if (isDateMode && !test.date(value)) {
				// if (isDateMode && !value) {
				// 	// 如果是日期类型，但是又没有设置合法的当前时间的话，使用最小时间为当前时间
				// 	value = this.minDate
				// } else if (!isDateMode && !value) {
				// 	// 如果是时间类型，而又没有默认值的话，就用最小时间
				// 	value = `${padZero(this.minHour)}:${padZero(this.minMinute)}`
				// }
				// 时间类型
				if (!isDateMode) {
					if (String(value).indexOf(':') === -1) return error('时间错误，请传递如12:24的格式')
					let [hour, minute] = value.split(':')
					// 对时间补零，同时控制在最小值和最大值之间
					hour = padZero(range(this.minHour, this.maxHour, Number(hour)))
					minute = padZero(range(this.minMinute, this.maxMinute, Number(minute)))
					return `${dayjs().format('YYYY/MM/DD')} ${ hour }:${ minute }`
				} else {
					// 如果是日期格式，控制在最小日期和最大日期之间
					value = dayjs(value).isBefore(dayjs(this.minDate)) ? this.minDate : value
					value = dayjs(value).isAfter(dayjs(this.maxDate)) ? this.maxDate : value
					return value
				}
			},
			// 获取每列的最大和最小值
			getRanges(innerValue) {
				if (this.mode === 'time') {
					return {
						'hour':[this.minHour, this.maxHour],
						'minute': [this.minMinute, this.maxMinute],
					}
				}
				const {
					maxYear,
					maxDate,
					maxMonth,
					maxHour,
					maxMinute,
				} = this.getBoundary('max', innerValue);
				const {
					minYear,
					minDate,
					minMonth,
					minHour,
					minMinute,
				} = this.getBoundary('min', innerValue);
				const result = {
					'year':[minYear, maxYear],
					'month':[minMonth, maxMonth],
					'day': [minDate, maxDate],
					'hour': [minHour, maxHour],
					'minute': [minMinute, maxMinute],
				}
				return result;
			},
			getMonthMaxDate(val){ // 获取当前月份的最大日期
				return dayjs(val).daysInMonth();
			},
			// 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
			getBoundary(type, innerValue) {
				const value = dayjs(innerValue);
				const boundary = dayjs(this[`${type}Date`]);
				const year = boundary.year()
				let month = 1
				let date = 1
				let hour = 0
				let minute = 0
				if (type === 'max') {
					month = 12
					// 月份的天数
					date = value.daysInMonth()
					hour = 23
					minute = 59
				}
				// 获取边界值，逻辑是：当年达到了边界值(最大或最小年)，就检查月允许的最大和最小值，以此类推
				if (value.year() === year) {
					month = boundary.month() + 1
					if (value.month() + 1 === month) {
						date = boundary.date()
						if (value.date() === date) {
							hour = boundary.hour()
							if (value.hour() === hour) {
								minute = boundary.minute()
							}
						}
					}
				}
				return {
					[`${type}Year`]: year,
					[`${type}Month`]: month,
					[`${type}Date`]: date,
					[`${type}Hour`]: hour,
					[`${type}Minute`]: minute
				}
			},
			setFormatter(e){
				this.innerFormatter = e;
			},
			show(){
				this.$refs.datetimePicker.showModal();
			},
			hide(){
				this.$refs.datetimePicker.hideModel(true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../bem.scss";

	@include b(datetime) {
		@include m(view){
			@include formItemHeight;
			@include flexRow(flex-start);
			&-v{
				@include flexRow;
				&l{
					flex:1;
				}
				&r{
					margin-left: 8rpx
				}
			}
		}
		@include m(text) {
			@include formItemFontSize;
		}
	}
</style>