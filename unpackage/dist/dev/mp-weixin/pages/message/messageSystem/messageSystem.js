"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_tag_1 = common_vendor.resolveComponent("fui-tag");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  (_easycom_fui_tag_1 + _easycom_fui_button_1)();
}
const _easycom_fui_tag = () => "../../../uni_modules/firstui-unix/components/fui-tag/fui-tag.js";
const _easycom_fui_button = () => "../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  (_easycom_fui_tag + _easycom_fui_button)();
}
class msgType extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          desc: { type: String, optional: false },
          time: { type: String, optional: false },
          type: { type: String, optional: false },
          flag: { type: String, optional: false }
        };
      },
      name: "msgType"
    };
  }
  constructor(options, metadata = msgType.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.desc = this.__props__.desc;
    this.time = this.__props__.time;
    this.type = this.__props__.type;
    this.flag = this.__props__.flag;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "messageSystem",
  setup(__props) {
    const content = common_vendor.ref([
      new msgType({
        id: 1,
        desc: "您的XXX设备(ICCID:123456789)流量即将到期，请及时续费",
        time: "2024-10-24 15:58:32",
        type: "notice",
        flag: "unread"
      }),
      new msgType({
        id: 2,
        desc: "您的XXX设备(ICCID:123456789)流量已到期",
        time: "2024-10-24 15:58:32",
        type: "announcement",
        flag: "read"
      }),
      new msgType({
        id: 3,
        desc: "您的XXX设备(ICCID:123456789)流量已到期",
        time: "2024-10-24 15:58:32",
        type: "share",
        flag: "read"
      })
    ]);
    const read = (id) => {
      common_vendor.index.showToast({
        title: "已标记为已读" + id.toString()
      });
    };
    const submit = () => {
      common_vendor.index.showToast({
        title: "确认分享",
        icon: "none"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.f(content.value, (item = null, index = null, i0 = null) => {
          return common_vendor.e({
            a: item.flag == "unread" ? "/static/dot.png" : "",
            b: common_vendor.t(item.desc),
            c: common_vendor.o(($event = null) => {
              return read(item.id);
            }, index),
            d: item.type == "notice"
          }, item.type == "notice" ? {
            e: "ee3533d2-0-" + i0,
            f: common_vendor.p({
              text: "通知",
              ["margin-bottom"]: 24,
              ["margin-right"]: 24
            })
          } : item.type == "announcement" ? {
            h: "ee3533d2-1-" + i0,
            i: common_vendor.p({
              text: "公告",
              type: "success",
              ["margin-bottom"]: 24,
              ["margin-right"]: 24
            })
          } : item.type == "share" ? {
            k: "ee3533d2-2-" + i0,
            l: common_vendor.p({
              text: "分享",
              type: "warning",
              ["margin-bottom"]: 24,
              ["margin-right"]: 24
            })
          } : {}, {
            g: item.type == "announcement",
            j: item.type == "share",
            m: common_vendor.t(item.time),
            n: item.type == "share"
          }, item.type == "share" ? {
            o: common_vendor.o(submit, index),
            p: "ee3533d2-3-" + i0,
            q: common_vendor.p({
              width: "100rpx",
              height: "40rpx",
              size: 25,
              text: "确认"
            })
          } : {}, {
            r: index
          });
        }),
        b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ee3533d2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/message/messageSystem/messageSystem.js.map
