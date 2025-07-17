@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI1F0985E
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
open class GenUniModulesLimeDialogComponentsLDialogLDialog : VueComponent, DialogProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var actions: UTSArray<UTSJSONObject>? by `$props`
    override var buttonLayout: String by `$props`
    override var cancelBtn: Any? by `$props`
    override var closeBtn: Boolean? by `$props`
    override var closeOnClickOverlay: Boolean by `$props`
    override var confirmBtn: Any? by `$props`
    override var content: String? by `$props`
    override var overlayStyle: String? by `$props`
    override var preventScrollThrough: Boolean by `$props`
    override var overlay: Boolean by `$props`
    override var title: String? by `$props`
    override var visible: Boolean? by `$props`
    override var zIndex: Number? by `$props`
    override var lStyle: String? by `$props`
    open var modelValue: Boolean by `$props`
    open var close: () -> Unit
        get() {
            return unref(this.`$exposed`["close"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "close", value)
        }
    open var show: (options: UTSJSONObject) -> UTSPromise<Number?>
        get() {
            return unref(this.`$exposed`["show"]) as (options: UTSJSONObject) -> UTSPromise<Number?>
        }
        set(value) {
            setRefValue(this.`$exposed`, "show", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeDialogComponentsLDialogLDialog, _arg1: SetupContext) -> Any? = fun(__props, ref1): Any? {
            var __expose = ref1.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeDialogComponentsLDialogLDialog
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val dialogCallbacks = reactive(DialogExpose(beforeClose = null, onAction = null, onConfirm = null, onCancel = null))
            val innerOptions = reactive<DialogOptions>(DialogOptions(actions = props.actions, buttonLayout = props.buttonLayout, cancelBtn = props.cancelBtn, closeBtn = props.closeBtn, closeOnClickOverlay = props.closeOnClickOverlay, confirmBtn = props.confirmBtn, content = props.content, overlayStyle = props.overlayStyle, preventScrollThrough = props.preventScrollThrough, overlay = props.overlay, title = props.title, visible = props.visible, zIndex = props.zIndex))
            val modelValue = useModel<Boolean>(__ins.props, "modelValue")
            val innerValue = computed(WritableComputedOptions(set = fun(value: Boolean) {
                modelValue.value = value
                if (!value) {
                    dialogCallbacks.beforeClose = null
                    dialogCallbacks.onConfirm = null
                    dialogCallbacks.onCancel = null
                }
            }
            , get = fun(): Boolean {
                return (props.visible ?: false) || modelValue.value
            }
            ))
            val closeBtnProps = computed(fun(): Boolean {
                return innerOptions.closeBtn ?: props.closeBtn ?: false
            }
            )
            val cancelBtnProps = computed(fun(): UTSJSONObject? {
                return parseToObject(props.cancelBtn ?: innerOptions.cancelBtn)
            }
            )
            val confirmBtnProps = computed(fun(): UTSJSONObject? {
                return parseToObject(props.confirmBtn ?: innerOptions.confirmBtn)
            }
            )
            val innerTitle = computed(fun(): String? {
                return props.title ?: innerOptions.title
            }
            )
            val innerButtonLayout = computed(fun(): String {
                return innerOptions.buttonLayout ?: props.buttonLayout
            }
            )
            val innerActions = computed(fun(): UTSArray<UTSJSONObject>? {
                return props.actions ?: innerOptions.actions
            }
            )
            val buttonVariant = computed(fun(): Boolean {
                val res1 = _uA(
                    confirmBtnProps.value,
                    cancelBtnProps.value
                ).some(fun(item): Boolean {
                    return item?.get("variant") == "text"
                }
                )
                val res2 = innerActions.value?.some(fun(item): Boolean {
                    return item["variant"] == "text"
                }
                )
                return res1 || (res2 ?: false)
            }
            )
            val buttonStyle = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (innerButtonLayout.value == "horizontal") {
                    style.set("flex-grow", 1)
                } else {
                    style.set("flex-grow", 0)
                }
                style.set("padding", 0)
                if (buttonVariant.value) {
                    style.set("border-top", "1px solid #e7e7e7")
                    style.set("border-radius", "0")
                    style.set("border-left", "1px solid #e7e7e7")
                }
                return style
            }
            )
            val onClose = fun(type: String){
                if (dialogCallbacks.beforeClose != null) {
                    dialogCallbacks.beforeClose!!(type).then(fun(res){
                        innerValue.value = false
                    }
                    )
                    return
                }
                innerValue.value = false
            }
            val onTplButtonTap = fun(type: String, extra: Number?){
                if (type == "confirm") {
                    emit("confirm")
                    if (dialogCallbacks.onConfirm != null) {
                        dialogCallbacks.onConfirm!!(null)
                        onClose("confirm")
                    }
                } else if (type == "cancel") {
                    emit("cancel")
                    if (dialogCallbacks.onCancel != null) {
                        dialogCallbacks.onCancel!!(true)
                        onClose("cancel")
                    }
                } else if (type == "action" && extra != null) {
                    emit("action", extra)
                    if (dialogCallbacks.onAction != null) {
                        dialogCallbacks.onAction!!(extra)
                        onClose("action")
                    }
                }
            }
            val getuserinfo = fun(e: UniEvent){
                emit("getuserinfo", e)
            }
            val contact = fun(e: UniEvent){
                emit("contact", e)
            }
            val getphonenumber = fun(e: UniEvent){
                emit("getphonenumber", e)
            }
            val error = fun(e: UniEvent){
                emit("error", e)
            }
            val opensetting = fun(e: UniEvent){
                emit("opensetting", e)
            }
            val launchapp = fun(e: UniEvent){
                emit("launchapp", e)
            }
            val agreeprivacyauthorization = fun(e: UniEvent){
                emit("agreeprivacyauthorization", e)
            }
            val overlayClick = fun(){
                if (props.closeOnClickOverlay) {
                    onClose("cancel")
                }
            }
            val _updateOptions = fun(options: UTSJSONObject){
                innerOptions.actions = options.getArray<UTSJSONObject>("actions") ?: props.actions
                innerOptions.buttonLayout = options.getString("buttonLayout") ?: props.buttonLayout
                val maxLengthSuggestion = if (innerOptions.buttonLayout == "vertical") {
                    7
                } else {
                    3
                }
                if (innerOptions.actions != null && (innerOptions.actions!!.length == 0 || innerOptions.actions!!.length > maxLengthSuggestion)) {
                    console.warn("action \u6570\u91CF\u5EFA\u8BAE\u63A7\u5236\u57281\u81F3" + maxLengthSuggestion + "\u4E2A", " at uni_modules/lime-dialog/components/l-dialog/l-dialog.uvue:390")
                }
                innerOptions.cancelBtn = options["cancelBtn"] ?: props.cancelBtn
                innerOptions.closeBtn = options.getBoolean("closeBtn") ?: props.closeBtn
                innerOptions.closeOnClickOverlay = options.getBoolean("closeOnClickOverlay") ?: props.closeOnClickOverlay
                innerOptions.confirmBtn = options.get("confirmBtn") ?: props.confirmBtn
                innerOptions.content = options.getString("content") ?: props.content
                innerOptions.overlayStyle = options.getString("overlayStyle") ?: props.overlayStyle
                innerOptions.preventScrollThrough = options.getBoolean("preventScrollThrough") ?: props.preventScrollThrough
                innerOptions.overlay = options.getBoolean("overlay") ?: props.overlay
                innerOptions.title = options.getString("title") ?: props.title
                innerOptions.zIndex = options.getNumber("zIndex") ?: props.zIndex
            }
            val _show = fun(options: UTSJSONObject): UTSPromise<Number?> {
                _updateOptions(options)
                innerValue.value = true
                try {
                    val beforeClose = options["beforeClose"]
                    if (UTSAndroid.`typeof`(beforeClose) == "function") {
                        dialogCallbacks.beforeClose = beforeClose as BeforeClose
                    }
                }
                 catch (err: Throwable) {
                    console.warn(err, " at uni_modules/lime-dialog/components/l-dialog/l-dialog.uvue:416")
                }
                return UTSPromise(fun(resolve, reject){
                    dialogCallbacks.onConfirm = resolve
                    dialogCallbacks.onAction = resolve
                    dialogCallbacks.onCancel = reject
                }
                )
            }
            val _close = fun(){
                innerValue.value = false
            }
            __expose(_uM("close" to _close, "show" to _show))
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                val _component_l_button = resolveEasyComponent("l-button", GenUniModulesLimeButtonComponentsLButtonLButtonClass)
                val _component_l_popup = resolveEasyComponent("l-popup", GenUniModulesLimePopupComponentsLPopupLPopupClass)
                return _cV(_component_l_popup, _uM("visible" to unref(innerValue), "overlay" to (unref(innerOptions).overlay ?: _ctx.overlay), "bg-color" to "transparent", "closeOnClickOverlay" to (unref(innerOptions).closeOnClickOverlay ?: _ctx.closeOnClickOverlay), "preventScrollThrough" to (unref(innerOptions).preventScrollThrough ?: _ctx.preventScrollThrough), "zIndex" to (_ctx.zIndex ?: unref(innerOptions).zIndex), "onChange" to overlayClick, "position" to "center"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                    return _uA(
                        _cE("view", _uM("class" to "l-dialog"), _uA(
                            renderSlot(_ctx.`$slots`, "top"),
                            if (isTrue(unref(closeBtnProps))) {
                                _cE("view", _uM("key" to 0, "class" to "l-dialog__close", "onClick" to fun(){
                                    onClose("close")
                                }), _uA(
                                    _cV(_component_l_icon, _uM("class" to "l-dialog__close-icon", "name" to "close", "size" to "44rpx"))
                                ), 8, _uA(
                                    "onClick"
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            _cE("view", _uM("class" to "l-dialog__content"), _uA(
                                renderSlot(_ctx.`$slots`, "title", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        if (unref(innerTitle) != null) {
                                            _cE("text", _uM("key" to 0, "class" to "l-dialog__header"), _tD(_ctx.title ?: unref(innerOptions).title), 1)
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    )
                                }
                                ),
                                _cE("view", _uM("class" to _nC(_uA(
                                    "l-dialog__body",
                                    _uM("l-dialog__body--gap" to (unref(innerTitle) != null || _ctx.`$slots`["title"] != null))
                                ))), _uA(
                                    renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE("text", _uM("class" to "l-dialog__body-text"), _tD(unref(innerOptions).content ?: _ctx.content), 1)
                                        )
                                    }
                                    )
                                ), 2)
                            )),
                            renderSlot(_ctx.`$slots`, "middle"),
                            _cE("view", _uM("class" to _nC(_uA(
                                "l-dialog__footer",
                                _uA(
                                    "l-dialog__footer--" + unref(innerButtonLayout),
                                    _uM("l-dialog__footer--column" to (unref(innerButtonLayout) == "vertical"), "l-dialog__footer--full" to unref(buttonVariant))
                                )
                            ))), _uA(
                                renderSlot(_ctx.`$slots`, "actions", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        if (unref(innerActions) != null) {
                                            _cE(Fragment, _uM("key" to 0), RenderHelpers.renderList(unref(innerActions)!!, fun(action, index, __index, _cached): Any {
                                                return _cV(_component_l_button, _uM("class" to _nC(_uA(
                                                    "l-dialog__button",
                                                    _uA(
                                                        "l-dialog__button--" + unref(innerButtonLayout),
                                                        _uM("l-dialog__button--text" to unref(buttonVariant))
                                                    )
                                                )), "key" to index, "style" to _nS(_uA(
                                                    unref(buttonStyle),
                                                    _uM("margin-left" to if (unref(innerButtonLayout) == "horizontal" && !unref(buttonVariant) && index > 0) {
                                                        "20rpx"
                                                    } else {
                                                        "0"
                                                    }, "margin-bottom" to if (unref(innerButtonLayout) == "vertical" && !unref(buttonVariant) && index > 0) {
                                                        "20rpx"
                                                    } else {
                                                        "0"
                                                    })
                                                )), "block" to (action.getBoolean("block") ?: false), "disabled" to (action.getBoolean("disabled") ?: false), "data-extra" to index, "content" to (action.getString("content") ?: ""), "icon" to (action.getString("icon") ?: ""), "loading" to (action.getBoolean("loading") ?: false), "type" to (action.getString("type") ?: "primary"), "ghost" to (action.getBoolean("loading") ?: false), "shape" to (action.getString("shape") ?: "rectangle"), "size" to (action.getString("size") ?: "medium"), "variant" to action.getString("variant"), "open-type" to (action.getString("openType") ?: ""), "color" to action.getString("color"), "textColor" to action.getString("textColor"), "fontSize" to action.getString("fontSize"), "hover-stop-propagation" to (action.getBoolean("hoverStopPropagation") ?: false), "hover-start-time" to (action.getNumber("hoverStartTime") ?: 20), "hover-stay-time" to (action.getNumber("hoverStayTime") ?: 70), "lang" to (action.getString("lang") ?: "en"), "session-from" to (action.getString("sessionFrom") ?: ""), "send-message-title" to (action.getString("sendMessageTitle") ?: ""), "send-message-path" to (action.getString("sendMessagePath") ?: ""), "send-message-img" to (action.getString("sendMessageImg") ?: ""), "app-parameter" to (action.getString("appParameter") ?: ""), "show-message-card" to (action.getBoolean("showMessageCard") ?: false), "onClick" to fun(){
                                                    onTplButtonTap("action", index)
                                                }, "onGetuserinfo" to getuserinfo, "onContact" to contact, "onGetphonenumber" to getphonenumber, "onError" to error, "onOpensetting" to opensetting, "onLaunchapp" to launchapp, "onAgreeprivacyauthorization" to agreeprivacyauthorization), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                    return _uA(
                                                        _tD(action["content"])
                                                    )
                                                }), "_" to 2), 1032, _uA(
                                                    "class",
                                                    "style",
                                                    "block",
                                                    "disabled",
                                                    "data-extra",
                                                    "content",
                                                    "icon",
                                                    "loading",
                                                    "type",
                                                    "ghost",
                                                    "shape",
                                                    "size",
                                                    "variant",
                                                    "open-type",
                                                    "color",
                                                    "textColor",
                                                    "fontSize",
                                                    "hover-stop-propagation",
                                                    "hover-start-time",
                                                    "hover-stay-time",
                                                    "lang",
                                                    "session-from",
                                                    "send-message-title",
                                                    "send-message-path",
                                                    "send-message-img",
                                                    "app-parameter",
                                                    "show-message-card",
                                                    "onClick"
                                                ))
                                            }), 128)
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    )
                                }
                                ),
                                renderSlot(_ctx.`$slots`, "cancel-btn", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        if (unref(cancelBtnProps) != null) {
                                            _cV(_component_l_button, _uM("key" to 0, "class" to _nC(_uA(
                                                "l-dialog__button",
                                                _uA(
                                                    "l-dialog__button--" + unref(innerButtonLayout),
                                                    _uM("l-dialog__button--text" to unref(buttonVariant))
                                                )
                                            )), "style" to _nS(_uA(
                                                unref(buttonStyle)
                                            )), "block" to (unref(cancelBtnProps)?.getBoolean("block") ?: false), "disabled" to (unref(cancelBtnProps)?.getBoolean("disabled") ?: false), "content" to (unref(cancelBtnProps)?.getString("content") ?: ""), "icon" to (unref(cancelBtnProps)?.getString("icon") ?: ""), "loading" to (unref(cancelBtnProps)?.getBoolean("loading") ?: false), "type" to (unref(cancelBtnProps)?.getString("type") ?: "primary"), "ghost" to (unref(cancelBtnProps)?.getBoolean("loading") ?: false), "shape" to (unref(cancelBtnProps)?.getString("shape") ?: "rectangle"), "size" to (unref(cancelBtnProps)?.getString("size") ?: "medium"), "variant" to (unref(cancelBtnProps)?.getString("variant") ?: "light"), "open-type" to unref(cancelBtnProps)?.getString("openType"), "color" to unref(cancelBtnProps)?.getString("color"), "textColor" to unref(cancelBtnProps)?.getString("textColor"), "fontSize" to unref(cancelBtnProps)?.getString("fontSize"), "hover-stop-propagation" to (unref(cancelBtnProps)?.getBoolean("hoverStopPropagation") ?: false), "hover-start-time" to (unref(cancelBtnProps)?.getNumber("hoverStartTime") ?: 20), "hover-stay-time" to (unref(cancelBtnProps)?.getNumber("hoverStayTime") ?: 70), "lang" to (unref(cancelBtnProps)?.getString("lang") ?: "en"), "session-from" to (unref(cancelBtnProps)?.getString("sessionFrom") ?: ""), "send-message-title" to (unref(cancelBtnProps)?.getString("sendMessageTitle") ?: ""), "send-message-path" to (unref(cancelBtnProps)?.getString("sendMessagePath") ?: ""), "send-message-img" to (unref(cancelBtnProps)?.getString("sendMessageImg") ?: ""), "app-parameter" to (unref(cancelBtnProps)?.getString("appParameter") ?: ""), "show-message-card" to (unref(cancelBtnProps)?.getBoolean("showMessageCard") ?: false), "onClick" to fun(){
                                                onTplButtonTap("cancel", null)
                                            }, "onGetuserinfo" to getuserinfo, "onContact" to contact, "onGetphonenumber" to getphonenumber, "onError" to error, "onOpensetting" to opensetting, "onLaunchapp" to launchapp, "onAgreeprivacyauthorization" to agreeprivacyauthorization), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                return _uA(
                                                    _tD(unref(cancelBtnProps)?.getString("content"))
                                                )
                                            }), "_" to 1), 8, _uA(
                                                "style",
                                                "class",
                                                "block",
                                                "disabled",
                                                "content",
                                                "icon",
                                                "loading",
                                                "type",
                                                "ghost",
                                                "shape",
                                                "size",
                                                "variant",
                                                "open-type",
                                                "color",
                                                "textColor",
                                                "fontSize",
                                                "hover-stop-propagation",
                                                "hover-start-time",
                                                "hover-stay-time",
                                                "lang",
                                                "session-from",
                                                "send-message-title",
                                                "send-message-path",
                                                "send-message-img",
                                                "app-parameter",
                                                "show-message-card",
                                                "onClick"
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    )
                                }
                                ),
                                renderSlot(_ctx.`$slots`, "confirm-btn", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        if (unref(confirmBtnProps) != null) {
                                            _cV(_component_l_button, _uM("key" to 0, "class" to _nC(_uA(
                                                "l-dialog__button",
                                                _uA(
                                                    "l-dialog__button--" + unref(innerButtonLayout),
                                                    _uM("l-dialog__button--text" to unref(buttonVariant))
                                                )
                                            )), "style" to _nS(_uA(
                                                unref(buttonStyle),
                                                _uM("margin-left" to if ((unref(cancelBtnProps) != null) && unref(innerButtonLayout) == "horizontal" && !unref(buttonVariant)) {
                                                    "24rpx"
                                                } else {
                                                    "0"
                                                }, "margin-bottom" to if ((unref(cancelBtnProps) != null) && unref(innerButtonLayout) == "vertical" && !unref(buttonVariant)) {
                                                    "24rpx"
                                                } else {
                                                    "0"
                                                })
                                            )), "data-type" to "confirm", "block" to (unref(confirmBtnProps)?.getBoolean("block") ?: false), "disabled" to (unref(confirmBtnProps)?.getBoolean("disabled") ?: false), "content" to (unref(confirmBtnProps)?.getString("content") ?: ""), "icon" to (unref(confirmBtnProps)?.getString("icon") ?: ""), "loading" to (unref(confirmBtnProps)?.getBoolean("loading") ?: false), "type" to (unref(confirmBtnProps)?.getString("type") ?: "primary"), "ghost" to (unref(confirmBtnProps)?.getBoolean("loading") ?: false), "shape" to (unref(confirmBtnProps)?.getString("shape") ?: "rectangle"), "size" to (unref(confirmBtnProps)?.getString("size") ?: "medium"), "variant" to (unref(confirmBtnProps)?.getString("variant") ?: "solid"), "open-type" to unref(confirmBtnProps)?.getString("openType"), "color" to unref(confirmBtnProps)?.getString("color"), "textColor" to unref(confirmBtnProps)?.getString("textColor"), "fontSize" to unref(confirmBtnProps)?.getString("fontSize"), "hover-stop-propagation" to (unref(confirmBtnProps)?.getBoolean("hoverStopPropagation") ?: false), "hover-start-time" to (unref(confirmBtnProps)?.getNumber("hoverStartTime") ?: 20), "hover-stay-time" to (unref(confirmBtnProps)?.getNumber("hoverStayTime") ?: 70), "lang" to (unref(confirmBtnProps)?.getString("lang") ?: "en"), "session-from" to (unref(confirmBtnProps)?.getString("sessionFrom") ?: ""), "send-message-title" to (unref(confirmBtnProps)?.getString("sendMessageTitle") ?: ""), "send-message-path" to (unref(confirmBtnProps)?.getString("sendMessagePath") ?: ""), "send-message-img" to (unref(confirmBtnProps)?.getString("sendMessageImg") ?: ""), "app-parameter" to (unref(confirmBtnProps)?.getString("appParameter") ?: ""), "show-message-card" to (unref(confirmBtnProps)?.getBoolean("showMessageCard") ?: false), "onClick" to fun(){
                                                onTplButtonTap("confirm", null)
                                            }, "onGetuserinfo" to getuserinfo, "onContact" to contact, "onGetphonenumber" to getphonenumber, "onError" to error, "onOpensetting" to opensetting, "onLaunchapp" to launchapp, "onAgreeprivacyauthorization" to agreeprivacyauthorization), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                return _uA(
                                                    _tD(unref(confirmBtnProps)?.getString("content"))
                                                )
                                            }), "_" to 1), 8, _uA(
                                                "class",
                                                "style",
                                                "block",
                                                "disabled",
                                                "content",
                                                "icon",
                                                "loading",
                                                "type",
                                                "ghost",
                                                "shape",
                                                "size",
                                                "variant",
                                                "open-type",
                                                "color",
                                                "textColor",
                                                "fontSize",
                                                "hover-stop-propagation",
                                                "hover-start-time",
                                                "hover-stay-time",
                                                "lang",
                                                "session-from",
                                                "send-message-title",
                                                "send-message-path",
                                                "send-message-img",
                                                "app-parameter",
                                                "show-message-card",
                                                "onClick"
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    )
                                }
                                )
                            ), 2)
                        ))
                    )
                }
                ), "_" to 3), 8, _uA(
                    "visible",
                    "overlay",
                    "closeOnClickOverlay",
                    "preventScrollThrough",
                    "zIndex"
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-dialog" to _pS(_uM("overflow" to "hidden", "width" to "642rpx", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "backgroundColor" to "#ffffff")), "l-dialog__close" to _pS(_uM("position" to "absolute", "top" to "16rpx", "right" to "16rpx", "zIndex" to 1)), "l-dialog__close-icon" to _pS(_uM("color" to "rgba(0,0,0,0.45)")), "l-dialog__content" to _pS(_uM("paddingTop" to "64rpx", "paddingRight" to "48rpx", "paddingBottom" to 0, "paddingLeft" to "48rpx", "maxHeight" to "912rpx", "boxSizing" to "border-box", "display" to "flex", "flexDirection" to "column", "justifyContent" to "center")), "l-dialog__header" to _pS(_uM("textAlign" to "center", "fontWeight" to "bold", "fontSize" to "36rpx", "lineHeight" to "52rpx", "color" to "rgba(0,0,0,0.88)")), "l-dialog__body-text" to _pS(_uM("textAlign" to "center", "fontSize" to "32rpx", "color" to "rgba(0,0,0,0.65)", "lineHeight" to "48rpx")), "l-dialog__body--left" to _pS(_uM("textAlign" to "left")), "l-dialog__body--right" to _pS(_uM("textAlign" to "right")), "l-dialog__body--gap" to _pS(_uM("marginTop" to "16rpx")), "l-dialog__footer" to _pS(_uM("display" to "flex", "paddingTop" to "48rpx", "paddingRight" to "48rpx", "paddingBottom" to "48rpx", "paddingLeft" to "48rpx")), "l-dialog__footer--horizontal" to _pS(_uM("flexDirection" to "row", "flexWrap" to "nowrap")), "l-dialog__footer--vertical" to _pS(_uM("flexDirection" to "column-reverse", "flexWrap" to "nowrap")), "l-dialog__button" to _uM(".l-dialog__footer--vertical " to _uM("width" to "100%"), "" to _uM("position" to "relative", "flex" to 1, "overflow" to "hidden", "textOverflow" to "ellipsis", "whiteSpace" to "nowrap")), "l-dialog__footer--full" to _pS(_uM("paddingTop" to "64rpx", "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0)), "l-dialog__button--horizontal" to _uM(".l-dialog__button--horizontal+" to _uM("marginLeft" to "24rpx")), "l-dialog__button--vertical" to _uM(".l-dialog__button--vertical+" to _uM("marginBottom" to "24rpx")), "l-dialog__button--text" to _pS(_uM("flex" to 1, "borderTopLeftRadius" to 0, "borderTopRightRadius" to 0, "borderBottomRightRadius" to 0, "borderBottomLeftRadius" to 0, "borderTopWidth" to 1, "borderTopStyle" to "solid", "borderTopColor" to "#e7e7e7", "borderLeftWidth" to 1, "borderLeftStyle" to "solid", "borderLeftColor" to "#e7e7e7")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("action" to null, "confirm" to null, "cancel" to null, "click" to null, "agreeprivacyauthorization" to null, "chooseavatar" to null, "getuserinfo" to null, "contact" to null, "getphonenumber" to null, "error" to null, "opensetting" to null, "launchapp" to null, "update:modelValue" to null)
        var props = _nP(_uM("actions" to _uM("type" to "Array", "required" to false), "buttonLayout" to _uM("type" to "String", "required" to true, "default" to "horizontal"), "cancelBtn" to _uM("required" to false), "closeBtn" to _uM("type" to "Boolean", "required" to false), "closeOnClickOverlay" to _uM("type" to "Boolean", "required" to true, "default" to true), "confirmBtn" to _uM("required" to false), "content" to _uM("type" to "String", "required" to false), "overlayStyle" to _uM("type" to "String", "required" to false), "preventScrollThrough" to _uM("type" to "Boolean", "required" to true, "default" to true), "overlay" to _uM("type" to "Boolean", "required" to true, "default" to true), "title" to _uM("type" to "String", "required" to false), "visible" to _uM("type" to "Boolean", "required" to false), "zIndex" to _uM("type" to "Number", "required" to false), "lStyle" to _uM("type" to "String", "required" to false), "modelValue" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "buttonLayout",
            "closeBtn",
            "closeOnClickOverlay",
            "preventScrollThrough",
            "overlay",
            "visible",
            "modelValue"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
