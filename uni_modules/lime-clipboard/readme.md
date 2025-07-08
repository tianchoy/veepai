# lime-clipboard
- 参考小程序`setClipboardData`和`getClipboardData`实现的UTS API，支持uniappX(web,ios,安卓)


## 安装
插件市场导入即可

## 使用
使用方法跟小程序的一样
```ts
import {setClipboardData, getClipboardData, SetClipboardDataOption, GetClipboardDataOption, GetClipboardDataSuccessCallbackOption} from '@/uni_modules/lime-clipboard'


setClipboardData({
	data: '这里是內容',
	success(res){
		console.log('res', res.errMsg)
	}
} as SetClipboardDataOption)

getClipboardData({
	success(res: GetClipboardDataSuccessCallbackOption){
		console.log('res', res)
	}
} as GetClipboardDataOption)
```


## API
因为直接参照小程序`setClipboardData`和`getClipboardData`API，所以可以直接按[clipboard](https://uniapp.dcloud.net.cn/api/system/clipboard.html)文档来