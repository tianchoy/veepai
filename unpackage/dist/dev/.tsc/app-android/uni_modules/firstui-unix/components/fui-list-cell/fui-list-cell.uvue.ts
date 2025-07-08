
	/**
	 * List 列表
	 * @description 列表Item项目，常用的布局组件。
	 * @tutorial https://unix.firstui.cn/
	 * @property {String} padding {String} padding值
	 * @property {Number} marginTop {Number} margin-top值，单位rpx
	 * @property {Number} marginBottom {Number} margin-bottom值，单位rpx
	 * @property {String} background {String} 背景颜色
	 * @property {Boolean} highlight {Boolean} 是否有点击效果
	 * @property {Boolean} arrow {Boolean} 是否需要右侧箭头
	 * @property {String} arrowColor {String} 右侧箭头颜色
	 * @property {Boolean} topBorder {Boolean} 是否显示上边框
	 * @property {Boolean} bottomBorder {Boolean} 是否显示下边框
	 * @property {String} borderColor {String} 边框颜色
	 * @property {Number} topLeft {Number} 上边框left值，单位rpx
	 * @property {Number} topRight {Number} 上边框right值，单位rpx
	 * @property {Number} bottomLeft {Number} 下边框left值，单位rpx
	 * @property {Number} bottomRight {Number} 下边框right值，单位rpx
	 * @property {String} radius {String} border-radius圆角值 , 如‘16rpx’
	 * @property {Number} index {Number} 索引值
	 * @event {Function} onclick 点击组件时触发，返回索引值，(event: number) => void
	 */
	const __sfc__ = defineComponent({
		name: "fui-list-cell",
		emits: ['onclick'],
		props: {
			padding: {
				type: String,
				default: ''
			},
			marginTop: {
				type: Number,
				default: 0
			},
			marginBottom: {
				type: Number,
				default: 0
			},
			background: {
				type: String,
				default: ''
			},
			highlight: {
				type: Boolean,
				default: true
			},
			arrow: {
				type: Boolean,
				default: false
			},
			arrowColor: {
				type: String,
				default: ''
			},
			topBorder: {
				type: Boolean,
				default: false
			},
			bottomBorder: {
				type: Boolean,
				default: true
			},
			borderColor: {
				type: String,
				default: ''
			},
			topLeft: {
				type: Number,
				default: 0
			},
			topRight: {
				type: Number,
				default: 0
			},
			bottomLeft: {
				type: Number,
				default: -1
			},
			bottomRight: {
				type: Number,
				default: 0
			},
			radius: {
				type: String,
				default: '0'
			},
			index: {
				type: Number,
				default: 0
			}
		},
		computed: {
			getPadding() : object {
				const mp : Map<string, string> = new Map();
				if (this.padding != '') mp.set('padding', this.padding);
				return mp;
			},
			getBorderColor(): object {
				const mp : Map<string, string> = new Map();
				if (this.arrowColor != '') mp.set('border-color', this.arrowColor);
				return mp;
			},
			getTopLineStyl() : object {
				const mp : Map<string, string> = new Map();
				if (this.borderColor != '') mp.set('background', this.borderColor);
				mp.set('left', `${this.topLeft}rpx`);
				mp.set('right', `${this.topRight}rpx`);
				return mp;
			},
			getBtmLineStyl() : object {
				const mp : Map<string, string> = new Map();
				if (this.borderColor != '') mp.set('background', this.borderColor);
				mp.set('left', `${this.bottomLeft == -1 ? 0 : this.bottomLeft}rpx`);
				mp.set('right', `${this.bottomRight}rpx`);
				return mp;
			}
		},
		methods: {
			handleClick() {
				this.$emit('onclick', this.index);
			}
		}
	})

export default __sfc__
function GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCellRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return createElementVNode("view", utsMapOf({
    class: normalizeClass(["fui-list__cell", utsMapOf({'fui-list__cell-background':_ctx.background==''})]),
    "hover-class": _ctx.highlight?'fui-list__cell-highlight':'',
    "hover-stay-time": 150,
    style: normalizeStyle(utsMapOf({background:_ctx.background,marginTop:`${_ctx.marginTop}rpx`,marginBottom:`${_ctx.marginBottom}rpx`,borderRadius:_ctx.radius})),
    onClick: _ctx.handleClick
  }), [
    isTrue(_ctx.topBorder)
      ? createElementVNode("view", utsMapOf({
          key: 0,
          style: normalizeStyle(_ctx.getTopLineStyl),
          class: normalizeClass(["fui-cell__border-top", utsMapOf({'fui-cell__border-color':_ctx.borderColor==''})])
        }), null, 6 /* CLASS, STYLE */)
      : createCommentVNode("v-if", true),
    createElementVNode("view", utsMapOf({
      class: normalizeClass(["fui-list__cell-inner", utsMapOf({'fui-list__cell-padding':_ctx.padding==''})]),
      style: normalizeStyle(_ctx.getPadding)
    }), [
      renderSlot(_ctx.$slots, "default"),
      isTrue(_ctx.arrow)
        ? createElementVNode("view", utsMapOf({
            key: 0,
            class: normalizeClass(["fui-cell__arrow", utsMapOf({'fui-list__cell-arrowcolor':_ctx.arrowColor==''})]),
            style: normalizeStyle(_ctx.getBorderColor)
          }), null, 6 /* CLASS, STYLE */)
        : createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */),
    isTrue(_ctx.bottomBorder)
      ? createElementVNode("view", utsMapOf({
          key: 1,
          style: normalizeStyle(_ctx.getBtmLineStyl),
          class: normalizeClass(["fui-cell__border-bottom", utsMapOf({'fui-cell__border-color':_ctx.borderColor=='','fui-list__cell-bleft':_ctx.bottomLeft==-1})])
        }), null, 6 /* CLASS, STYLE */)
      : createCommentVNode("v-if", true)
  ], 14 /* CLASS, STYLE, PROPS */, ["hover-class", "onClick"])
}
export type FuiListCellComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCellStyles = [utsMapOf([["fui-list__cell", padStyleMapOf(utsMapOf([["position", "relative"], ["width", "100%"], ["display", "flex"], ["flexDirection", "row"], ["boxSizing", "border-box"]]))], ["fui-list__cell-inner", padStyleMapOf(utsMapOf([["flex", 1], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["boxSizing", "border-box"]]))], ["fui-cell__arrow", padStyleMapOf(utsMapOf([["height", "40rpx"], ["width", "40rpx"], ["borderTopWidth", 3], ["borderRightWidth", 3], ["borderBottomWidth", 0], ["borderLeftWidth", 0], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["transform", "rotate(45deg) scale(0.5)"], ["borderTopLeftRadius", "4rpx"], ["borderTopRightRadius", "4rpx"], ["borderBottomRightRadius", "4rpx"], ["borderBottomLeftRadius", "4rpx"], ["flexShrink", 0], ["marginLeft", "auto"], ["boxSizing", "border-box"], ["transformOrigin", "center center"], ["marginRight", "-5.8579rpx"]]))], ["fui-cell__border-top", padStyleMapOf(utsMapOf([["position", "absolute"], ["top", 0], ["height", 0.5], ["zIndex", 1], ["transform", "scaleY(0.5)"], ["transformOrigin", "0 0"], ["pointerEvents", "none"]]))], ["fui-cell__border-bottom", padStyleMapOf(utsMapOf([["position", "absolute"], ["bottom", 0], ["height", 1], ["transform", "scaleY(0.5)"], ["transformOrigin", "0 100%"], ["zIndex", 1], ["pointerEvents", "none"]]))], ["fui-cell__border-color", padStyleMapOf(utsMapOf([["!backgroundColor", "#EEEEEE"]]))], ["fui-list__cell-background", padStyleMapOf(utsMapOf([["!backgroundColor", "#FFFFFF"]]))], ["fui-list__cell-highlight", padStyleMapOf(utsMapOf([["!backgroundColor", "rgba(0,0,0,0.2)"]]))], ["fui-list__cell-padding", padStyleMapOf(utsMapOf([["!paddingTop", "32rpx"], ["!paddingRight", "32rpx"], ["!paddingBottom", "32rpx"], ["!paddingLeft", "32rpx"]]))], ["fui-list__cell-arrowcolor", padStyleMapOf(utsMapOf([["!borderTopColor", "#B2B2B2"], ["!borderRightColor", "#B2B2B2"], ["!borderBottomColor", "#B2B2B2"], ["!borderLeftColor", "#B2B2B2"]]))], ["fui-list__cell-bleft", padStyleMapOf(utsMapOf([["!left", "32rpx"]]))]])]
