"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/message/message.js";
  "./pages/mine/mine.js";
  "./pages/mine/userInfo/userInfo.js";
  "./pages/mine/userInfo/CancelAnAccount/CancelAnAccount.js";
  "./pages/mine/userInfo/changePhoneNumber/changePhoneNumber.js";
  "./pages/mine/userInfo/changePassword/changePassword.js";
  "./pages/mine/rechargeDataTraffic/rechargeDataTraffic.js";
  "./pages/mine/helpCenter/helpCenter.js";
  "./pages/mine/helpCenter/questionDetail/questionDetail.js";
  "./pages/message/messageDetail/messageDetail.js";
  "./pages/login/login.js";
  "./pages/message/messageDeviceDetail/messageDeviceDetail.js";
  "./pages/message/messageSystem/messageSystem.js";
  "./pages/mine/myOrders/myOrders.js";
  "./pages/mine/myOrders/orderDetail/orderDetail.js";
  "./pages/mine/feeback/feeback.js";
  "./pages/mine/systemSetting/systemSetting.js";
  "./pages/mine/about/about.js";
  "./pages/mine/localFiles/localFiles.js";
  "./pages/index/deviceDetail.js";
  "./pages/index/deviceSetting.js";
  "./pages/index/deviceReplay.js";
  "./pages/index/deviceSettingInfo/deviceSettingInfo.js";
  "./pages/index/deviceSettingInfo/deviceNight.js";
  "./pages/index/intelligentWatch.js";
  "./pages/index/TFCardSetting.js";
  "./pages/index/cloudStorageSetting.js";
}
const _sfc_main = common_vendor.defineComponent(new UTSJSONObject({
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.uvue:5", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.uvue:8", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.uvue:11", "App Hide");
  },
  onExit: function() {
    common_vendor.index.__f__("log", "at App.uvue:32", "App Exit");
  }
}));
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
