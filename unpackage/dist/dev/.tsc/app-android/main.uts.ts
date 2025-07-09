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
import GenPagesMineUserInfoUserInfoClass from './pages/mine/userInfo/userInfo.uvue?type=page'
import GenPagesMineUserInfoCancelAnAccountCancelAnAccountClass from './pages/mine/userInfo/CancelAnAccount/CancelAnAccount.uvue?type=page'
import GenPagesMineUserInfoChangePhoneNumberChangePhoneNumberClass from './pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue?type=page'
import GenPagesMineUserInfoChangePasswordChangePasswordClass from './pages/mine/userInfo/changePassword/changePassword.uvue?type=page'
import GenPagesMineRechargeDataTrafficRechargeDataTrafficClass from './pages/mine/rechargeDataTraffic/rechargeDataTraffic.uvue?type=page'
import GenPagesMineHelpCenterHelpCenterClass from './pages/mine/helpCenter/helpCenter.uvue?type=page'
import GenPagesMineHelpCenterQuestionDetailQuestionDetailClass from './pages/mine/helpCenter/questionDetail/questionDetail.uvue?type=page'
import GenPagesMessageMessageDetailMessageDetailClass from './pages/message/messageDetail/messageDetail.uvue?type=page'
import GenPagesLoginLoginClass from './pages/login/login.uvue?type=page'
import GenPagesMessageMessageDeviceDetailMessageDeviceDetailClass from './pages/message/messageDeviceDetail/messageDeviceDetail.uvue?type=page'
function definePageRoutes() {
__uniRoutes.push({ path: "pages/index/index", component: GenPagesIndexIndexClass, meta: { isQuit: true } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","首页"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/message/message", component: GenPagesMessageMessageClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","消息"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/mine", component: GenPagesMineMineClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","我的"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/userInfo/userInfo", component: GenPagesMineUserInfoUserInfoClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","个人信息"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/userInfo/CancelAnAccount/CancelAnAccount", component: GenPagesMineUserInfoCancelAnAccountCancelAnAccountClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","注销账号"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/userInfo/changePhoneNumber/changePhoneNumber", component: GenPagesMineUserInfoChangePhoneNumberChangePhoneNumberClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","修改手机号"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/userInfo/changePassword/changePassword", component: GenPagesMineUserInfoChangePasswordChangePasswordClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","修改密码"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/rechargeDataTraffic/rechargeDataTraffic", component: GenPagesMineRechargeDataTrafficRechargeDataTrafficClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","流量充值"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/helpCenter/helpCenter", component: GenPagesMineHelpCenterHelpCenterClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","帮助中心"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/helpCenter/questionDetail/questionDetail", component: GenPagesMineHelpCenterQuestionDetailQuestionDetailClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","问题详情"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/message/messageDetail/messageDetail", component: GenPagesMessageMessageDetailMessageDetailClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","消息详情"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/login/login", component: GenPagesLoginLoginClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationStyle","custom"],["navigationBarTitleText","登陆"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/message/messageDeviceDetail/messageDeviceDetail", component: GenPagesMessageMessageDeviceDetailMessageDeviceDetailClass, meta: { isQuit: false } as UniPageMeta, style: utsMapOf([["navigationBarTitleText","设备信息"]]) } as UniPageRoute)
}
const __uniTabBar: Map<string, any | null> | null = utsMapOf([["list",[utsMapOf([["pagePath","pages/index/index"],["iconPath","./static/tabbar/home.png"],["selectedIconPath","./static/tabbar/home1.png"],["text","首页"]]),utsMapOf([["pagePath","pages/message/message"],["iconPath","./static/tabbar/message.png"],["selectedIconPath","./static/tabbar/message1.png"],["text","消息"]]),utsMapOf([["pagePath","pages/mine/mine"],["iconPath","./static/tabbar/userCenter.png"],["selectedIconPath","./static/tabbar/userCenter1.png"],["text","我的"]])]]])
const __uniLaunchPage: Map<string, any | null> = utsMapOf([["url","pages/index/index"],["style",utsMapOf([["navigationBarTitleText","首页"]])]])
function defineAppConfig(){
  __uniConfig.entryPagePath = '/pages/index/index'
  __uniConfig.globalStyle = utsMapOf([["navigationBarTextStyle","black"],["navigationBarTitleText","uniappX"],["navigationBarBackgroundColor","#F8F8F8"],["backgroundColor","#F8F8F8"]])
  __uniConfig.getTabBarConfig = ():Map<string, any> | null =>  utsMapOf([["list",[utsMapOf([["pagePath","pages/index/index"],["iconPath","./static/tabbar/home.png"],["selectedIconPath","./static/tabbar/home1.png"],["text","首页"]]),utsMapOf([["pagePath","pages/message/message"],["iconPath","./static/tabbar/message.png"],["selectedIconPath","./static/tabbar/message1.png"],["text","消息"]]),utsMapOf([["pagePath","pages/mine/mine"],["iconPath","./static/tabbar/userCenter.png"],["selectedIconPath","./static/tabbar/userCenter1.png"],["text","我的"]])]]])
  __uniConfig.tabBar = __uniConfig.getTabBarConfig()
  __uniConfig.conditionUrl = ''
  __uniConfig.uniIdRouter = utsMapOf()
  
  __uniConfig.ready = true
}
