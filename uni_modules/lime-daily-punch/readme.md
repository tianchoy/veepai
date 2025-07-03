# lime-daily-punch 打卡签到日历
- 一款签到打卡的日历插件，数据驱动，补签，统计连续打卡天数，uvue目前使用canvas实现，兼容uniapp/uniappx(web,ios,安卓)
- 初版，可能个性化不足，可以交流。或自行修改样式

## 安装
插件市场导入

## 文档
[打卡签到](https://limex.qcoon.cn/components/daily-punch.html)

## 代码演示

### 基础使用
通过设置`signedDates`传入已经打卡的日期

```html
<l-daily-punch :signedDates="checkIns"></l-daily-punch>
```
```js
// 已打卡
const checkIns = ref(['2024-09-12','2024-09-02','2024-09-10','2024-09-03'])
```


### 事件
当点击日期时，触发`select`事件，当传入已打卡日期会触发`streak`事件，这事件是统计连续打卡天数，当切换月份时触发`panelChange`

```html
<l-daily-punch :signedDates="checkIns" @select="select" @panelChange="change"></l-daily-punch>
```
```js
import { LDay,  LYearMonth} from '@/uni_modules/lime-daily-punch'

// 已打卡
const checkIns = ref(['2024-09-12','2024-09-02','2024-09-10','2024-09-03'])

const select = (day : LDay) => {
	if (day.canSupplement) {
		uni.showModal({
			title: '补签',
			content: '是否补签？',
			success: (res : ShowModalSuccess) => {
				if (!res.confirm) return
				checkIns.value.push(day.fullDate)
			}
		})
	}
	if(!day.isCheckedIn) {
		console.log('已签')
		uni.showModal({
			title: '签到',
			content: '是否签到？',
			success: (res : ShowModalSuccess) => {
				if (!res.confirm) return
				checkIns.value.push(day.fullDate)
			}
		})
	}
	if(day.isToday) {
		console.log('今天')
	}
}

const change = (res: LYearMonth) => {
	console.log('res', res)
}
```

### 查看示例
- 导入后直接使用这个标签查看演示效果
```vue
// 代码位于 uni_modules/lime-daily-punch/compoents/lime-daily-punch
<lime-daily-punch />
```


### 插件标签
- 默认 l-daily-punch 为 component
- 默认 lime-daily-punch 为 demo


## API

### Props

| 参数        | 说明                 | 类型               | 默认值     |
| ----------- | -------------------- | ------------------ | ---------- |
| canSupplement  | 是否支持补签 | _boolean_ | `true`        |
| yearMonth      | 显示年月，格式：`YYYY-MM`  | _string_           | `当前月份` |
| signedDates  | 打卡数据,格式：`YYYY-MM-DD`[]   | _string[]_          | `[]`     |
| dayHeight | 天格子的高度   | _number_          | `76`    |
| week | 星期   | _string[]_          | `['周日', '周一', '周二', '周三', '周四', '周五', '周六']`    |
| weekStartsOn | 星期几为一周的开始，默认是6，即周一   | _number_          | `6`    |
| weekColor | 星期文本颜色   | _string_          | `#BDC0C3`    |
| weekFontSize | 星期文本字体   | _number_          | `14`    |
| weekHeight | 星期文本高度   | _number_          | `30`    |
| selectedDayBgColor | 选择中背景色   | _string_          | `rgba(0,0,0,0.06)`    |
| dayFontSize | 天的字体大小   | _number_          | `16`    |
| textColor | 文本颜色   | _string_          | `#1A1F24`    |
| disabledColor | 禁用颜色(日历中非本月的日期，week文本)   | _string_          | `#BDC0C3`    |
| monthTitleHeight | 日历年月标题高度   | _number_          | `50`    |
| monthTitleFontSize | 日历年月标题字体大小   | _number_          | `20`    |
| color | 主色，签到和today选中颜色   | _string_          | `#3B87F6`    |
| unsignedColor | 可补签小点颜色   | _string_          | `#F1A33A'`    |

## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)