
	import { ComponentPublicInstance } from 'vue'
	import { FuiCheckboxChangeParam } from '../fui-types/index.uts';
	/**
	 * Checkbox 复选框
	 * @description Checkbox 多项选择器，需结合fui-checkbox-group和fui-checkbox组件一起使用。
	 * @tutorial https://unix.firstui.cn/
	 * @property {String} value	{String} value值，当选中时会携带该值
	 * @property {Boolean} checked {Boolean} 是否选中
	 * @property {Boolean} disabled {Boolean} 是否禁用
	 * @property {String} color	{String} 选中时背景颜色
	 * @property {String} normalColor {String} 未选中时背景颜色
	 * @property {String} borderColor {String} 未选中时边框颜色
	 * @property {String} borderRadius {String} 圆角值
	 * @property {Boolean} isCheckMark {Boolean} 是否只展示对号，无边框背景
	 * @property {String} checkMarkColor {String} 对号颜色
	 * @property {Number} scaleRatio {Number} 缩放比例，当比例大于1时，外层容器需要设置 overflow: visible或者留出足够空间，避免显示不全
	 * @property {String} scaleAlign {String} 缩放后对齐方式,可选值：left、center、right
	 * @event {Function} change 选中状态发生改变时触发，(event: FuiCheckboxChangeParam) => void
	 */
	const __sfc__ = defineComponent({
		name: "fui-checkbox",
		emits: ['change'],
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
			}
		},
		created() {
			this.val = this.checked;
			this.getParent('fui-checkbox-group')
			if (this.fuiCkGroup != null) {
				const group = this.fuiCkGroup as ComponentPublicInstance;
				(group.$data['childrens'] as ComponentPublicInstance[]).push(this as ComponentPublicInstance);
				const modelValue = group.$props['modelValue'] as string[];
				if (modelValue.length > 0) {
					this.val = modelValue.includes(this.value)
				}
			}
			const parent = this.getParent('fui-label')
			if (parent) {
				const label = this.fuiLabel as ComponentPublicInstance
				(label.$data['childrens'] as ComponentPublicInstance[]).push(this as ComponentPublicInstance);
			}
		},
		computed: {
			getStyl() : object {
				const mp : Map<string, string> = new Map();
				mp.set('transform', `scale(${this.scaleRatio})`);
				mp.set('border-radius', this.borderRadius);
				let color = this.val ? this.color : (this.borderColor == '' ? this.color : this.borderColor);
				const bgColor = this.val ? this.color : this.normalColor;
				if (this.isCheckMark) {
					mp.set('border-color', 'transparent')
					mp.set('background', 'transparent')
				} else {
					if (color != '') mp.set('border-color', color)
					if (bgColor != '') mp.set('background', bgColor)
				}
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
			checked(newVal) {
				this.val = newVal;
			},
			val() {
				if (this.fuiCkGroup != null) {
					const group = this.fuiCkGroup as ComponentPublicInstance;
					group.$callMethod('changeValue');
				}
				setTimeout(() => {
					this.styleVal = this.val;
				}, 0)
			}
		},
		data() {
			return {
				val: false,
				styleVal: false,
				fuiLabel: null as null | ComponentPublicInstance,
				fuiCkGroup: null as null | ComponentPublicInstance
			};
		},
		methods: {
			checkboxClick(e : UniPointerEvent) {
				e.stopPropagation();
				this.checkboxChange();
			},
			checkboxChange() {
				if (this.disabled) return;
				this.val = !this.val;
				this.$emit('change', {
					checked: this.val,
					value: this.value
				} as FuiCheckboxChangeParam)
			},
			//测试支持，如果不支持则使用 provide/inject方式（可能有警告，设置default:null也无法去除，应该是底层有bug）
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
				if (name == 'fui-checkbox-group') {
					this.fuiCkGroup = parent;
				} else {
					this.fuiLabel = parent;
				}
				return true;
			},
			labelClick() {
				this.checkboxChange()
			}
		}
	})

export default __sfc__
function GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckboxRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    class: _nC(["fui-checkbox__input", [_ctx.scaleRatio!=1?`fui-checkbox__scale-${_ctx.scaleAlign}`:'' ,_ctx.disabled?'fui-checkbox__disabled':'',_ctx.color=='' && _ctx.styleVal && !_ctx.isCheckMark?'fui-checkbox__color':'',_ctx.normalColor=='' && !_ctx.styleVal && !_ctx.isCheckMark?'fui-checkbox__background':'',_ctx.borderColor=='' && !_ctx.styleVal && !_ctx.isCheckMark?'fui-checkbox__normal-border':'']]),
    style: _nS(_ctx.getStyl),
    onClick: withModifiers(_ctx.checkboxClick, ["stop"])
  }), [
    isTrue(_ctx.val)
      ? _cE("view", _uM({
          key: 0,
          class: _nC(["fui-check__mark", _uM({'fui-checkbox__mark-color':_ctx.checkMarkColor==''})]),
          style: _nS(_ctx.getMarkStyl)
        }), null, 6 /* CLASS, STYLE */)
      : _cC("v-if", true)
  ], 14 /* CLASS, STYLE, PROPS */, ["onClick"])
}
export type FuiCheckboxComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckboxStyles = [_uM([["fui-checkbox__input", _pS(_uM([["width", "40rpx"], ["height", "40rpx"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["boxSizing", "border-box"], ["borderTopLeftRadius", 100], ["borderTopRightRadius", 100], ["borderBottomRightRadius", 100], ["borderBottomLeftRadius", 100], ["flexShrink", 0], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["overflow", "hidden"], ["position", "relative"]]))], ["fui-checkbox__scale-left", _pS(_uM([["transformOrigin", "0 center"]]))], ["fui-checkbox__scale-center", _pS(_uM([["transformOrigin", "center center"]]))], ["fui-checkbox__scale-right", _pS(_uM([["transformOrigin", "100% center"]]))], ["fui-checkbox__color", _pS(_uM([["!backgroundImage", "none"], ["!backgroundColor", "#465CFF"], ["!borderTopColor", "#465CFF"], ["!borderRightColor", "#465CFF"], ["!borderBottomColor", "#465CFF"], ["!borderLeftColor", "#465CFF"]]))], ["fui-checkbox__normal-border", _pS(_uM([["!borderTopColor", "#CCCCCC"], ["!borderRightColor", "#CCCCCC"], ["!borderBottomColor", "#CCCCCC"], ["!borderLeftColor", "#CCCCCC"]]))], ["fui-checkbox__background", _pS(_uM([["!backgroundImage", "none"], ["!backgroundColor", "#ffffff"]]))], ["fui-checkbox__mark-color", _pS(_uM([["!borderBottomColor", "#ffffff"], ["!borderRightColor", "#ffffff"]]))], ["fui-check__mark", _pS(_uM([["width", "20rpx"], ["height", "40rpx"], ["borderBottomStyle", "solid"], ["borderBottomWidth", 3], ["borderBottomColor", "#FFFFFF"], ["borderRightStyle", "solid"], ["borderRightWidth", 3], ["borderRightColor", "#FFFFFF"], ["boxSizing", "border-box"], ["transform", "rotate(45deg) scale(0.5)"], ["transformOrigin", "54% 48%"]]))], ["fui-checkbox__disabled", _pS(_uM([["opacity", 0.6]]))]])]
