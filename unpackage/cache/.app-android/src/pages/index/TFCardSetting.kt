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
open class GenPagesIndexTFCardSetting : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexTFCardSetting) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexTFCardSetting
            val _cache = __ins.renderCache
            val types = ref<Boolean>(true)
            val pickerOptions = ref(_uA<PickerColumn>())
            val percent = ref<Any>(80)
            val showPicker = ref<Boolean>(false)
            val vedioModeType = ref<String>("事件录像")
            val pictureQualityType = ref<String>("高清")
            val startTime = ref<String>("00:00")
            val endTime = ref<String>("23:59")
            var currentCallback: ((value: String) -> Unit)? = null
            val vedioModeOptions = _uA<PickerColumn>(_uA(
                PickerColumnItem(label = "一直录像", value = "一直录像"),
                PickerColumnItem(label = "事件录像", value = "事件录像")
            ))
            val pictureQualityOptions = _uA<PickerColumn>(_uA(
                PickerColumnItem(label = "高清", value = "高清"),
                PickerColumnItem(label = "超清", value = "超清")
            ))
            val vedioMode = fun(){
                types.value = true
                pickerOptions.value = vedioModeOptions
                currentCallback = fun(value: String){
                    vedioModeType.value = value
                }
                showPicker.value = true
            }
            val pictureQuality = fun(){
                types.value = true
                pickerOptions.value = pictureQualityOptions
                currentCallback = fun(value: String){
                    pictureQualityType.value = value
                }
                showPicker.value = true
            }
            val pickerFun = fun(e: PickerConfirmEvent){
                val selectedValue = e.values[0].toString()
                currentCallback?.invoke(selectedValue)
                showPicker.value = false
                currentCallback = null
            }
            val vedioTime = fun(){
                types.value = false
                showPicker.value = true
            }
            val startTimeChange = fun(value: String){
                startTime.value = value
            }
            val endTimeChange = fun(value: String){
                endTime.value = value
            }
            val getVedioTime = fun(){
                showPicker.value = false
            }
            return fun(): Any? {
                val _component_l_button = resolveEasyComponent("l-button", GenUniModulesLimeButtonComponentsLButtonLButtonClass)
                val _component_l_progress = resolveEasyComponent("l-progress", GenUniModulesLimeProgressComponentsLProgressLProgressClass)
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_l_picker = resolveEasyComponent("l-picker", GenUniModulesLimePickerComponentsLPickerLPickerClass)
                val _component_l_date_time_picker = resolveEasyComponent("l-date-time-picker", GenUniModulesLimeDateTimePickerComponentsLDateTimePickerLDateTimePickerClass)
                val _component_l_popup = resolveEasyComponent("l-popup", GenUniModulesLimePopupComponentsLPopupLPopupClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "list-box"), _uA(
                            _cE("view", _uM("class" to "title"), _uA(
                                _cE("text", null, "存储空间"),
                                _cV(_component_l_button, _uM("type" to "primary", "size" to "mini"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "存储管理"
                                    )
                                }
                                ), "_" to 1))
                            )),
                            _cV(_component_l_progress, _uM("percent" to percent.value, "info-align" to "end", "show-info" to true), null, 8, _uA(
                                "percent"
                            )),
                            _cE("view", _uM("class" to "title"), _uA(
                                _cE("text", null, "已用80G"),
                                _cE("text", null, "可用 20G/共100G")
                            ))
                        )),
                        _cE("view", _uM("class" to "list", "onClick" to vedioMode), _uA(
                            _cE("text", null, "录像模式"),
                            _cE("view", _uM("class" to "right"), _uA(
                                _cE("text", null, _tD(vedioModeType.value), 1),
                                _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to "50"))
                            ))
                        )),
                        _cE("view", _uM("class" to "list", "onClick" to pictureQuality), _uA(
                            _cE("text", null, "录像画质"),
                            _cE("view", _uM("class" to "right"), _uA(
                                _cE("text", null, _tD(pictureQualityType.value), 1),
                                _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to "50"))
                            ))
                        )),
                        _cE("view", _uM("class" to "list nobottom", "onClick" to vedioTime), _uA(
                            _cE("text", null, "录像时间"),
                            _cE("view", _uM("class" to "right"), _uA(
                                _cE("text", null, _tD(startTime.value) + "至" + _tD(endTime.value), 1),
                                _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to "50"))
                            ))
                        ))
                    )),
                    _cV(_component_l_popup, _uM("modelValue" to showPicker.value, "onUpdate:modelValue" to fun(`$event`: Boolean){
                        showPicker.value = `$event`
                    }
                    , "position" to "bottom"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            if (isTrue(types.value)) {
                                _cV(_component_l_picker, _uM("key" to 0, "cancel-btn" to "取消", "confirm-btn" to "确定", "columns" to pickerOptions.value, "onCancel" to fun(){
                                    showPicker.value = false
                                }, "onConfirm" to pickerFun), null, 8, _uA(
                                    "columns",
                                    "onCancel"
                                ))
                            } else {
                                _cE("view", _uM("key" to 1, "class" to "time-picker"), _uA(
                                    _cE("view", _uM("class" to "time-picker-title"), _uA(
                                        _cV(_component_l_button, _uM("type" to "default", "size" to "mini", "onClick" to fun(){
                                            showPicker.value = false
                                        }
                                        ), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                "取消"
                                            )
                                        }
                                        ), "_" to 1), 8, _uA(
                                            "onClick"
                                        )),
                                        _cE("text", null, "选择时间"),
                                        _cV(_component_l_button, _uM("type" to "primary", "size" to "mini", "onClick" to getVedioTime), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                "确定"
                                            )
                                        }
                                        ), "_" to 1))
                                    )),
                                    _cE("view", _uM("class" to "time-picker-content"), _uA(
                                        _cV(_component_l_date_time_picker, _uM("modelValue" to startTime.value, "onUpdate:modelValue" to fun(`$event`: String){
                                            startTime.value = `$event`
                                        }
                                        , "onChange" to startTimeChange, "mode" to 24), null, 8, _uA(
                                            "modelValue",
                                            "onUpdate:modelValue"
                                        )),
                                        _cE("text", null, "至"),
                                        _cV(_component_l_date_time_picker, _uM("modelValue" to endTime.value, "onUpdate:modelValue" to fun(`$event`: String){
                                            endTime.value = `$event`
                                        }
                                        , "onChange" to endTimeChange, "mode" to 24), null, 8, _uA(
                                            "modelValue",
                                            "onUpdate:modelValue"
                                        ))
                                    ))
                                ))
                            }
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "list-box" to _uM(".container .content " to _uM("borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f9f9f9")), "title" to _uM(".container .content .list-box " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "list" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "40rpx", "paddingRight" to "20rpx", "paddingBottom" to "40rpx", "paddingLeft" to "20rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f9f9f9")), "right" to _uM(".container .content .list " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0, "borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")), "nobottom" to _uM(".container .content " to _uM("borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")), "time-picker" to _uM(".container " to _uM("paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "time-picker-title" to _uM(".container .time-picker " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "marginBottom" to "20rpx")), "time-picker-content" to _uM(".container .time-picker " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center")), "l-picker" to _uM(".container .time-picker .time-picker-content " to _uM("width" to "45%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
