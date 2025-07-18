
	import { ComponentPublicInstance } from 'vue';
	/**
	 * Label 标签
	 * @description Label 标签，用来改进表单组件的可用性，将控件放在该标签下，当点击时，就会触发对应的控件，目前主要用于fui-switch、fui-radio、fui-checkbox组件。
	 * @tutorial https://unix.firstui.cn/
	 * @property {String} padding {String} padding值
	 * @property {String} margin {String} margin值
	 * @property {Boolean} full {Boolean} 宽度是否100%
	 */
	const __sfc__ = defineComponent({
		name: "fui-label",
		props: {
			//padding值：'20rpx 32rpx'
			padding: {
				type: String,
				default: ''
			},
			//margin值：'20rpx 32rpx'
			margin: {
				type: String,
				default: ''
			},
			full: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				childrens: [] as ComponentPublicInstance[]
			}
		},
		methods: {
			onclick() {
				if (this.childrens.length > 0) {
					this.childrens.forEach((item : ComponentPublicInstance) => {
						item.$callMethod('labelClick')
					})
				}
			}
		}
	})

export default __sfc__
function GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabelRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    class: _nC(["fui-label__wrap", _uM({'fui-label__full':_ctx.full})]),
    style: _nS(_uM({padding:_ctx.padding,margin:_ctx.margin})),
    onClick: withModifiers(_ctx.onclick, ["stop"])
  }), [
    renderSlot(_ctx.$slots, "default")
  ], 14 /* CLASS, STYLE, PROPS */, ["onClick"])
}
export type FuiLabelComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabelStyles = [_uM([["fui-label__wrap", _pS(_uM([["boxSizing", "border-box"]]))], ["fui-label__full", _pS(_uM([["width", "100%"]]))]])]
