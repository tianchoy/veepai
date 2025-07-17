"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Math) {
  common_vendor.unref(TopNavBar)();
}
const TopNavBar = () => "../../../components/TopNavBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "addNewDevice",
  setup(__props) {
    const flash = common_vendor.ref("off");
    const devicePosition = common_vendor.ref("back");
    const frameSize = common_vendor.ref("medium");
    const goback = () => {
      common_vendor.index.navigateBack();
    };
    const handleError = (err = null) => {
      common_vendor.index.showToast({
        title: "请允许使用摄像头"
      });
    };
    const handleInitDone = () => {
      common_vendor.index.showToast({
        title: "初始化成功"
      });
      common_vendor.index.scanCode(new UTSJSONObject({
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/addNewDevice/addNewDevice.uvue:60", "扫描结果：", res.result);
        },
        fail(err) {
          common_vendor.index.__f__("error", "at pages/index/addNewDevice/addNewDevice.uvue:63", "扫描失败：", err);
        }
      }));
    };
    const switchFlash = () => {
      flash.value = flash.value == "off" ? "on" : "off";
    };
    const scanImg = () => {
      common_vendor.index.chooseImage(new UTSJSONObject({
        count: 1,
        sourceType: ["album"],
        success: (res) => {
          common_vendor.index.scanCode(new UTSJSONObject({
            onlyFromCamera: false,
            scanType: ["qrCode"],
            success: (scanRes) => {
              common_vendor.index.__f__("log", "at pages/index/addNewDevice/addNewDevice.uvue:81", "识别结果:", scanRes.result);
            },
            fail: (err) => {
              common_vendor.index.__f__("error", "at pages/index/addNewDevice/addNewDevice.uvue:84", "识别失败:", err);
            }
          }));
        }
      }));
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(goback),
        b: common_vendor.p({
          title: "添加新设备",
          showBack: true,
          isText: true,
          rightText: "常见问题"
        }),
        c: devicePosition.value,
        d: flash.value,
        e: frameSize.value,
        f: common_vendor.o(handleError),
        g: common_vendor.o(handleInitDone),
        h: common_assets._imports_0$8,
        i: common_vendor.o(switchFlash),
        j: common_assets._imports_1$3,
        k: common_vendor.o(scanImg),
        l: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8f5686ba"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/addNewDevice/addNewDevice.js.map
