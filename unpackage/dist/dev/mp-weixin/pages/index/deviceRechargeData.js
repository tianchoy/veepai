"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_l_progress_1 = common_vendor.resolveComponent("l-progress");
  const _easycom_fui_empty_1 = common_vendor.resolveComponent("fui-empty");
  const _easycom_l_tab_panel_1 = common_vendor.resolveComponent("l-tab-panel");
  const _easycom_l_tabs_1 = common_vendor.resolveComponent("l-tabs");
  const _easycom_l_button_1 = common_vendor.resolveComponent("l-button");
  (_easycom_l_icon_1 + _easycom_fui_icon_1 + _easycom_l_progress_1 + _easycom_fui_empty_1 + _easycom_l_tab_panel_1 + _easycom_l_tabs_1 + _easycom_l_button_1)();
}
const _easycom_l_icon = () => "../../uni_modules/lime-icon/components/l-icon/l-icon.js";
const _easycom_fui_icon = () => "../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_l_progress = () => "../../uni_modules/lime-progress/components/l-progress/l-progress.js";
const _easycom_fui_empty = () => "../../uni_modules/firstui-unix/components/fui-empty/fui-empty.js";
const _easycom_l_tab_panel = () => "../../uni_modules/lime-tabs/components/l-tab-panel/l-tab-panel.js";
const _easycom_l_tabs = () => "../../uni_modules/lime-tabs/components/l-tabs/l-tabs.js";
const _easycom_l_button = () => "../../uni_modules/lime-button/components/l-button/l-button.js";
if (!Math) {
  (common_vendor.unref(TopNavBar) + _easycom_l_icon + _easycom_fui_icon + _easycom_l_progress + _easycom_fui_empty + _easycom_l_tab_panel + _easycom_l_tabs + _easycom_l_button)();
}
const TopNavBar = () => "../../components/TopNavBar.js";
class tabItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          title: { type: String, optional: false },
          content: { type: "Unknown", optional: false }
        };
      },
      name: "tabItem"
    };
  }
  constructor(options, metadata = tabItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.content = this.__props__.content;
    delete this.__props__;
  }
}
class ContentType extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          title: { type: String, optional: false },
          date: { type: String, optional: false },
          price: { type: String, optional: false },
          category: { type: String, optional: false }
        };
      },
      name: "ContentType"
    };
  }
  constructor(options, metadata = ContentType.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.date = this.__props__.date;
    this.price = this.__props__.price;
    this.category = this.__props__.category;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceRechargeData",
  setup(__props) {
    const tabVal = common_vendor.ref(0);
    const percent = common_vendor.ref(60);
    const selectedPackage = common_vendor.ref(null);
    const tabsVal = common_vendor.ref([
      new tabItem({
        id: "0",
        title: "订购套餐",
        content: []
      }),
      new tabItem({
        id: "1",
        title: "订购加油包",
        content: []
      })
    ]);
    const content = common_vendor.ref([
      new ContentType({
        id: "1111",
        title: "五年畅想套餐",
        date: "",
        price: "100",
        category: "0"
      }),
      new ContentType({
        id: "1113",
        title: "五年畅想套餐",
        date: "",
        price: "102",
        category: "0"
      }),
      new ContentType({
        id: "1112",
        title: "五年畅想套餐111",
        date: "2025-07-09",
        price: "230",
        category: "1"
      }),
      new ContentType({
        id: "1114",
        title: "五年畅想套餐111",
        date: "2025-07-09",
        price: "205",
        category: "1"
      }),
      new ContentType({
        id: "1115",
        title: "五年畅想套餐111",
        date: "2025-07-09",
        price: "150",
        category: "0"
      })
    ]);
    const goBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        delta: 1
      }));
    };
    const rightIcon = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceRechargeOrder"
      });
    };
    const copyiccid = () => {
      common_vendor.index.setClipboardData({
        data: "8986112223504991234",
        success: () => {
          common_vendor.index.showToast({
            title: "复制成功"
          });
        }
      });
    };
    const getFilteredEvents = () => {
      const selectedType = tabsVal.value[tabVal.value].id;
      return content.value.filter((event) => {
        return event.category == selectedType;
      });
    };
    const changeTab = (val) => {
      tabVal.value = val;
    };
    const selectPackge = (item) => {
      selectedPackage.value = item;
    };
    return (_ctx = null, _cache = null) => {
      var _a;
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.o(rightIcon),
        c: common_vendor.p(new UTSJSONObject({
          title: "流量充值",
          showBack: true,
          rightText: "order"
        })),
        d: common_vendor.o(copyiccid),
        e: common_vendor.p(new UTSJSONObject({
          name: "file-copy",
          size: "20"
        })),
        f: common_vendor.p(new UTSJSONObject({
          name: "right",
          size: "50"
        })),
        g: common_vendor.p(new UTSJSONObject({
          percent: percent.value,
          ["info-align"]: "end",
          ["show-info"]: true
        })),
        h: common_vendor.f(tabsVal.value, (item = null, index = null, i0 = null) => {
          return common_vendor.e({
            a: common_vendor.f(getFilteredEvents(), (it = null, index2 = null, i1 = null) => {
              var _a2;
              return {
                a: common_vendor.t(it.title),
                b: common_vendor.t(it.date),
                c: common_vendor.t(it.price),
                d: ((_a2 = selectedPackage.value) === null || _a2 === void 0 ? null : _a2.id) === it.id ? 1 : "",
                e: index2,
                f: common_vendor.o(($event = null) => {
                  return selectPackge(it);
                }, index2)
              };
            })
          }, getFilteredEvents().length == 0 ? new UTSJSONObject({
            b: "b49fde6e-6-" + i0 + "," + ("b49fde6e-5-" + i0),
            c: common_vendor.p(new UTSJSONObject({
              color: "#999",
              size: 25,
              title: "暂无套餐"
            }))
          }) : new UTSJSONObject({}), new UTSJSONObject({
            d: index,
            e: "b49fde6e-5-" + i0 + ",b49fde6e-4",
            f: common_vendor.p(new UTSJSONObject({
              value: index,
              label: item.title
            }))
          }));
        }),
        i: getFilteredEvents().length == 0,
        j: common_vendor.o(changeTab),
        k: common_vendor.p(new UTSJSONObject({
          value: tabVal.value,
          spaceEvenly: false,
          bgColor: "transparent",
          color: "#000",
          activeColor: "#FF5722"
        })),
        l: selectedPackage.value
      }, selectedPackage.value ? {
        m: common_vendor.t((_a = selectedPackage.value) === null || _a === void 0 ? null : _a.price),
        n: common_vendor.p(new UTSJSONObject({
          type: "primary"
        }))
      } : new UTSJSONObject({}), new UTSJSONObject({
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b49fde6e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/deviceRechargeData.js.map
