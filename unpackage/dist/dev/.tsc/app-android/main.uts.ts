import '/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-console/src/runtime/app/index.ts';import App from './App.uvue'

import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
export function main(app: IApp) {
    definePageRoutes();
    defineAppConfig();
    (createApp()['app'] as VueApp).mount(app, GenUniApp());
}

export class UniAppConfig extends io.dcloud.uniapp.appframe.AppConfig {
    override name: string = "veepai"
    override appid: string = "__UNI__1F0985E"
    override versionName: string = "1.0.0"
    override versionCode: string = "100"
    override uniCompilerVersion: string = "4.66"
    
    constructor() { super() }
}

import GenPagesIndexIndexClass from './pages/index/index.uvue?type=page'
import GenPagesMessageMessageClass from './pages/message/message.uvue?type=page'
import GenPagesMineMineClass from './pages/mine/mine.uvue?type=page'
function definePageRoutes() {
__uniRoutes.push({ path: "pages/index/index", component: GenPagesIndexIndexClass, meta: { isQuit: true } as UniPageMeta, style: utsMapOf([["navigationStyle","custom"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/message/message", component: GenPagesMessageMessageClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationStyle","custom"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/mine", component: GenPagesMineMineClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationStyle","custom"]]) } as UniPageRoute)
}
const __uniTabBar: Map<string, any | null> | null = utsMapOf([["list",[utsMapOf([["pagePath","pages/index/index"],["iconPath","./static/tabbar/home.png"],["selectedIconPath","./static/tabbar/home1.png"],["text","首页"]]),utsMapOf([["pagePath","pages/message/message"],["iconPath","./static/tabbar/message.png"],["selectedIconPath","./static/tabbar/message1.png"],["text","消息"]]),utsMapOf([["pagePath","pages/mine/mine"],["iconPath","./static/tabbar/userCenter.png"],["selectedIconPath","./static/tabbar/userCenter1.png"],["text","我的"]])]]])
const __uniLaunchPage: Map<string, any | null> = utsMapOf([["url","pages/index/index"],["style",utsMapOf([["navigationStyle","custom"]])]])
function defineAppConfig(){
  __uniConfig.entryPagePath = '/pages/index/index'
  __uniConfig.globalStyle = utsMapOf([["navigationBarTextStyle","black"],["navigationBarTitleText",""],["navigationBarBackgroundColor","#F8F8F8"],["backgroundColor","#F8F8F8"]])
  __uniConfig.getTabBarConfig = ():Map<string, any> | null =>  utsMapOf([["list",[utsMapOf([["pagePath","pages/index/index"],["iconPath","./static/tabbar/home.png"],["selectedIconPath","./static/tabbar/home1.png"],["text","首页"]]),utsMapOf([["pagePath","pages/message/message"],["iconPath","./static/tabbar/message.png"],["selectedIconPath","./static/tabbar/message1.png"],["text","消息"]]),utsMapOf([["pagePath","pages/mine/mine"],["iconPath","./static/tabbar/userCenter.png"],["selectedIconPath","./static/tabbar/userCenter1.png"],["text","我的"]])]]])
  __uniConfig.tabBar = __uniConfig.getTabBarConfig()
  __uniConfig.conditionUrl = ''
  __uniConfig.uniIdRouter = utsMapOf()
  
  __uniConfig.ready = true
}
