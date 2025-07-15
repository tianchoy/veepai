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
open class GenPagesIndexDeviceSettingInfoDeviceNight : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexDeviceSettingInfoDeviceNight) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexDeviceSettingInfoDeviceNight
            val _cache = __ins.renderCache
            val kVal = ref("1")
            val select_img = ref("../../../static/u4062.png")
            val radioItems = ref(_uA<RadioItem2>(RadioItem2(name = "黑白夜视", desc = "采用红外补光，隐蔽性高，图像为黑白夜视", img = "../../../static/u4062.png", value = "1", checked = true), RadioItem2(name = "全彩夜视", desc = "夜晚开白光灯，可做照明使用，图像为彩色", img = "../../../static/u4063.png", value = "2", checked = false), RadioItem2(name = "智能夜视", desc = "默认为黑白夜视，检测到画面为动态是变为全彩夜视", img = "../../../static/u4064.png", value = "3", checked = false), RadioItem2(name = "星光夜视", desc = "当前环境光线充足，并且不想看到灯光亮起，则选择该项", img = "../../../static/u4062.png", value = "4", checked = false)))
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val change = fun(value: RadioItem2){
                kVal.value = value.value
                select_img.value = value.img
            }
            return fun(): Any? {
                val _component_fui_radio = resolveEasyComponent("fui-radio", GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadioClass)
                val _component_fui_list_cell = resolveEasyComponent("fui-list-cell", GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCellClass)
                val _component_fui_label = resolveEasyComponent("fui-label", GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabelClass)
                val _component_fui_radio_group = resolveEasyComponent("fui-radio-group", GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroupClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cV(unref(GenComponentsTopNavBarClass), _uM("title" to "夜视模式", "show-back" to true, "onBack" to goBack)),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("image", _uM("src" to select_img.value, "class" to "night-img", "mode" to "aspectFit"), null, 8, _uA(
                            "src"
                        )),
                        _cE("view", _uM("class" to "select-mode"), _uA(
                            _cV(_component_fui_radio_group, _uM("modelValue" to kVal.value, "onUpdate:modelValue" to fun(`$event`: String){
                                kVal.value = `$event`
                            }
                            ), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cE(Fragment, null, RenderHelpers.renderList(radioItems.value, fun(item, index, __index, _cached): Any {
                                        return _cV(_component_fui_label, _uM("key" to index), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _cV(_component_fui_list_cell, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                    return _uA(
                                                        _cE("view", _uM("class" to "fui-align__center", "onClick" to fun(){
                                                            change(item)
                                                        }
                                                        ), _uA(
                                                            _cE("view", _uM("class" to "fui-text-box"), _uA(
                                                                _cE("text", null, _tD(item.name), 1),
                                                                _cV(_component_fui_radio, _uM("checked" to item.checked, "value" to item.value, "color" to "#FFB703", "borderColor" to "#B2B2B2"), null, 8, _uA(
                                                                    "checked",
                                                                    "value"
                                                                ))
                                                            )),
                                                            _cE("text", _uM("class" to "fui-desc"), _tD(item.desc), 1)
                                                        ), 8, _uA(
                                                            "onClick"
                                                        ))
                                                    )
                                                }
                                                ), "_" to 2), 1024)
                                            )
                                        }
                                        ), "_" to 2), 1024)
                                    }
                                    ), 128)
                                )
                            }
                            ), "_" to 1), 8, _uA(
                                "modelValue",
                                "onUpdate:modelValue"
                            ))
                        ))
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "night-img" to _uM(".container .content " to _uM("width" to "100%", "height" to "245rpx")), "fui-align__center" to _uM(".container .content .select-mode " to _uM("width" to "100%")), "fui-text-box" to _uM(".container .content .select-mode .fui-align__center " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "marginBottom" to "10rpx")), "fui-desc" to _uM(".container .content .select-mode .fui-align__center " to _uM("color" to "#999999", "fontSize" to "24rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
