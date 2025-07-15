"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_fui_switch_1 = common_vendor.resolveComponent("fui-switch");
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_l_picker_1 = common_vendor.resolveComponent("l-picker");
  const _easycom_l_popup_1 = common_vendor.resolveComponent("l-popup");
  (_easycom_fui_switch_1 + _easycom_fui_icon_1 + _easycom_l_picker_1 + _easycom_l_popup_1)();
}
const _easycom_fui_switch = () => "../../uni_modules/firstui-unix/components/fui-switch/fui-switch.js";
const _easycom_fui_icon = () => "../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_l_picker = () => "../../uni_modules/lime-picker/components/l-picker/l-picker.js";
const _easycom_l_popup = () => "../../uni_modules/lime-popup/components/l-popup/l-popup.js";
if (!Math) {
  (_easycom_fui_switch + _easycom_fui_icon + _easycom_l_picker + _easycom_l_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "intelligentWatch",
  setup(__props) {
    const peopleWatch = common_vendor.ref(true);
    const mobileWatch = common_vendor.ref(true);
    const flashlight = common_vendor.ref(true);
    const redBlueWatch = common_vendor.ref(true);
    const policeWatch = common_vendor.ref(true);
    const peopleSelectWatch = common_vendor.ref(true);
    const peopleFindWatch = common_vendor.ref(true);
    const showPicker = common_vendor.ref(false);
    const peopleWatchLevel = common_vendor.ref("中");
    const timeWatchLevel = common_vendor.ref("全天");
    const pickerOptions = common_vendor.ref([]);
    common_vendor.ref([]);
    const mobileWatchLevel = common_vendor.ref("高");
    const mobileTimeWatchLevel = common_vendor.ref("全天");
    let currentCallback = null;
    const peopeWatchOptions = [
      [
        {
          label: "高",
          value: "高"
        },
        {
          label: "中",
          value: "中"
        },
        {
          label: "低",
          value: "低"
        }
      ]
    ];
    const typeModeWatchOptions = [
      [
        {
          label: "全天模式",
          value: "全天"
        },
        {
          label: "白天模式",
          value: "白天模式"
        },
        {
          label: "夜晚模式",
          value: "夜晚模式"
        }
      ]
    ];
    const peopleWatchFun = (e) => {
      peopleWatch.value = e;
    };
    const peopeWatchChange = () => {
      pickerOptions.value = peopeWatchOptions;
      currentCallback = (value) => {
        peopleWatchLevel.value = value;
      };
      showPicker.value = true;
    };
    const timeWatchChange = () => {
      pickerOptions.value = typeModeWatchOptions;
      currentCallback = (value) => {
        timeWatchLevel.value = value;
      };
      showPicker.value = true;
    };
    const pickerFun = (e) => {
      const selectedValue = e.values[0].toString();
      currentCallback === null || currentCallback === void 0 ? null : currentCallback(selectedValue);
      showPicker.value = false;
      currentCallback = null;
    };
    const mobileWatchChange = () => {
      pickerOptions.value = peopeWatchOptions;
      currentCallback = (value) => {
        mobileWatchLevel.value = value;
      };
      showPicker.value = true;
    };
    const mTimeWatchChange = () => {
      pickerOptions.value = typeModeWatchOptions;
      currentCallback = (value) => {
        mobileTimeWatchLevel.value = value;
      };
      showPicker.value = true;
    };
    const mobileWatchFun = (e) => {
      mobileWatch.value = e;
    };
    const flashlightFun = (e) => {
      flashlight.value = e;
    };
    const redBlueWatchFun = (e) => {
      redBlueWatch.value = e;
    };
    const policeWatchFun = (e) => {
      policeWatch.value = e;
    };
    const peopleSelectWatchFun = (e) => {
      peopleSelectWatch.value = e;
    };
    const peopleFindWatchFun = (e) => {
      peopleFindWatch.value = e;
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.o(peopleWatchFun),
        b: common_vendor.p(new UTSJSONObject({
          scaleRatio: 0.8,
          checked: peopleWatch.value
        })),
        c: peopleWatch.value
      }), peopleWatch.value ? new UTSJSONObject({
        d: common_vendor.t(peopleWatchLevel.value),
        e: common_vendor.p(new UTSJSONObject({
          name: "arrowright",
          color: "#333",
          size: "60"
        })),
        f: common_vendor.o(peopeWatchChange)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        g: peopleWatch.value
      }), peopleWatch.value ? new UTSJSONObject({
        h: common_vendor.t(timeWatchLevel.value),
        i: common_vendor.p(new UTSJSONObject({
          name: "arrowright",
          color: "#333",
          size: "60"
        })),
        j: common_vendor.o(timeWatchChange)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        k: peopleWatch.value
      }), peopleWatch.value ? new UTSJSONObject({
        l: common_vendor.p(new UTSJSONObject({
          name: "arrowright",
          color: "#333",
          size: "60"
        }))
      }) : new UTSJSONObject({}), new UTSJSONObject({
        m: common_vendor.o(mobileWatchFun),
        n: common_vendor.p(new UTSJSONObject({
          scaleRatio: 0.8,
          checked: mobileWatch.value
        })),
        o: mobileWatch.value
      }), mobileWatch.value ? new UTSJSONObject({
        p: common_vendor.t(mobileWatchLevel.value),
        q: common_vendor.p(new UTSJSONObject({
          name: "arrowright",
          color: "#333",
          size: "60"
        })),
        r: common_vendor.o(mobileWatchChange)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        s: mobileWatch.value
      }), mobileWatch.value ? new UTSJSONObject({
        t: common_vendor.t(mobileTimeWatchLevel.value),
        v: common_vendor.p(new UTSJSONObject({
          name: "arrowright",
          color: "#333",
          size: "60"
        })),
        w: common_vendor.o(mTimeWatchChange)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        x: mobileWatch.value
      }), mobileWatch.value ? new UTSJSONObject({
        y: common_vendor.p(new UTSJSONObject({
          name: "arrowright",
          color: "#333",
          size: "60"
        }))
      }) : new UTSJSONObject({}), new UTSJSONObject({
        z: common_vendor.o(flashlightFun),
        A: common_vendor.p(new UTSJSONObject({
          scaleRatio: 0.8,
          checked: flashlight.value
        })),
        B: common_vendor.o(redBlueWatchFun),
        C: common_vendor.p(new UTSJSONObject({
          scaleRatio: 0.8,
          checked: redBlueWatch.value
        })),
        D: common_vendor.o(policeWatchFun),
        E: common_vendor.p(new UTSJSONObject({
          scaleRatio: 0.8,
          checked: policeWatch.value
        })),
        F: common_vendor.p(new UTSJSONObject({
          name: "help",
          size: "30"
        })),
        G: common_vendor.o(peopleSelectWatchFun),
        H: common_vendor.p(new UTSJSONObject({
          scaleRatio: 0.8,
          checked: peopleSelectWatch.value
        })),
        I: common_vendor.p(new UTSJSONObject({
          name: "help",
          size: "30"
        })),
        J: common_vendor.o(peopleFindWatchFun),
        K: common_vendor.p(new UTSJSONObject({
          scaleRatio: 0.8,
          checked: peopleFindWatch.value
        })),
        L: common_vendor.o(($event = null) => {
          return showPicker.value = false;
        }),
        M: common_vendor.o(pickerFun),
        N: common_vendor.p(new UTSJSONObject({
          ["cancel-btn"]: "取消",
          ["confirm-btn"]: "确定",
          columns: pickerOptions.value
        })),
        O: common_vendor.o(($event = null) => {
          return showPicker.value = $event;
        }),
        P: common_vendor.p(new UTSJSONObject({
          position: "bottom",
          modelValue: showPicker.value
        })),
        Q: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c646905"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/intelligentWatch.js.map
