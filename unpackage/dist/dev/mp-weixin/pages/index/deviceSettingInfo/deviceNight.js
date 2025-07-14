"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_radio_1 = common_vendor.resolveComponent("fui-radio");
  const _easycom_fui_list_cell_1 = common_vendor.resolveComponent("fui-list-cell");
  const _easycom_fui_label_1 = common_vendor.resolveComponent("fui-label");
  const _easycom_fui_radio_group_1 = common_vendor.resolveComponent("fui-radio-group");
  (_easycom_fui_radio_1 + _easycom_fui_list_cell_1 + _easycom_fui_label_1 + _easycom_fui_radio_group_1)();
}
const _easycom_fui_radio = () => "../../../uni_modules/firstui-unix/components/fui-radio/fui-radio.js";
const _easycom_fui_list_cell = () => "../../../uni_modules/firstui-unix/components/fui-list-cell/fui-list-cell.js";
const _easycom_fui_label = () => "../../../uni_modules/firstui-unix/components/fui-label/fui-label.js";
const _easycom_fui_radio_group = () => "../../../uni_modules/firstui-unix/components/fui-radio-group/fui-radio-group.js";
if (!Math) {
  (common_vendor.unref(TopNavBar) + _easycom_fui_radio + _easycom_fui_list_cell + _easycom_fui_label + _easycom_fui_radio_group)();
}
const TopNavBar = () => "../../../components/TopNavBar.js";
class RadioItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          desc: { type: String, optional: false },
          img: { type: String, optional: false },
          value: { type: String, optional: false },
          checked: { type: Boolean, optional: false }
        };
      },
      name: "RadioItem"
    };
  }
  constructor(options, metadata = RadioItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.desc = this.__props__.desc;
    this.img = this.__props__.img;
    this.value = this.__props__.value;
    this.checked = this.__props__.checked;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceNight",
  setup(__props) {
    const val = common_vendor.ref("1");
    const select_img = common_vendor.ref("@/static/u4062.png");
    const radioItems = common_vendor.ref([new RadioItem({
      name: "黑白夜视",
      desc: "采用红外补光，隐蔽性高，图像为黑白夜视",
      img: "@/static/u4062.png",
      value: "1",
      checked: true
    }), new RadioItem({
      name: "全彩夜视",
      desc: "夜晚开白光灯，可做照明使用，图像为彩色",
      img: "@/static/u4063.png",
      value: "2",
      checked: false
    }), new RadioItem({
      name: "智能夜视",
      desc: "默认为黑白夜视，检测到画面为动态是变为全彩夜视",
      img: "@/static/u4064.png",
      value: "3",
      checked: false
    }), new RadioItem({
      name: "星光夜视",
      desc: "当前环境光线充足，并且不想看到灯光亮起，则选择该项",
      img: "@/static/u4062.png",
      value: "4",
      checked: false
    })]);
    const goBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        delta: 1
      }));
    };
    const change = (value) => {
      common_vendor.index.__f__("log", "at pages/index/deviceSettingInfo/deviceNight.uvue:78", "change:" + value);
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(goBack),
        b: common_vendor.p({
          title: "夜视模式",
          ["show-back"]: true
        }),
        c: select_img.value,
        d: common_vendor.f(radioItems.value, (item = null, index = null, i0 = null) => {
          return {
            a: common_vendor.t(item.name),
            b: "05994398-4-" + i0 + "," + ("05994398-3-" + i0),
            c: common_vendor.p({
              checked: item.checked,
              value: item.value,
              color: "#FFB703",
              borderColor: "#B2B2B2"
            }),
            d: common_vendor.t(item.desc),
            e: "05994398-3-" + i0 + "," + ("05994398-2-" + i0),
            f: index,
            g: "05994398-2-" + i0 + ",05994398-1"
          };
        }),
        e: common_vendor.o(change),
        f: common_vendor.o(($event = null) => {
          return val.value = $event;
        }),
        g: common_vendor.p({
          modelValue: val.value
        }),
        h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-05994398"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/deviceSettingInfo/deviceNight.js.map
