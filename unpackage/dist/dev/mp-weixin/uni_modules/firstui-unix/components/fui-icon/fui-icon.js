"use strict";
const common_vendor = require("../../../../common/vendor.js");
const icons = new UTSJSONObject({
  "addressbook": "",
  "addfriends-fill": "",
  "addfriends": "",
  "backspace-fill": "",
  "backspace": "",
  "bankcard-fill": "",
  "bankcard": "",
  "camera-fill": "",
  "camera": "",
  "captcha-fill": "",
  "captcha": "",
  "cart-fill": "",
  "cart": "",
  "classify": "",
  "classify-fill": "",
  "comment-fill": "",
  "comment": "",
  "community-fill": "",
  "community": "",
  "coupon-fill": "",
  "coupon": "",
  "delete": "",
  "delete-fill": "",
  "edit": "",
  "edit-fill": "",
  "fabulous-fill": "",
  "fabulous": "",
  "find": "",
  "find-fill": "",
  "help-fill": "",
  "help": "",
  "home-fill": "",
  "home": "",
  "idcard-fill": "",
  "idcard": "",
  "info": "",
  "info-fill": "",
  "invite-fill": "",
  "invite": "",
  "kefu-fill": "",
  "kefu": "",
  "like-fill": "",
  "like": "",
  "location": "",
  "location-fill": "",
  "lock": "",
  "lock-fill": "",
  "mail-fill": "",
  "mail": "",
  "message": "",
  "message-fill": "",
  "mobile-fill": "",
  "mobile": "",
  "more": "",
  "more-fill": "",
  "my-fill": "",
  "my": "",
  "principal": "",
  "notice-fill": "",
  "notice": "",
  "order": "",
  "order-fill": "",
  "picture": "",
  "picture-fill": "",
  "setup-fill": "",
  "setup": "",
  "share": "",
  "share-fill": "",
  "shop": "",
  "shop-fill": "",
  "star-fill": "",
  "star": "",
  "starhalf": "",
  "stepon-fill": "",
  "stepon": "",
  "wait-fill": "",
  "wait": "",
  "warning": "",
  "warning-fill": "",
  "plus": "",
  "plussign-fill": "",
  "plussign": "",
  "minus": "",
  "minussign": "",
  "minussign-fill": "",
  "close": "",
  "clear": "",
  "clear-fill": "",
  "checkbox-fill": "",
  "checkround": "",
  "checkbox": "",
  "check": "",
  "pulldown-fill": "",
  "pullup": "",
  "pullup-fill": "",
  "pulldown": "",
  "roundright-fill": "",
  "roundright": "",
  "arrowright": "",
  "arrowleft": "",
  "arrowdown": "",
  "left": "",
  "up": "",
  "right": "",
  "back": "",
  "top": "",
  "dropdown": "",
  "turningleft": "",
  "turningup": "",
  "turningright": "",
  "turningdown": "",
  "refresh": "",
  "loading": "",
  "search": "",
  "rotate": "",
  "screen": "",
  "signin": "",
  "calendar": "",
  "scan": "",
  "qrcode": "",
  "wallet": "",
  "telephone": "",
  "visible": "",
  "invisible": "",
  "menu": "",
  "operate": "",
  "slide": "",
  "list": "",
  "nonetwork": "",
  "partake": "",
  "qa": "",
  "barchart": "",
  "piechart": "",
  "linechart": "",
  "at": "",
  "face": "",
  "redpacket": "",
  "suspend": "",
  "link": "",
  "keyboard": "",
  "play": "",
  "video": "",
  "voice": "",
  "sina": "",
  "browser": "",
  "moments": "",
  "qq": "",
  "wechat": "",
  "balance": "",
  "bankcardpay": "",
  "wxpay": "",
  "alipay": "",
  "payment": "",
  "receive": "",
  "sendout": "",
  "evaluate": "",
  "aftersale": "",
  "warehouse": "",
  "transport": "",
  "delivery": "",
  "switch": "",
  "goods": "",
  "goods-fill": ""
});
const _sfc_main = common_vendor.defineComponent({
  name: "fui-icon",
  emits: ["onclick"],
  props: {
    name: {
      type: String,
      default: ""
    },
    size: {
      type: [Object, String, Number],
      default: 0
    },
    unit: {
      type: String,
      default: "rpx"
    },
    color: {
      type: String,
      default: ""
    },
    fontWeight: {
      type: String,
      default: "normal"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    param: {
      type: String,
      default: "0"
    },
    //是否显示为主色调，color为空时有效。【内部保留属性】
    primary: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getSize() {
      let size;
      if (typeof this.size == "number") {
        size = this.size.toString() + this.unit;
      } else if (typeof this.size == "string") {
        size = this.size + this.unit;
      } else {
        size = this.size.toString() + this.unit;
      }
      return size;
    },
    isBind() {
      const size = this.getSize;
      let bind = false;
      if (size == "" || size == "px" || size == "rpx" || size == "0rpx" || size == "0px") {
        bind = true;
      }
      return bind;
    },
    getIcon() {
      const icon = this.icons.getString(this.name);
      return icon == null ? "" : icon;
    },
    getIconStyl() {
      const mp = /* @__PURE__ */ new Map();
      mp.set("fontWeight", this.fontWeight);
      mp.set("fontSize", this.getSize);
      mp.set("lineHeight", this.getSize);
      if (this.color != "")
        mp.set("color", this.color);
      return mp;
    }
  },
  data() {
    return {
      icons
    };
  },
  methods: {
    handleClick() {
      if (this.disabled)
        return null;
      this.$emit("onclick", this.param);
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.getIcon),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "text"),
    c: common_vendor.s($options.getIconStyl),
    d: $options.isBind ? 1 : "",
    e: $props.primary && $props.color == "" ? 1 : "",
    f: $props.color == "" && !$props.primary ? 1 : "",
    g: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-479c54f4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-icon/fui-icon.js.map
