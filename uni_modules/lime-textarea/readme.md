# lime-textarea 多行文本框
- 多行文本框用于多行文本信息输入, 兼容uniapp/uniappx
- 插件依赖`lime-shared`,`lime-style`不喜勿下

## 安装
插件市场导入即可，首次导入可能需要重新编译

## 文档
[textarea](https://limex.qcoon.cn/components/textarea.html)

## 代码演示
### 基础使用
通过`v-model`双向绑定，或通过`change`事件接收输入文本
```html
<l-textarea v-model="value" placeholder="请输入文字" @change="change"></l-textarea>
```
```js
const value = ref('');
const change = (value: string) => {
	
}
```

### 带标题
通过`label`属性设置标题
```html
<l-textarea label="标签文字" placeholder="请输入文字"></l-textarea>
```

### 自动增高
通过`autosize`设置为`true`为自动增高，uniappx 鸿蒙next不支持
```html
<l-textarea label="标签文字" placeholder="请输入文字" :autosize="true"></l-textarea>
```

### 字符限制
通过`maxlength`设置最大文本字数，通过`indicator`设置为`true`可显示字数
```html
<l-textarea label="标签文字" placeholder="请输入文字"  :maxlength="500" :indicator="true"></l-textarea>
```

### 禁用
通过`disabled`设置可禁止输入
```html
<l-textarea label="标签文字" placeholder="请输入文字" :disabled="true"></l-textarea>
```

### 竖排布局
通过`layout`可设置布局方向
```html
<l-textarea label="标签文字" placeholder="请输入文字" layout="vertical"></l-textarea>
```



### 查看示例
- 导入后直接使用这个标签查看演示效果

```html
<!-- // 代码位于 uni_modules/lime-textarea/compoents/lime-textarea -->
<lime-textarea />
```


### 插件标签
- 默认 l-textarea 为 component
- 默认 lime-textarea 为 demo

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
| v-model | 文本 | _string_ | `` |
| value | 文本 | _string_ | `` |
| adjustPosition | 键盘弹起时，是否自动上推页面 | _boolean_ | `true` |
| autofocus |  自动聚焦，拉起键盘 | _boolean_ | `false` |
| autosize | 是否自动增高 | _boolean_ | `false` |
| bordered | 是否有边框模式 | _boolean_ | `true` |
| disabled | 是否禁用文本框 | _boolean_ | `false` |
| readonly | 只读 | _boolean_ | `false` |
| focus | 自动聚焦 | _boolean_ | `false` |
| holdKeyboard | focus时，点击页面的时候不收起键盘 | _boolean_ | `false` |
| indicator | 显示文本计数器 | _boolean_ | `false` |
| showConfirmBar | 是否显示键盘上方带有”完成“按钮那一栏 | _boolean_ | `true` |
| fixed | 如果 textarea 是在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true | _boolean_ | `false` |
| confirmHold | 点击键盘右下角按钮时是否保持键盘不收起点 | _boolean_ | `false` |
| confirmType | 设置键盘右下角按钮的文字[可参考](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) | _string_ | `return` |
| cursor |指定 focus 时的光标位置 | _number_ | `-1` |
| cursorSpacing |指定光标与键盘的距离 | _number_ | `0` |
| maxlength |用户最多可以输入的字符个数，值为 -1 | _number_ | `-1` |
| selectionEnd | 光标结束位置，自动聚集时有效| _number_ | `-1` |
| selectionStart |  光标起始位置，自动聚集时有效| _number_ | `-1` |
| placeholder | 占位符 | _string_ | - |
| layout | 标题输入框布局方式，可选值`'vertical' 'horizontal'` | _string_ | `horizontal` |
| placeholderStyle | 指定 placeholder 的样式 | _string_ | - |
| lStyle | 自定义样式 | _string_ | - |
| labelStyle | 标签样式 | _string_ | - |
| indicatorStyle | 计数器样式 | _string_ | - |
| innerStyle | 内部textarea样式 | _string_ | `` |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| label | 标题 |

### Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| change  | 输入内容变化时触发     | _value:string_ |
| blur  | 失去焦点时触发 | _event: UniTextareaBlurEvent_ |
| focus  | 获得焦点时触发 | _event: UniTextareaFocusEvent_ |
| keyboardheightchange  | 获得焦点时触发 | _event:UniInputKeyboardHeightChangeEvent_ |
| linechange  | 行高发生变化时触发 | _event: UniTextareaLineChangeEvent_ |
| confirm  | 点击完成时触发 | _event: UniInputConfirmEvent_ |



## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，uvue app不支持。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --l-textarea-vertical-padding | _32rpx_ | - |
| --l-textarea-horizontal-padding | _32rpx_ | - |
| --l-textarea-text-line-height | _48rpx_ | - |
| --l-textarea-label-line-height | _44rpx_ | - |
| --l-textarea-label-width | _128rpx_ | - |
| --l-textarea-label-padding-right | _$spacer_ | - |
| --l-textarea-label-padding-bottom | _$spacer-xs_ | - |
| --l-textarea-indicator-text-line-height | _40rpx_ | - |
| --l-textarea-indicator-text-padding-top | _$spacer-xs_ | - |
| --l-textarea-indicator-text-align | _right_ | - |
| --l-textarea-border-width | _2rpx_ | - |
| --l-textarea-indicator-text-font-size | _$spacer-sm_ | - |
| --l-textarea-label-font-size | _14px_ | - |
| --l-textarea-label-large-font-size | _16px_ | - |
| --l-textarea-text-font-size | _16px_ | - |
| --l-textarea-placeholder-font-size | _16px_ | - |
| --l-textarea-bg-color | _$bg-color-container_ | - |
| --l-textarea-placeholder-color | _$text-color-3_ | - |
| --l-textarea-text-color | _$text-color-1_ | - |
| --l-textarea-label-color | _$text-color-1_ | - |
| --l-textarea-indicator-text-color | _$text-color-3_ | - |
| --l-textarea-border-radius | _$border-radius_ | - |
| --l-textarea-border-color | _$border-color-1_ | - |
| --l-textarea-disabled-text-color | _$text-color-4_ | - |



## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)