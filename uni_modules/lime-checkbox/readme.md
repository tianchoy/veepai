# lime-checkbox 复选框
-  复选框，支持v-model双向数据绑定，支持自定义样式，兼容uniapp/uniappx

## 文档
[checkbox](https://limex.qcoon.cn/components/checkbox.html)

## 安装
插件市场导入即可，首次导入可能需要重新编译

## 代码演示
### 基础演示
通过 `v-model` 绑定复选框的勾选状态。
```html
<l-checkbox v-model="checked">复选框</l-checkbox>
```
```js
const checked = ref(false)
```


### 选项组
通过 v-model 绑定值当前选中项的 `value`或`name`。
```html
<l-checkbox-group v-model="checked" @change="onChange">
	<l-checkbox value="Beijing" label="北京" />
	<l-checkbox value="Shanghai" label="上海" />
	<l-checkbox value="Guangzhou" label="广州" />
	<l-checkbox value="Shenzen" label="深圳" />
</l-checkbox-group>
```
```js
const checked = ref(['Beijing']);

const onChange = (e: string[]) => {
	console.log('onChange', e)
}
```

### 禁用
通过 `disabled` 属性禁止选项切换，在 checkbox 上设置 `disabled` 可以禁用单个选项。
```html
<l-checkbox-group v-model="checked" disabled>
	<l-checkbox value="Beijing" label="北京" />
	<l-checkbox value="Shanghai" label="上海" />
	<l-checkbox value="Guangzhou" label="广州" />
	<l-checkbox value="Shenzen" label="深圳" />
</l-checkbox-group>
```

### 样式
`icon` 属性可选值为`circle`(圆) `line`(线) `dot`(点)，复选框形状。
```html
<l-checkbox-group icon="dot">
	<l-checkbox value="Beijing" label="北京" />
	<l-checkbox value="Guangzhou" label="广州" />
	<l-checkbox value="Shenzen" label="深圳" />
</l-checkbox-group>
<l-checkbox-group icon="circle">
	<l-checkbox value="Beijing" label="北京" />
	<l-checkbox value="Guangzhou" label="广州" />
	<l-checkbox value="Shenzen" label="深圳" />
</l-checkbox-group>
<l-checkbox-group icon="line">
	<l-checkbox value="Beijing" label="北京" />
	<l-checkbox value="Guangzhou" label="广州" />
	<l-checkbox value="Shenzen" label="深圳" />
</l-checkbox-group>
```

### 自定义颜色
通过 `checked-color` 属性设置选中状态的图标颜色。
```html
<l-checkbox-group checked-color="#ee0a24">
	<l-checkbox value="Beijing" label="北京" />
	<l-checkbox value="Guangzhou" label="广州" />
	<l-checkbox value="Shenzen" label="深圳" />
</l-checkbox-group>
```

### 自定义大小
通过 `icon-size` 属性可以自定义图标的大小。
```html
<l-checkbox-group>
	<l-checkbox icon-size="44px" value="Beijing" label="北京" />
	<l-checkbox icon-size="34px" value="Guangzhou" label="广州" />
	<l-checkbox icon-size="24px" value="Shenzen" label="深圳" />
</l-checkbox-group>
```

### 自定义图标

通过 `icon` 插槽自定义图标，并通过 `slotProps` 判断是否为选中状态。
```html
<l-checkbox-group>
	<l-checkbox value="Beijing" label="北京">
		<template #icon="{checked}">
			<image v-show="checked" style="width:20px; height:20px" src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"></image>
			<image v-show="!checked" style="width:20px; height:20px" src="https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png"></image>
		</template>
	</l-checkbox>
	<l-checkbox value="Guangzhou" label="广州">
		<template #icon="{checked}">
			<image v-show="checked" style="width:20px; height:20px" src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"></image>
			<image v-show="!checked" style="width:20px; height:20px" src="https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png"></image>
		</template>
	</l-checkbox>
	<l-checkbox value="Shenzen" label="深圳">
		<template #icon="{checked}">
			<image v-show="checked" style="width:20px; height:20px" src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"></image>
			<image v-show="!checked" style="width:20px; height:20px" src="https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png"></image>
		</template>
	</l-checkbox>
</l-checkbox-group>
```


### 限制最大可选数
通过 `max` 属性可以限制复选框组的最大可选数。
```html
<l-checkbox-group :max="3">
	<l-checkbox value="Beijing" label="北京" />
	<l-checkbox value="Shanghai" label="上海" />
	<l-checkbox value="Guangzhou" label="广州" />
	<l-checkbox value="Shenzen" label="深圳" />
</l-checkbox-group>
```

### 全选与反选
通过 `CheckboxGroup` 实例上的 `toggleAll` 方法可以实现全选与反选。
```html
<l-checkbox-group ref="checkboxGroupRef" @change="onChange" direction="vertical">
	<l-checkbox value="all" checkAll label="全选" />
	<l-checkbox value="Beijing" label="北京" />
	<l-checkbox value="Shanghai" label="上海" />
	<l-checkbox value="Guangzhou" label="广州" />
	<l-checkbox value="Shenzen" label="深圳" />
</l-checkbox-group>
<button type="primary" @click="checkAll">全选</button>
<button @click="toggleAll">反选</button>
```
```js
const checkboxGroupRef = ref<LCheckboxGroupComponentPublicInstance|null>(null);
const onChange = (e: string[]) => {
	console.log('onChange', e)
}
const checkAll = () => {
	if(checkboxGroupRef.value == null) return
	checkboxGroupRef.value!.toggleAll(true)
}
const toggleAll = () => {
	if(checkboxGroupRef.value == null) return
	checkboxGroupRef.value!.toggleAll(false)
}
```



### 插件标签
- 默认 l-checkbox 为 component
- 默认 lime-checkbox 为 demo

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

### Checkbox Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 标识符，通常为一个唯一的字符串或数字 | _string\|number_ | - |
| value | 复选按钮的值 | _any_ | - |
| v-model | 是否选中 | _any_ | - |
| indeterminate | 是否为半选 | _boolean_ | `false` |
| checked | 是否选中 | _boolean_ | `false` |
| disabled | 是否为禁用态 | _boolean_ | `false` |
| readonly | 是否为只读 | _boolean_ | `false` |
| checkAll | 用于标识是否为「全选选项」。复独使用无效 | _boolean_ | `false` |
| icon | 自定义选中图标和非选中图标可选值`'rectangle' | 'circle' | 'line' | 'dot'` | _string_ | `rectangle` |
| label | 主文案 | _string_ | `` |
| fontSize | 文本大小 | _string_ | `` |
| iconSize | 图标大小 | _string_ | `` |
| checkedColor | 选中状态颜色 | _string_ | `` |
| iconBgColor | 图标背景颜色 | _string_ | `` |
| iconBorderColor | 图标描边颜色 | _string_ | `` |
| iconDisabledColor | 图标禁用颜色 | _string_ | `` |
| iconDisabledBgColor | 图标禁用背景颜色 | _string_ | `` |
| labelStyle | label的样式 | _string\|object | `` |

### CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 标识符，通常为一个唯一的字符串或数字 | _string\|number[]_ | - |
| name | 标识符，通常为一个唯一的字符串或数字 | _string\|number_ | - |
| value | 复选按钮的值 | _any[]_ | - |
| indeterminate | 是否为半选 | _boolean_ | `false` |
| disabled | 是否为禁用态 | _boolean_ | `false` |
| direction | 排列方向，可选值为`vertical`  | _string_ | `horizontal` |
| icon | 自定义选中图标和非选中图标可选值`'rectangle' | 'circle' | 'line' | 'dot'` | _string_ | `rectangle` |
| fontSize | 文本大小 | _string_ | `` |
| iconSize | 图标大小 | _string_ | `` |
| checkedColor | 选中状态颜色 | _string_ | `` |
| iconBgColor | 图标背景颜色 | _string_ | `` |
| iconBorderColor | 图标描边颜色 | _string_ | `` |
| iconDisabledColor | 图标禁用颜色 | _string_ | `` |
| iconDisabledBgColor | 图标禁用背景颜色 | _string_ | `` |

### Events

| 事件名 | 说明                     | 回调参数               |
| ------ | ------------------------ | ---------------------- |
| change | 当绑定值变化时触发的事件 | _currentValue: any_ |


### Radio Slots

| 事件名 | 说明                     | 回调参数               |
| ------ | ------------------------ | ---------------------- |
| default | 自定义文本 | _{ checked: boolean, disabled: boolean }_ |
| icon | 自定义图标 | _{ checked: boolean, disabled: boolean }_ |


## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，uvue app无效。

| 名称                     | 默认值               | 描述 |
| ------------------------ | -------------------- | ---- |
| --l-checkbox-icon-size    | _40rpx_                  | -    |
| --l-checkbox-font-size | _32rpx_ | -    |
| --l-checkbox-icon-bg-color | _white_ | -    |
| --l-checkbox-border-icon-color | _$gray-5_ | -    |
| --l-checkbox-icon-disabled-color | _$gray-5_ | -    |
| --l-checkbox-icon-disabled-bg-color | _$gray-1_ | -    |
| --l-checkbox-icon-checked-color | _$primary-color_ | -    |


## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)