# lime-search 搜索
- 用于用户输入搜索信息，并进行页面内容搜索。兼容uniapp/uniappx
- 插件依赖`lime-style`、`lime-shared`、`lime-icon`、[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)这是个收费的插件，如果不需要svg可以在lime-icon里注释掉

## 安装
在插件市场导入即可，首次导入可能需要重新编译

**注意** 
* 🔔 本插件依赖的[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)在 uniapp x app中是原生插件，如果购买(收费为5元)则需要自定义基座，才能使用！uniapp可忽略。
* 🔔 不需要[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)在lime-icon代码中注释掉即可

```html
// lime-icon/components/l-icon.uvue 第4行 注释掉即可。
<!-- <l-svg class="l-icon" :class="classes" :style="styles" :color="color" :src="iconUrl" v-else :web="web" @error="imageError" @load="imageload" @click="$emit('click')"></l-svg> -->
```

## 代码演示
### 基础使用
`v-model` 用于控制搜索框中的文字。

```html
<l-search class="search" v-model="value" placeholder="请输入关键字" />
```
```js
const value = ref('')
```

### 事件监听
Search 组件提供了 `change`,`blur`,`clear`,`focus`,`submit`,`action-click`, 通过`action`属性设置右侧操作按钮文字

```html
<l-search
    v-model="value"
    placeholder="请输入关键字"
	action="取消"
    @change="onChange"
    @blur="onBlur"
    @clear="onClear"
    @focus="onFocus"
    @submit="onSubmit"
    @action-click="onActionClick">
</l-search>
```
```js
const value = ref('');
const onChange = (value: string) => {
	console.log(`onChange`, value)
}
const onBlur = (value: string) => {
	console.log(`onBlur`, value)
}
const onClear = (value: string) => {
	console.log(`onClear`, value)
}
const onFocus = (value: string) => {
	console.log(`onFocus`, value)
}
const onSubmit = (value: string) => {
	console.log(`onSubmit`, value)
}
const onActionClick = () => {
	console.log('click')
}
```

### 内容居中
通过 `center` 属性设置搜索框内容的居中。
```html
<l-search class="search" v-model="value" :center="true"  placeholder="请输入关键字" />
```


### 禁用
通过 `disabled` 属性设置禁用。
```html
<l-search class="search" v-model="value" :disabled="true"  placeholder="请输入关键字" />
```

### 形状
通过 `shape` 属性设置搜索框形状。可选项：square/round
```html
<l-search class="search" v-model="value" shape="round"  placeholder="请输入关键字" />
```

### 自定义
可通过插槽实现复杂的布局
```html
<l-search class="search" padding="16rpx 5rpx 16rpx 24rpx" v-model="value" shape="round" placeholder="请输入关键字" >
	<template #left>
		<text style="padding-right: 10px; color: #666">地址</text>
	</template>
	<template #right-icon>
		<l-button type="primary" size="small" shape="round">搜索</l-button>
	</template>
</l-search>
```

### 查看示例
- 导入后直接使用这个标签查看演示效果

```html
 // 代码位于 uni_modules/lime-search/compoents/lime-search 
<lime-search />
```

### 插件标签
- 默认 l-search 为 component
- 默认 lime-search 为 demo

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
| value  | 值       | _string_  | `-`     |
| v-model  | 值       | _string_  | `-`     |
| action  | 自定义右侧操作按钮文字       | _string_  | `-`     |
| adjustPosition  | 键盘弹起时，是否自动上推页面      | _string_  | `-`     |
| alwaysEmbed  | 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)       | _string_  | `-`     |
| center  | 搜索框内容是否居中     | _boolean_  | `-`     |
| clearable  | 是否启用清除控件     | _boolean_  | `true`     |
| confirmHold  | 点击键盘右下角按钮时是否保持键盘不收起     | _boolean_  | `false`     |
| disabled  | 是否禁用     | _boolean_  | `false`     |
| focus  | 是否聚焦     | _boolean_  | `false`     |
| holdKeyboard  | focus时，点击页面的时候不收起键盘     | _boolean_  | `false`     |
| confirmType  | 设置键盘右下角按钮的文字，仅在type='text'时生效[confirmType](https://doc.dcloud.net.cn/uni-app-x/component/input.html)      | _string_  | `search`  |
| cursor  | 指定 focus 时的光标位置   | _number_  | `-`     |
| cursorSpacing  | 搜索框聚焦时底部与键盘的距离   | _number_  | `0`     |
| leftIcon  | 左侧图标   | _string_  | `0`     |
| maxcharacter  |  用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用   | _number_  | `-`     |
| maxlength  |  用户最多可以输入的文本长度，一个中文等于一个计数长度。默认为 -1，不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用  | _number_  | `-1`     |
| placeholder  |  占位符  | _string_  | `-`     |
| placeholderClass  |  指定 placeholder 的样式类  | _string_  | `-`     |
| placeholderStyle  |  指定 placeholder 的样式  | _string_  | `-`     |
| selectionEnd  |  光标结束位置，自动聚集时有效，需与 selection-start 搭配使用  | _number_  | `-`     |
| selectionStart  |  光标起始位置，自动聚集时有效，需与 selection-end 搭配使用  | _number_  | `-`     |
| shape  |  搜索框形状,可选`square\|round`  | _string_  | `-`     |
| type  | 拉起键盘的类型  | _string_  | `-`     |
| lStyle  | 样式  | _string_  | `-`     |
| cursorColor  | 光标颜色  | _string_  | `-`     |
| padding  | 内边距  | _string_  | `-`     |
| radius  | 圆角  | _string_  | `-`     |
| height  | 高度  | _string_  | `-`     |
| bgColor  | 背景色  | _string_  | `-`     |
| fontSize  | 文本字体大小  | _string_  | `-`     |
| textColor  | 文本颜色  | _string_  | `-`     |
| iconColor  | 图标颜色  | _string_  | `-`     |
| clearIconColor  | 删除图标颜色  | _string_  | `-`     |

### Events

| 事件名 | 说明             | 回调参数            |
| ------ | ---------------- | ------------------- |
| action-click  | 点击右侧触发 | _-_ |
| change  | 输入时触发 | _value: string_ |
| blur  | 输入框失去焦点时触发 | _value: string_ |
| clear  | 点击清除按钮后触发 | _-_ |
| focus  | 输入框获得焦点时触发 | _value: string_ |
| submit  | 确定搜索时触发 | _value: string_ |

### Slots

| 名称       | 说明                                                      |
| ---------- | --------------------------------------------------------- |
| left       | 自定义左侧内容（搜索框外）                                |
| action     | 自定义右侧内容（搜索框外 |
| left-icon  | 自定义左侧图标（搜索框内）                                |
| right-icon | 自定义右侧图标（搜索框内）                                |


## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式)。uvue app无效。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --l-search-bg-color: | _$fill-3_ | - |
| --l-search-text-color: | _$text-color-1_ | - |
| --l-search-font-size: | _$font-size-md_ | - |
| --l-search-height: | _80rpx_ | - |
| --l-search-padding: | _16rpx 24rpx_ | - |
| --l-search-placeholder-color: | _$text-color-3_ | - |
| --l-search-icon-color: | _$text-color-4_ | - |
| --l-search-radius: | _99px_ | - |
| --l-search-action-color: | _$primary-color_ | - |
| --l-search-clear-icon-color: | _$text-color-4_ | - |

## 常见问题
插件包含一下[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)为收费插件。如果你不需要svg，可以在lime-icon里注释掉，lime-svg为APP原生插件，收费为1元，源码为5元。如果你需要svg，可以考虑一下购买。
```html
// lime-icon/components/l-icon.uvue 第4行 注释掉即可。
<!-- <l-svg class="l-icon" :class="classes" :style="styles" :color="color" :src="iconUrl" v-else :web="web" @error="imageError" @load="imageload" @click="$emit('click')"></l-svg> -->
```

## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)