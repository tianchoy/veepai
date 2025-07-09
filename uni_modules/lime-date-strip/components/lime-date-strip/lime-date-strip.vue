<template>
	<view class="demo-block">
		<text class="demo-block__title-text ultra">DateStrip 日期横条</text>
		<text class="demo-block__desc-text">用于展示周日历或一组日历信息。</text>	
		<view class="demo-block__body">
			<view class="demo-block">
				<text class="demo-block__title-text">基础用法</text>
				<view class="demo-block__body">
					<l-date-strip v-model="value" @change="onChange"></l-date-strip>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text">切换方式</text>
				<view class="demo-block__body">
					<l-date-strip switchMode="none"></l-date-strip>
				</view>	
			</view>
			<view class="demo-block">
				<text class="demo-block__title-text">选中样式</text>
				<view class="demo-block__body">
					<l-date-strip shape="circle"></l-date-strip>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text">shape none</text>
				<view class="demo-block__body">
					<l-date-strip shape="none"></l-date-strip>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text">自定义样式</text>
				<view class="demo-block__body">
					<l-date-strip bgColor="yellow" activeBgColor="#000" ></l-date-strip>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text">自定义日期范围</text>
				<view class="demo-block__body">
					<l-date-strip :minDate="minDate" :maxDate="maxDate"></l-date-strip>
				</view>	
			</view>	
			<view class="demo-block">
				<text class="demo-block__title-text">自定义日期文案</text>
				<view class="demo-block__body">
					<l-date-strip :format="customFormat"></l-date-strip>
				</view>	
			</view>	
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: new Date().getTime(),
				minDate: new Date(2022, 0, 10).getTime(),
				maxDate: new Date(2027, 10, 27).getTime()
			}
		},
		methods: {
			onChange(e) {
				console.log('n', e)
			},
			customFormat(day) {
				const { date } = day;
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const curDate = date.getDate();
			
				day.suffix = '¥60';
			
				if (year == 2025) {
					if (month == 2) {
						const map = new Map([
							[1, '初一'],
							[2, '初二'],
							[3, '初三'],
							[14, '情人节'],
							[15, '元宵节'],
						])
						if (map.has(curDate)) {
							day.prefix = map.get(curDate);
							day.suffix = '¥100';
						}
					}
				}
			
				return day
			}
		}
	}
</script>

<style lang="scss">
	
	.btn {
		margin-bottom: 20rpx;
		margin-right: 20rpx;
		align-self: center;
	}
	.demo-block {
		margin: 32px 0 0;
		
		// overflow: visible;
		&.card{
			// background-color: white;
			padding: 30rpx;
			margin-bottom: 20rpx;
		}
		&__title {
			margin: 0;
			margin-top: 8px;
			&-text {
				color: rgba(0, 0, 0, 0.6);
				font-weight: 400;
				font-size: 14px;
				line-height: 16px;
				display: flex;
				margin-left: 20px;
				&.large {
					color: rgba(0, 0, 0, 0.9);
					font-size: 18px;
					font-weight: 700;
					line-height: 26px;
					margin-left: 20px;
				}
				&.ultra {
					color: rgba(0, 0, 0, 0.9);
					font-size: 24px;
					font-weight: 700;
					line-height: 32px;
				}
			}
		}
		&__desc-text {
			color: rgba(0, 0, 0, 0.6);
			margin: 8px 16px 0 0;
			font-size: 14px;
			line-height: 22px;
			margin-left: 20px;
		}
		&__body {
			margin: 16px 0;
			overflow: visible;
			.demo-block {
				// margin-top: 0px;
				margin: 0;
				overflow: visible;
			}
		}
	}
</style>