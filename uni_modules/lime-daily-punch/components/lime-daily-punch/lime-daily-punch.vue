<template>
	<view class="punch">
		<view>已连续签到：{{checkinDays}}</view>
		<l-daily-punch :day-height="58" :signed-dates="checkIns" @select="select" @streak="streak" @panelChange="panelChange"></l-daily-punch>
	</view>
</template>
<script>
	// import { LDay } from '@/uni_modules/lime-daily-punch'
	export default {
		data() {
			return {
				checkIns:['2024-09-12','2024-09-02','2024-09-10','2024-09-03'],
				checkinDays: 0
			}
		},
		methods: {
			panelChange(e) {
				console.log('e', e)
			},
			streak(num) {
				this.checkinDays = num
				console.log('已经连续签到：', num)
			},
			select(day) {
				if(day.canSupplement) {
					console.log('可补签')
					uni.showModal({
						title: '补签',
						content: '是否补签？',
						success: (res) => {
							if(!res.confirm) return
							this.checkIns.push(day.fullDate)
						}
					})
				} else if(day.isCheckedIn) {
					console.log('已签')
					uni.showModal({
						title: '退签',
						content: '是否退签？',
						success: (res) => {
							if(!res.confirm) return
							this.checkIns = this.checkIns.filter((date) => date != day.fullDate)
						}
					})
				} else if(!day.isCheckedIn && day.isToday){
					console.log('这是今天？并且未签到')
					uni.showModal({
						title: '签到',
						content: '是否签到？',
						success: (res) => {
							if(!res.confirm) return
							this.checkIns.push(day.fullDate)
						}
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	.punch {
		margin: 10px;
		// background-color: antiquewhite;
	}
</style>
