<template>
	<view class="punch-calendar-wrapper">
		<view class="calendar">
			<view class="top flex-bt padding-32">
				<view class="prev flex-center" @click="switchMonth('prev')">
					<image class="icon" src="../../static/images/calendar-prev.png"></image>
				</view>
				<text>{{ calendarConfig.yearAndMonth }}</text>
				<view class="next flex-center" @click="switchMonth('next')">
					<image class="icon" :src="nextIconStyle"></image>
				</view>
			</view>
			<view class="center">
				<view class="week flex-bt">
					<view class="items" v-for="item in calendarConfig.week" :key="item">{{ item }}</view>
				</view>
				<view class="day">
					<template v-for="(item, index) in calendarConfig.day">
						<view class="flex-start" :key="index" v-if="item.open">
							<view class="items flex-center" :class="[child.tag]" v-for="(child, childIndex) in item.list"
								:key="childIndex">
								<text :class="[child.className, child.active]" @click="chooseDay(item, child)">
									{{ child.value }}
								</text>
							</view>
						</view>
					</template>

				</view>
			</view>
			<view class="bottom flex-center" @click="fold">
				<image src="../../static/images/cakebdar-open.png" :class="[!calendarConfig.fold ? 'active' : '']"
					class="icon">
				</image>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'punch-calendar',
	props: {
		// 成功打卡
		successList: {
			type: Array,
			default: () => []
		},

		// 打卡异常点
		errorList: {
			type: Array,
			default: () => []
		},
	},
	data() {
		return {
			successArr: [],
			errorArr: [],
			calendarConfig: {
				week: ['日', '一', '二', '三', '四', '五', '六'],
				nowYear: '', //当前日历 年
				nowMonth: '', //当前日历 月
				nowDay: '', //当前日历 日
				day: [], //日历列表
				fold: false, // 展开/折叠状态
				yearAndMonth: '', // 当前日历年月
				needClock: true, //当天是否需要打卡
			},
			monthStatisticList: [],
		}
	},
	computed: {
		nextIconStyle: function () {
			const {
				year,
				month
			} = this.getNowDate()
			const {
				nowYear,
				nowMonth
			} = this.calendarConfig
			if (nowYear == year && nowMonth == month) {
				return '../../static/images/calendar-next.png';
			} else {
				return '../../static/images/calendar-next-active.png';
			}
		},
	},

	watch: {
		successList: {
			handler(val) {
				this.successArr = JSON.parse(JSON.stringify(val))
				this.initCalendar(false)
			},
			immediate: true,
			deep: true,
		},
		errorList: {
			handler(val) {
				this.errorArr = JSON.parse(JSON.stringify(val))
				this.initCalendar(false)
			},
			immediate: true,
			deep: true,
		},
	},

	methods: {
		//切换日历
		switchMonth(type = 'next') {
			let { nowYear, nowMonth } = this.calendarConfig
			let { year, month, day } = this.getNowDate()
			if (type == 'next' && nowYear == year && nowMonth == month) return false;
			if (type == 'prev') {
				if (nowMonth <= 1) {
					nowMonth = 12
					nowYear -= 1
				} else {
					nowMonth--;
				}
			} else {
				if (nowMonth >= 12) {
					nowMonth = 1
					nowYear += 1
				} else {
					nowMonth++;
				}
			}
			this.$emit('switchMonth', type, nowYear, nowMonth)
			this.calendarConfig.nowYear = nowYear
			this.calendarConfig.nowMonth = nowMonth
			this.calendarConfig.nowDay = (nowYear == year && nowMonth == month) ? day : ''
			this.calendarConfig.day = this.calendar(nowYear, nowMonth, this.calendarConfig.nowDay, this.calendarConfig.fold, this.successArr, this.errorArr)
			this.calendarConfig.yearAndMonth = this.monDetail(nowYear, nowMonth)


		},

		chooseDay(item, child) {
			if (child.className == 'last' || child.className == 'nextMonth') return false;
			this.$emit('chooseDay', child)
			this.calendarConfig.day.map(parent => {
				parent.list.map(child => {
					child.className == 'active' && (child.className = '')
					return child
				})
				return parent
			})
			child.className = 'active'
		},

		// 展开/折叠
		fold() {
			const { now, year, month, day } = this.getNowDate()
			const { nowYear, nowMonth } = this.calendarConfig
			this.calendarConfig.day.map((parent, index) => {
				if (!this.calendarConfig.fold) {
					parent.open = true
				} else {
					if (nowYear == year && nowMonth == month) {
						parent.open = parent.list.reduce((result, child) => {
							if (child.value == day && child.className !== 'last' && child.className !== 'nextMonth') {
								result = true
							}
							return result
						}, false)
					} else {
						parent.open = index == 0 ? true : false
					}
				}
				return parent
			})
			this.calendarConfig.fold = !this.calendarConfig.fold
		},

		// 初始化
		initCalendar(nowDate = true) {
			if (nowDate) {
				const { year, month, day } = this.getNowDate()
				this.calendarConfig.nowYear = year
				this.calendarConfig.nowMonth = month
				this.calendarConfig.nowDay = day
			}
			const { nowYear, nowMonth, nowDay } = this.calendarConfig

			// 渲染日历
			this.calendarConfig.day = this.calendar(nowYear, nowMonth, nowDay, this.calendarConfig.fold, this.successArr, this.errorArr)
			// 日历title
			this.calendarConfig.yearAndMonth = this.monDetail(nowYear, nowMonth)
		},

		// 获取当前年月日
		getNowDate() {
			let now = new Date()
			let year = now.getFullYear()
			let month = now.getMonth() + 1
			let day = now.getDate()
			return { now, year, month, day }
		},

		// 显示当前年月
		monDetail(ynow, mnow) {
			return `${ynow}年${mnow}月`
		},

		//判断是否为闰年
		is_leap(year) {
			let res = year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0)
			return res
		},

		/**
		 * 渲染日历
		 * ynow 年
		 * mnow 月
		 * dnow 日
		 * fold 折叠状态
		 * successArr 需要打卡
		 * errorArr 异常标记
		**/
		calendar(ynow, mnow, dnow, fold, successArr = [], errorArr = []) {
			let arr = []
			var nlstr = new Date(ynow, mnow - 1, 1)
			var firstday = nlstr.getDay()
			const { now, year, month, day } = this.getNowDate()
			//每个月的天数
			const m_days = [31, 28 + this.is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			//当前月天数+第一天是星期几的数值   获得 表格行数
			var tr_str = Math.ceil((m_days[mnow - 1] + firstday) / 7)
			var i, k, idx, date_str;
			for (i = 0; i < tr_str; i++) {
				//表格每行的单元格
				let row = []
				for (k = 0; k < 7; k++) {
					//单元格自然序列号
					idx = i * 7 + k;
					//计算日期
					date_str = idx - firstday + 1;

					if (date_str <= 0) {
						// 处理上月空缺
						row.push({ value: '', className: '' })

					} else if (year == ynow && month == mnow) {
						if (date_str > m_days[mnow - 1]) {
							row.push({ value: '', className: 'nextMonth' })
						} else if (date_str > dnow) {
							row.push({ value: date_str, className: 'last', year: ynow, month: mnow, day: date_str })
						} else {
							row.push({ value: idx - firstday + 1, className: '', year: ynow, month: mnow, day: date_str })
						}
					} else {
						if (date_str > m_days[mnow - 1]) {
							row.push({ value: '', className: 'nextMonth' })
						} else if (date_str > dnow) {
							row.push({ value: date_str, className: '', year: ynow, month: mnow, day: date_str })
						} else {
							row.push({ value: date_str, className: '', year: ynow, month: mnow, day: date_str })
						}
					}
				}

				// 处理下月候补日期
				let list = row.reduce((arr, item, index) => {
					if (item.className == 'nextMonth') {
						if (arr[index - 1].value == m_days[mnow - 1]) {
							item.value = 1
						} else {
							item.value = arr[index - 1].value + 1
						}
					}
					// 判断是否为当日
					item.className !== 'nextMonth' && item.year == year && item.month == month && item.day == day && (item.active = 'thatDay')
					item.className !== 'nextMonth' && item.year == year && item.month == month && item.day == day && (item.className = 'active')

					// 处理需要打卡标记
					if (item.year && item.month && item.day) {
						let nowDate = `${item.year}/${item.month}/${item.day}`
						let timer = new Date(nowDate).getTime().toString()
						successArr.includes(timer) && (item.tag = 'border')
						errorArr.includes(timer) && (item.tag = 'error')
					}
					arr.push(item)
					return arr
				}, [])

				arr.push({ list, open: false })
			}

			// 处理默认折叠状态
			arr.forEach((parent, index) => {
				if (fold) {
					parent.open = true
				} else {
					parent.open = parent.list.reduce((result, child) => {
						if (ynow == year && mnow == month) {
							child.value == dnow && child.className !== 'nextMonth' && (result = true)
						} else {
							index == 0 && (result = true)
						}
						return result
					}, false)
				}
			})
			return arr
		}
	}
}
</script>
<style lang="scss" scoped>
.punch-calendar-wrapper {
	.flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flex-end {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.flex-start {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.flex-bt {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.calendar {
		width: 686rpx;
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 10rpx 25rpx rgba(0, 0, 0, 0.1);

		.center {
			.week {
				padding-top: 32rpx;

				.items {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: #8c8f94;
					line-height: 32rpx;
					width: 98rpx;
					text-align: center;
				}
			}

			.day {
				width: 100%;
				flex-wrap: wrap;

				.items {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: #8c8f94;
					line-height: 32rpx;
					text-align: center;
					padding-top: 24rpx;
					padding-bottom: 32rpx;
					width: 98rpx;
					position: relative;

					&.border ::before {
						content: '';
						width: 12rpx;
						height: 12rpx;
						background: #b6d1ff;
						border-radius: 50%;
						position: absolute;
						left: 0;
						right: 0;
						margin: 0 auto;
						bottom: 10rpx;
						border-radius: 50%;
					}

					&.error::before {
						content: '';
						width: 12rpx;
						height: 12rpx;
						background: #ff5040;
						position: absolute;
						left: 0;
						right: 0;
						margin: 0 auto;
						bottom: 10rpx;
						border-radius: 50%;
					}

					text {
						width: 48rpx;
						height: 48rpx;
						display: block;
						transition: all 0.6s;
						border-radius: 32rpx;
						text-align: center;
						line-height: 48rpx;
						color: #474a50;

						&.last,
						&.nextMonth {
							color: #c0c3c7;
						}

						&.thatDay {
							background: #e6efff !important;
							color: #474a50;
						}

						&.active {
							background: #0D67FF !important;
							color: #ffffff;
						}
					}
				}
			}
		}

		.bottom {
			width: 100%;
			height: 78rpx;
			border-top: 1px solid #e6efff;

			.icon {
				width: 32rpx;
				height: 32rpx;
				transition: all 0.6s;

				&.active {
					transform: rotate(180deg);
				}
			}
		}

		.top {
			width: 100%;
			height: 112rpx;
			border-bottom: 2px solid #e6efff;

			text {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: #1a1a1a;
				line-height: 32rpx;
			}

			.prev,
			.next {
				width: 100rpx;
				height: 100%;

				.icon {
					width: 40rpx;
					height: 40rpx;
					display: block;
				}
			}
		}
	}
}
</style>
