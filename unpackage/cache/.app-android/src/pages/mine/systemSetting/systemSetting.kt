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
import io.dcloud.uniapp.extapi.getAppAuthorizeSetting as uni_getAppAuthorizeSetting
import io.dcloud.uniapp.extapi.getSystemSetting as uni_getSystemSetting
import io.dcloud.uniapp.extapi.openAppAuthorizeSetting as uni_openAppAuthorizeSetting
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesMineSystemSettingSystemSetting : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineSystemSettingSystemSetting) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineSystemSettingSystemSetting
            val _cache = __ins.renderCache
            val checked = ref<Boolean>(true)
            val showPicker = ref<Boolean>(false)
            val pickerOptions = ref(_uA<PickerColumn>())
            val playTypeItem = ref<String>("WIFI下自动播放")
            val systemNotifyState = ref<String>("")
            val AuthState = ref(_uA<AuthType>(AuthType(code = "authorized", state = "已授权"), AuthType(code = "not determined", state = "未授权"), AuthType(code = "denied", state = "未授权")))
            val permissionList = ref(_uA<PermissionItem>(PermissionItem(name = "位置信息", code = "locationAuthorized", status = "notDetermined"), PermissionItem(name = "相册", code = "albumAuthorized", status = "notDetermined"), PermissionItem(name = "麦克风", code = "microphoneAuthorized", status = "notDetermined"), PermissionItem(name = "蓝牙", code = "bluetoothAuthorized", status = "notDetermined"), PermissionItem(name = "系统通知", code = "notificationAuthorized", status = "notDetermined"), PermissionItem(name = "相机", code = "cameraAuthorized", status = "notDetermined")))
            val getSystemAuth = fun(item: PermissionItem){
                val res = uni_getAppAuthorizeSetting()
                val code = item.code
                if (code == "bluetoothAuthorized") {
                    val resu = uni_getSystemSetting()
                    console.log(resu, " at pages/mine/systemSetting/systemSetting.uvue:91")
                    if (resu.bluetoothEnabled == false) {
                        uni_showToast(ShowToastOptions(title = "请先手动打开蓝牙"))
                    } else {
                        permissionList.value.map(fun(item){
                            if (item.code == "bluetoothAuthorized") {
                                item.status = "已授权"
                            }
                        })
                    }
                } else {
                    val status = res[code]
                    if (status == "denied" || status == "not determined") {
                        uni_openAppAuthorizeSetting(OpenAppAuthorizeSettingOptions(success = fun(res){
                            console.log(res, " at pages/mine/systemSetting/systemSetting.uvue:108")
                        }
                        ))
                    }
                }
            }
            val changeChecked = fun(){
                console.log(checked.value, " at pages/mine/systemSetting/systemSetting.uvue:119")
            }
            val isChecked = fun(){
                checked.value = !checked.value
            }
            val playType = fun(){
                pickerOptions.value = _uA<PickerColumn>(_uA(
                    PickerColumnItem(label = "WIFI下自动播放", value = "WIFI下自动播放"),
                    PickerColumnItem(label = "总是播放", value = "总是播放"),
                    PickerColumnItem(label = "不播放", value = "不播放")
                ))
                showPicker.value = true
            }
            val onConfirm = fun(context: PickerConfirmEvent){
                showPicker.value = false
                playTypeItem.value = context.values[0].toString()
            }
            val oncancel = fun(){
                showPicker.value = false
            }
            onPageShow(fun(){
                val res = uni_getAppAuthorizeSetting()
                val resu = uni_getSystemSetting()
                permissionList.value = permissionList.value.map(fun(item): PermissionItem {
                    val newItem = UTSJSONObject.assign<PermissionItem>(UTSJSONObject(), item) as PermissionItem
                    if (item.code == "bluetoothAuthorized" && resu.bluetoothEnabled == true) {
                        newItem.status = "已授权"
                    } else {
                        AuthState.value.forEach(fun(auth){
                            if (auth.code === res[item.code]) {
                                newItem.status = auth.state
                            }
                        }
                        )
                    }
                    return newItem
                }
                )
            }
            )
            return fun(): Any? {
                val _component_fui_switch = resolveEasyComponent("fui-switch", GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitchClass)
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_fui_input = resolveEasyComponent("fui-input", GenUniModulesFirstuiUnixComponentsFuiInputFuiInputClass)
                val _component_l_picker = resolveEasyComponent("l-picker", GenUniModulesLimePickerComponentsLPickerLPickerClass)
                val _component_l_popup = resolveEasyComponent("l-popup", GenUniModulesLimePopupComponentsLPopupLPopupClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "items underline"), _uA(
                            _cE("view", _uM("class" to "offline"), _uA(
                                _cE("text", null, "离线提醒"),
                                _cV(_component_fui_switch, _uM("checked" to checked.value, "onChange" to changeChecked, "onUpdate:checked" to isChecked), null, 8, _uA(
                                    "checked"
                                ))
                            )),
                            _cE("text", _uM("class" to "tips"), "设备离线8小时后,推送消息到APP")
                        )),
                        _cE("view", _uM("class" to "items"), _uA(
                            _cV(_component_fui_input, _uM("label" to "自动播放", "labelSize" to 28, "textAlign" to "right", "borderBottom" to false, "placeholderStyle" to "font-size: 28rpx;", "disabled" to true, "placeholder" to playTypeItem.value, "onClick" to playType), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cE("text", null, _uA(
                                        _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to 48))
                                    ))
                                )
                            }
                            ), "_" to 1), 8, _uA(
                                "placeholder"
                            )),
                            _cE("text", _uM("class" to "tips"), "摄像机视频是否自动播放")
                        ))
                    )),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE(Fragment, null, RenderHelpers.renderList(permissionList.value, fun(item, index, __index, _cached): Any {
                            return _cE("view", _uM("key" to index), _uA(
                                _cV(_component_fui_input, _uM("label" to item.name, "labelSize" to 28, "textAlign" to "right", "borderBottom" to true, "placeholderStyle" to if (item.status == "未授权") {
                                    "font-size: 28rpx;color:red;"
                                } else {
                                    "font-size: 28rpx;color:green;"
                                }
                                , "disabled" to true, "placeholder" to item.status, "onClick" to fun(){
                                    getSystemAuth(item)
                                }
                                ), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _cE("text", null, _uA(
                                            _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to 48))
                                        ))
                                    )
                                }
                                ), "_" to 2), 1032, _uA(
                                    "label",
                                    "placeholderStyle",
                                    "placeholder",
                                    "onClick"
                                ))
                            ))
                        }
                        ), 128)
                    )),
                    _cV(_component_l_popup, _uM("modelValue" to showPicker.value, "onUpdate:modelValue" to fun(`$event`: Boolean){
                        showPicker.value = `$event`
                    }
                    , "position" to "bottom"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(_component_l_picker, _uM("cancel-btn" to "取消", "confirm-btn" to "确定", "columns" to pickerOptions.value, "onCancel" to oncancel, "onConfirm" to onConfirm), null, 8, _uA(
                                "columns"
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "modelValue",
                        "onUpdate:modelValue"
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "marginBottom" to "20rpx")), "items" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "column", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "fui-input__wrap" to _uM(".container .content .items " to _uM("!paddingTop" to "20rpx", "!paddingRight" to 0, "!paddingBottom" to "20rpx", "!paddingLeft" to 0)), "offline" to _uM(".container .content .items " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingBottom" to "10rpx")), "tips" to _uM(".container .content .items " to _uM("color" to "#999999", "fontSize" to "24rpx")), "underline" to _uM(".container .content " to _uM("borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f5f5f5")), "l-picker" to _uM(".container " to _uM("width" to "100%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
