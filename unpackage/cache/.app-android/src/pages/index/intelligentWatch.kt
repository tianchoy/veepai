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
open class GenPagesIndexIntelligentWatch : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexIntelligentWatch) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexIntelligentWatch
            val _cache = __ins.renderCache
            val peopleWatch = ref<Boolean>(true)
            val mobileWatch = ref<Boolean>(true)
            val flashlight = ref<Boolean>(true)
            val redBlueWatch = ref<Boolean>(true)
            val policeWatch = ref<Boolean>(true)
            val peopleSelectWatch = ref<Boolean>(true)
            val peopleFindWatch = ref<Boolean>(true)
            val showPicker = ref<Boolean>(false)
            val peopleWatchLevel = ref<String>("中")
            val timeWatchLevel = ref<String>("全天")
            val pickerOptions = ref(_uA<PickerColumn>())
            val PickerModeOptions = ref(_uA<PickerColumn>())
            val mobileWatchLevel = ref<String>("高")
            val mobileTimeWatchLevel = ref<String>("全天")
            var currentCallback: ((value: String) -> Unit)? = null
            val peopeWatchOptions = _uA<PickerColumn>(_uA(
                PickerColumnItem1(label = "高", value = "高"),
                PickerColumnItem1(label = "中", value = "中"),
                PickerColumnItem1(label = "低", value = "低")
            ))
            val typeModeWatchOptions = _uA<PickerColumn>(_uA(
                PickerColumnItem1(label = "全天模式", value = "全天"),
                PickerColumnItem1(label = "白天模式", value = "白天模式"),
                PickerColumnItem1(label = "夜晚模式", value = "夜晚模式")
            ))
            val peopleWatchFun = fun(e: Boolean){
                peopleWatch.value = e
            }
            val peopeWatchChange = fun(){
                pickerOptions.value = peopeWatchOptions
                currentCallback = fun(value: String){
                    peopleWatchLevel.value = value
                }
                showPicker.value = true
            }
            val timeWatchChange = fun(){
                pickerOptions.value = typeModeWatchOptions
                currentCallback = fun(value: String){
                    timeWatchLevel.value = value
                }
                showPicker.value = true
            }
            val pickerFun = fun(e: PickerConfirmEvent){
                val selectedValue = e.values[0].toString()
                currentCallback?.invoke(selectedValue)
                showPicker.value = false
                currentCallback = null
            }
            val mobileWatchChange = fun(){
                pickerOptions.value = peopeWatchOptions
                currentCallback = fun(value: String){
                    mobileWatchLevel.value = value
                }
                showPicker.value = true
            }
            val mTimeWatchChange = fun(){
                pickerOptions.value = typeModeWatchOptions
                currentCallback = fun(value: String){
                    mobileTimeWatchLevel.value = value
                }
                showPicker.value = true
            }
            val mobileWatchFun = fun(e: Boolean){
                mobileWatch.value = e
            }
            val flashlightFun = fun(e: Boolean){
                flashlight.value = e
            }
            val redBlueWatchFun = fun(e: Boolean){
                redBlueWatch.value = e
            }
            val policeWatchFun = fun(e: Boolean){
                policeWatch.value = e
            }
            val peopleSelectWatchFun = fun(e: Boolean){
                peopleSelectWatch.value = e
            }
            val peopleFindWatchFun = fun(e: Boolean){
                peopleFindWatch.value = e
            }
            return fun(): Any? {
                val _component_fui_switch = resolveEasyComponent("fui-switch", GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitchClass)
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_l_picker = resolveEasyComponent("l-picker", GenUniModulesLimePickerComponentsLPickerLPickerClass)
                val _component_l_popup = resolveEasyComponent("l-popup", GenUniModulesLimePopupComponentsLPopupLPopupClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "人形侦测"),
                            _cV(_component_fui_switch, _uM("scaleRatio" to 0.8, "checked" to peopleWatch.value, "onChange" to peopleWatchFun), null, 8, _uA(
                                "checked"
                            ))
                        )),
                        if (isTrue(peopleWatch.value)) {
                            _cE("view", _uM("key" to 0, "class" to "list", "onClick" to peopeWatchChange), _uA(
                                _cE("text", null, "侦测灵敏度"),
                                _cE("view", _uM("class" to "level"), _uA(
                                    _cE("text", null, _tD(peopleWatchLevel.value), 1),
                                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to "60"))
                                ))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        if (isTrue(peopleWatch.value)) {
                            _cE("view", _uM("key" to 1, "class" to "list", "onClick" to timeWatchChange), _uA(
                                _cE("text", null, "侦测时间段"),
                                _cE("view", _uM("class" to "level"), _uA(
                                    _cE("text", null, _tD(timeWatchLevel.value), 1),
                                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to "60"))
                                ))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        if (isTrue(peopleWatch.value)) {
                            _cE("view", _uM("key" to 2, "class" to "list nounderline"), _uA(
                                _cE("text", null, "侦测范围"),
                                _cE("view", _uM("class" to "level"), _uA(
                                    _cE("text", null, "全部"),
                                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to "60"))
                                ))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                    )),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "移动侦测"),
                            _cV(_component_fui_switch, _uM("scaleRatio" to 0.8, "checked" to mobileWatch.value, "onChange" to mobileWatchFun), null, 8, _uA(
                                "checked"
                            ))
                        )),
                        if (isTrue(mobileWatch.value)) {
                            _cE("view", _uM("key" to 0, "class" to "list", "onClick" to mobileWatchChange), _uA(
                                _cE("text", null, "侦测灵敏度"),
                                _cE("view", _uM("class" to "level"), _uA(
                                    _cE("text", null, _tD(mobileWatchLevel.value), 1),
                                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to "60"))
                                ))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        if (isTrue(mobileWatch.value)) {
                            _cE("view", _uM("key" to 1, "class" to "list", "onClick" to mTimeWatchChange), _uA(
                                _cE("text", null, "侦测时间段"),
                                _cE("view", _uM("class" to "level"), _uA(
                                    _cE("text", null, _tD(mobileTimeWatchLevel.value), 1),
                                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to "60"))
                                ))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        if (isTrue(mobileWatch.value)) {
                            _cE("view", _uM("key" to 2, "class" to "list nounderline"), _uA(
                                _cE("text", null, "侦测范围"),
                                _cE("view", _uM("class" to "level"), _uA(
                                    _cE("text", null, "全部"),
                                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to "60"))
                                ))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                    )),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "闪光灯"),
                            _cV(_component_fui_switch, _uM("scaleRatio" to 0.8, "checked" to flashlight.value, "onChange" to flashlightFun), null, 8, _uA(
                                "checked"
                            ))
                        )),
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "红蓝警灯"),
                            _cV(_component_fui_switch, _uM("scaleRatio" to 0.8, "checked" to redBlueWatch.value, "onChange" to redBlueWatchFun), null, 8, _uA(
                                "checked"
                            ))
                        )),
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "报警声"),
                            _cV(_component_fui_switch, _uM("scaleRatio" to 0.8, "checked" to policeWatch.value, "onChange" to policeWatchFun), null, 8, _uA(
                                "checked"
                            ))
                        ))
                    )),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "list-box"), _uA(
                            _cE("view", _uM("class" to "list nounderline"), _uA(
                                _cE("view", _uM("class" to "text-box"), _uA(
                                    _cE("text", null, "人形框定"),
                                    _cV(_component_fui_icon, _uM("name" to "help", "size" to "30"))
                                )),
                                _cV(_component_fui_switch, _uM("scaleRatio" to 0.8, "checked" to peopleSelectWatch.value, "onChange" to peopleSelectWatchFun), null, 8, _uA(
                                    "checked"
                                ))
                            )),
                            _cE("text", _uM("class" to "tips"))
                        )),
                        _cE("view", _uM("class" to "list-box nounderline"), _uA(
                            _cE("view", _uM("class" to "list nounderline"), _uA(
                                _cE("view", _uM("class" to "text-box"), _uA(
                                    _cE("text", null, "人形追踪"),
                                    _cV(_component_fui_icon, _uM("name" to "help", "size" to "30"))
                                )),
                                _cV(_component_fui_switch, _uM("scaleRatio" to 0.8, "checked" to peopleFindWatch.value, "onChange" to peopleFindWatchFun), null, 8, _uA(
                                    "checked"
                                ))
                            )),
                            _cE("text", _uM("class" to "tips"))
                        ))
                    )),
                    _cV(_component_l_popup, _uM("modelValue" to showPicker.value, "onUpdate:modelValue" to fun(`$event`: Boolean){
                        showPicker.value = `$event`
                    }
                    , "position" to "bottom"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(_component_l_picker, _uM("cancel-btn" to "取消", "confirm-btn" to "确定", "columns" to pickerOptions.value, "onCancel" to fun(){
                                showPicker.value = false
                            }
                            , "onConfirm" to pickerFun), null, 8, _uA(
                                "columns",
                                "onCancel"
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
                return _uM("container" to _pS(_uM("paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "height" to "100%", "backgroundColor" to "#f5f5f5")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx", "marginBottom" to "50rpx")), "list" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "level" to _uM(".container .content .list " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "nounderline" to _uM(".container .content " to _uM("borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")), "list-box" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "column", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "text-box" to _uM(".container .content .list-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "tips" to _uM(".container .content .list-box " to _uM("color" to "#999999", "fontSize" to "24rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
