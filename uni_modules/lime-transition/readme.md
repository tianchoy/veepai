# lime-transition 动画
- 使元素从一种样式逐渐变化为另一种样式的效果，兼容uniapp/uniappx
- 这个插件不直接使用标签

## 文档
[transition](https://limex.qcoon.cn/components/transition.html)


## 安装
在插件市场导入即可

## 代码演示
### 基础使用
将元素包裹在 transition 组件内，在元素展示/隐藏时，会有相应的过渡动画。
```html
<l-transition :visible="true" :appear="true">
	<view class="box1">内容</view>
</l-transition>
```

### 动画类型
transition 组件内置了多种动画，可以通过`name`字段指定动画类型。
```html
<l-transition :visible="true" :appear="true" name="fade-up">
	<view class="box1">内容</view>
</l-transition>
```


### 查看示例
- 导入后直接使用这个标签查看演示效果

```html
 // 代码位于 uni_modules/lime-transition/compoents/lime-transition 
<lime-transition />
```

### 插件标签
- 默认 l-transition 为 component
- 默认 lime-transition 为 demo



### 关于vue2的使用方式
- 插件使用了`composition-api`, 如果你希望在vue2中使用请按官方的教程[vue-composition-api](https://uniapp.dcloud.net.cn/tutorial/vue-composition-api.html)配置
- 关键代码是: 在main.js中 在vue2部分加上这一段即可

```js
// main.js vue2
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
```

## API

### Props

| 参数         | 说明                 | 类型               | 默认值 |
| ------------ | -------------------- | ------------------ | ------ |
| name         | 动画类型             | _string_           | `fade` |
| visible         | 是否展示组件         | _boolean_          | `true` |
| appear         | 首次出现是否展示动画         | _boolean_          | `false` |
| destoryOnClose   | 隐藏时是否销毁内容         | _boolean_          | `false` |
| duration     | 动画时长，单位为毫秒 | _number_ | `300`  |
| zIndex     | 层级 | _number_ | `11000`  |
| l-style | 自定义样式           | _string_           | -      |

### Events

| 事件名            | 说明       | 参数 |
| ----------------- | ---------- | ---- |
| before-enter | 进入前触发 | -    |
| enter        | 进入中触发 | -    |
| after-enter  | 进入后触发 | -    |
| before-leave | 离开前触发 | -    |
| leave        | 离开中触发 | -    |
| after-leave  | 离开后触发 | -    |

### 外部样式类
由于小程序的限制，只能在全局样式设置

| 类名 | 说明 |
| --- | --- |
| l-class | 根节点样式类 |
| enter-class | 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。 |
| enter-active-class | 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。 |
| enter-to-class | 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。 |
| leave-class | 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。 |
| leave-active-class | 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。 |
| leave-to-class | 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。 |

### 动画类型

| 名称        | 说明     |
| ----------- | -------- |
| fade        | 淡入     |
| fade-up     | 上滑淡入 |
| fade-down   | 下滑淡入 |
| fade-left   | 左滑淡入 |
| fade-right  | 右滑淡入 |
| slide-up    | 上滑进入 |
| slide-down  | 下滑进入 |
| slide-left  | 左滑进入 |
| slide-right | 右滑进入 |


## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)