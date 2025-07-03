# jview-ui
## 只测过微信小程序、app、app-nvue、h5、抖音小程序、支付宝小程序、钉钉小程序
## 样式警告可以先无视，不影响运行，tabbar还是使用原生吧，不然兼容性太差了
## 涉及到类似video层级过高或遇到样式问题时，请使用app-nvue
文档写不过来，可以自己看组件里的参数使用，很多参数都参考的uview，后续补上

## 组件说明
| 组件名 | 用途 | 兼容 |
| :----:| :----: | :----: |
| j-form | 表单组件 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-form-item | 表单j-form下的子组件 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-input| 表单输入框 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-picker| 底部弹窗滑动选择器 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-datetime| 时间日期选择器 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-calendar| 日历选择器 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-check-label| 互斥选择器 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-checkbox-group| 多选框 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-checkbox| 多选框子组件 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-radio-group| 单选框 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-radio| 单选框子组件 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-switch| 开关选择器 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-textarea| 多行输入框 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-slider| 滑动选择器 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-upload| 上传图片或视频组件 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-button| 按钮 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-popup| 底部弹出层 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-scroll-view| 下拉刷新上拉加载列表 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-empty| 空数据显示内容 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-icon| icon图标，参考uni-icon | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-loading| 加载中组件 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-loading-icon| 加载样式组件 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-navbar| 顶部导航栏 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-grid| 宫格布局 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-grid-item| 宫格布局子组件 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-safe-bottom| 底部安全间距 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-fixed-view| 浮动层 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-card| 卡片 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-cell| 单元格 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-slider-code| 图形拖拽验证码 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-tag| 状态标签 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-image| 图片 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-avatar| 头像 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-badge| 徽标数 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-collapse| 折叠面板 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-collapse-item| 折叠面板子组件 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-line| 线条 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-divider| 分割线 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-notice| 滚动通知 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-tabs| 标签 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-swiper| 轮播图 | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-preview| 预览图片和视频（兼容需新开页面单独使用） | h5、app-vue、app-nvue、微信、抖音、钉钉、支付宝小程序 |
| j-select| 下拉选择器 | h5、app-vue、微信、抖音、钉钉、支付宝小程序 |
| j-slider-scale| 卡尺滑动选择器 | h5、app-vue、微信、抖音、钉钉、支付宝小程序 |

# 引入
## pages.json中
```javascript
// vue2
"easycom": {
	"^j-(.*)": "@/uni_modules/jview-ui/components/j-$1/j-$1.vue"
}
// vue3
"easycom": {
	"custom": {
		"^j-(.*)": "@/uni_modules/jview-ui/components/j-$1/j-$1.vue"
	}
}
```

## uni.scss中
```javascript
@import "@/uni_modules/jview-ui/theme.scss";
```

## App.vue中
```javascript
<style lang="scss">
	@import "@/uni_modules/jview-ui/index.scss";
	...
</style>
```

## main.js中
```javascript
import jView from "@/uni_modules/jview-ui"

//vue2
import Vue from 'vue'
Vue.use(jView)

// vue3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App);
	app.use(jView);
  return {
    app
  }
}
```

## 现在只是基础的示例，可扫码查看（ios需要开通认证，抖音小程序需要企业资质，所以暂时没得）
<img src="https://cyj.lovewenqin.cn/static/rq/wx.png" >
<div style="color: #0366d6">微信小程序</div>
<img src="https://cyj.lovewenqin.cn/static/rq/zfb.png" >
<div style="color: #0366d6">支付宝小程序</div>
<img src="https://cyj.lovewenqin.cn/static/rq/android.png">
<div style="color: #0366d6">android app(请使用浏览器扫描)</div>