"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_l_button_1 = common_vendor.resolveComponent("l-button");
  const _easycom_l_progress_1 = common_vendor.resolveComponent("l-progress");
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_l_picker_1 = common_vendor.resolveComponent("l-picker");
  const _easycom_l_date_time_picker_1 = common_vendor.resolveComponent("l-date-time-picker");
  const _easycom_l_popup_1 = common_vendor.resolveComponent("l-popup");
  (_easycom_l_button_1 + _easycom_l_progress_1 + _easycom_fui_icon_1 + _easycom_l_picker_1 + _easycom_l_date_time_picker_1 + _easycom_l_popup_1)();
}
const _easycom_l_button = () => "../../uni_modules/lime-button/components/l-button/l-button.js";
const _easycom_l_progress = () => "../../uni_modules/lime-progress/components/l-progress/l-progress.js";
const _easycom_fui_icon = () => "../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_l_picker = () => "../../uni_modules/lime-picker/components/l-picker/l-picker.js";
const _easycom_l_date_time_picker = () => "../../uni_modules/lime-date-time-picker/components/l-date-time-picker/l-date-time-picker.js";
const _easycom_l_popup = () => "../../uni_modules/lime-popup/components/l-popup/l-popup.js";
if (!Math) {
  (_easycom_l_button + _easycom_l_progress + _easycom_fui_icon + _easycom_l_picker + _easycom_l_date_time_picker + _easycom_l_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "TFCardSetting",
  setup(__props) {
    const types = common_vendor.ref(true);
    const pickerOptions = common_vendor.ref([]);
    const percent = common_vendor.ref(80);
    const showPicker = common_vendor.ref(false);
    const vedioModeType = common_vendor.ref("事件录像");
    const pictureQualityType = common_vendor.ref("高清");
    const startTime = common_vendor.ref("00:00");
    const endTime = common_vendor.ref("23:59");
    let currentCallback = null;
    const vedioModeOptions = [
      [
        {
          label: "一直录像",
          value: "一直录像"
        },
        {
          label: "事件录像",
          value: "事件录像"
        }
      ]
    ];
    const pictureQualityOptions = [
      [
        {
          label: "高清",
          value: "高清"
        },
        {
          label: "超清",
          value: "超清"
        }
      ]
    ];
    const vedioMode = () => {
      types.value = true;
      pickerOptions.value = vedioModeOptions;
      currentCallback = (value) => {
        vedioModeType.value = value;
      };
      showPicker.value = true;
    };
    const pictureQuality = () => {
      types.value = true;
      pickerOptions.value = pictureQualityOptions;
      currentCallback = (value) => {
        pictureQualityType.value = value;
      };
      showPicker.value = true;
    };
    const pickerFun = (e) => {
      const selectedValue = e.values[0].toString();
      currentCallback === null || currentCallback === void 0 ? null : currentCallback(selectedValue);
      showPicker.value = false;
      currentCallback = null;
    };
    const vedioTime = () => {
      types.value = false;
      showPicker.value = true;
    };
    const startTimeChange = (value) => {
      startTime.value = value;
    };
    const endTimeChange = (value) => {
      endTime.value = value;
    };
    const getVedioTime = () => {
      showPicker.value = false;
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.p(new UTSJSONObject({
          type: "primary",
          size: "mini"
        })),
        b: common_vendor.p(new UTSJSONObject({
          percent: percent.value,
          ["info-align"]: "end",
          ["show-info"]: true
        })),
        c: common_vendor.t(vedioModeType.value),
        d: common_vendor.p(new UTSJSONObject({
          name: "arrowright",
          size: "50"
        })),
        e: common_vendor.o(vedioMode),
        f: common_vendor.t(pictureQualityType.value),
        g: common_vendor.p(new UTSJSONObject({
          name: "arrowright",
          size: "50"
        })),
        h: common_vendor.o(pictureQuality),
        i: common_vendor.t(startTime.value),
        j: common_vendor.t(endTime.value),
        k: common_vendor.p(new UTSJSONObject({
          name: "arrowright",
          size: "50"
        })),
        l: common_vendor.o(vedioTime),
        m: types.value
      }), types.value ? new UTSJSONObject({
        n: common_vendor.o(($event = null) => {
          return showPicker.value = false;
        }),
        o: common_vendor.o(pickerFun),
        p: common_vendor.p(new UTSJSONObject({
          ["cancel-btn"]: "取消",
          ["confirm-btn"]: "确定",
          columns: pickerOptions.value
        }))
      }) : new UTSJSONObject({
        q: common_vendor.o(($event = null) => {
          return showPicker.value = false;
        }),
        r: common_vendor.p(new UTSJSONObject({
          type: "default",
          size: "mini"
        })),
        s: common_vendor.o(getVedioTime),
        t: common_vendor.p(new UTSJSONObject({
          type: "primary",
          size: "mini"
        })),
        v: common_vendor.o(startTimeChange),
        w: common_vendor.o(($event = null) => {
          return startTime.value = $event;
        }),
        x: common_vendor.p(new UTSJSONObject({
          mode: 8 | 16,
          modelValue: startTime.value
        })),
        y: common_vendor.o(endTimeChange),
        z: common_vendor.o(($event = null) => {
          return endTime.value = $event;
        }),
        A: common_vendor.p(new UTSJSONObject({
          mode: 8 | 16,
          modelValue: endTime.value
        }))
      }), new UTSJSONObject({
        B: common_vendor.o(($event = null) => {
          return showPicker.value = $event;
        }),
        C: common_vendor.p(new UTSJSONObject({
          position: "bottom",
          modelValue: showPicker.value
        })),
        D: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6275904f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/TFCardSetting.js.map
