# punch-calendar

> [punch-calendar](https://github.com/LonJinUp/punch-calendar)为有打卡需求制作的日历，可标记小圆点。简单配置即可使用，代码体积小，无第三方引用。  
> 任何问题可以评论联系我，第一时间处理，或者添加 🛰️:ljsw8686

## 使用方法

demo: 
```html
<template>
	<view class="content">
		<punch-calendar @switchMonth="switchMonth" @chooseDay="chooseDay" :errorList="errorList" :successList="successList" ref="calendar"></punch-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				successList: ['1676995200000'],
				errorList: ['1676908800000'],
				
			}
		},
		onLoad() {
			// 初始化
			this.$refs.calendar.initCalendar()
			
			// 模拟异步赋值
			let timer = setTimeout(()=>{
				this.addTimer()
			},2000)
			
		},
		methods: {
			// 点击某一天
			chooseDay(val) {
				console.log(val)
			},
			
			addTimer() {
				this.successList = [...this.successList, '1681920000000']
			},
			
			/**
			 * 切换事件
			 * @param type 切换类型 prev next
			 * @param nowYear 当前年
			 * @param nowMonth 当前月
			 * **/
			switchMonth(type, nowYear, nowMonth){
				//... doSomeThing
				if(nowYear == '2023' && nowMonth == '3' && !this.successList.includes('1678204800000')){
					uni.showLoading({})
					let timer = setTimeout(()=>{
						uni.hideLoading()
						clearTimeout(timer)
						this.successList = [...this.successList, '1678204800000']
					},3000)
				}
				
			}
		}
	}
</script>
```

### 配置说明：

参数说明：

| 参数        | 说明                         | 默认值 | 类型  |
| ----------- | ---------------------------- | ------ | ----- |
| successList | 打卡成功标记，传入13位时间戳 | []     | Array |
| errorList   | 打卡异常标记，传入13位时间戳 | []     | Array |


回调方法

| 方法名称   | 说明                 | 返回值                       |
| ---------- | -------------------- | ---------------------------- |
| @chooseDay | 点击某日时候执行函数 | 返回一个对象，包含年、月、日 |
| @switchMonth | 切换日期时候执行 | 返回type（切换类型，prev｜｜next）, 当前年nowYear,当前月nowMonth |



