<template>
	<view class="l-daily-punch">
		<view class="l-daily-punch__header" :style="[headerStyle]" v-if="currentMonth">
			<l-icon name="chevron-left" @click="last" />
			<text class="month">{{currentMonth.year}}年{{ currentMonth.month > 9 ? currentMonth.month : `0${currentMonth.month}` }}月</text>
			<l-icon name="chevron-right" @click="next" />
		</view>
		<view class="l-daily-punch__week" :style="[weekStyle]">
			<text v-for="item in calcWeek" :key="item">{{item}}</text>
		</view>
		<view class="l-daily-punch__days" v-if="currentMonth" :style="[daysStyle]">
			<view class="l-daily-punch__days-item" v-for="item in currentDays" :key="item.fullDate"
				@click="select(item)">
				<view class="l-daily-punch__days-item--inner" :class="{
					'l-daily-punch__days-item--outer': item.type != 'current',
					'is-today': item.isToday,
					'is-checked-in': item.isCheckedIn && item.type == 'current',
					'is-can-supplement': item.canSupplement && item.type == 'current',
					'is-selected': item.isToday && selectDate == null || selectDate == item,
				}">{{ item.isToday ? '今天' : item.fullDay}}</view>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
	import { defineComponent, shallowRef, ref, watchEffect, onMounted, computed } from '@/uni_modules/lime-shared/vue';
	import { Calendar } from './calender'
	import { unitConvert } from '@/uni_modules/lime-shared/unitConvert';
	export default defineComponent({
		name: 'l-daily-punch',
		emits: ['select', 'panelChange', 'streak'],
		props: {
			canSupplement: {
				type: Boolean,
				default: true
			},
			isFullCalendar: {
				type: Boolean,
				default: true
			},
			yearMonth: {
				type: String,
				default: () : string => {
					const date = new Date();
					const year = date.getFullYear();
					const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 确保月份是两位数
					return `${year}-${month}`;
				}
			},
			signedDates: {
				type: Array as PropType<string[]>,
				default: () : string[] => {
					return [] as string[];
				},
				validator: (value : string[]) : boolean => {
					// 简单的验证函数，确保每个元素都是有效的日期字符串
					return value.every((date : string) : boolean => /^\d{4}-\d{2}-\d{2}$/.test(date));
				}
			},
			dayHeight: {
				type: [String, Number],
				// default: 76
			},
			week: {
				type: Array as PropType<string[]>,
				default: () : string[] => ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
			},
			weekStartsOn: {
				type: Number,
				default: 6,
				validator: (value : number) : boolean => value <= 6
			},
			weekColor: {
				type: String,
				// default: '#BDC0C3'
			},
			weekFontSize: {
				type: Number,
				// default: 14
			},
			weekHeight: {
				type: Number,
				// default: 30
			},
			selectedDayBgColor: {
				type: String,
				// default: 'rgba(0,0,0,0.06)'
			},
			dayFontSize: {
				type: Number,
				// default: 18
			},
			textColor: {
				type: String,
				// default: '#1A1F24'
			},
			disabledColor: {
				type: String,
				// default: '#BDC0C3'
			},
			monthTitleHeight: {
				type: Number,
				// default: 50
			},
			monthTitleFontSize: {
				type: Number,
				// default: 20
			},
			color: {
				type: String,
				// default: '#3B87F6'
			},
			unsignedColor: {
				type: String,
				// default: '#F1A33A'
			},
		},
		setup(props, { emit }) {
			const calender = new Calendar()
			const currentMonth = ref(null)
			const currentDays = ref(null)
			const selectDate = shallowRef(null)

			const calcWeek = computed(() => {
				const normalWeek = props.week
				const weekStartsOn = props.weekStartsOn
				const sIndex = weekStartsOn < 0 ? 0 : weekStartsOn >= normalWeek.length ? normalWeek.length - 1 : weekStartsOn
				normalWeek.unshift(...normalWeek.slice(-sIndex))
				normalWeek.length = 7
				return normalWeek
			})
			const headerStyle = computed(() => {
				const style: Record<string, any> = {}
				if(props.monthTitleHeight) {
					style['--l-daily-punch-month-title-height'] = props.monthTitleHeight + 'px'
				}
				if(props.monthTitleFontSize) {
					style['--l-daily-punch-month-title-font-size'] = props.monthTitleFontSize + 'px'
				}
				if(props.textColor) {
					style['--l-daily-punch-month-title-color'] = props.textColor
				}
				
				return style
			})
			const weekStyle = computed(() => {
				const style: Record<string, any> = {}
				if(props.weekHeight) {
					style['--l-daily-punch-week-height'] = props.weekHeight + 'px'
				}
				if(props.weekFontSize) {
					style['--l-daily-punch-week-font-size'] = props.weekFontSize + 'px'
				}
				if(props.weekColor) {
					style['--l-daily-punch-week'] = props.weekColor
				}
				
				return style
			})
			
			const daysStyle = computed(() => {
				const style: Record<string, any> = {}
				if(props.dayHeight) {
					style['--l-daily-punch-day-height'] = props.dayHeight + 'px'
				}
				if(props.dayFontSize) {
					style['--l-daily-punch-day-font-size'] = props.dayFontSize + 'px'
				}
				if(props.disabledColor) {
					style['--l-daily-punch-disabled-color'] = props.disabledColor
				}
				if(props.textColor) {
					style['--l-daily-punch-text-color'] = props.textColor
				}
				if(props.selectedDayBgColor) {
					style['--l-daily-punch-selected-bg-color'] = props.selectedDayBgColor
				}
				if(props.unsignedColor) {
					style['--l-daily-punch-unsigned-color'] = props.unsignedColor
				}
				if(props.color) {
					style['--l-daily-punch-color'] = props.color
				}
				return style
			})
			
			const setOpt = () => {
				const opt : Options = {
					canSupplement: props.canSupplement,
					isFullCalendar: props.isFullCalendar,
					yearMonth: props.yearMonth,
					signedDates: props.signedDates,
					dayHeight: unitConvert(props.dayHeight),
					week: props.week as string[],
					weekStartsOn: props.weekStartsOn,
					weekColor: props.weekColor,
					weekFontSize: props.weekFontSize,
					weekHeight: props.weekHeight,
					selectedDayBgColor: props.selectedDayBgColor,
					dayFontSize: props.dayFontSize,
					textColor: props.textColor,
					disabledColor: props.disabledColor,
					monthTitleHeight: props.monthTitleHeight,
					monthTitleFontSize: props.monthTitleFontSize,
					color: props.color,
					unsignedColor: props.unsignedColor
				}
				calender.setOptions(opt)
			}
			const update = () => {
				currentMonth.value = calender.generateMonthDateCache()
				currentDays.value = [...currentMonth.value.days]
			}
			const select = (day) => {
				if (day.type != 'current') return
				calender.selectDate = day
				selectDate.value = day
				emit('select', day)
				update()
			}
			const last = () => {
				calender.last()
				update()
				emit('panelChange', {year: calender.year, month: calender.month})
			}
			const next = () => {
				calender.next()
				update()
				emit('panelChange', {year: calender.year, month: calender.month})
			}
			watchEffect(() => {
				setOpt()
				update()
				emit('streak', calender.checkinDays)
			})

			onMounted(() => {
				setOpt()
				update()
			})

			return {
				currentMonth,
				currentDays,
				calcWeek,
				select,
				last,
				next,
				selectDate,
				weekStyle,
				headerStyle,
				daysStyle
			}
		}
	})
</script>
<style lang="scss">
	@import './index';
</style>