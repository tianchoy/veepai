
	import { ComponentPublicInstance } from 'vue'
	/**
	 * Radio 单选框
	 * @description Radio 单项选择器，需结合fui-radio-group和fui-radio组件一起使用。
	 * @tutorial https://unix.firstui.cn/
	 * @property {String} name {String} 单项选择器名称
	 * @property {String} modelValue {String} 选中的value值，默认值
	 * @event {Function} change 选中项发生变化时触发，(event: string) => void
	 * @event {Function} update:modelValue 用于组件双向绑定，(event: string) => void
	 */
	const __sfc__ = defineComponent({
		name: "fui-radio-group",
		emits: ['change', 'update:modelValue'],
		props: {
			name: {
				type: String,
				default: ''
			},
			modelValue: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				val: '',
				childrens: [] as ComponentPublicInstance[],
				fuiForm: null as null | ComponentPublicInstance
			}
		},
		watch: {
			modelValue(val : string) {
				this.modelChange(val)
			}
		},
		created() {
			//用于submit、reset事件
			const isForm = this.getParent('fui-form');
			if (isForm) {
				const form = this.fuiForm as ComponentPublicInstance
				(form.$data['formChildren'] as ComponentPublicInstance[]).push(this as ComponentPublicInstance);
			}
		},
		methods: {
			radioChange(e : string) {
				this.$emit('change', e)
				this.$emit("update:modelValue", e);
			},
			changeValue(value : string, target : ComponentPublicInstance) {
				if (value == this.val) return;
				this.val = value;
				this.childrens.forEach((item : ComponentPublicInstance) => {
					if (item !== target) {
						item.$data['val'] = false;
					}
				})
				this.radioChange(value)
			},
			modelChange(val : string) {
				this.childrens.forEach((item : ComponentPublicInstance) => {
					if (item.$props['value'] == val) {
						item.$data['val'] = true;
					} else {
						item.$data['val'] = false;
					}
				})
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
				this.fuiForm = parent;
				return true;
			},
			//暂时做重置处理（还原需记录初始值）
			reset() {
				this.val = '';
				this.modelChange('')
				this.radioChange('');
			},
			getSubmitValue() : string {
				return this.val == '' ? this.modelValue : this.val;
			}
		}
	})

export default __sfc__
function GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroupRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_radio_group = resolveComponent("radio-group")

  return _cV(_component_radio_group, _uM({ name: _ctx.name }), _uM({
    default: withSlotCtx((): any[] => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }), 8 /* PROPS */, ["name"])
}
export type FuiRadioGroupComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroupStyles = []
