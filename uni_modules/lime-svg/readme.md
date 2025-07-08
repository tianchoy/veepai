# lime-svg 矢量图标
- lime-svg 是一款UTS实现的原生图标插件,支持uniapp/uniappX

## 文档
[svg](https://limex.qcoon.cn/components/svg.html)

## 安装
在插件市场导入,由于普通授权版无法自定义基座。请如需使用请购买源码版。或按下面使用提示的第三点操作免费使用.

## 使用
- 安卓和ios提供基于`原生插件`和`webview`两渲染机制,如果使用`原生插件`则需要`自定义基座`再使用.
- 原生插件实现的不支持动画,如果需要动画请选择`webview`
- 如果你不是`app`或`app`只使用`webview`渲染,也可以删除插件目录里的`utssdk`和`encrypt`这样就可以避免自定义基座免费使用.

### 路径
通过设置`src`来加载svg图标,支持本地\网络\源文本\base64等方式

```html
<l-svg style="width: 150rpx;height: 150rpx;" src="/static/svg/a.svg"></l-svg>
<l-svg style="width: 150rpx;height: 150rpx;" src="https://www.xmplus.cn/uploads/images/20221228/b9e9d45054ab5795992a1e92584a278b.svg"></l-svg>
<l-svg style="width: 150rpx;height: 150rpx;" src='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 15h1.5V9H5v1.5h1zm2.5 0H13V9H8.5zm1.5-1.5v-3h1.5v3zm4 1.5h1.5v-2.25L17.25 15H19l-2.25-3L19 9h-1.75l-1.75 2.25V9H14zM3 21V3h18v18z"/></svg>'></l-svg>
<l-svg style="width: 150rpx;height: 150rpx;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTVoMS41VjlINXYxLjVoMXptMi41IDBIMTNWOUg4LjV6bTEuNS0xLjV2LTNoMS41djN6bTQgMS41aDEuNXYtMi4yNUwxNy4yNSAxNUgxOWwtMi4yNS0zTDE5IDloLTEuNzVsLTEuNzUgMi4yNVY5SDE0ek0zIDIxVjNoMTh2MTh6Ii8+PC9zdmc+"></l-svg>
```


### 颜色
通过设置`color`来改变svg图标颜色,只支持svg是纯色图标,多色无效.

```html
<l-svg style="width: 150rpx;height: 150rpx;" color="red" src='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 15h1.5V9H5v1.5h1zm2.5 0H13V9H8.5zm1.5-1.5v-3h1.5v3zm4 1.5h1.5v-2.25L17.25 15H19l-2.25-3L19 9h-1.75l-1.75 2.25V9H14zM3 21V3h18v18z"/></svg>'></l-svg>
<l-svg style="width: 150rpx;height: 150rpx;" color="red" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTVoMS41VjlINXYxLjVoMXptMi41IDBIMTNWOUg4LjV6bTEuNS0xLjV2LTNoMS41djN6bTQgMS41aDEuNXYtMi4yNUwxNy4yNSAxNUgxOWwtMi4yNS0zTDE5IDloLTEuNzVsLTEuNzUgMi4yNVY5SDE0ek0zIDIxVjNoMTh2MTh6Ii8+PC9zdmc+"></l-svg>
```

### webview
通过设置`:web="true"`使用`webview`渲染

```html
<l-svg style="width: 150rpx;height: 150rpx;" :web="true" src='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 15h1.5V9H5v1.5h1zm2.5 0H13V9H8.5zm1.5-1.5v-3h1.5v3zm4 1.5h1.5v-2.25L17.25 15H19l-2.25-3L19 9h-1.75l-1.75 2.25V9H14zM3 21V3h18v18z"/></svg>'></l-svg>
<l-svg style="width: 150rpx;height: 150rpx;" :web="true" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTVoMS41VjlINXYxLjVoMXptMi41IDBIMTNWOUg4LjV6bTEuNS0xLjV2LTNoMS41djN6bTQgMS41aDEuNXYtMi4yNUwxNy4yNSAxNUgxOWwtMi4yNS0zTDE5IDloLTEuNzVsLTEuNzUgMi4yNVY5SDE0ek0zIDIxVjNoMTh2MTh6Ii8+PC9zdmc+"></l-svg>
```



### 插件标签
- 默认 l-svg 为 component
- 默认 lime-svg 为 demo
- 
### 关于vue2的使用方式
- 插件使用了`composition-api`, 如果你希望在vue2中使用请按官方的教程[vue-composition-api](https://uniapp.dcloud.net.cn/tutorial/vue-composition-api.html)配置
- 关键代码是: 在main.js中 在vue2部分加上这一段即可.

```js
// vue2
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
```



## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)