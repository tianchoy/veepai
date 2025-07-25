
	/**
	 * Badge 徽章
	 * @description Badge 徽章，可自定义颜色。
	 * @tutorial https://unix.firstui.cn/
	 * @property {Number} value {Number | String} badge显示文本
	 * @property {Number} max {Number} 最大值，当值超过max时使用+号代替，仅为数字时有效，-1表示不限制
	 * @property {String} type {String}	类型，有效值：primary，success，warning，danger，purple，white
	 * @property {String} background {String} 背景色，如果设置背景色则type失效
	 * @property {String} color	{String} 字体颜色
	 * @property {Boolean} dot {Boolean} 是否显示为圆点
	 * @property {Number} marginTop {Number} margin-top值，单位rpx
	 * @property {Number} marginLeft {Number} margin-left值，单位rpx
	 * @property {Number} marginRight {Number} margin-right值，单位rpx
	 * @property {Boolean} absolute {Boolean} 是否绝对定位
	 * @property {String} top {String} top值，需带单位，absolute为true时生效
	 * @property {String} right {String} right值，需带单位，absolute为true时生效
	 * @property {Number} scaleRatio {Number} 缩放比例，当比例大于1时，外层容器需要设置 overflow: visible或者留出足够空间，避免显示不全
	 * @event {Function} onclick 点击badge时触发，无返回值，() => void
	 */
	const __sfc__ = defineComponent({
		name: "fui-badge",
		emits: ['onclick'],
		props: {
			value: {
				type: [Object, String, Number],
				default: ''
			},
			max: {
				type: Number,
				default: -1
			},
			type: {
				type: String,
				default: 'primary'
			},
			background: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#FFFFFF'
			},
			dot: {
				type: Boolean,
				default: false
			},
			marginTop: {
				type: Number,
				default: 0
			},
			marginLeft: {
				type: Number,
				default: 0
			},
			marginRight: {
				type: Number,
				default: 0
			},
			absolute: {
				type: Boolean,
				default: false
			},
			top: {
				type: String,
				default: '-8rpx'
			},
			right: {
				type: String,
				default: '-18rpx'
			},
			scaleRatio: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				width: '0',
				showValue: ''
			};
		},
		watch: {
			value() {
				this.getWidth()
			}
		},
		mounted() {
			this.getWidth()
		},
		methods: {
			rpx2px(rpx : number) : number {
				let px : number;

				px = UTSAndroid.rpx2px(rpx)






				return px;
			},
			_getTextWidth(text : string) : string {
				let sum = 0;
				for (let i = 0, len = text.length; i < len; i++) {
					const code = text.charCodeAt(i) as number
					if (code <= 255)
						sum = sum + 1;
					else
						sum = sum + 2;
				}
				const rpx = (text.length > 1 ? 32 : 24) as number;
				const px = this.rpx2px(rpx);
				const strCode = text.charCodeAt(0) as number;
				let multiplier = 12;
				if (strCode >= 65 && strCode <= 90) {
					multiplier = 15;
				}
				return `${(sum / 2 * multiplier) + px}px`;
			},
			getWidth() {
				let max = this.max;
				let value : string;
				if (typeof this.value == 'string') {
					value = this.value as string;
				} else {
					if (typeof this.value == 'number') {
						const val_num = this.value as number;
						if (max == -1) {
							value = val_num.toString()
						} else {
							value = val_num > max ? `${max}+` : val_num.toString()
						}
					} else {
						if (max == -1) {
							value = this.value.toString()
						} else {
							value = parseFloat(this.value.toString()) > max ? `${max}+` : `${this.value}`
						}
					}
				}
				this.showValue = value;
				this.width = this.dot ? '8px' : this._getTextWidth(value)
			},
			handleClick() {
				this.$emit('onclick');
			}
		}
	})

export default __sfc__
function GenUniModulesFirstuiUnixComponentsFuiBadgeFuiBadgeRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return isTrue(_ctx.showValue!='' || _ctx.dot)
    ? _cE("text", _uM({
        key: 0,
        class: _nC([_ctx.dot?'fui-badge__dot':'fui-badge__wrap',_ctx.background!=''?'':('fui-badge__bg-'+_ctx.type),_ctx.absolute?'fui-badge__absolute':'',_ctx.scaleRatio!=1 ?'fui-badge__trans-origin':'',_ctx.background=='' && _ctx.type=='white'?'fui-badge__text-color':'']),
        style: _nS(_uM({top:_ctx.absolute?_ctx.top:'auto',right:_ctx.absolute?_ctx.right:'auto',transform:`scale(${_ctx.scaleRatio})`,marginTop:`${_ctx.marginTop}rpx`,marginLeft:`${_ctx.marginLeft}rpx`,marginRight:`${_ctx.marginRight}rpx`,width:_ctx.width,color:_ctx.color,background:_ctx.background})),
        onClick: _ctx.handleClick
      }), _tD(_ctx.dot?'':_ctx.showValue), 15 /* TEXT, CLASS, STYLE, PROPS */, ["onClick"])
    : _cC("v-if", true)
}
export type FuiBadgeComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesFirstuiUnixComponentsFuiBadgeFuiBadgeStyles = [_uM([["fui-badge__wrap", _pS(_uM([["height", "36rpx"], ["color", "#FFFFFF"], ["fontSize", "24rpx"], ["lineHeight", "36rpx"], ["borderTopLeftRadius", 100], ["borderTopRightRadius", 100], ["borderBottomRightRadius", 100], ["borderBottomLeftRadius", 100], ["minWidth", "36rpx"], ["boxSizing", "border-box"], ["textAlign", "center"], ["zIndex", 10]]))], ["fui-badge__dot", _pS(_uM([["!height", 8], ["!width", 8], ["borderTopLeftRadius", 100], ["borderTopRightRadius", 100], ["borderBottomRightRadius", 100], ["borderBottomLeftRadius", 100], ["zIndex", 10]]))], ["fui-badge__bg-primary", _pS(_uM([["!backgroundColor", "#465CFF"]]))], ["fui-badge__bg-success", _pS(_uM([["!backgroundColor", "#09BE4F"]]))], ["fui-badge__bg-warning", _pS(_uM([["!backgroundColor", "#FFB703"]]))], ["fui-badge__bg-danger", _pS(_uM([["!backgroundColor", "#FF2B2B"]]))], ["fui-badge__bg-purple", _pS(_uM([["!backgroundColor", "#6831FF"]]))], ["fui-badge__bg-white", _pS(_uM([["!backgroundColor", "#FFFFFF"]]))], ["fui-badge__text-color", _pS(_uM([["!color", "#FF2B2B"]]))], ["fui-badge__trans-origin", _pS(_uM([["transformOrigin", "center center"]]))], ["fui-badge__absolute", _pS(_uM([["position", "absolute"]]))]])]
