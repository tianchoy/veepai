# lime-popup 弹出层
- 弹出层容器，用于展示弹窗、信息提示等内容,兼容uniapp/uniappx
- 插件依赖`lime-style`,`lime-shared`,`lime-overlay`,`lime-transition`,`lime-icon`，lime-svg 为收费，若不需要svg，可以在代码里注释掉即可

## 安装
插件市场导入即可，首次导入可能需要重新编译

**注意** 
* 🔔 本插件依赖的[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)在 uniapp x app中是原生插件，如果购买(收费为5元)则需要自定义基座，才能使用！uniapp可忽略。
* 🔔 如果不需要[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)在lime-icon代码中注释掉即可

```html
// lime-icon/components/l-icon.uvue 第4行 注释掉即可。
<!-- <l-svg class="l-icon" :class="classes" :style="styles" :color="color" :src="iconUrl" v-else :web="web" @error="imageError" @load="imageload" @click="$emit('click')"></l-svg> -->
```

## 代码演示
### 基础用法

通过 `v-model` 控制弹出层是否展示。

```html
<button @click="show = true">展示弹出层</button>
<l-popup v-model="show">
	<view style="padding: 100px;"></view>
</l-popup>
```

```js
 const show = ref(false);
```


### 弹出位置

通过 `position` 属性设置弹窗的弹出位置，默认为居中弹出，可以设置为 `top`、`bottom`、`left`、`right`、`center`。

- 当弹窗从顶部或底部弹出时，默认宽度与屏幕宽度保持一致，弹窗高度取决于内容的高度。
- 当弹窗从左侧或右侧弹出时，默认不设置宽度和高度，弹窗的宽高取决于内容的宽高。

```html
<!-- 顶部弹出 -->
<l-popup v-model"showTop" position="top">
	<view style="padding: 100px;"></view>
</l-popup>
<!-- 左边弹出 -->
<l-popup v-model"showTop" position="left">
	<view style="padding: 100px;"></view>
</l-popup>
<!-- 底部弹出 -->
<l-popup v-model"showTop" position="bottom">
	<view style="padding: 100px;"></view>
</l-popup>
<!-- 右边弹出 -->
<l-popup v-model"showTop" position="right">
	<view style="padding: 100px;"></view>
</l-popup>
```

### 关闭图标

设置 `closeable` 属性后，会在弹出层的右上角显示关闭图标，并且可以通过 `close-icon` 属性自定义图标。

```html
<l-popup v-model"showTop" :closeable="true">
	<view style="padding: 100px;"></view>
</l-popup>
```



### 监听点击事件

Popup 支持以下点击事件：

- `click-overlay`: 点击遮罩层时触发。
- `click-close`: 点击关闭图标时触发。

```html
<button @click="show = true">展示弹出层</button>
<l-popup
  v-model"show"
  position="bottom"
  :closeable="true"
  @click-overlay="onClickOverlay"
  @click-close="onClickClose"
/>
```

```js
const onClickOverlay = () => {
    console.log('click-overlay');
};
const onClickClose = () => {
    console.log('click-close');
};
```

### 监听显示事件

当 Popup 被打开或关闭时，会触发以下事件：

- `open`: 打开弹出层时立即触发。
- `opened`: 打开弹出层且动画结束后触发。
- `close`: 关闭弹出层时立即触发。
- `closed`: 关闭弹出层且动画结束后触发。

```html
<button @click="show = true">展示弹出层</button>
<l-popup
  v-model="show"
  position="bottom"
  @open="handlePopupOpen"
  @opened="handlePopupOpened("
  @close="handlePopupClose"
  @closed="handlePopupClosed"
/>
```

```js
const show = ref(false);
 const handlePopupOpen = () => {
    // 处理弹出框打开前的逻辑
}
 const handlePopupOpened = () => {
    // 处理弹出框打开后的逻辑
}
 const handlePopupClose = () => {
    // 处理弹出框关闭前的逻辑
}
const  handlePopupClosed = () => {
    // 处理弹出框关闭后的逻辑
}
```

### 查看示例
- 导入后直接使用这个标签查看演示效果

```html
<!-- // 代码位于 uni_modules/lime-popup/compoents/lime-popup -->
<lime-popup />
```


### 插件标签
- 默认 l-popup 为 component
- 默认 lime-popup 为 demo

### 关于vue2的使用方式
- 插件使用了`composition-api`, 如果你希望在vue2中使用请按官方的教程[vue-composition-api](https://uniapp.dcloud.net.cn/tutorial/vue-composition-api.html)配置
- 关键代码是: 在main.js中 在vue2部分加上这一段即可
```js
// vue2
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
```


## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示弹出层 | _boolean_ | `false` |
| overlay | 是否显示遮罩层 | _boolean_ | `true` |
| position | 弹出位置，可选值为 `top` `bottom` `right` `left` | _string_ | `center` |
| duration | 动画时长，单位毫秒，设置为 0 可以禁用动画 | _number_ | `300` |
| z-index | 将弹窗的 z-index 层级设置为一个固定值 | _number_ | `999` |
| preventScrollThrough | 是否锁定背景滚动 | _boolean_ | `true` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭 | _boolean_ | `true` |
| destroyOnClose | 关闭后是否销毁 | _boolean_ | `false` |
| closeable | 是否显示关闭图标 | _boolean_ | `false` |
| closeIcon | 关闭图标名称或图片链接，等同于 Icon 组件的 [name 属性](https://ext.dcloud.net.cn/plugin?id=14057) | _string_ | `cross` |
| bgColor | 背景色 | _string_ | `-` |
| iconColor | 图标色 | _string_ | `-` |
| lStyle | 自定义样式 | _string\|object_ | `-` |
| radius | 圆角，可以是字符，数值，数组 | _string\|number\|Array\<string\|number\>_ | `-` |

### Events

| 事件名           | 说明                       | 回调参数            |
| ---------------- | -------------------------- | ------------------- |
| click-overlay    | 点击遮罩层时触发           | - |
| click-close | 点击关闭图标时触发         | - |
| open             | 打开弹出层时立即触发       | -                   |
| close            | 关闭弹出层时立即触发       | -                   |
| opened           | 打开弹出层且动画结束后触发 | -                   |
| closed           | 关闭弹出层且动画结束后触发 | -                   |

### Slots

| 名称            | 说明         |
| --------------- | ------------ |
| default         | 弹窗内容     |
| close-btn | 关闭按钮 |



## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，uvue app无效。

| 名称                           | 默认值                               | 描述 |
| ------------------------------ | ------------------------------------ | ---- |
| --l-popup-bg-color         | _#fff_            | -    |
| --l-popup-close-icon-color         | _rgba(0,0,0,0.6)_            | -    |
| --l-popup-border-radius        | _$border-radius_            | -    |


## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)