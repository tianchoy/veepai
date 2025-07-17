"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  const _easycom_l_tab_panel_1 = common_vendor.resolveComponent("l-tab-panel");
  const _easycom_l_tabs_1 = common_vendor.resolveComponent("l-tabs");
  (_easycom_fui_button_1 + _easycom_l_tab_panel_1 + _easycom_l_tabs_1)();
}
const _easycom_fui_button = () => "../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
const _easycom_l_tab_panel = () => "../../../uni_modules/lime-tabs/components/l-tab-panel/l-tab-panel.js";
const _easycom_l_tabs = () => "../../../uni_modules/lime-tabs/components/l-tabs/l-tabs.js";
if (!Math) {
  (_easycom_fui_button + _easycom_l_tab_panel + _easycom_l_tabs)();
}
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
          state: { type: String, optional: false },
          iccid: { type: String, optional: false },
          isPay: { type: String, optional: false }
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
    this.state = this.__props__.state;
    this.iccid = this.__props__.iccid;
    this.isPay = this.__props__.isPay;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOrders",
  setup(__props) {
    const tabVal = common_vendor.ref(0);
    const tabsVal = common_vendor.ref([
      new tabItem({
        id: "0",
        title: "全部",
        content: []
      }),
      new tabItem({
        id: "1",
        title: "待付款",
        content: []
      }),
      new tabItem({
        id: "2",
        title: "已完成",
        content: []
      }),
      new tabItem({
        id: "3",
        title: "已取消",
        content: []
      }),
      new tabItem({
        id: "4",
        title: "退款",
        content: []
      })
    ]);
    const content = common_vendor.ref([
      new ContentType({
        id: "1111",
        title: "五年畅想套餐",
        date: "2025-07-09 15:00:00",
        price: "¥300",
        state: "已完成",
        iccid: "89862235957372384387456",
        isPay: "2"
      }),
      new ContentType({
        id: "1112",
        title: "五年畅想套餐",
        date: "2025-07-09 15:00:00",
        price: "¥300",
        state: "已取消",
        iccid: "89862235957372384387454",
        isPay: "3"
      }),
      new ContentType({
        id: "1113",
        title: "五年畅想套餐",
        date: "2025-07-09 15:00:00",
        price: "¥300",
        state: "待付款",
        iccid: "89862235957372384387467",
        isPay: "1"
      }),
      new ContentType({
        id: "1114",
        title: "五年畅想套餐",
        date: "2025-07-09 15:00:00",
        price: "¥300",
        state: "已退款",
        iccid: "89862235957372384387465",
        isPay: "4"
      }),
      new ContentType({
        id: "1115",
        title: "五年畅想套餐",
        date: "2025-07-09 15:00:00",
        price: "¥300",
        state: "已退款",
        iccid: "89862235957372384387465",
        isPay: "4"
      })
    ]);
    const getFilteredEvents = () => {
      if (tabVal.value == 0)
        return [...content.value];
      const selectedType = tabsVal.value[tabVal.value].id;
      return content.value.filter((event) => {
        return event.isPay == selectedType;
      });
    };
    const changeTab = (val) => {
      tabVal.value = val;
    };
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/myOrders/orderDetail/orderDetail?id=" + id
      });
    };
    const goPay = () => {
      common_vendor.index.showToast({
        title: "去付款",
        icon: "none"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.f(tabsVal.value, (item = null, index = null, i0 = null) => {
          return {
            a: common_vendor.f(getFilteredEvents(), (item2 = null, index2 = null, i1 = null) => {
              return common_vendor.e({
                a: common_vendor.t(item2.title),
                b: common_vendor.t(item2.state),
                c: common_vendor.t(item2.iccid),
                d: common_vendor.t(item2.date),
                e: common_vendor.t(item2.price),
                f: common_vendor.o(($event = null) => {
                  return goDetail(item2.id);
                }, index2),
                g: item2.isPay == "1"
              }, item2.isPay == "1" ? {
                h: common_vendor.o(goPay, index2),
                i: "0068ce00-2-" + i0 + "-" + i1 + "," + ("0068ce00-1-" + i0),
                j: common_vendor.p({
                  text: "去付款",
                  type: "primary",
                  width: "120rpx",
                  height: "50rpx",
                  size: 24
                })
              } : {}, {
                k: index2
              });
            }),
            b: index,
            c: "0068ce00-1-" + i0 + ",0068ce00-0",
            d: common_vendor.p({
              value: index,
              label: item.title
            })
          };
        }),
        b: common_vendor.o(changeTab),
        c: common_vendor.p({
          value: tabVal.value,
          bgColor: "transparent",
          color: "#000000",
          activeColor: "#FF5722"
        }),
        d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0068ce00"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/myOrders/myOrders.js.map
