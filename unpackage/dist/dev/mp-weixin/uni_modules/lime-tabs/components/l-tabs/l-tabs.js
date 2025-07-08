"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeTabs_components_lTabs_utils = require("./utils.js");
const uni_modules_limeShared_clamp_index = require("../../../lime-shared/clamp/index.js");
const uni_modules_limeShared_getRect_vue = require("../../../lime-shared/getRect/vue.js");
const uni_modules_limeTabs_components_lTabs_touch = require("./touch.js");
if (!Array) {
  const _easycom_l_badge_1 = common_vendor.resolveComponent("l-badge");
  _easycom_l_badge_1();
}
const _easycom_l_badge = () => "../../../lime-badge/components/l-badge/l-badge.js";
if (!Math) {
  _easycom_l_badge();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-tabs",
  props: /* @__PURE__ */ common_vendor.mergeModels(new UTSJSONObject({
    list: {},
    ellipsis: { type: Boolean, default: false },
    animated: { type: Boolean, default: false },
    duration: { default: 0.3 },
    showLine: { type: Boolean, default: true },
    size: { default: "medium" },
    spaceEvenly: { type: Boolean, default: true },
    swipeable: { type: Boolean, default: false },
    value: {},
    color: {},
    activeColor: {},
    lineColor: {},
    lineWidth: {},
    lineHeight: {},
    bgColor: {},
    fontSize: {},
    padding: {},
    split: { type: Boolean, default: true },
    visible: { type: Boolean, default: false },
    swiperProgress: { default: 0 },
    syncSwiper: { type: Boolean, default: false },
    lStyle: {}
  }), new UTSJSONObject({
    "modelValue": { type: Number },
    "modelModifiers": {}
  })),
  emits: /* @__PURE__ */ common_vendor.mergeModels(["change", "click"], ["update:modelValue"]),
  setup(__props, _a) {
    var __emit = _a.emit;
    const emits = __emit;
    common_vendor.useSlots();
    const props = __props;
    const children = common_vendor.ref([]);
    const scrollLeft = common_vendor.ref(0);
    const lastLeft = common_vendor.ref(0);
    const context = common_vendor.getCurrentInstance().proxy;
    const trackDistance = common_vendor.ref(0);
    const innerStyle = common_vendor.reactive(new UTSJSONObject({
      width: "",
      "transition-duration": ``,
      "transform": ``
    }));
    const modelValue = common_vendor.useModel(__props, "modelValue");
    const currentValue = common_vendor.computed({
      set(value) {
        modelValue.value = value;
        emits("change", value);
      },
      get() {
        var _a2;
        return (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : modelValue.value;
      }
    });
    const styles = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      if (props.bgColor != null) {
        style.set("--l-tab-nav-bg-color", props.bgColor);
      }
      if (!["medium", "large"].includes(props.size)) {
        style.set("--l-tab-item-height", props.size);
      }
      if (props.padding != null) {
        style.set("--l-tab-item-padding", props.padding);
      }
      if (props.fontSize != null) {
        style.set("--l-tab-font-size", props.fontSize);
      }
      return style;
    });
    const trackStyle = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map([
        ["-webkit-transform", `translateX(${trackDistance.value}px)`],
        ["transform", `translateX(${trackDistance.value}px)`]
      ]);
      if (props.lineColor != null) {
        style.set("background", props.lineColor);
      }
      if (props.lineWidth != null) {
        style.set("width", props.lineWidth);
      }
      if (props.lineHeight != null) {
        style.set("height", props.lineHeight);
      }
      return style;
    });
    const itemStyle = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      return style;
    });
    const textStyles = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      return style;
    });
    const tabs = common_vendor.computed(() => {
      if (props.list != null && props.list.length > 0) {
        return props.list.map((item = null) => {
          var _a2, _b;
          return {
            badge: item.get("badge"),
            dot: (_a2 = item.getBoolean("dot")) !== null && _a2 !== void 0 ? _a2 : false,
            disabled: (_b = item.getBoolean("disabled")) !== null && _b !== void 0 ? _b : false,
            label: item.getString("label"),
            offset: item.getArray("offset"),
            value: item.getNumber("value"),
            node: item
          };
        });
      }
      return children.value.map((item) => {
        var _a2, _b, _c, _d, _g;
        const offset = (_a2 = item.offset) !== null && _a2 !== void 0 ? _a2 : [];
        return {
          badge: item.badge,
          dot: (_b = item.dot) !== null && _b !== void 0 ? _b : false,
          disabled: (_c = item.disabled) !== null && _c !== void 0 ? _c : false,
          label: item.label,
          offset,
          value: item.value,
          node: {
            badge: item.badge,
            dot: (_d = item.dot) !== null && _d !== void 0 ? _d : false,
            disabled: (_g = item.disabled) !== null && _g !== void 0 ? _g : false,
            label: item.label,
            offset,
            value: item.value
          }
        };
      });
    });
    const currentIndex = common_vendor.computed(() => {
      const index = tabs.value.findIndex((child, index2) => {
        var _a2;
        return ((_a2 = child.value) !== null && _a2 !== void 0 ? _a2 : index2) == currentValue.value;
      });
      return index > -1 ? index : 0;
    });
    const scrollRef = common_vendor.ref(null);
    const trackRef = common_vendor.ref(null);
    const navRef = common_vendor.ref(null);
    const innerRef = common_vendor.ref(null);
    const tabRects = common_vendor.ref([]);
    const containerWidth = common_vendor.ref(0);
    const trackLineWidth = common_vendor.ref(0);
    const isInteracting = common_vendor.ref(false);
    let timer = 0;
    const measureTabs = () => {
      return new Promise((resolve) => {
        if (tabRects.value.length > 0 && tabRects.value[0].width > 0) {
          resolve();
        }
        Promise.all([
          uni_modules_limeShared_getRect_vue.getRect(`.l-tabs__scroll`, context),
          uni_modules_limeShared_getRect_vue.getRect(`.l-tabs__track`, context),
          uni_modules_limeShared_getRect_vue.getAllRect(`.l-tabs__item`, context)
        ]).then((_a2) => {
          var _b = common_vendor.__read(_a2 == void 0 ? null : _a2, 3), scrollRect = _b[0], trackRect = _b[1], tabsRects = _b[2];
          containerWidth.value = scrollRect.width;
          tabRects.value = tabsRects;
          trackLineWidth.value = trackRect.width;
          resolve();
        });
      });
    };
    const moveToActiveTab = () => {
      measureTabs().then(() => {
        const index = currentIndex.value;
        if (tabRects.value.length <= index)
          return null;
        const tabRect = tabRects.value[index];
        let count = 0;
        let distance = 0;
        let totalSize = 0;
        tabRects.value.forEach((item) => {
          if (count < index) {
            distance += item.width;
            count += 1;
          }
          totalSize += item.width;
        });
        if (totalSize == 0)
          return null;
        distance += (tabRect.width - trackLineWidth.value) / 2;
        trackDistance.value = distance;
        const scrollOffset = uni_modules_limeTabs_components_lTabs_utils.calcScrollOffset(containerWidth.value, tabRect.left, tabRect.width, lastLeft.value);
        const maxOffset = totalSize - containerWidth.value;
        scrollLeft.value = uni_modules_limeShared_clamp_index.clamp(scrollOffset, 0, maxOffset);
      });
    };
    const updateInnerStyle = (offset) => {
      common_vendor.nextTick$1(() => {
        Promise.all([
          uni_modules_limeShared_getRect_vue.getRect(".l-tabs__content", context),
          uni_modules_limeShared_getRect_vue.getRect(".l-tabs__content-inner", context)
        ]).then((_a2) => {
          var _b = common_vendor.__read(_a2 == void 0 ? null : _a2, 2), parent = _b[0];
          _b[1];
          const left = -parent.width * currentIndex.value + offset;
          if (offset != 0) {
            innerStyle.transform = `translateX(${left}px)`;
            innerStyle["transition-duration"] = `0s`;
          } else {
            if (props.animated) {
              innerStyle["transition-duration"] = offset != 0 || !props.animated ? "0s" : `${props.duration}s`;
            }
            innerStyle.transform = `translateX(${left}px)`;
          }
        }).catch((err = null) => {
        });
      });
    };
    const onScroll = (e) => {
      lastLeft.value = e.detail.scrollLeft;
    };
    const updateDuration = (duration) => {
      innerStyle["transition-duration"] = `${duration}s`;
    };
    const onClick = (index, item) => {
      isInteracting.value = true;
      const _a2 = item.value, value = _a2 == void 0 ? index : _a2, disabled = item.disabled;
      item.label;
      if (disabled || currentValue.value == value)
        return null;
      currentValue.value = value;
      emits("click", value);
      updateDuration(0.3);
      common_vendor.nextTick$1(() => {
        moveToActiveTab();
      });
      clearTimeout(timer);
      timer = setTimeout(() => {
        isInteracting.value = false;
      }, 500);
    };
    const getAvailableTabIndex = (deltaX) => {
      const step = deltaX > 0 ? -1 : 1;
      const len = tabs.value.length;
      for (let i = step; currentIndex.value + step >= 0 && currentIndex.value + step < len; i += step) {
        const newIndex = currentIndex.value + i;
        if (newIndex >= 0 && newIndex < len && tabs.value.length > newIndex && !tabs.value[newIndex].disabled) {
          return newIndex;
        }
      }
      return -1;
    };
    const touch = uni_modules_limeTabs_components_lTabs_touch.useTouch();
    const onTouchStart = (event) => {
      isInteracting.value = true;
      if (!props.swipeable)
        return null;
      touch.start(event);
      updateDuration(0.3);
    };
    const onTouchMove = (event) => {
      if (!props.swipeable)
        return null;
      touch.move(event);
      const direction = touch.direction, deltaX = touch.deltaX;
      if (direction.value != "horizontal")
        return null;
      if (!props.animated)
        return null;
      const isAtFirstTab = currentIndex.value == 0;
      const isAtLastTab = currentIndex.value == tabs.value.length - 1;
      if (isAtFirstTab && deltaX.value > 0 || isAtLastTab && deltaX.value < 0) {
        const base = isAtFirstTab ? 1 : -1;
        const adjustedDelta = uni_modules_limeTabs_components_lTabs_utils.ease(deltaX.value, base);
        updateInnerStyle(adjustedDelta);
      } else {
        updateInnerStyle(deltaX.value);
      }
    };
    const onTouchEnd = () => {
      isInteracting.value = false;
      if (!props.swipeable)
        return null;
      const direction = touch.direction, deltaX = touch.deltaX, offsetX = touch.offsetX;
      const minSwipeDistance = 50;
      if (direction.value == "horizontal" && offsetX.value >= minSwipeDistance) {
        const index = getAvailableTabIndex(deltaX.value);
        if (index != -1) {
          onClick(index, tabs.value[index]);
        }
      }
      updateInnerStyle(0);
    };
    const stopWatch = common_vendor.watch(tabs, (_v) => {
      setTimeout(() => {
        moveToActiveTab();
      }, 50);
    });
    const stopValueWatch = common_vendor.watch(currentValue, (_v) => {
      if (tabs.value.length == 0)
        return null;
      moveToActiveTab();
      updateInnerStyle(0);
    });
    const stopVisibleWatch = common_vendor.watch(() => {
      return props.visible;
    }, (v) => {
      if (!v)
        return null;
      setTimeout(() => {
        moveToActiveTab();
        updateInnerStyle(0);
      }, 100);
    });
    const updateTrackPosition = (progress) => {
      if (!props.syncSwiper || !props.showLine || progress == 0 || isInteracting.value)
        return null;
      updateDuration(0);
      const currentIdx = currentIndex.value;
      const next = () => {
        const direction = progress > 0 ? 1 : -1;
        const nextIdx = currentIdx + direction;
        if (nextIdx < 0 || nextIdx >= tabRects.value.length)
          return null;
        const currentTab = tabRects.value[currentIdx];
        const nextTab = tabRects.value[nextIdx];
        const ratio = Math.abs(progress);
        const currentPos = currentTab.left + (currentTab.width - trackLineWidth.value) / 2;
        const nextPos = nextTab.left + (nextTab.width - trackLineWidth.value) / 2;
        const newPosition = direction > 0 ? currentPos + (nextPos - currentPos) * ratio : currentPos - (currentPos - nextPos) * ratio;
        trackDistance.value = newPosition;
      };
      measureTabs().then(next);
    };
    common_vendor.watch(() => {
      return props.swiperProgress;
    }, (progress) => {
      updateTrackPosition(progress);
    });
    common_vendor.onMounted(() => {
      common_vendor.nextTick$1(() => {
        setTimeout(() => {
          if (tabs.value.length == 0)
            return null;
          moveToActiveTab();
          updateInnerStyle(0);
        }, 100);
      });
    });
    common_vendor.onUnmounted(() => {
      stopWatch();
      stopValueWatch();
      stopVisibleWatch();
    });
    common_vendor.provide("LimeTabs", children);
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.f(common_vendor.unref(tabs), (item = null, index = null, i0 = null) => {
          return common_vendor.e(new UTSJSONObject({
            a: item.dot == true || item.badge != null
          }), item.dot == true || item.badge != null ? new UTSJSONObject({
            b: common_vendor.t(item.label),
            c: common_vendor.s(common_vendor.unref(textStyles)),
            d: common_vendor.s(!item.disabled && _ctx.color != null && index != common_vendor.unref(currentIndex) ? "color:" + _ctx.color : ""),
            e: common_vendor.s(!item.disabled && _ctx.activeColor != null && index == common_vendor.unref(currentIndex) ? "color:" + _ctx.activeColor : ""),
            f: common_vendor.n("l-tabs__item-text--" + _ctx.size),
            g: common_vendor.n(new UTSJSONObject({
              "l-tabs__item-text--disabled": item.disabled,
              "l-tabs__item-text--active": index == common_vendor.unref(currentIndex)
            })),
            h: "0be10804-0-" + i0,
            i: common_vendor.p(new UTSJSONObject({
              dot: item.dot,
              offset: item.offset,
              content: item.badge
            }))
          }) : new UTSJSONObject({
            j: common_vendor.t(item.label),
            k: common_vendor.s(common_vendor.unref(textStyles)),
            l: common_vendor.s(!item.disabled && _ctx.color != null && index != common_vendor.unref(currentIndex) ? "color:" + _ctx.color : ""),
            m: common_vendor.s(!item.disabled && _ctx.activeColor != null && index == common_vendor.unref(currentIndex) ? "color:" + _ctx.activeColor : ""),
            n: common_vendor.n("l-tabs__item-text--" + _ctx.size),
            o: common_vendor.n(new UTSJSONObject({
              "l-tabs__item-text--disabled": item.disabled,
              "l-tabs__item-text--active": index == common_vendor.unref(currentIndex)
            }))
          }), new UTSJSONObject({
            p: "label-" + i0,
            q: common_vendor.r("label", new UTSJSONObject({
              item,
              active: index == common_vendor.unref(currentIndex),
              disabled: item.disabled
            }), i0),
            r: index,
            s: index == common_vendor.unref(currentIndex) ? 1 : "",
            t: item.disabled ? 1 : "",
            v: common_vendor.o(($event = null) => {
              return onClick(index, item);
            }, index)
          }));
        }),
        b: common_vendor.s(common_vendor.unref(itemStyle)),
        c: _ctx.spaceEvenly ? 1 : "",
        d: common_vendor.sei("r0-0be10804", "view", trackRef, new UTSJSONObject({
          "k": "trackRef"
        })),
        e: common_vendor.s(common_vendor.unref(trackStyle)),
        f: common_vendor.sei("r1-0be10804", "view", navRef, new UTSJSONObject({
          "k": "navRef"
        })),
        g: common_vendor.sei("r2-0be10804", "scroll-view", scrollRef, new UTSJSONObject({
          "k": "scrollRef"
        })),
        h: _ctx.split ? 1 : "",
        i: common_vendor.unref(scrollLeft),
        j: common_vendor.o(onScroll),
        k: common_vendor.s(common_vendor.unref(styles)),
        l: common_vendor.s(_ctx.lStyle),
        m: _ctx.$slots["default"] != null
      }), _ctx.$slots["default"] != null ? new UTSJSONObject({
        n: common_vendor.sei("r3-0be10804", "view", innerRef, new UTSJSONObject({
          "k": "innerRef"
        })),
        o: common_vendor.s(common_vendor.unref(innerStyle)),
        p: common_vendor.s(new UTSJSONObject({
          width: common_vendor.unref(tabs).length * 100 + "%"
        })),
        q: common_vendor.o(onTouchStart),
        r: common_vendor.o(onTouchMove),
        s: common_vendor.o(onTouchEnd),
        t: common_vendor.o(onTouchEnd),
        v: _ctx.animated ? 1 : ""
      }) : new UTSJSONObject({}), new UTSJSONObject({
        w: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-tabs/components/l-tabs/l-tabs.js.map
