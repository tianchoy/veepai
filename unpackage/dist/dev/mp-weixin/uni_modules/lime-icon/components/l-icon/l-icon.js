"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeShared_addUnit_index = require("../../../lime-shared/addUnit/index.js");
const uni_modules_limeIcon_components_lIcon_icons = require("./icons.js");
const name = "l-icon";
const IconifyURL = "https://api.iconify.design/";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-icon",
  props: {
    name: new UTSJSONObject({
      type: String,
      default: "",
      required: true
      // validator: (value: string) : boolean => {
      // 	// 确保是字符串类型且不为空
      // 	return typeof value == 'string' && value.trim().length > 0
      // }
    }),
    color: new UTSJSONObject({
      type: String
      // default: ''
    }),
    size: new UTSJSONObject({
      type: [String, Number]
    }),
    prefix: new UTSJSONObject({
      type: String,
      default: ""
    }),
    lClass: new UTSJSONObject({
      type: String,
      default: ""
    }),
    // 对安卓IOS无效
    inherit: new UTSJSONObject({
      type: Boolean,
      default: true
    }),
    web: new UTSJSONObject({
      type: Boolean,
      default: false
    }),
    lStyle: new UTSJSONObject({
      type: [String, Object, Array],
      default: ""
    })
  },
  emits: ["click"],
  setup(__props, _a) {
    _a.emit;
    const $iconsHost = common_vendor.index.getStorageSync("$limeIconsHost");
    const props = __props;
    const $iconCollection = common_vendor.inject("$iconCollection", { has: false, icons: /* @__PURE__ */ new Map() });
    const innerName = common_vendor.computed(() => {
      var _a2;
      return (_a2 = props.name) !== null && _a2 !== void 0 ? _a2 : "";
    });
    const collectionIcon = common_vendor.computed(() => {
      return UTS.mapGet($iconCollection.icons, innerName.value);
    });
    common_vendor.ref(null);
    const hasHost = common_vendor.computed(() => {
      return innerName.value.indexOf("/") != -1;
    });
    const isIconify = common_vendor.computed(() => {
      return !hasHost.value && innerName.value.includes(":");
    });
    const isImage = common_vendor.computed(() => {
      return /\.(jpe?g|png|gif|bmp|webp|tiff?)$/i.test(innerName.value) || /^data:image\/(jpeg|png|gif|bmp|webp|tiff);base64,/.test(innerName.value);
    });
    const isSVG = common_vendor.computed(() => {
      return /\.svg$/i.test(innerName.value) || innerName.value.startsWith("data:image/svg+xml") || innerName.value.startsWith("<svg");
    });
    const classes = common_vendor.computed(() => {
      const cls = /* @__PURE__ */ new Map();
      cls.set(`${name}--font`, !isImage.value && !isIconify.value && !isSVG.value);
      cls.set(`${name}--image`, isImage.value || isIconify.value || isSVG.value);
      cls.set(props.prefix, props.prefix.length > 0);
      cls.set(props.lClass, props.lClass.length > 0);
      cls.set(`is-inherit`, isIconify.value && (props.color && props.color.length > 0 || props.inherit));
      return cls;
    });
    const styles = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      if (props.color) {
        style.set("color", props.color);
      }
      const size = uni_modules_limeShared_addUnit_index.addUnit(props.size);
      if (size != null) {
        if (isImage.value || isIconify.value || isSVG.value) {
          style.set("height", size);
          style.set("width", size);
        } else {
          style.set("font-size", size);
        }
      }
      return style;
    });
    const iconCode = common_vendor.computed(() => {
      var _a2;
      return (_a2 = uni_modules_limeIcon_components_lIcon_icons.icons.value.get(innerName.value)) !== null && _a2 !== void 0 ? _a2 : /[^\x00-\x7F]/.test(innerName.value) ? innerName.value : "";
    });
    const isError = common_vendor.ref(false);
    const cacheMap = /* @__PURE__ */ new Map();
    const iconUrl = common_vendor.computed(() => {
      var _a2;
      const hasIconsHost = $iconsHost != null && $iconsHost != "";
      if (isImage.value) {
        return hasHost.value ? innerName.value : ($iconsHost !== null && $iconsHost !== void 0 ? $iconsHost : "") + innerName.value;
      } else if (isIconify.value) {
        if (cacheMap.has(innerName.value) && !isError.value) {
          return UTS.mapGet(cacheMap, innerName.value);
        }
        const _host = `${hasIconsHost ? $iconsHost : IconifyURL}`;
        const _icon = (_a2 = collectionIcon.value) !== null && _a2 !== void 0 ? _a2 : _host + `${innerName.value}.svg`.replace(/:/g, "/");
        cacheMap.set(innerName.value, _icon);
        return _icon;
      } else if (isSVG.value) {
        return (/\.svg$/i.test(innerName.value) && $iconsHost != null && !hasHost.value ? $iconsHost : "") + innerName.value.replace(/'/g, '"');
      } else {
        return "";
      }
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: !common_vendor.unref(isImage) && !common_vendor.unref(isIconify) && !common_vendor.unref(isSVG)
      }), !common_vendor.unref(isImage) && !common_vendor.unref(isIconify) && !common_vendor.unref(isSVG) ? new UTSJSONObject({
        b: common_vendor.t(common_vendor.unref(iconCode)),
        c: common_vendor.n(common_vendor.unref(classes)),
        d: common_vendor.n(__props.lClass),
        e: common_vendor.s(common_vendor.unref(styles)),
        f: common_vendor.s(__props.lStyle),
        g: common_vendor.o(($event = null) => {
          return _ctx.$emit("click");
        })
      }) : !common_vendor.unref(isSVG) && !common_vendor.unref(isIconify) && common_vendor.unref(isImage) ? new UTSJSONObject({
        i: common_vendor.n(common_vendor.unref(classes)),
        j: common_vendor.n(__props.lClass),
        k: common_vendor.s(common_vendor.unref(styles)),
        l: common_vendor.s(__props.lStyle),
        m: common_vendor.unref(iconUrl),
        n: common_vendor.o(($event = null) => {
          return _ctx.$emit("click");
        })
      }) : new UTSJSONObject({}), new UTSJSONObject({
        h: !common_vendor.unref(isSVG) && !common_vendor.unref(isIconify) && common_vendor.unref(isImage)
      }));
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-icon/components/l-icon/l-icon.js.map
