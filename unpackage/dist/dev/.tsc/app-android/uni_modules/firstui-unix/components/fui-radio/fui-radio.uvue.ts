
	import { ComponentPublicInstance } from 'vue'
	/**
	 * Radio 单选框
	 * @description Radio 单项选择器，需结合fui-radio-group和fui-radio组件一起使用。
	 * @tutorial https://unix.firstui.cn/
	 * @property {String} value {String} value值，当选中时会携带该值	
	 * @property {Boolean} checked {Boolean} 是否选中
	 * @property {Boolean} disabled	 {Boolean} 是否禁用
	 * @property {String} color	{String} 选中时背景颜色	
	 * @property {String} normalColor {String} 未选中时背景颜色
	 * @property {String} borderColor {String} 未选中时边框颜色
	 * @property {String} borderRadius {String}	圆角值
	 * @property {Boolean} isCheckMark {Boolean} 是否只展示对号，无边框背景
	 * @property {String} checkMarkColor {String} 对号颜色
	 * @property {Number} scaleRatio {Number} 缩放比例，当比例大于1时，外层容器需要设置 overflow: visible或者留出足够空间，避免显示不全
	 * @property {String} scaleAlign {String} 缩放后对齐方式,可选值：left、center、right
	 * @property {Number} styleType {Number} 选中后样式类型,可选值：1-checkmark 2-dot
	 */
	const __sfc__ = defineComponent({
		name: "fui-radio",
		props: {
			value: {
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
			color: {
				type: String,
				default: ''
			},
			normalColor: {
				type: String,
				default: ''
			},
			borderColor: {
				type: String,
				default: ''
			},
			borderRadius: {
				type: String,
				default: '100px'
			},
			isCheckMark: {
				type: Boolean,
				default: false
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
			},
			styleType: {
				type: Number,
				default: 1
			}
		},
		created() {
			this.val = this.checked;
			this.getParent('fui-radio-group');
			if (this.fuiRadioGroup != null) {
				const group = this.fuiRadioGroup as ComponentPublicInstance;
				(group.$data['childrens'] as ComponentPublicInstance[]).push(this as ComponentPublicInstance);
				if (group.$props['modelValue'] != '') {
					this.val = this.value == group.$props['modelValue']
				}
			}
			const parent = this.getParent('fui-label')
			if (parent) {
				const label = this.fuiLabel as ComponentPublicInstance
				(label.$data['childrens'] as ComponentPublicInstance[]).push(this as ComponentPublicInstance);
			}
		},
		watch: {
			checked(newVal : boolean) {
				this.val = newVal;
			},
			val(newVal : boolean) {
				if (newVal && this.fuiRadioGroup != null) {
					const group = this.fuiRadioGroup as ComponentPublicInstance;
					group.$callMethod('changeValue', this.value, this);
				}
				setTimeout(() => {
					this.styleVal = newVal;
				}, 0)
			}
		},
		computed: {
			getStyl() : object {
				const mp : Map<string, string> = new Map();
				mp.set('transform', `scale(${this.scaleRatio})`);
				mp.set('border-radius', this.borderRadius);
				const color = this.val ? this.color : (this.borderColor == '' ? this.color : this.borderColor);
				const bgColor = this.val ? this.color : this.normalColor;
				if (this.styleType == 1) {
					if (this.isCheckMark) {
						mp.set('border-color', 'transparent')
						mp.set('background', 'transparent')
					} else {
						if (color != '') mp.set('border-color', color)
						if (bgColor != '') mp.set('background', bgColor)
					}
				} else {
					if (color != '') mp.set('border-color', color)
					if (bgColor != '') mp.set('background', bgColor)
				}
				return mp;
			},
			getCheckMarkStyl() : object {
				const mp : Map<string, string> = new Map();
				if (this.checkMarkColor != '') mp.set('background', this.checkMarkColor)
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
		data() {
			return {
				val: false,
				styleVal: false,
				fuiLabel: null as null | ComponentPublicInstance,
				fuiRadioGroup: null as null | ComponentPublicInstance
			};
		},
		methods: {
			radioClick(e : UniPointerEvent) {
				e.stopPropagation();
				this.radioChange();
			},
			radioChange() {
				if (this.disabled || this.val) return;
				this.val = true;
			},
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
				if (name == 'fui-radio-group') {
					this.fuiRadioGroup = parent;
				} else {
					this.fuiLabel = parent;
				}
				return true;
			},
			labelClick() {
				this.radioChange()
			}
		}
	})

export default __sfc__
function GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadioRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return createElementVNode("view", utsMapOf({
    class: normalizeClass(["fui-radio__input", [_ctx.scaleRatio!=1?`fui-radio__scale-${_ctx.scaleAlign}`:'',_ctx.disabled?'fui-radio__disabled':'',_ctx.color=='' && _ctx.styleVal && (!_ctx.isCheckMark || _ctx.styleType==2)?'fui-radio__color':'',_ctx.color=='' && _ctx.styleVal && !_ctx.isCheckMark && _ctx.styleType==1?'fui-radio__active-bgcolor':'',_ctx.normalColor=='' && !_ctx.styleVal && (!_ctx.isCheckMark || _ctx.styleType==2)?'fui-radio__background':'',_ctx.color=='' && _ctx.styleVal && _ctx.styleType==2?'fui-radio__background':'',_ctx.borderColor=='' && !_ctx.styleVal && (!_ctx.isCheckMark || _ctx.styleType==2)?'fui-radio__normal-border':'']]),
    style: normalizeStyle(_ctx.getStyl),
    onClick: withModifiers(_ctx.radioClick, ["stop"])
  }), [
    isTrue(_ctx.val && _ctx.styleType==1)
      ? createElementVNode("view", utsMapOf({
          key: 0,
          class: normalizeClass(["fui-check__mark", utsMapOf({'fui-radio__mark-color':_ctx.checkMarkColor==''})]),
          style: normalizeStyle(_ctx.getMarkStyl)
        }), null, 6 /* CLASS, STYLE */)
      : createCommentVNode("v-if", true),
    isTrue(_ctx.val && _ctx.styleType==2)
      ? createElementVNode("view", utsMapOf({
          key: 1,
          class: normalizeClass(["fui-check__mark-circle", utsMapOf({'fui-radio__active-bgcolor':_ctx.checkMarkColor==''})]),
          style: normalizeStyle(_ctx.getCheckMarkStyl)
        }), null, 6 /* CLASS, STYLE */)
      : createCommentVNode("v-if", true)
  ], 14 /* CLASS, STYLE, PROPS */, ["onClick"])
}
export type FuiRadioComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadioStyles = [utsMapOf([["fui-radio__input", padStyleMapOf(utsMapOf([["width", "40rpx"], ["height", "40rpx"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopLeftRadius", 100], ["borderTopRightRadius", 100], ["borderBottomRightRadius", 100], ["borderBottomLeftRadius", 100], ["display", "flex"], ["boxSizing", "border-box"], ["flexShrink", 0], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["overflow", "hidden"], ["position", "relative"]]))], ["fui-radio__scale-left", padStyleMapOf(utsMapOf([["transformOrigin", "0 center"]]))], ["fui-radio__scale-center", padStyleMapOf(utsMapOf([["transformOrigin", "center center"]]))], ["fui-radio__scale-right", padStyleMapOf(utsMapOf([["transformOrigin", "100% center"]]))], ["fui-radio__active-bgcolor", padStyleMapOf(utsMapOf([["!backgroundImage", "none"], ["!backgroundColor", "#465CFF"]]))], ["fui-radio__color", padStyleMapOf(utsMapOf([["!borderTopColor", "#465CFF"], ["!borderRightColor", "#465CFF"], ["!borderBottomColor", "#465CFF"], ["!borderLeftColor", "#465CFF"]]))], ["fui-radio__normal-border", padStyleMapOf(utsMapOf([["!borderTopColor", "#CCCCCC"], ["!borderRightColor", "#CCCCCC"], ["!borderBottomColor", "#CCCCCC"], ["!borderLeftColor", "#CCCCCC"]]))], ["fui-radio__background", padStyleMapOf(utsMapOf([["!backgroundImage", "none"], ["!backgroundColor", "#ffffff"]]))], ["fui-radio__mark-color", padStyleMapOf(utsMapOf([["!borderBottomColor", "#ffffff"], ["!borderRightColor", "#ffffff"]]))], ["fui-check__mark", padStyleMapOf(utsMapOf([["width", "20rpx"], ["height", "40rpx"], ["borderBottomStyle", "solid"], ["borderBottomWidth", 3], ["borderBottomColor", "#FFFFFF"], ["borderRightStyle", "solid"], ["borderRightWidth", 3], ["borderRightColor", "#FFFFFF"], ["boxSizing", "border-box"], ["transform", "rotate(45deg) scale(0.5)"], ["transformOrigin", "54% 48%"]]))], ["fui-check__mark-circle", padStyleMapOf(utsMapOf([["width", "16rpx"], ["height", "16rpx"], ["borderTopLeftRadius", "16rpx"], ["borderTopRightRadius", "16rpx"], ["borderBottomRightRadius", "16rpx"], ["borderBottomLeftRadius", "16rpx"]]))], ["fui-radio__disabled", padStyleMapOf(utsMapOf([["opacity", 0.6]]))]])]
