import App from './App.uvue'
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
    override uniCompilerVersion: string = "4.75"
    
    constructor() { super() }
}

import GenPagesIndexIndexClass from './pages/index/index.uvue'
import GenPagesMessageMessageClass from './pages/message/message.uvue'
import GenPagesMineMineClass from './pages/mine/mine.uvue'
import GenPagesMineUserInfoUserInfoClass from './pages/mine/userInfo/userInfo.uvue'
import GenPagesMineUserInfoCancelAnAccountCancelAnAccountClass from './pages/mine/userInfo/CancelAnAccount/CancelAnAccount.uvue'
import GenPagesMineUserInfoChangePhoneNumberChangePhoneNumberClass from './pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue'
import GenPagesMineUserInfoChangePasswordChangePasswordClass from './pages/mine/userInfo/changePassword/changePassword.uvue'
import GenPagesMineRechargeDataTrafficRechargeDataTrafficClass from './pages/mine/rechargeDataTraffic/rechargeDataTraffic.uvue'
import GenPagesMineHelpCenterHelpCenterClass from './pages/mine/helpCenter/helpCenter.uvue'
import GenPagesMineHelpCenterQuestionDetailQuestionDetailClass from './pages/mine/helpCenter/questionDetail/questionDetail.uvue'
import GenPagesMessageMessageDetailMessageDetailClass from './pages/message/messageDetail/messageDetail.uvue'
import GenPagesLoginLoginClass from './pages/login/login.uvue'
import GenPagesMessageMessageDeviceDetailMessageDeviceDetailClass from './pages/message/messageDeviceDetail/messageDeviceDetail.uvue'
import GenPagesMessageMessageSystemMessageSystemClass from './pages/message/messageSystem/messageSystem.uvue'
import GenPagesMineMyOrdersMyOrdersClass from './pages/mine/myOrders/myOrders.uvue'
import GenPagesMineMyOrdersOrderDetailOrderDetailClass from './pages/mine/myOrders/orderDetail/orderDetail.uvue'
import GenPagesMineFeebackFeebackClass from './pages/mine/feeback/feeback.uvue'
import GenPagesMineSystemSettingSystemSettingClass from './pages/mine/systemSetting/systemSetting.uvue'
import GenPagesMineAboutAboutClass from './pages/mine/about/about.uvue'
import GenPagesMineLocalFilesLocalFilesClass from './pages/mine/localFiles/localFiles.uvue'
import GenPagesIndexDeviceDetailClass from './pages/index/deviceDetail.uvue'
import GenPagesIndexDeviceSettingClass from './pages/index/deviceSetting.uvue'
import GenPagesIndexDeviceReplayClass from './pages/index/deviceReplay.uvue'
import GenPagesIndexDeviceSettingInfoDeviceSettingInfoClass from './pages/index/deviceSettingInfo/deviceSettingInfo.uvue'
import GenPagesIndexDeviceSettingInfoDeviceNightClass from './pages/index/deviceSettingInfo/deviceNight.uvue'
import GenPagesIndexIntelligentWatchClass from './pages/index/intelligentWatch.uvue'
import GenPagesIndexTFCardSettingClass from './pages/index/TFCardSetting.uvue'
import GenPagesIndexCloudStorageSettingClass from './pages/index/cloudStorageSetting.uvue'
import GenPagesIndexDeviceRechargeDataClass from './pages/index/deviceRechargeData.uvue'
import GenPagesIndexDeviceShareDeviceShareClass from './pages/index/deviceShare/deviceShare.uvue'
import GenPagesIndexDeviceShareDeviceVisitorClass from './pages/index/deviceShare/deviceVisitor.uvue'
import GenPagesIndexDeviceShareVisitorDetailClass from './pages/index/deviceShare/visitorDetail.uvue'
import GenPagesIndexAddNewDeviceAddNewDeviceClass from './pages/index/addNewDevice/addNewDevice.uvue'
function definePageRoutes() {
__uniRoutes.push({ path: "pages/index/index", component: GenPagesIndexIndexClass, meta: { isQuit: true } as UniPageMeta, style: _uM([["navigationStyle","custom"],["navigationBarTitleText","首页"],["enableVideo",true]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/message/message", component: GenPagesMessageMessageClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","消息"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/mine", component: GenPagesMineMineClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","我的"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/userInfo/userInfo", component: GenPagesMineUserInfoUserInfoClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","个人信息"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/userInfo/CancelAnAccount/CancelAnAccount", component: GenPagesMineUserInfoCancelAnAccountCancelAnAccountClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","注销账号"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/userInfo/changePhoneNumber/changePhoneNumber", component: GenPagesMineUserInfoChangePhoneNumberChangePhoneNumberClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","修改手机号"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/userInfo/changePassword/changePassword", component: GenPagesMineUserInfoChangePasswordChangePasswordClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","修改密码"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/rechargeDataTraffic/rechargeDataTraffic", component: GenPagesMineRechargeDataTrafficRechargeDataTrafficClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","流量充值"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/helpCenter/helpCenter", component: GenPagesMineHelpCenterHelpCenterClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","帮助中心"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/helpCenter/questionDetail/questionDetail", component: GenPagesMineHelpCenterQuestionDetailQuestionDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","问题详情"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/message/messageDetail/messageDetail", component: GenPagesMessageMessageDetailMessageDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","消息详情"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/login/login", component: GenPagesLoginLoginClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["navigationBarTitleText","登陆"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/message/messageDeviceDetail/messageDeviceDetail", component: GenPagesMessageMessageDeviceDetailMessageDeviceDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","设备信息"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/message/messageSystem/messageSystem", component: GenPagesMessageMessageSystemMessageSystemClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","系统消息"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/myOrders/myOrders", component: GenPagesMineMyOrdersMyOrdersClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","订单列表"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/myOrders/orderDetail/orderDetail", component: GenPagesMineMyOrdersOrderDetailOrderDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","订单详情"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/feeback/feeback", component: GenPagesMineFeebackFeebackClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","意见反馈"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/systemSetting/systemSetting", component: GenPagesMineSystemSettingSystemSettingClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","设置"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/about/about", component: GenPagesMineAboutAboutClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","关于"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/localFiles/localFiles", component: GenPagesMineLocalFilesLocalFilesClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","本地文件"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/deviceDetail", component: GenPagesIndexDeviceDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/deviceSetting", component: GenPagesIndexDeviceSettingClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/deviceReplay", component: GenPagesIndexDeviceReplayClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/deviceSettingInfo/deviceSettingInfo", component: GenPagesIndexDeviceSettingInfoDeviceSettingInfoClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/deviceSettingInfo/deviceNight", component: GenPagesIndexDeviceSettingInfoDeviceNightClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/intelligentWatch", component: GenPagesIndexIntelligentWatchClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","智能侦测"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/TFCardSetting", component: GenPagesIndexTFCardSettingClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","TF卡设置"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/cloudStorageSetting", component: GenPagesIndexCloudStorageSettingClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","云存储设置"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/deviceRechargeData", component: GenPagesIndexDeviceRechargeDataClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/deviceShare/deviceShare", component: GenPagesIndexDeviceShareDeviceShareClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","分享管理"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/deviceShare/deviceVisitor", component: GenPagesIndexDeviceShareDeviceVisitorClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","访客管理"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/deviceShare/visitorDetail", component: GenPagesIndexDeviceShareVisitorDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText","访客信息"]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/index/addNewDevice/addNewDevice", component: GenPagesIndexAddNewDeviceAddNewDeviceClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationStyle","custom"],["navigationBarTitleText",""]]) } as UniPageRoute)
}
const __uniTabBar: Map<string, any | null> | null = _uM([["list",[_uM([["pagePath","pages/index/index"],["iconPath","./static/tabbar/home.png"],["selectedIconPath","./static/tabbar/home1.png"],["text","首页"]]),_uM([["pagePath","pages/message/message"],["iconPath","./static/tabbar/message.png"],["selectedIconPath","./static/tabbar/message1.png"],["text","消息"]]),_uM([["pagePath","pages/mine/mine"],["iconPath","./static/tabbar/userCenter.png"],["selectedIconPath","./static/tabbar/userCenter1.png"],["text","我的"]])]]])
const __uniLaunchPage: Map<string, any | null> = _uM([["url","pages/index/index"],["style",_uM([["navigationStyle","custom"],["navigationBarTitleText","首页"],["enableVideo",true]])]])
function defineAppConfig(){
  __uniConfig.entryPagePath = '/pages/index/index'
  __uniConfig.globalStyle = _uM([["navigationBarTextStyle","black"],["navigationBarTitleText","uniappX"],["navigationBarBackgroundColor","#F8F8F8"],["backgroundColor","#F8F8F8"]])
  __uniConfig.getTabBarConfig = ():Map<string, any> | null =>  _uM([["list",[_uM([["pagePath","pages/index/index"],["iconPath","./static/tabbar/home.png"],["selectedIconPath","./static/tabbar/home1.png"],["text","首页"]]),_uM([["pagePath","pages/message/message"],["iconPath","./static/tabbar/message.png"],["selectedIconPath","./static/tabbar/message1.png"],["text","消息"]]),_uM([["pagePath","pages/mine/mine"],["iconPath","./static/tabbar/userCenter.png"],["selectedIconPath","./static/tabbar/userCenter1.png"],["text","我的"]])]]])
  __uniConfig.tabBar = __uniConfig.getTabBarConfig()
  __uniConfig.conditionUrl = ''
  __uniConfig.uniIdRouter = _uM()
  
  __uniConfig.ready = true
}
