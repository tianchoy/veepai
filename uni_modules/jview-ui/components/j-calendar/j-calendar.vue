<template>
	<j-popup
	:show="show"
	:title="title"
	:cancelColor="cancelColor"
	:cancelText="cancelText"
	:confirmColor="confirmColor"
	:confirmText="confirmText"
	@cancel="close"
	@confirm="confirm"
	>
		<view class="uni-calendar__header">
			<view class="uni-calendar__header-btn-box" @click.stop="pre">
				<view class="uni-calendar__header-btn uni-calendar--left"></view>
			</view>
			<picker mode="date" :value="date" fields="month" @change="bindDateChange">
				<text class="uni-calendar__header-text">{{ (nowDate.year||'') +' / '+( nowDate.month||'')}}</text>
			</picker>
			<view class="uni-calendar__header-btn-box" @click.stop="next">
				<view class="uni-calendar__header-btn uni-calendar--right"></view>
			</view>
			<text class="uni-calendar__backtoday" @click="backToday">{{todayText}}</text>
		
		</view>
		<view class="uni-calendar__box">
			<view v-if="showMonth" class="uni-calendar__box-bg">
				<text class="uni-calendar__box-bg-text">{{nowDate.month}}</text>
			</view>
			<view class="uni-calendar__weeks">
				<view class="uni-calendar__weeks-day">
					<text class="uni-calendar__weeks-day-text">{{SUNText}}</text>
				</view>
				<view class="uni-calendar__weeks-day">
					<text class="uni-calendar__weeks-day-text">{{monText}}</text>
				</view>
				<view class="uni-calendar__weeks-day">
					<text class="uni-calendar__weeks-day-text">{{TUEText}}</text>
				</view>
				<view class="uni-calendar__weeks-day">
					<text class="uni-calendar__weeks-day-text">{{WEDText}}</text>
				</view>
				<view class="uni-calendar__weeks-day">
					<text class="uni-calendar__weeks-day-text">{{THUText}}</text>
				</view>
				<view class="uni-calendar__weeks-day">
					<text class="uni-calendar__weeks-day-text">{{FRIText}}</text>
				</view>
				<view class="uni-calendar__weeks-day">
					<text class="uni-calendar__weeks-day-text">{{SATText}}</text>
				</view>
			</view>
			<view class="uni-calendar__weeks" v-for="(item,weekIndex) in weeks" :key="weekIndex">
				<view class="uni-calendar__weeks-item" v-for="(weeks,weeksIndex) in item" :key="weeksIndex">
					<calendar-item class="uni-calendar-item--hook" :weeks="weeks" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate"></calendar-item>
				</view>
			</view>
		</view>
	</j-popup>
</template>

<script>
	import Calendar from './util.js';
	import CalendarItem from './calendar-item.vue'

	import { initVueI18n } from '@dcloudio/uni-i18n'
	import i18nMessages from './i18n/index.js'
	const {	t	} = initVueI18n(i18nMessages)

	/**
	 * Calendar 日历
	 * @description 日历组件可以查看日期，选择任意范围内的日期，打点操作。常用场景如：酒店日期预订、火车机票选择购买日期、上下班打卡等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=56
	 * @property {String} date 自定义当前时间，默认为今天
	 * @property {Boolean} lunar 显示农历
	 * @property {String} startDate 允许选择的最小开始日期
	 * @property {String} endDate 允许选择的最大结束日期
	 * @property {Boolean} range 范围选择
	 * 	@value true 弹窗模式
	 * 	@value false 插入模式
	 * @property {Boolean} clearDate = [true|false] 弹窗模式是否清空上次选择内容
	 * @property {Array} selected 打点，期待格式[{date: '2025-06-25', info: '已签到', color: 'green'}，{date: '2025-06-26', info: '签到', data: { custom: '自定义信息', name: '自定义消息头'}}]
	 * @property {Boolean} showMonth 是否选择月份为背景
	 * @event {Function} change 日期改变，`insert :ture` 时生效
	 * @event {Function} confirm 确认选择`insert :false` 时生效
	 * @event {Function} monthSwitch 切换月份时触发
	 * @example <uni-calendar :insert="true":lunar="true" :start-date="'2019-3-2'":end-date="'2019-5-20'"@change="change" />
	 */
	export default {
		name:'j-calendar',
		components: {
			CalendarItem
		},
		emits:['close','confirm','change','monthSwitch'],
		props: {
			date: {
				type: [String,Array],
				default: ''
			},
			selected: {
				type: Array,
				default () {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			},
			startDate: {
				type: String,
				default: ''
			},
			endDate: {
				type: String,
				default: ''
			},
			range: {
				type: Boolean,
				default: false
			},
			showMonth: {
				type: Boolean,
				default: true
			},
			clearDate: {
				type: Boolean,
				default: true
			},
			title: { // 标题
			  type: String,
			  default: ''
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
		},
		data() {
			return {
				show: false,
				weeks: [],
				calendar: {},
				nowDate: '',
			}
		},
		computed:{
			/**
			 * for i18n
			 */
			todayText() {
				return t("uni-calender.today")
			},
			monText() {
				return t("uni-calender.MON")
			},
			TUEText() {
				return t("uni-calender.TUE")
			},
			WEDText() {
				return t("uni-calender.WED")
			},
			THUText() {
				return t("uni-calender.THU")
			},
			FRIText() {
				return t("uni-calender.FRI")
			},
			SATText() {
				return t("uni-calender.SAT")
			},
			SUNText() {
				return t("uni-calender.SUN")
			},
		},
		watch: {
			date(newVal) {
				this.init(newVal)
			},
			startDate(val){
				this.cale.resetSatrtDate(val)
				this.cale.setDate(this.nowDate.fullDate)
				this.weeks = this.cale.weeks
			},
			endDate(val){
				this.cale.resetEndDate(val)
				this.cale.setDate(this.nowDate.fullDate)
				this.weeks = this.cale.weeks
			},
			selected(newVal) {
				this.cale.setSelectInfo(this.nowDate.fullDate, newVal)
				this.weeks = this.cale.weeks
			}
		},
		created() {
			this.cale = new Calendar({
				selected: this.selected,
				startDate: this.startDate,
				endDate: this.endDate,
				range: this.range,
			})
			this.init(this.date)
			
		},
		methods: {
			bindDateChange(e) {
				const value = e.detail.value + '-1'
				this.setDate(value)
				const { year,month } = this.cale.getDate(value)
        this.$emit('monthSwitch', {
            year,
            month
        })
			},
			/**
			 * 初始化日期显示
			 * @param {Object} date
			 */
			init(date) {
				let dateStr = "";
				if(this.range){ // 选范围
					this.cale.setDate(dateStr); // 防止一个都没选中的情况，先默认选今天
					if(Array.isArray(date)){
						date.slice(0,2).forEach(item=>{
							this.cale.setMultiple(item);
							dateStr = item;
						})
					}
				}else if(!this.range){ // 单选
					if(typeof date === "string"){
						dateStr = date;
					}else{
						dateStr = ""
					}
					this.cale.setDate(dateStr)
				}
				this.weeks = this.cale.weeks;
				this.nowDate = this.calendar = this.cale.getInfo(dateStr)
			},
			/**
			 * 打开日历弹窗
			 */
			open() {
				// 弹窗模式并且清理数据
				if (this.clearDate) {
					this.cale.cleanMultipleStatus()
					// this.cale.setDate(this.date)
					this.init(this.date)
				}
				this.show = true
			},
			/**
			 * 关闭日历弹窗
			 */
			close() {
				this.show = false
				this.$emit('close')
			},
			/**
			 * 确认按钮
			 */
			confirm() {
				if(this.range){ // 选范围没选完
					const {before, after} = this.cale.multipleStatus;
					if(!before || !after) return;
				}else if(!this.calendar.fullDate){ // 单选没选
					return;
				}
				this.setEmit('confirm')
				this.close()
			},
			/**
			 * 变化触发
			 */
			change() {
				this.setEmit('change')
			},
			/**
			 * 选择月份触发
			 */
			monthSwitch() {
				let {
					year,
					month
				} = this.nowDate
				this.$emit('monthSwitch', {
					year,
					month: Number(month)
				})
			},
			/**
			 * 派发事件
			 * @param {Object} name
			 */
			setEmit(name) {
				let {
					year,
					month,
					date,
					fullDate,
					lunar,
					extraInfo
				} = this.calendar
				this.$emit(name, {
					range: this.cale.multipleStatus,
					year,
					month,
					date,
					fulldate: fullDate,
					lunar,
					extraInfo: extraInfo || {}
				})
			},
			/**
			 * 选择天触发
			 * @param {Object} weeks
			 */
			choiceDate(weeks) {
				if (weeks.disable) return
				this.calendar = weeks
				// 设置多选
				this.cale.setMultiple(this.calendar.fullDate)
				this.weeks = this.cale.weeks
				this.change()
			},
			/**
			 * 回到今天
			 */
			backToday() {
				const nowYearMonth = `${this.nowDate.year}-${this.nowDate.month}`
				const date = this.cale.getDate(new Date())
        const todayYearMonth = `${date.year}-${date.month}`

				this.init(date.fullDate)

        if(nowYearMonth !== todayYearMonth) {
          this.monthSwitch()
        }

				this.change()
			},
			/**
			 * 上个月
			 */
			pre() {
				const preDate = this.cale.getDate(this.nowDate.fullDate, -1, 'month').fullDate
				this.setDate(preDate)
				this.monthSwitch()

			},
			/**
			 * 下个月
			 */
			next() {
				const nextDate = this.cale.getDate(this.nowDate.fullDate, +1, 'month').fullDate
				this.setDate(nextDate)
				this.monthSwitch()
			},
			/**
			 * 设置日期
			 * @param {Object} date
			 */
			setDate(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.cale.getInfo(date)
			}
		}
	}
</script>

<style lang="scss" scoped>
	$uni-bg-color-mask: rgba($color: #000000, $alpha: 0.4);
	$uni-border-color: #EDEDED;
	$uni-text-color: #333;
	$uni-bg-color-hover:#f1f1f1;
	$uni-font-size-base:14px;
	$uni-text-color-placeholder: #808080;
	$uni-color-subtitle: #555555;
	$uni-text-color-grey:#999;

	.uni-calendar__header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 50px;
		border-bottom-color: $uni-border-color;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.uni-calendar__backtoday {
		position: absolute;
		right: 0;
		top: 25rpx;
		padding: 0 5px;
		padding-left: 10px;
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		color: $uni-text-color;
		background-color: $uni-bg-color-hover;
	}

	.uni-calendar__header-text {
		text-align: center;
		width: 100px;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}

	.uni-calendar__header-btn-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
	}

	.uni-calendar__header-btn {
		width: 10px;
		height: 10px;
		border-left-color: $uni-text-color-placeholder;
		border-left-style: solid;
		border-left-width: 2px;
		border-top-color: $uni-color-subtitle;
		border-top-style: solid;
		border-top-width: 2px;
	}

	.uni-calendar--left {
		transform: rotate(-45deg);
	}

	.uni-calendar--right {
		transform: rotate(135deg);
	}


	.uni-calendar__weeks {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-calendar__weeks-item {
		flex: 1;
	}

	.uni-calendar__weeks-day {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 45px;
		border-bottom-color: #F5F5F5;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.uni-calendar__weeks-day-text {
		font-size: 14px;
	}

	.uni-calendar__box {
		position: relative;
	}

	.uni-calendar__box-bg {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.uni-calendar__box-bg-text {
		font-size: 200px;
		font-weight: bold;
		color: $uni-text-color-grey;
		opacity: 0.1;
		text-align: center;
		/* #ifndef APP-NVUE */
		line-height: 1;
		/* #endif */
	}
</style>
