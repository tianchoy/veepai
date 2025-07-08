export * from './interface'
import {SetClipboardDataOption, GetClipboardDataOption} from './interface'
/**
 * 设置系统剪贴板的内容
 *
 * 文档: [http://uniapp.dcloud.io/api/system/clipboard?id=setclipboarddata](http://uniapp.dcloud.io/api/system/clipboard?id=setclipboarddata)
 */
export function setClipboardData(options : SetClipboardDataOption) {
	uni.setClipboardData(options as  UniNamespace.SetClipboardDataOptions)
}

/**
 * 获得系统剪贴板的内容
 *
 * 文档: [http://uniapp.dcloud.io/api/system/clipboard?id=getclipboarddata](http://uniapp.dcloud.io/api/system/clipboard?id=getclipboarddata)
 */
export function getClipboardData(options : GetClipboardDataOption) {
	uni.getClipboardData(options as UniNamespace.GetClipboardDataOptions)
}