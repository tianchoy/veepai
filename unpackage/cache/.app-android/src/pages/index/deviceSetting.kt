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
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.setClipboardData as uni_setClipboardData
import io.dcloud.uniapp.extapi.showModal as uni_showModal
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesIndexDeviceSetting : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexDeviceSetting) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexDeviceSetting
            val _cache = __ins.renderCache
            val showEditName = ref(false)
            val newName = ref("")
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val editName = fun(){
                showEditName.value = true
            }
            val changeName = fun(){
                uni_showToast(ShowToastOptions(title = newName.value))
                showEditName.value = false
            }
            val copyUid = fun(){
                uni_setClipboardData(SetClipboardDataOptions(data = "123456", success = fun(_) {
                    uni_showToast(ShowToastOptions(title = "复制成功"))
                }
                ))
            }
            val goDeviceSettingInfo = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/index/deviceSettingInfo/deviceSettingInfo"))
            }
            val deleteDevice = fun(){
                uni_showModal(ShowModalOptions(title = "提示", content = "确认删除设备吗？", cancelText = "取消", confirmText = "删除", success = fun(res){
                    if (res.confirm) {
                        console.log("用户点击了确定", " at pages/index/deviceSetting.uvue:127")
                    }
                }
                ))
            }
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                val _component_l_input = resolveEasyComponent("l-input", GenUniModulesLimeInputComponentsLInputLInputClass)
                val _component_l_dialog = resolveEasyComponent("l-dialog", GenUniModulesLimeDialogComponentsLDialogLDialogClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cV(unref(GenComponentsTopNavBarClass), _uM("showBack" to true, "title" to "设备设置", "onBack" to goBack)),
                    _cE("view", _uM("class" to "device-box"), _uA(
                        _cE("image", _uM("class" to "device-img", "src" to default3, "mode" to "aspectFill")),
                        _cE("view", _uM("class" to "device-info"), _uA(
                            _cE("view", _uM("class" to "device-name-box"), _uA(
                                _cE("text", null, "设备名称"),
                                _cV(_component_l_icon, _uM("name" to "round-filled", "color" to "#e8782eff", "size" to "18")),
                                _cV(_component_l_icon, _uM("style" to _nS(_uM("margin-left" to "50rpx")), "name" to "edit", "color" to "#333", "size" to "18", "onClick" to editName), null, 8, _uA(
                                    "style"
                                ))
                            )),
                            _cE("view", null, _uA(
                                _cE("view", _uM("class" to "model-uid"), _uA(
                                    _cE("text", null, "型号"),
                                    _cE("text", _uM("class" to "model-uid-text"), "YY-1234567")
                                )),
                                _cE("view", _uM("class" to "model-uid"), _uA(
                                    _cE("text", null, "UID"),
                                    _cE("view", _uM("class" to "model-uid"), _uA(
                                        _cE("text", _uM("class" to "model-uid-text"), "YY-1234567"),
                                        _cV(_component_l_icon, _uM("name" to "file-copy", "color" to "#999", "size" to "16", "onClick" to copyUid))
                                    ))
                                ))
                            )),
                            _cE("text", _uM("class" to "network"), "网络 中国电信")
                        ))
                    )),
                    _cE("view", _uM("class" to "device-list-box"), _uA(
                        _cE("view", _uM("class" to "item", "onClick" to goDeviceSettingInfo), _uA(
                            _cE("text", null, "设备设置"),
                            _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#111", "size" to "40"))
                        )),
                        _cE("view", _uM("class" to "traffic"), _uA(
                            _cE("view", _uM("class" to "item"), _uA(
                                _cE("text", null, "流量充值"),
                                _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#111", "size" to "40"))
                            )),
                            _cE("view", _uM("class" to "date"), _uA(
                                _cE("text", _uM("class" to "word"), "已用80G(80%)"),
                                _cE("text", _uM("class" to "word"), "2025-8-10到期")
                            ))
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("text", null, "智能侦测"),
                            _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#111", "size" to "40"))
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("text", null, "TF卡设置"),
                            _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#111", "size" to "40"))
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("text", null, "云存储设置"),
                            _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#111", "size" to "40"))
                        )),
                        _cE("view", _uM("class" to "item nounderline"), _uA(
                            _cE("text", null, "存储管理"),
                            _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#111", "size" to "40"))
                        ))
                    )),
                    _cE("view", _uM("class" to "btn-box"), _uA(
                        _cV(_component_fui_button, _uM("text" to "删除设备", "height" to "80rpx", "background" to "#fff", "color" to "red", "onClick" to deleteDevice))
                    )),
                    _cV(_component_l_dialog, _uM("modelValue" to showEditName.value, "onUpdate:modelValue" to fun(`$event`: Boolean){
                        showEditName.value = `$event`
                    }
                    , "title" to "修改设备名称", "cancel-btn" to object : UTSJSONObject() {
                        var content = "取消"
                        var variant = "text"
                        var size = "large"
                        var type = "default"
                    }, "confirm-btn" to object : UTSJSONObject() {
                        var content = "确认"
                        var variant = "text"
                        var size = "large"
                    }, "onConfirm" to changeName, "onCancel" to fun(){
                        showEditName.value = false
                    }
                    ), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(_component_l_input, _uM("placeholder" to "请输入设备新名称", "modelValue" to newName.value, "onUpdate:modelValue" to fun(`$event`: String){
                                newName.value = `$event`
                            }
                            , "l-style" to "background: #f3f3f3; margin-top:16px; padding-top:12px;padding:12px"), null, 8, _uA(
                                "modelValue",
                                "onUpdate:modelValue"
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "modelValue",
                        "onUpdate:modelValue",
                        "onCancel"
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "device-box" to _uM(".container " to _uM("marginTop" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-start")), "device-img" to _uM(".container .device-box " to _uM("width" to "200rpx", "height" to "200rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "marginRight" to "20rpx")), "device-info" to _uM(".container .device-box " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-start", "justifyContent" to "space-between")), "device-name-box" to _uM(".container .device-box .device-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "model-uid" to _uM(".container .device-box .device-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "5rpx", "paddingRight" to 0, "paddingBottom" to "5rpx", "paddingLeft" to 0)), "model-uid-text" to _uM(".container .device-box .device-info .model-uid " to _uM("marginLeft" to "30rpx", "marginRight" to "10rpx")), "network" to _uM(".container .device-box .device-info " to _uM("color" to "#999999")), "device-list-box" to _uM(".container " to _uM("marginTop" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "item" to _uM(".container .device-list-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "30rpx", "paddingRight" to 0, "paddingBottom" to "30rpx", "paddingLeft" to 0, "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1"), ".container .device-list-box .traffic " to _uM("borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")), "traffic" to _uM(".container .device-list-box " to _uM("display" to "flex", "flexDirection" to "column", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0, "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "date" to _uM(".container .device-list-box .traffic " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "word" to _uM(".container .device-list-box .traffic .date " to _uM("color" to "#999999")), "nounderline" to _uM(".container .device-list-box " to _uM("borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")), "btn-box" to _uM(".container " to _uM("marginTop" to "80rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
