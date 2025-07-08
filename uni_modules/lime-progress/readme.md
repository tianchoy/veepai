# lime-progress 进度条
- 用于展示操作的当前进度。支持设置线条/颜色等个性设置。uniappx app 安卓端基于drawble实现，兼容uniapp/uniappx。


## 安装
插件市场导入即可,首次导入可能需要重新编译。

## 文档
[progress](https://limex.qcoon.cn/components/progress.html)

## 代码演示

### 基础

进度条默认为蓝色，使用 `percent` 属性来设置当前进度。。

```html
<l-progress :percent="percent"></l-progress>
```

### 显示百分比

通过设置 `show-info`，显示当前数值 。

```html
<l-progress :percent="percent" :show-info="true"></l-progress>
```

### 改变进度数值位置

通过设置 `info-type`，显示当前数值在内部还是外部`inner | outer`, 默认为 `outer`。通过设置 `info-align`，显示当前数值对齐位置是在前方还是后方`end | start`,默认是`end`。

```html
<l-progress :percent="percent" info-type="inner" info-align="start" :show-info="true" info-color="white"></l-progress>
<l-progress :percent="percent" info-align="start" :show-info="true"></l-progress>
<l-progress :percent="percent" info-align="end" :show-info="true"></l-progress>
```


### 颜色

通过 `strokeColor` 设置进度条的颜色。通过 `trailColor` 设置进度条的背景色。

```html
<l-progress :percent="percent" strokeColor="#7232dd"></l-progress>
<l-progress :percent="percent" strokeColor="#7232dd" info-type="inner" info-align="end" :show-info="true" info-color="white" ></l-progress>
```




### 查看示例
- 导入后直接使用这个标签查看演示效果

```html
<!-- // 代码位于 uni_modules/lime-progress/compoents/lime-progress -->
<lime-progress />
```


### 插件标签
- 默认 l-progress 为 component
- 默认 lime-progress 为 demo

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
| percent | 百分比 | _number_ | - |
| showInfo | 显示当前进度 | _Boolean_ | `false` |
| strokeColor | 进度条颜色 | _string_ | `#1677ff` |
| strokeWidth | 进度条线宽 | _number \| string_ | `4px` |
| trailColor | 进度条背景色 | _string_ | `rgba(0, 0, 0, 0.06)` |
| infoAlign | 进度值对齐，可选`start` | _string_ | `end` |
| infoType | 进度值显示位置，可选`inner` | _string_ | `outer` |
| fontSize | 进度值字体大小  | _number \| string_ | `-` |
| infoColor | 进度值文本颜色  | _string_ | `black` |



## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)