
	import { ComponentPublicInstance } from 'vue'
	/**
	 * Switch 开关
	 * @description Switch 开关选择器，原生组件增强。
	 * @tutorial https://unix.firstui.cn/
	 * @property {String} name {String}	开关选择器名称
	 * @property {Boolean} checked {Boolean} 是否打开
	 * @property {Boolean} disabled	 {Boolean} 是否禁用
	 * @property {Boolean} disabledStyle {Boolean} 禁用后是否改变样式
	 * @property {String} type {String}	开关显示样式，有效值：switch, checkbox
	 * @property {String} color {String} 开关打开时颜色
	 * @property {String} normalColor {String} 开关未选中时背景色颜色
	 * @property {String} transitionColor {String} 开关过渡动画颜色
	 * @property {String} btnColor {String} 开关打开时按钮背景色
	 * @property {String} btnNormalColor {String} 开关关闭时按钮背景色
	 * @property {String} borderColor {String} 边框颜色，type=checkbox时生效
	 * @property {String} checkMarkColor {String} 对号颜色，type=checkbox时生效
	 * @property {Number} scaleRatio {Number} 缩放比例，当比例大于1时，外层容器需要设置 overflow: visible或者留出足够空间，避免显示不全
	 * @property {String} scaleAlign {String} 缩放后对齐方式,可选值：left、center、right
	 * @event {Function} change 开关切换状态时触发，(event: boolean) => void
	 * @event {Function} update:checked 开关切换状态时触发，用于双向绑定，v-model:checked，(event: boolean) => void
	 */
	const __sfc__ = defineComponent({
		name: "fui-switch",
		emits: ['change', 'update:checked'],
		props: {
			name: {
				type: String,
				default: ''
			},
			checked: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			disabledStyle: {
				type: Boolean,
				default: true
			},
			type: {
				type: String,
				default: 'switch'
			},
			color: {
				type: String,
				default: ''
			},
			normalColor: {
				type: String,
				default: ''
			},
			transitionColor: {
				type: String,
				default: ''
			},
			btnColor: {
				type: String,
				default: ''
			},
			btnNormalColor: {
				type: String,
				default: ''
			},
			borderColor: {
				type: String,
				default: ''
			},
			checkMarkColor: {
				type: String,
				default: ''
			},
			scaleRatio: {
				type: Number,
				default: 1
			},
			scaleAlign: {
				type: String,
				default: 'center'
			}
		},
		data() {
			return {
				val: false,
				styleVal: false,
				isLabel: false,
				fuiLabel: null as null | ComponentPublicInstance,
				fuiForm: null as null | ComponentPublicInstance
			};
		},
		computed: {
			getStyle() : object {
				const mp : Map<string, string> = new Map();
				if (this.val) {
					if (this.btnColor != '') mp.set('background', this.btnColor);
				} else {
					if (this.btnNormalColor != '') mp.set('background', this.btnNormalColor);
				}
				return mp
			},
			getSwitchStyl() : object {
				const mp : Map<string, string> = new Map();
				if (this.val) {
					if (this.color != '') {
						mp.set('borderColor', this.color);
						mp.set('background', this.color);
					}
				} else {
					if (this.transitionColor != '') mp.set('background', this.transitionColor);
					if (this.borderColor != '') mp.set('borderColor', this.borderColor);
				}

				return mp;
			},
			getBeforeBgColor() : object {
				const mp : Map<string, string> = new Map();
				if (this.normalColor != '') mp.set('background', this.normalColor)
				return mp;
			},
			getMarkStyl() : object {
				const mp : Map<string, string> = new Map();
				if (this.checkMarkColor != '') {
					mp.set('borderBottomColor', this.checkMarkColor)
					mp.set('borderRightColor', this.checkMarkColor)
				}
				return mp;
			}
		},
		watch: {
			checked(val : boolean) {
				this.val = val;
			},
			val() {
				setTimeout(() => {
					this.styleVal = this.val
				}, 0)
			}
		},
		created() {
			this.val = this.checked;
			const parent = this.getParent('fui-label');
			if (parent) {
				this.isLabel = true
				const label = this.fuiLabel as ComponentPublicInstance
				(label.$data['childrens'] as ComponentPublicInstance[]).push(this as ComponentPublicInstance);
			}
			//用于submit、reset事件
			const isForm = this.getParent('fui-form');
			if (isForm) {
				const form = this.fuiForm as ComponentPublicInstance
				(form.$data['formChildren'] as ComponentPublicInstance[]).push(this as ComponentPublicInstance);
			}
		},
		methods: {
			onChange(e : UniPointerEvent) {
				e.stopPropagation();
				if (this.disabled) return;
				this.emitChange(!this.val)
			},
			emitChange(e : boolean) {
				this.val = e;
				this.$emit('change', e)
				this.$emit('update:checked', e)
			},
			labelClick() {
				if (this.disabled) return;
				this.emitChange(!this.val)
			},
			//provide/inject方式（可能有警告，设置default:null也无法去除，应该是底层有bug）
			getParent(name : string) : boolean {
				if (this.$parent == null) return false;
				let parent = this.$parent as ComponentPublicInstance;
				let parentName = parent.$options['name'];
				while (parentName != name) {
					if (parent.$parent == null) return false;
					parent = parent.$parent as ComponentPublicInstance;
					if (parent.$options['name'] == '') return false;
					parentName = parent.$options['name'];
				}
				if (name == 'fui-label') {
					this.fuiLabel = parent;
				} else if (name == 'fui-form') {
					this.fuiForm = parent;
				}
				return true;
			},
			reset() {
				this.val = false;
				this.$emit('change', false);
				this.$emit('update:checked', false);
			},
			getSubmitValue() : boolean {
				return this.val;
			}
		}
	})

export default __sfc__
function GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitchRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    class: _nC(["fui-switch__input", [`fui-switch__size-${_ctx.type}`,_ctx.scaleRatio!=1? `fui-switch__scale-${_ctx.scaleAlign}`:'',_ctx.disabled && _ctx.disabledStyle ?'fui-switch__checkbox-disabled':'']]),
    style: _nS(_uM({transform:`scale(${_ctx.scaleRatio})`}))
  }), [
    _ctx.type=='switch'
      ? _cE("view", _uM({
          key: 0,
          class: _nC(["fui-switch__input-def", _uM({'fui-checkbox__disabled':_ctx.disabled,'fui-switch__checked-color':_ctx.styleVal && _ctx.color=='','fui-switch__normal-bcolor':!_ctx.styleVal && _ctx.borderColor=='','fui-switch__normal-bg':!_ctx.styleVal && _ctx.transitionColor==''})]),
          style: _nS(_ctx.getSwitchStyl),
          onClick: _ctx.onChange
        }), [
          _cE("view", _uM({
            class: _nC(["fui-switch__input-before", _uM({'fui-switch__input--before':_ctx.val,'fui-switch__before-bg':!_ctx.styleVal && _ctx.normalColor==''})]),
            style: _nS(_ctx.getBeforeBgColor)
          }), null, 6 /* CLASS, STYLE */),
          _cE("view", _uM({
            class: _nC(["fui-switch__input-after", _uM({'fui-switch__input--after':_ctx.val,'fui-switch__after-bg':(_ctx.btnColor=='' && _ctx.styleVal) || (!_ctx.styleVal && _ctx.btnNormalColor=='')})]),
            style: _nS(_ctx.getStyle)
          }), [
            renderSlot(_ctx.$slots, "default")
          ], 6 /* CLASS, STYLE */)
        ], 14 /* CLASS, STYLE, PROPS */, ["onClick"])
      : _cE("view", _uM({
          key: 1,
          class: _nC(["fui-switch__checkbox-self", _uM({'fui-switch__checked-color':_ctx.styleVal && _ctx.color=='','fui-switch__normal-bcolor':!_ctx.styleVal && _ctx.borderColor=='','fui-switch__circle-bg':!_ctx.styleVal && _ctx.normalColor==''})]),
          style: _nS(_ctx.getSwitchStyl),
          onClick: _ctx.onChange
        }), [
          isTrue(_ctx.val)
            ? _cE("view", _uM({
                key: 0,
                class: _nC(["fui-switch__check-mark", _uM({'fui-switch__mark-color':_ctx.checkMarkColor==''})]),
                style: _nS(_ctx.getMarkStyl)
              }), null, 6 /* CLASS, STYLE */)
            : _cC("v-if", true)
        ], 14 /* CLASS, STYLE, PROPS */, ["onClick"])
  ], 6 /* CLASS, STYLE */)
}
export type FuiSwitchComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitchStyles = [_uM([["fui-switch__input", _pS(_uM([["flexShrink", 0]]))], ["fui-switch__scale-left", _pS(_uM([["transformOrigin", "0 center"]]))], ["fui-switch__scale-center", _pS(_uM([["transformOrigin", "center center"]]))], ["fui-switch__scale-right", _pS(_uM([["transformOrigin", "100% center"]]))], ["fui-switch__size-switch", _pS(_uM([["width", 52], ["height", 32]]))], ["fui-switch__size-checkbox", _pS(_uM([["width", "40rpx"], ["height", "40rpx"]]))], ["fui-switch__checkbox-self", _pS(_uM([["width", "40rpx"], ["height", "40rpx"], ["borderTopLeftRadius", 40], ["borderTopRightRadius", 40], ["borderBottomRightRadius", 40], ["borderBottomLeftRadius", 40], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["position", "relative"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopColor", "#CCCCCC"], ["borderRightColor", "#CCCCCC"], ["borderBottomColor", "#CCCCCC"], ["borderLeftColor", "#CCCCCC"], ["boxSizing", "border-box"], ["overflow", "hidden"]]))], ["fui-switch__input-def", _pS(_uM([["position", "relative"], ["width", 52], ["height", 32], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#CCCCCC"], ["borderRightColor", "#CCCCCC"], ["borderBottomColor", "#CCCCCC"], ["borderLeftColor", "#CCCCCC"], ["borderTopLeftRadius", 16], ["borderTopRightRadius", 16], ["borderBottomRightRadius", 16], ["borderBottomLeftRadius", 16], ["boxSizing", "border-box"]]))], ["fui-switch__normal-bg", _pS(_uM([["!backgroundImage", "none"], ["!backgroundColor", "#dfdfdf"]]))], ["fui-switch__checked-color", _pS(_uM([["!backgroundImage", "none"], ["!backgroundColor", "#465CFF"], ["!borderTopColor", "#465CFF"], ["!borderRightColor", "#465CFF"], ["!borderBottomColor", "#465CFF"], ["!borderLeftColor", "#465CFF"]]))], ["fui-switch__normal-bcolor", _pS(_uM([["!borderTopColor", "#CCCCCC"], ["!borderRightColor", "#CCCCCC"], ["!borderBottomColor", "#CCCCCC"], ["!borderLeftColor", "#CCCCCC"]]))], ["fui-switch__input-before", _pS(_uM([["position", "absolute"], ["top", 0], ["left", 0], ["width", 50], ["height", 30], ["borderTopLeftRadius", 15], ["borderTopRightRadius", 15], ["borderBottomRightRadius", 15], ["borderBottomLeftRadius", 15], ["transitionProperty", "transform"], ["transitionDuration", "0.3s"]]))], ["fui-switch__before-bg", _pS(_uM([["!backgroundImage", "none"], ["!backgroundColor", "#FFFFFF"]]))], ["fui-switch__input-after", _pS(_uM([["position", "absolute"], ["top", 0], ["left", 0], ["width", 30], ["height", 30], ["borderTopLeftRadius", 15], ["borderTopRightRadius", 15], ["borderBottomRightRadius", 15], ["borderBottomLeftRadius", 15], ["boxShadow", "0 0 6rpx rgba(0, 0, 0, 0.4)"], ["transitionProperty", "transform"], ["transitionDuration", "0.3s"], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"], ["transform", "translateX(0)"]]))], ["fui-switch__after-bg", _pS(_uM([["!backgroundImage", "none"], ["!backgroundColor", "#FFFFFF"]]))], ["fui-switch__input--before", _pS(_uM([["transform", "scale(0)"]]))], ["fui-switch__input--after", _pS(_uM([["transform", "translateX(20px)"]]))], ["fui-switch__check-mark", _pS(_uM([["width", "20rpx"], ["height", "40rpx"], ["borderBottomStyle", "solid"], ["borderBottomWidth", 3], ["borderBottomColor", "#FFFFFF"], ["borderRightStyle", "solid"], ["borderRightWidth", 3], ["borderRightColor", "#FFFFFF"], ["transform", "rotate(45deg) scale(0.5)"], ["transformOrigin", "54% 48%"], ["boxSizing", "border-box"]]))], ["fui-switch__circle-bg", _pS(_uM([["!backgroundImage", "none"], ["!backgroundColor", "#FFFFFF"]]))], ["fui-switch__checkbox-disabled", _pS(_uM([["opacity", 0.6]]))], ["@TRANSITION", _uM([["fui-switch__input-before", _uM([["property", "transform"], ["duration", "0.3s"]])], ["fui-switch__input-after", _uM([["property", "transform"], ["duration", "0.3s"]])]])]])]
