import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import _easycom_l_button from '@/uni_modules/lime-button/components/l-button/l-button.uvue'
import _easycom_l_popup from '@/uni_modules/lime-popup/components/l-popup/l-popup.uvue'
import { DialogProps, DialogOptions, DialogExpose, BeforeClose } from './type';
	import { parseToObject } from './utils';
	import { isPromise } from '@/uni_modules/lime-shared/isPromise'
	
	
const __sfc__ = defineComponent({
  __name: 'l-dialog',
  __props: DialogProps,
  props: /*#__PURE__*/mergeModels({
    actions: { type: Array as PropType<UTSJSONObject[]>, required: false },
    buttonLayout: { type: String, required: true, default: 'horizontal' },
    cancelBtn: { type: Object, required: false },
    closeBtn: { type: Boolean, required: false },
    closeOnClickOverlay: { type: Boolean, required: true, default: true },
    confirmBtn: { type: Object, required: false },
    content: { type: String, required: false },
    overlayStyle: { type: String, required: false },
    preventScrollThrough: { type: Boolean, required: true, default: true },
    overlay: { type: Boolean, required: true, default: true },
    title: { type: String, required: false },
    visible: { type: Boolean, required: false },
    zIndex: { type: Number, required: false },
    lStyle: { type: String, required: false }
  }, {
    "modelValue": {type: Boolean, default: false},
  }),
  emits: /*#__PURE__*/mergeModels(['action', 'confirm', 'cancel', 'click','agreeprivacyauthorization', 'chooseavatar', 'getuserinfo','contact', 'getphonenumber', 'error', 'opensetting', 'launchapp'], ["update:modelValue"]),
  setup(__props, { expose: __expose }: SetupContext) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * Dialog 弹窗组件
	 * @description 用于显示模态对话框的通用组件
	 * <br> 插件类型：LDialogComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-dialog
	 * 
	 * @property {UTSJSONObject[]} actions 操作按钮列表（最多显示6个）
	 * @property {'horizontal'|'vertical'} buttonLayout [buttonLayout=horizontal] 按钮排列方式
	 * @value horizontal 水平排列
	 * @value vertical 垂直排列
	 * @property {string|Object} cancelBtn 取消按钮配置（null隐藏/string文本/Object按钮属性）
	 * @property {boolean} closeBtn 是否显示关闭按钮
	 * @property {boolean} closeOnClickOverlay 点击蒙层关闭
	 * @property {string|Object} confirmBtn 确认按钮配置（null隐藏/string文本/Object按钮属性）
	 * @property {string} content 弹窗内容（支持HTML）
	 * @property {string}  overlayStyle 遮罩层样式（支持CSS字符串）
	 * @property {boolean} preventScrollThrough 防止滚动穿透
	 * @property {boolean} overlay 是否显示遮罩
	 * @property {string} title 弹窗标题
	 * @property {boolean} visible 控制显示状态
	 * @property {number} zIndex 层级设置
	 * @property {string} lStyle 自定义根节点样式
	 * @event {Function} action 操作按钮点击时触发
	 * @param {number} index 点击的按钮索引
	 * @event {Function} confirm 确认按钮点击时触发
	 * @event {Function} cancel 取消/关闭按钮点击时触发
	 * @event {Function} click 通用点击事件（透传底层点击）
	 * @event {Function} agreeprivacyauthorization 用户同意隐私协议时触发（需配置隐私协议）
	 * @event {Function} chooseavatar 用户选择头像时触发（需启用头像选择功能）
	 * @event {Function} getuserinfo 用户授权信息回调
	 * @event {Function} contact 客服消息回调
	 * @event {Function} getphonenumber 获取用户手机号回调
	 * @event {Function} error 发生错误时触发
	 * @param {Object} detail 错误详细信息
	 * @event {Function} opensetting 用户打开系统设置时触发
	 * @event {Function} launchapp 从小程序唤醒App时触发
	 */
	
	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}
	const props = __props
	const dialogCallbacks = reactive({
		beforeClose: null,
		onAction: null,
		onConfirm: null,
		onCancel: null,
	} as DialogExpose)
	const innerOptions = reactive<DialogOptions>({
		actions: props.actions,
		buttonLayout: props.buttonLayout,
		cancelBtn: props.cancelBtn,
		closeBtn: props.closeBtn,
		closeOnClickOverlay: props.closeOnClickOverlay,
		confirmBtn: props.confirmBtn,
		content: props.content,
		overlayStyle: props.overlayStyle,
		preventScrollThrough: props.preventScrollThrough,
		overlay: props.overlay,
		title: props.title,
		visible: props.visible,
		zIndex: props.zIndex,
	})
	
	
	const modelValue = useModel<Boolean>(__ins.props, "modelValue");
	const innerValue = computed({
		set(value: boolean) {
			modelValue.value = value;
			if(!value) {
				dialogCallbacks.beforeClose = null;
				dialogCallbacks.onConfirm = null;
				dialogCallbacks.onCancel = null;
			}
		},
		get(): boolean {
			return (props.visible ?? false) || modelValue.value
		},
	} as WritableComputedOptions<boolean>);
	
	const closeBtnProps = computed((): boolean=>{
		return innerOptions.closeBtn ?? props.closeBtn ??  false
	})
	const cancelBtnProps = computed(():UTSJSONObject | null => {
		return parseToObject(props.cancelBtn ?? innerOptions.cancelBtn)
	})
	const confirmBtnProps = computed(():UTSJSONObject | null => {
		return parseToObject(props.confirmBtn ?? innerOptions.confirmBtn)
	})
	
	const innerTitle = computed(():string|null => props.title ?? innerOptions.title)
	const innerButtonLayout = computed(():string => innerOptions.buttonLayout ?? props.buttonLayout)
	const innerActions = computed(():UTSJSONObject[]|null => {
		return props.actions ?? innerOptions.actions
	})
	const buttonVariant = computed(():boolean=> {
		const res1 = [confirmBtnProps.value, cancelBtnProps.value].some((item):boolean => {
			return item?.['variant'] == 'text'
		})
		const res2 = innerActions.value?.some((item):boolean => {
			return item['variant'] == 'text'
		})
		
		return res1 || (res2 ?? false)
	})
	
	const buttonStyle = computed(():Map<string, any> => {
		const style = new Map<string, any>();
		if(innerButtonLayout.value == 'horizontal') {
			style.set('flex-grow', 1)
			// style.set('flex', 1)
		} else {
			style.set('flex-grow', 0)
		}
		style.set('padding', 0);
		if(buttonVariant.value) {
			//$border-color-2
			style.set('border-top', `1px solid #e7e7e7`)
			style.set('border-radius', '0')
			style.set('border-left', `1px solid #e7e7e7`)
		}
		return style
	})
	
	const onClose = (type: string) => {
		if(dialogCallbacks.beforeClose != null) {
			dialogCallbacks.beforeClose!(type).then((res)=>{
				innerValue.value = false;
			})
			return
		}
		innerValue.value = false
	}
	const onTplButtonTap = (type: string, extra:number|null) => {
		if(type == 'confirm') {
			emit('confirm')
			if(dialogCallbacks.onConfirm!= null) {
				dialogCallbacks.onConfirm!(null)
				onClose('confirm')
			}
		} else if(type == 'cancel') {
			emit('cancel')
			if(dialogCallbacks.onCancel!= null) {
				dialogCallbacks.onCancel!(true)
				onClose('cancel')
			}
		} else if(type == 'action' && extra != null) {
			emit('action', extra)
			if(dialogCallbacks.onAction != null) {
				// dialogCallbacks.onAction!(extra)
				dialogCallbacks.onAction!(extra)
				onClose('action')
			}
		}
	}
	
	const getuserinfo = (e: UniEvent) => {
		emit('getuserinfo', e);
	}
	const contact = (e: UniEvent) => {
		emit('contact', e);
	}
	const getphonenumber = (e: UniEvent) => {
		emit('getphonenumber', e);
	}
	const error = (e: UniEvent) => {
		emit('error', e);
	}
	const opensetting = (e: UniEvent) => {
		emit('opensetting', e);
	}
	const launchapp = (e: UniEvent) => {
		emit('launchapp', e);
	}
	const chooseavatar = (e: UniEvent) => {
		emit('chooseavatar', e);
	}
	const agreeprivacyauthorization = (e: UniEvent) => {
		emit('agreeprivacyauthorization', e);
	}
	
	const overlayClick = () => {
		if(props.closeOnClickOverlay) {
			onClose('cancel')
		}
	}
	
	const _updateOptions = (options: UTSJSONObject) => {
		innerOptions.actions = options.getArray<UTSJSONObject>('actions') ?? props.actions
		innerOptions.buttonLayout = options.getString('buttonLayout') ?? props.buttonLayout
		const maxLengthSuggestion = innerOptions.buttonLayout == 'vertical' ? 7 : 3;
		if(innerOptions.actions != null && (innerOptions.actions!.length == 0 || innerOptions.actions!.length > maxLengthSuggestion)) {
			console.warn(`action 数量建议控制在1至${maxLengthSuggestion}个`, " at uni_modules/lime-dialog/components/l-dialog/l-dialog.uvue:390");
		}
		innerOptions.cancelBtn =  options['cancelBtn'] ?? props.cancelBtn
		innerOptions.closeBtn = options.getBoolean('closeBtn') ?? props.closeBtn
		innerOptions.closeOnClickOverlay =  options.getBoolean('closeOnClickOverlay') ?? props.closeOnClickOverlay
		innerOptions.confirmBtn = options.get('confirmBtn') ?? props.confirmBtn
		innerOptions.content = options.getString('content') ?? props.content
		innerOptions.overlayStyle = options.getString('overlayStyle') ?? props.overlayStyle
		innerOptions.preventScrollThrough =  options.getBoolean('preventScrollThrough') ?? props.preventScrollThrough
		innerOptions.overlay = options.getBoolean('overlay') ?? props.overlay
		innerOptions.title = options.getString('title') ?? props.title
		// innerOptions.visible = options..visible
		innerOptions.zIndex = options.getNumber('zIndex') ?? props.zIndex
	}
	// const _alert = (options: UTSJSONObject) => {}
	// const _confirm = (options: UTSJSONObject) => {}
	const _show = (options: UTSJSONObject):Promise<number|null> => {
		_updateOptions(options)
		innerValue.value = true;
		try {
			const beforeClose = options['beforeClose']
			if(typeof beforeClose == 'function') {
				dialogCallbacks.beforeClose = beforeClose as BeforeClose
			}
			
		} catch(err) {
			console.warn(err, " at uni_modules/lime-dialog/components/l-dialog/l-dialog.uvue:416")
		}
		
		return new Promise((resolve, reject) => {
			dialogCallbacks.onConfirm = resolve;
			dialogCallbacks.onAction = resolve;
			dialogCallbacks.onCancel = reject;
		})
	}
	const _close = () => {
		innerValue.value = false
	}
	// const _action = (options: UTSJSONObject) => {}
	
	
	__expose({
		// dialogCallbacks,
		// alert: _alert,
		close: _close,
		// action: _action,
		// confirm: _confirm,
		show: _show,
	})

return (): any | null => {

const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)
const _component_l_button = resolveEasyComponent("l-button",_easycom_l_button)
const _component_l_popup = resolveEasyComponent("l-popup",_easycom_l_popup)

  return _cV(_component_l_popup, _uM({
    visible: unref(innerValue),
    overlay: unref(innerOptions).overlay ?? _ctx.overlay,
    "bg-color": "transparent",
    closeOnClickOverlay: unref(innerOptions).closeOnClickOverlay ?? _ctx.closeOnClickOverlay,
    preventScrollThrough: unref(innerOptions).preventScrollThrough ?? _ctx.preventScrollThrough,
    zIndex: _ctx.zIndex ?? unref(innerOptions).zIndex,
    onChange: overlayClick,
    position: "center"
  }), _uM({
    default: withSlotCtx((): any[] => [
      _cE("view", _uM({ class: "l-dialog" }), [
        renderSlot(_ctx.$slots, "top"),
        isTrue(unref(closeBtnProps))
          ? _cE("view", _uM({
              key: 0,
              class: "l-dialog__close",
              onClick: () => {onClose('close')}
            }), [
              _cV(_component_l_icon, _uM({
                class: "l-dialog__close-icon",
                name: "close",
                size: "44rpx"
              }))
            ], 8 /* PROPS */, ["onClick"])
          : _cC("v-if", true),
        _cE("view", _uM({ class: "l-dialog__content" }), [
          renderSlot(_ctx.$slots, "title", {}, (): any[] => [
            unref(innerTitle) != null
              ? _cE("text", _uM({
                  key: 0,
                  class: "l-dialog__header"
                }), _tD(_ctx.title ?? unref(innerOptions).title), 1 /* TEXT */)
              : _cC("v-if", true)
          ]),
          _cE("view", _uM({
            class: _nC(["l-dialog__body", _uM({'l-dialog__body--gap': unref(innerTitle) != null || _ctx.$slots['title'] != null})])
          }), [
            renderSlot(_ctx.$slots, "default", {}, (): any[] => [
              _cE("text", _uM({ class: "l-dialog__body-text" }), _tD(unref(innerOptions).content ?? _ctx.content), 1 /* TEXT */)
            ])
          ], 2 /* CLASS */)
        ]),
        renderSlot(_ctx.$slots, "middle"),
        _cE("view", _uM({
          class: _nC(["l-dialog__footer", [
				'l-dialog__footer--' + unref(innerButtonLayout), _uM({
				'l-dialog__footer--column': unref(innerButtonLayout) == 'vertical',
				'l-dialog__footer--full': unref(buttonVariant),
			})]])
        }), [
          renderSlot(_ctx.$slots, "actions", {}, (): any[] => [
            unref(innerActions) != null
              ? _cE(Fragment, _uM({ key: 0 }), RenderHelpers.renderList(unref(innerActions)!, (action, index, __index, _cached): any => {
                  return _cV(_component_l_button, _uM({
                    class: _nC(["l-dialog__button", [
								'l-dialog__button--' + unref(innerButtonLayout),_uM({
									'l-dialog__button--text': unref(buttonVariant),
								})
							]]),
                    key: index,
                    style: _nS([
								unref(buttonStyle),
								_uM({
									'margin-left': unref(innerButtonLayout) == 'horizontal' && !unref(buttonVariant) && index > 0? '20rpx': '0',
									'margin-bottom': unref(innerButtonLayout) == 'vertical' && !unref(buttonVariant) && index > 0 ?'20rpx': '0',
								})
							]),
                    block: action.getBoolean('block') ?? false,
                    disabled: action.getBoolean('disabled') ?? false,
                    "data-extra": index,
                    content: action.getString('content') ?? '',
                    icon: action.getString('icon') ?? '',
                    loading: action.getBoolean('loading') ?? false,
                    type: action.getString('type') ?? 'primary',
                    ghost: action.getBoolean('loading') ?? false,
                    shape: action.getString('shape') ?? 'rectangle',
                    size: action.getString('size') ?? 'medium',
                    variant: action.getString('variant'),
                    "open-type": action.getString('openType') ?? '',
                    color: action.getString('color'),
                    textColor: action.getString('textColor'),
                    fontSize: action.getString('fontSize'),
                    "hover-stop-propagation": action.getBoolean('hoverStopPropagation') ?? false,
                    "hover-start-time": action.getNumber('hoverStartTime') ?? 20,
                    "hover-stay-time": action.getNumber('hoverStayTime') ?? 70,
                    lang: action.getString('lang') ?? 'en',
                    "session-from": action.getString('sessionFrom') ?? '',
                    "send-message-title": action.getString('sendMessageTitle') ?? '',
                    "send-message-path": action.getString('sendMessagePath') ?? '',
                    "send-message-img": action.getString('sendMessageImg') ?? '',
                    "app-parameter": action.getString('appParameter') ?? '',
                    "show-message-card": action.getBoolean('showMessageCard') ?? false,
                    onClick: () => {onTplButtonTap('action', index)},
                    onGetuserinfo: getuserinfo,
                    onContact: contact,
                    onGetphonenumber: getphonenumber,
                    onError: error,
                    onOpensetting: opensetting,
                    onLaunchapp: launchapp,
                    onAgreeprivacyauthorization: agreeprivacyauthorization
                  }), _uM({
                    default: withSlotCtx((): any[] => [_tD(action['content'])]),
                    _: 2 /* DYNAMIC */
                  }), 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "style", "block", "disabled", "data-extra", "content", "icon", "loading", "type", "ghost", "shape", "size", "variant", "open-type", "color", "textColor", "fontSize", "hover-stop-propagation", "hover-start-time", "hover-stay-time", "lang", "session-from", "send-message-title", "send-message-path", "send-message-img", "app-parameter", "show-message-card", "onClick"])
                }), 128 /* KEYED_FRAGMENT */)
              : _cC("v-if", true)
          ]),
          renderSlot(_ctx.$slots, "cancel-btn", {}, (): any[] => [
            unref(cancelBtnProps) != null
              ? _cV(_component_l_button, _uM({
                  key: 0,
                  class: _nC(["l-dialog__button", [
							'l-dialog__button--' + unref(innerButtonLayout),
							_uM({
								'l-dialog__button--text': unref(buttonVariant)
							})
						]]),
                  style: _nS([unref(buttonStyle)]),
                  block: unref(cancelBtnProps)?.getBoolean('block') ?? false,
                  disabled: unref(cancelBtnProps)?.getBoolean('disabled') ?? false,
                  content: unref(cancelBtnProps)?.getString('content') ?? '',
                  icon: unref(cancelBtnProps)?.getString('icon') ?? '',
                  loading: unref(cancelBtnProps)?.getBoolean('loading') ?? false,
                  type: unref(cancelBtnProps)?.getString('type') ?? 'primary',
                  ghost: unref(cancelBtnProps)?.getBoolean('loading') ?? false,
                  shape: unref(cancelBtnProps)?.getString('shape') ?? 'rectangle',
                  size: unref(cancelBtnProps)?.getString('size') ?? 'medium',
                  variant: unref(cancelBtnProps)?.getString('variant') ?? 'light',
                  "open-type": unref(cancelBtnProps)?.getString('openType'),
                  color: unref(cancelBtnProps)?.getString('color'),
                  textColor: unref(cancelBtnProps)?.getString('textColor'),
                  fontSize: unref(cancelBtnProps)?.getString('fontSize'),
                  "hover-stop-propagation": unref(cancelBtnProps)?.getBoolean('hoverStopPropagation') ?? false,
                  "hover-start-time": unref(cancelBtnProps)?.getNumber('hoverStartTime') ?? 20,
                  "hover-stay-time": unref(cancelBtnProps)?.getNumber('hoverStayTime') ?? 70,
                  lang: unref(cancelBtnProps)?.getString('lang') ?? 'en',
                  "session-from": unref(cancelBtnProps)?.getString('sessionFrom') ?? '',
                  "send-message-title": unref(cancelBtnProps)?.getString('sendMessageTitle') ?? '',
                  "send-message-path": unref(cancelBtnProps)?.getString('sendMessagePath') ?? '',
                  "send-message-img": unref(cancelBtnProps)?.getString('sendMessageImg') ?? '',
                  "app-parameter": unref(cancelBtnProps)?.getString('appParameter') ?? '',
                  "show-message-card": unref(cancelBtnProps)?.getBoolean('showMessageCard') ?? false,
                  onClick: () => {onTplButtonTap('cancel', null)},
                  onGetuserinfo: getuserinfo,
                  onContact: contact,
                  onGetphonenumber: getphonenumber,
                  onError: error,
                  onOpensetting: opensetting,
                  onLaunchapp: launchapp,
                  onAgreeprivacyauthorization: agreeprivacyauthorization
                }), _uM({
                  default: withSlotCtx((): any[] => [_tD(unref(cancelBtnProps)?.getString('content'))]),
                  _: 1 /* STABLE */
                }), 8 /* PROPS */, ["style", "class", "block", "disabled", "content", "icon", "loading", "type", "ghost", "shape", "size", "variant", "open-type", "color", "textColor", "fontSize", "hover-stop-propagation", "hover-start-time", "hover-stay-time", "lang", "session-from", "send-message-title", "send-message-path", "send-message-img", "app-parameter", "show-message-card", "onClick"])
              : _cC("v-if", true)
          ]),
          renderSlot(_ctx.$slots, "confirm-btn", {}, (): any[] => [
            unref(confirmBtnProps) != null
              ? _cV(_component_l_button, _uM({
                  key: 0,
                  class: _nC(["l-dialog__button", [
							'l-dialog__button--' + unref(innerButtonLayout),
							_uM({
								'l-dialog__button--text': unref(buttonVariant)
							})
						]]),
                  style: _nS([
							unref(buttonStyle),
							_uM({
								'margin-left': (unref(cancelBtnProps) != null) && unref(innerButtonLayout) == 'horizontal' && !unref(buttonVariant) ? '24rpx': '0',
								'margin-bottom': (unref(cancelBtnProps) != null) && unref(innerButtonLayout) == 'vertical' && !unref(buttonVariant) ? '24rpx': '0',
							})
						]),
                  "data-type": "confirm",
                  block: unref(confirmBtnProps)?.getBoolean('block') ?? false,
                  disabled: unref(confirmBtnProps)?.getBoolean('disabled') ?? false,
                  content: unref(confirmBtnProps)?.getString('content') ?? '',
                  icon: unref(confirmBtnProps)?.getString('icon') ?? '',
                  loading: unref(confirmBtnProps)?.getBoolean('loading') ?? false,
                  type: unref(confirmBtnProps)?.getString('type') ?? 'primary',
                  ghost: unref(confirmBtnProps)?.getBoolean('loading') ?? false,
                  shape: unref(confirmBtnProps)?.getString('shape') ?? 'rectangle',
                  size: unref(confirmBtnProps)?.getString('size') ?? 'medium',
                  variant: unref(confirmBtnProps)?.getString('variant') ?? 'solid',
                  "open-type": unref(confirmBtnProps)?.getString('openType'),
                  color: unref(confirmBtnProps)?.getString('color'),
                  textColor: unref(confirmBtnProps)?.getString('textColor'),
                  fontSize: unref(confirmBtnProps)?.getString('fontSize'),
                  "hover-stop-propagation": unref(confirmBtnProps)?.getBoolean('hoverStopPropagation') ?? false,
                  "hover-start-time": unref(confirmBtnProps)?.getNumber('hoverStartTime') ?? 20,
                  "hover-stay-time": unref(confirmBtnProps)?.getNumber('hoverStayTime') ?? 70,
                  lang: unref(confirmBtnProps)?.getString('lang') ?? 'en',
                  "session-from": unref(confirmBtnProps)?.getString('sessionFrom') ?? '',
                  "send-message-title": unref(confirmBtnProps)?.getString('sendMessageTitle') ?? '',
                  "send-message-path": unref(confirmBtnProps)?.getString('sendMessagePath') ?? '',
                  "send-message-img": unref(confirmBtnProps)?.getString('sendMessageImg') ?? '',
                  "app-parameter": unref(confirmBtnProps)?.getString('appParameter') ?? '',
                  "show-message-card": unref(confirmBtnProps)?.getBoolean('showMessageCard') ?? false,
                  onClick: () => {onTplButtonTap('confirm', null)},
                  onGetuserinfo: getuserinfo,
                  onContact: contact,
                  onGetphonenumber: getphonenumber,
                  onError: error,
                  onOpensetting: opensetting,
                  onLaunchapp: launchapp,
                  onAgreeprivacyauthorization: agreeprivacyauthorization
                }), _uM({
                  default: withSlotCtx((): any[] => [_tD(unref(confirmBtnProps)?.getString('content'))]),
                  _: 1 /* STABLE */
                }), 8 /* PROPS */, ["class", "style", "block", "disabled", "content", "icon", "loading", "type", "ghost", "shape", "size", "variant", "open-type", "color", "textColor", "fontSize", "hover-stop-propagation", "hover-start-time", "hover-stay-time", "lang", "session-from", "send-message-title", "send-message-path", "send-message-img", "app-parameter", "show-message-card", "onClick"])
              : _cC("v-if", true)
          ])
        ], 2 /* CLASS */)
      ])
    ]),
    _: 3 /* FORWARDED */
  }), 8 /* PROPS */, ["visible", "overlay", "closeOnClickOverlay", "preventScrollThrough", "zIndex"])
}
}

})
export default __sfc__
export type LDialogComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeDialogComponentsLDialogLDialogStyles = [_uM([["l-dialog", _pS(_uM([["overflow", "hidden"], ["width", "642rpx"], ["borderTopLeftRadius", "12rpx"], ["borderTopRightRadius", "12rpx"], ["borderBottomRightRadius", "12rpx"], ["borderBottomLeftRadius", "12rpx"], ["backgroundColor", "#ffffff"]]))], ["l-dialog__close", _pS(_uM([["position", "absolute"], ["top", "16rpx"], ["right", "16rpx"], ["zIndex", 1]]))], ["l-dialog__close-icon", _pS(_uM([["color", "rgba(0,0,0,0.45)"]]))], ["l-dialog__content", _pS(_uM([["paddingTop", "64rpx"], ["paddingRight", "48rpx"], ["paddingBottom", 0], ["paddingLeft", "48rpx"], ["maxHeight", "912rpx"], ["boxSizing", "border-box"], ["display", "flex"], ["flexDirection", "column"], ["justifyContent", "center"]]))], ["l-dialog__header", _pS(_uM([["textAlign", "center"], ["fontWeight", "bold"], ["fontSize", "36rpx"], ["lineHeight", "52rpx"], ["color", "rgba(0,0,0,0.88)"]]))], ["l-dialog__body-text", _pS(_uM([["textAlign", "center"], ["fontSize", "32rpx"], ["color", "rgba(0,0,0,0.65)"], ["lineHeight", "48rpx"]]))], ["l-dialog__body--left", _pS(_uM([["textAlign", "left"]]))], ["l-dialog__body--right", _pS(_uM([["textAlign", "right"]]))], ["l-dialog__body--gap", _pS(_uM([["marginTop", "16rpx"]]))], ["l-dialog__footer", _pS(_uM([["display", "flex"], ["paddingTop", "48rpx"], ["paddingRight", "48rpx"], ["paddingBottom", "48rpx"], ["paddingLeft", "48rpx"]]))], ["l-dialog__footer--horizontal", _pS(_uM([["flexDirection", "row"], ["flexWrap", "nowrap"]]))], ["l-dialog__footer--vertical", _pS(_uM([["flexDirection", "column-reverse"], ["flexWrap", "nowrap"]]))], ["l-dialog__button", _uM([[".l-dialog__footer--vertical ", _uM([["width", "100%"]])], ["", _uM([["position", "relative"], ["flex", 1], ["overflow", "hidden"], ["textOverflow", "ellipsis"], ["whiteSpace", "nowrap"]])]])], ["l-dialog__footer--full", _pS(_uM([["paddingTop", "64rpx"], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", 0]]))], ["l-dialog__button--horizontal", _uM([[".l-dialog__button--horizontal+", _uM([["marginLeft", "24rpx"]])]])], ["l-dialog__button--vertical", _uM([[".l-dialog__button--vertical+", _uM([["marginBottom", "24rpx"]])]])], ["l-dialog__button--text", _pS(_uM([["flex", 1], ["borderTopLeftRadius", 0], ["borderTopRightRadius", 0], ["borderBottomRightRadius", 0], ["borderBottomLeftRadius", 0], ["borderTopWidth", 1], ["borderTopStyle", "solid"], ["borderTopColor", "#e7e7e7"], ["borderLeftWidth", 1], ["borderLeftStyle", "solid"], ["borderLeftColor", "#e7e7e7"]]))]])]
