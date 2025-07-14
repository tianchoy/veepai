# lime-dialog 对话框
- 弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。支持组件调用和函数调用两种方式。
- 插件依赖`lime-shared`,`lime-style`,`lime-icon`,`lime-button`,`lime-popup`,不喜勿下

## 文档
[dialog](https://limex.qcoon.cn/components/dialog.html)

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

### 基础使用

通过`v-model`绑定是事展示对话框，通过`title`设置对话框标题，`content`设置是对话框内容，`confirm-btn`设置确认按钮或确认按钮所有属性,

```html
<l-dialog 
	v-model="visible" 
	title="对话框标题" 
	content="告知当前状态、信息等内容。描述文案尽可能控制在三行内"
	confirm-btn="知道了"
	@confirm="confirm">
</l-dialog>
<button @click="visible = true">基础使用</button>
```
```js
const visible = ref(false);
const confirm = () => {
	console.log('点击了确认按钮')
}
```


### 确认弹窗

`confirm-btn`和`cancel-btn`可以入[button](https://ext.dcloud.net.cn/plugin?id=20481)按钮所有属性,

```html
<l-dialog 
	v-model="visible"
	title="对话框标题"
	:cancel-btn="{ content: '取消', variant: 'text', size: 'large', type: 'default'}"
	:confirm-btn="{ content: '确认', variant: 'text', size: 'large'}"
	@confirm="confirm"
	@cancel="cancel">
	@confirm="confirm">
</l-dialog>
<button @click="visible = true">确认弹窗</button>
```
```js
const visible = ref(false);
const confirm = () => {
	console.log('点击了确认按钮')
}
const cancel = () => {
	console.log('点击了取消按钮')
}
```

### 通过插槽自定义内容
对话框提供了 默认插槽`default`、置顶插槽`top`、标题插槽`title`、中部`middle`、操作按钮`actions`、取消`cancel-btn`、确认`confirm-btn`
```html
<l-dialog  
	v-model="visible" 
	confirm-btn="知道了"
	@confirm="visible = false">
	<scroll-view type="list" scroll-y direction="vertical" style="height: 476rpx;">
	    <text>
		  这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	      这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
	    </text>
	  </scroll-view>
</l-dialog>
<button @click="visible2 = true">内容超长</button>
```


### 垂直按钮

`button-layout`设置为`vertical`可以高按钮组垂直布局

```html
<l-dialog 
	v-model="visible"
	title="对话框标题"
	content="告知当前状态、信息和解决方法"
	cancel-btn="取消"
	confirm-btn="确认"
	button-layout="vertical"
	@confirm="confirm"
	@cancel="cancel">
</l-dialog>
<button @click="visible = true">垂直按钮</button>
```


### 命令调用
通过调用组件内部方法可以达到灵活使用，例如异步关闭
```html
<l-dialog ref="dialogRef"></l-dialog>
<button @click="showDialog">命令调用</button>
```
```js
// 组合式API
const dialogRef = ref<LDialogComponentPublicInstance|null>(null)
const showDialog = () => {
	if(dialogRef.value == null) return
	dialogRef.value!.show({
		title: '弹窗标题',
		closeOnClickOverlay: true,
		buttonLayout: 'vertical',
		content: '告知当前状态、信息和解决方法等内容。',
		confirmBtn: '确定',
		cancelBtn: '取消',
		beforeClose: (action: string): Promise<boolean> => {
			console.log('action', action)
			return new Promise((resolve) => {
				setTimeout(() => {
					if (action == 'cancel') {
						resolve(true);
					} else {
						// 拦截取消操作
						resolve(false);
					}
				}, 1000);
			})
		}
	}).then((index)=>{
		console.log('点击了确定', index)
	}).catch(()=>{
		console.log('点击了取消')
	})
}
```


### 查看示例
- 导入后直接使用这个标签查看演示效果

```html
<!-- // 代码位于 uni_modules/lime-dialog/compoents/lime-dialog -->
<lime-dialog />
```


### 插件标签
- 默认 l-dialog 为 component
- 默认 lime-dialog 为 demo

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
| v-model | 是否显示对话框 | _boolean_ | `false` |
| visible | 是否显示对话框 | _boolean_ | `false` |
| actions | 操作栏 | _object[]_ | `` |
| cancelBtn |  取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 Slot 自定义按钮时，需自行控制取消事件 | _string\|UTSJSONObject_ | `` |
| confirmBtn |  确认按钮，可自定义。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 Slot 自定义按钮时，需自行控制确认事件 | _string\|UTSJSONObject_ | `` |
| closeBtn |  是否显示右上角关闭按钮 | _boolean_ | `false` |
| closeOnClickOverlay |  点击蒙层时是否触发关闭事件 | _boolean_ | `true` |
| buttonLayout |多按钮排列方式，可选值为 `horizontal` `vertical`| _string_ | `horizontal` |
| title |  标题 | _string_ | `` |
| content |  内容 | _string_ | `` |
| overlayStyle |  透传至 Overlay 组件样式 | _string_ | `` |
| lStyle |  自定义组件样式 | _string_ | `` |
| overlay |  是否显示遮罩层 | _boolean_ | `true` |
| preventScrollThrough |  防止滚动穿透 | _boolean_ | `true` |
| z-index | 将弹窗的 z-index 层级设置为一个固定值 | _number_ | `888` |

### Events
小程序自带的事件不一一例举
| 事件名           | 说明                       | 回调参数            |
| ---------------- | -------------------------- | ------------------- |
| action    | 点击actions按钮触发           | - |
| confirm    | 点击确认按钮触发           | - |
| cancel    | 点击取消按钮触发           | - |
| click    | 点击触发           | - |

### Slots

| 名称            | 说明         |
| --------------- | ------------ |
| default         | 弹窗内容     |
| confirm-btn | 确认按钮 |
| cancel-btn | 取消按钮 |
| actions | 按钮组 |
| middle | 中间 |
| title | 标题 |
| top | 顶部 |



## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，uvue app无效。

| 名称                           | 默认值                               | 描述 |
| ------------------------------ | ------------------------------------ | ---- |
| --l-dialog-width         | _642rpx_            | -    |
| --l-dialog-body-max-height         | _912rpx_            | -    |
| --l-dialog-title-font-size        | _36rpx_            | -    |
| --l-dialog-title-line-height        | _52rpx_            | -    |
| --l-dialog-content-font-size        | _32rpx_            | -    |
| --l-dialog-content-color        | _$text-color-2_            | -    |
| --l-dialog-content-line-height        | _48rpx_            | -    |
| --l-dialog-close-color        | _$text-color-3_            | -    |
| --l-dialog-bg-color       | _$bg-color-container_            | -    |

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