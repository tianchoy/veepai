"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_switch_1 = common_vendor.resolveComponent("fui-switch");
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_fui_input_1 = common_vendor.resolveComponent("fui-input");
  const _easycom_l_picker_1 = common_vendor.resolveComponent("l-picker");
  const _easycom_fui_bottom_popup_1 = common_vendor.resolveComponent("fui-bottom-popup");
  (_easycom_fui_switch_1 + _easycom_fui_icon_1 + _easycom_fui_input_1 + _easycom_l_picker_1 + _easycom_fui_bottom_popup_1)();
}
const _easycom_fui_switch = () => "../../../uni_modules/firstui-unix/components/fui-switch/fui-switch.js";
const _easycom_fui_icon = () => "../../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_fui_input = () => "../../../uni_modules/firstui-unix/components/fui-input/fui-input.js";
const _easycom_l_picker = () => "../../../uni_modules/lime-picker/components/l-picker/l-picker.js";
const _easycom_fui_bottom_popup = () => "../../../uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.js";
if (!Math) {
  (_easycom_fui_switch + _easycom_fui_icon + _easycom_fui_input + _easycom_l_picker + _easycom_fui_bottom_popup)();
}
class AuthType extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: String, optional: false },
          state: { type: String, optional: false }
        };
      },
      name: "AuthType"
    };
  }
  constructor(options, metadata = AuthType.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.code = this.__props__.code;
    this.state = this.__props__.state;
    delete this.__props__;
  }
}
class PermissionItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          code: { type: String, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "PermissionItem"
    };
  }
  constructor(options, metadata = PermissionItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.code = this.__props__.code;
    this.status = this.__props__.status;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "systemSetting",
  setup(__props) {
    const checked = common_vendor.ref(true);
    const showPicker = common_vendor.ref(false);
    const pickerOptions = common_vendor.ref([]);
    const playTypeItem = common_vendor.ref("WIFI下自动播放");
    common_vendor.ref("");
    const AuthState = common_vendor.ref([
      new AuthType({
        code: "authorized",
        state: "已授权"
      }),
      new AuthType({
        code: "not determined",
        state: "未授权"
      }),
      new AuthType({
        code: "denied",
        state: "未授权"
      })
    ]);
    const permissionList = common_vendor.ref([
      new PermissionItem({ name: "位置信息", code: "locationAuthorized", status: "notDetermined" }),
      new PermissionItem({ name: "相册", code: "albumAuthorized", status: "notDetermined" }),
      new PermissionItem({ name: "麦克风", code: "microphoneAuthorized", status: "notDetermined" }),
      new PermissionItem({ name: "蓝牙", code: "bluetoothAuthorized", status: "notDetermined" }),
      new PermissionItem({ name: "系统通知", code: "notificationAuthorized", status: "notDetermined" }),
      new PermissionItem({ name: "相机", code: "cameraAuthorized", status: "notDetermined" })
    ]);
    const getSystemAuth = (item) => {
      const res = common_vendor.index.getAppAuthorizeSetting();
      const code = item.code;
      if (code == "bluetoothAuthorized") {
        const resu = common_vendor.index.getSystemSetting();
        common_vendor.index.__f__("log", "at pages/mine/systemSetting/systemSetting.uvue:91", resu);
        if (resu.bluetoothEnabled == false) {
          common_vendor.index.showToast({
            title: "请先手动打开蓝牙"
          });
        } else {
          permissionList.value.map((item2) => {
            if (item2.code == "bluetoothAuthorized") {
              item2.status = "已授权";
            }
          });
        }
      } else {
        const status = res[code];
        if (status == "denied" || status == "not determined") {
          common_vendor.index.openAppAuthorizeSetting(new UTSJSONObject({
            success: (res2) => {
              common_vendor.index.__f__("log", "at pages/mine/systemSetting/systemSetting.uvue:108", res2);
            }
          }));
        }
      }
    };
    const changeChecked = () => {
      common_vendor.index.__f__("log", "at pages/mine/systemSetting/systemSetting.uvue:119", checked.value);
    };
    const isChecked = () => {
      checked.value = !checked.value;
    };
    const playType = () => {
      pickerOptions.value = [
        [
          {
            label: "WIFI下自动播放",
            value: "WIFI下自动播放"
          },
          {
            label: "总是播放",
            value: "总是播放"
          },
          {
            label: "不播放",
            value: "不播放"
          }
        ]
      ];
      showPicker.value = true;
    };
    const onConfirm = (context) => {
      showPicker.value = false;
      playTypeItem.value = context.values[0].toString();
    };
    const oncancel = () => {
      showPicker.value = false;
    };
    common_vendor.onPageShow(() => {
      const res = common_vendor.index.getAppAuthorizeSetting();
      const resu = common_vendor.index.getSystemSetting();
      permissionList.value = permissionList.value.map((item) => {
        const newItem = new PermissionItem(Object.assign({}, item));
        if (item.code == "bluetoothAuthorized" && resu.bluetoothEnabled == true) {
          newItem.status = "已授权";
        } else {
          AuthState.value.forEach((auth) => {
            if (auth.code === res[item.code]) {
              newItem.status = auth.state;
            }
          });
        }
        return newItem;
      });
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(changeChecked),
        b: common_vendor.o(isChecked),
        c: common_vendor.p({
          checked: checked.value
        }),
        d: common_vendor.p({
          name: "arrowright",
          size: 48
        }),
        e: common_vendor.o(playType),
        f: common_vendor.p({
          label: "自动播放",
          labelSize: 28,
          textAlign: "right",
          borderBottom: false,
          placeholderStyle: "font-size: 28rpx;",
          disabled: true,
          placeholder: playTypeItem.value
        }),
        g: common_vendor.f(permissionList.value, (item = null, index = null, i0 = null) => {
          return {
            a: "bb36821f-4-" + i0 + "," + ("bb36821f-3-" + i0),
            b: common_vendor.o(($event = null) => {
              return getSystemAuth(item);
            }, index),
            c: "bb36821f-3-" + i0,
            d: common_vendor.p({
              label: item.name,
              labelSize: 28,
              textAlign: "right",
              borderBottom: true,
              placeholderStyle: item.status == "未授权" ? "font-size: 28rpx;color:red;" : "font-size: 28rpx;color:green;",
              disabled: true,
              placeholder: item.status
            }),
            e: index
          };
        }),
        h: common_vendor.p({
          name: "arrowright",
          size: 48
        }),
        i: common_vendor.o(oncancel),
        j: common_vendor.o(onConfirm),
        k: common_vendor.p({
          ["cancel-btn"]: "取消",
          ["confirm-btn"]: "确定",
          columns: pickerOptions.value
        }),
        l: common_vendor.p({
          visible: showPicker.value
        }),
        m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb36821f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/systemSetting/systemSetting.js.map
