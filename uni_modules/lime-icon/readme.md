# lime-icon 图标
- 方便快捷的使用[iconify](https://iconify.design/)图标集合。超过150,000个开源矢量图标。
- 插件依赖的`lime-svg`为收费，若不需要svg，可以在代码里注释掉即可

## 文档
 🚀 [icon【站点1】](https://limex.qcoon.cn/components/icon.html)
 🌍 [icon【站点2】](https://limeui.netlify.app/components/icon.html)
 🔥 [icon【站点3】](https://limeui.familyzone.top/components/icon.html)


## 安装
插件市场导入本插件即可。首次导入可能使用重新编译。

**注意** 
* 🔔 本插件依赖的[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)在 uniapp x app中是原生插件，如果购买(收费为5元)则需要自定义基座，才能使用！uniapp可忽略。
* 🔔 不需要[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)在lime-icon代码中注释掉即可

```html
// lime-icon/components/l-icon.uvue 第4行 注释掉即可。
<!-- <l-svg class="l-icon" :class="classes" :style="styles" :color="color" :src="iconUrl" v-else :web="web" @error="imageError" @load="imageload" @click="$emit('click')"></l-svg> -->
```

## 使用

### 使用默认
插件默认内置了[tdesign icon](https://icones.js.org/collection/tdesign)，不需要加`tdesign`前缀

```html
<l-icon name="circle" />
```

### 使用iconify
到 [icones](https://icones.js.org/) 网站找到需要的图标,通过 `name` 属性来指定需要使用的图标

由于`uniapp x app`端使用了原生的[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)插件，这个插件是收费的，请慎重考虑，也可以按[lime-svg](https://ext.dcloud.net.cn/plugin?id=18519)使用的第三点操作可免费使用。。

![](https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/263cfd20-39e6-11ee-b4f0-9bc760224a38_1.png?1735701321)
![](https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/263cfd20-39e6-11ee-b4f0-9bc760224a38_2.png?1735701324)

```html
<l-icon name="ri:account-box-fill" />
```

### 使用图标URL
```html
<l-icon name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png"></l-icon>
```

### 图标颜色
通过 `color` 属性来设置图标的颜色。

```html
<l-icon name="ri:aliens-fill" color="#1989fa" />
<l-icon name="icon-park-outline:acoustic" color="#ee0a24" />
```

### 图标大小

通过 `size` 属性来设置图标的尺寸大小，可以指定任意 CSS 单位。

```html
<!-- 不指定单位，默认使用 px -->
<l-icon name="ri:aliens-fill" size="40" />
<!-- 指定使用 rpx 单位 -->
<l-icon name="ri:aliens-fill" size="34rpx" />
```


### 自定义图标
通过`prefix`设置iconfot图标类，通过`name`传入`Unicode`字符
```html
<l-icon size="30px" prefix="keyicon" :name="`\uE6EF`" color="blue"></l-icon>
```
```css
@font-face {
	font-family: keyicon;
	src: url('https://at.alicdn.com/t/c/font_4741157_ul7wcp52yys.ttf');
}
.keyicon {
	font-family: keyicon;
}
```

## 私有化iconify
默认会使用`iconify`的API，如果你想私有化可按以下步骤来
### 第一步 安装

```cmd
yarn add @iconify/json @iconify/tools @iconify/utils
```
### 第二步 配置
- 需要在根目录新建一个`lime-icons.config.js`文件

```
// 在根目录新建一个lime-icons.config.js文件
// lime-icons.config.js
module.exports = {
	// 输入的文件目录，自有的SVG，如果没有则不需要
	input: {
		prefix: "my-icons",
		dir: '/static/svg',
	},
	// 输出的配置
	output: {
		// 输出的文件目录
		dir: '/static/icons',
		// 输出的文件的格式，如果是JSON则是一个图标合集
		// file: 'icons.json',
		// 如果是SVG则是每个图标做为单独的文件
		file: '*.svg',
	},
	// 指定使用的图标
	icons: [
		'el:address-book', 
		'uil:12-plus',
		'icon-park-outline:abdominal',
		'icon-park-outline:acoustic'
	]
}
```
在终端执行脚本
```
node ./uni_modules/lime-icon/generate-icons.js
```

### ~~2、自动引入~~
~~如果使用的是`vue3`，通过配置 `vite.config.js` 达到自动引入~~
这个方法作废，因有些图标是动态的，在编译阶段不知道图标的名称无法捕获
```js
import uni from '@dcloudio/vite-plugin-uni';
import limeIcon from './uni_modules/lime-icon/vite-plugin';
import path from 'path'
export default defineConfig({
    plugins: [uni(), limeIcon({
        // 输出的配置
        output: {
            // 输出的文件目录
            dir: path.join(__dirname, '/static/icons'),
            // 输出的文件的格式，如果是JSON则是生成一个图标合集， 例如： /static/icons/icons.json
            // file: 'icons.json',
            // 如果是SVG则是每个图标做为单独的文件 例如： /static/icons/xx/xxx.svg
            file: '*.svg',
        },
        // 可选
        icons: []
    })]
})
```



### 第三步 挂载图标地址
如果使用内置的`icon (tdesign icons)`或不私有化`iconify`则不需要进行这一步

**注意,如果使用了`iconify` 的API, 小程序需要去公众平台设置下载白名单 `https://api.iconify.design`**
```js
// main.js | main.ts | main.uts
// 配置svg指定路径，后期可上传到后端，不占用本地空间，如果使用的是`iconify`也可以不配置这一步
import {limeIcons} from '@/uni_modules/lime-icon'

// 第一个参数是icon host地址，没有则填null
// 第二个参数是icons json合集，没有则填null
// app.use(limeIcons, null, null)

// 示例1 配置icons地址
app.use(limeIcons, 'https://xxx.cn/static/icons', null)

// 示例2 配置icons集合json
import icons from './static/icons/icons.json'
app.use(limeIcons, null, icons)
```


### 关于vue2的使用方式
- 插件使用了`composition-api`, 如果你希望在vue2中使用请按官方的教程[vue-composition-api](https://uniapp.dcloud.net.cn/tutorial/vue-composition-api.html)配置
- 关键代码是: 在main.js中 在vue2部分加上这一段即可

```js
// vue2
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

// 配置svg指定路径，后期可上传到后端，不占用本地空间，如果使用的是`iconify`也可以不配置这一步
import {limeIcons} from '@/uni_modules/lime-icon'

Vue.use(VueCompositionAPI)

// 示例1 配置icons地址
Vue.use(limeIcons, ['https://xxx.cn/static/icons', null])

// 示例2 配置icons集合json
import icons from './static/icons/icons.json'
Vue.use(limeIcons, [null, icons])

```



## API

### Props

| 参数                       | 说明                                                         | 类型             | 默认值       |
| --------------------------| ------------------------------------------------------------ | ---------------- | ------------ |
| name                      | 图标名称                                                      | <em>string</em>  | ``     |
| color                     | 颜色                                   | <em>string</em>  | ``     |
| size                     | 尺寸                         | <em>string</em>  | `square`     |
| prefix                   | 字体图标前缀                                 | <em>string</em>  | ``     |
| inherit                  | 是否继承颜色                          | <em>boolean</em>  | `true`     |
| web                  | 原生`app(nvue,uvue)`是否使用web渲染                          | <em>boolean</em>  | `false`     |

### Events
| 参数                       | 说明                                                         | 参数             | 
| --------------------------| ------------------------------------------------------------ | ---------------- |
| click              		| 点击  |  | 


## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)