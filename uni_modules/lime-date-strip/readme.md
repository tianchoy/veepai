# lime-date-strip 日期横条
- 用于展示周日历或一组日历信息
- 插件依赖`lime-style`,`lime-shared`不喜勿下

## 文档
[date-strip](https://limex.qcoon.cn/components/date-strip.html)

## 安装
插件市场导入即可，首次可能需要重新编译

## 代码演示


### 基础用法
通过`v-model`可以绑定选择的日历
```html
<l-date-strip v-model="value" @change="onChange"></l-date-strip>
```
```js
const value = new Date().getTime()

const onChange = (time: number) => {
	
}
```


### 切换方式
默认是以周为周期`（swiper）`的切换方式，通过`switchMode`设置为`none`可以换成`scroll-view`,这时是从`minDate`到`maxDate`的所有日期。

```html
<l-date-strip switchMode="none" :minDate="minDate" :maxDate="maxDate"></l-date-strip>
```
```js
const minDate: new Date(2022, 0, 10).getTime()
const maxDate: new Date(2027, 10, 27).getTime()
```

### 选中样式

通过 `shape` 可以设置为选中框的形状，可选值有:`circle`,`square`,`none`。

```html
<l-date-strip shape="circle"></l-date-strip>
```


### 自定义样式

通过 `bgColor` 可以设置背景色，`activeBgColor`可设置选中的背景色。

```html
<l-date-strip bgColor="yellow" activeBgColor="#000" ></l-date-strip>
```

### 自定义日期文案
通过传入 `format` 函数来对日历上每一格的内容进行格式化。

```html
<l-date-strip :format="customFormat"></l-date-strip>
```
```js
// uniapp 不需要设置类型
import { DateStriPDay } from '@/uni_modules/lime-date-strip';
const customFormat = (day : DateStriPDay) : DateStriPDay => {
	const { date } = day;
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const curDate = date.getDate();

	day.suffix = '¥60';

	if (year == 2025) {
		if (month == 2) {
			const map = new Map<number, string>([
				[1, '初一'],
				[2, '初二'],
				[3, '初三'],
				[14, '情人节'],
				[15, '元宵节'],
			])
			if (map.has(curDate)) {
				day.prefix = map.get(curDate)!;
				day.suffix = '¥100';
			}
		}
	}

	return day;
};
```



### 查看示例
- 导入后直接使用这个标签查看演示效果

```html
 // 代码位于 uni_modules/lime-date-strip/compoents/lime-date-strip 
<lime-date-strip />
```

### 插件标签
- 默认 l-date-strip 为 component
- 默认 lime-date-strip 为 demo

### 关于vue2的使用方式
- 插件使用了`composition-api`, 如果你希望在vue2中使用请按官方的教程[vue-composition-api](https://uniapp.dcloud.net.cn/tutorial/vue-composition-api.html)配置
- 关键代码是: 在main.js中 在vue2部分加上这一段即可.

```js
// vue2
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
```

## API

### Props

| 参数   | 说明                   | 类型      | 默认值  |
| ------ | ---------------------- | --------- | ------- |
| v-modle  | 选中的日期  | _number_ | `` |
| defaultValue  | 选中的日期  | _number_ | `` |
| value  | 选中的日期  | _number_ | `` |
| switchMode  |切换模式：<br>`none` 平铺展示所有日期，不展示切换按钮，<br>`week` 按周方式切换  | _string_ | `week` |
| shape  |选中框形状：<br>`square` 方块，包含星期和日期，<br>`circle` 圆形，只包含日期， <br>`none` 文本高亮 | _string_ | `square` |
| minDate | 可选择的最小日期 | _number_ |  |
| maxDate | 可选择的最大日期 | _number_ | 当前日期的31天 |
| height | 插件高度 | _string_ | |
| gridWidth | 每格日期宽度，仅switchMode为`none`生效 | _string_ | |
| activeBgColor | 选中框背景色 | _string_ | |
| activeColor | 选中框文本色 | _string_ | |
| bgColor | 横条背景色 | _string_ | |
| radius | 选中框圆角 | _string_ | |
| firstDayOfWeek | 第一天从星期几开始，默认 0 = 周日 | _0-6_ | `0` |



### Events

| 事件名 | 说明             | 回调参数            |
| ------ | ---------------- | ------------------- |
| change  | 点击时触发 | _event: number_ |
| select  | 点击时触发 | _event: number_ |




## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式)。uvue app无效。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --l-date-strip-bg-color: | _$bg-color-container_ | - |
| --l-date-strip-height: | _86px_ | - |
| --l-date-strip-padding: | _8px 0_ | - |
| --l-date-strip-font-size: | _16px_ | - |
| --l-date-strip-color: | _$text-color-1_ | - |
| --l-date-strip-prefix-color: | _$text-color-3_ | - |
| --l-date-strip-prefix-font-size: | _14px_ | - |
| --l-date-strip-suffix-color: | _$text-color-2_ | - |
| --l-date-strip-suffix-font-size: | _12px_ | - |
| --l-date-strip-active-color: | _$primary-color_ | - |
| --l-date-strip-square-radius: | _5px_ | - |
| --l-date-strip-grid-width: | _50px_ | - |
| --l-date-strip-grid-square-padding: | _6px 0_ | - |
| --l-date-strip-grid-circle-radius: | _99px_ | - |


## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)