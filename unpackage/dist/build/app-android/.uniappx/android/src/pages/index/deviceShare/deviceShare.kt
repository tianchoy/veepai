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
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
open class GenPagesIndexDeviceShareDeviceShare : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexDeviceShareDeviceShare) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexDeviceShareDeviceShare
            val _cache = __ins.renderCache
            val checkboxGroupRef = ref<LCheckboxGroupComponentPublicInstance?>(null)
            val sharedCount = ref<String>("2")
            val shareType = ref<String>("1")
            val goVisitor = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/index/deviceShare/deviceVisitor"))
            }
            val change = fun(value: String){
                shareType.value = value
            }
            val onChange = fun(e: UTSArray<String>){
                console.log("onChange", e)
            }
            val checkAll = fun(){
                if (checkboxGroupRef.value == null) {
                    return
                }
                checkboxGroupRef.value!!.toggleAll(true)
            }
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                val _component_fui_radio = resolveEasyComponent("fui-radio", GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadioClass)
                val _component_fui_label = resolveEasyComponent("fui-label", GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabelClass)
                val _component_fui_radio_group = resolveEasyComponent("fui-radio-group", GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroupClass)
                val _component_l_input = resolveEasyComponent("l-input", GenUniModulesLimeInputComponentsLInputLInputClass)
                val _component_l_checkbox = resolveEasyComponent("l-checkbox", GenUniModulesLimeCheckboxComponentsLCheckboxLCheckboxClass)
                val _component_l_checkbox_group = resolveEasyComponent("l-checkbox-group", GenUniModulesLimeCheckboxComponentsLCheckboxGroupLCheckboxGroupClass)
                val _component_l_button = resolveEasyComponent("l-button", GenUniModulesLimeButtonComponentsLButtonLButtonClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("text", _uM("class" to "share-title"), "设备的名称"),
                        _cE("view", _uM("class" to "list", "onClick" to goVisitor), _uA(
                            _cE("view", _uM("class" to "shared-title"), _uA(
                                _cE("text", null, "已分享"),
                                _cE("text", _uM("class" to "shared-count"), _tD(sharedCount.value), 1)
                            )),
                            _cV(_component_l_icon, _uM("name" to "chevron-right", "size" to "30"))
                        ))
                    )),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("text", _uM("class" to "title"), "分享方式"),
                        _cE("view", _uM("class" to "share-type"), _uA(
                            _cV(_component_fui_radio_group, _uM("name" to "radio", "onChange" to change, "modelValue" to shareType.value), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cE("view", _uM("class" to "fui-list__item"), _uA(
                                        _cV(_component_fui_label, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _cE("view", _uM("class" to "fui-align__center"), _uA(
                                                    _cV(_component_fui_radio, _uM("value" to "1", "scaleRatio" to 0.9)),
                                                    _cE("text", _uM("class" to "fui-text"), "夜精灵用户")
                                                ))
                                            )
                                        }
                                        ), "_" to 1)),
                                        _cV(_component_fui_label, _uM("margin" to "0 0 0 40rpx"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _cE("view", _uM("class" to "fui-align__center"), _uA(
                                                    _cV(_component_fui_radio, _uM("value" to "2", "scaleRatio" to 0.9)),
                                                    _cE("text", _uM("class" to "fui-text"), "二维码")
                                                ))
                                            )
                                        }
                                        ), "_" to 1)),
                                        _cV(_component_fui_label, _uM("margin" to "0 0 0 40rpx"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                _cE("view", _uM("class" to "fui-align__center"), _uA(
                                                    _cV(_component_fui_radio, _uM("value" to "3", "scaleRatio" to 0.9)),
                                                    _cE("text", _uM("class" to "fui-text"), "微信")
                                                ))
                                            )
                                        }
                                        ), "_" to 1))
                                    ))
                                )
                            }
                            ), "_" to 1), 8, _uA(
                                "modelValue"
                            ))
                        )),
                        if (shareType.value == "1") {
                            _cE("view", _uM("key" to 0, "class" to "share-content"), _uA(
                                _cE("text", null, "用户名"),
                                _cV(_component_l_input, _uM("placeholder" to "请输入文字"))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        _cE("view", _uM("class" to "visitor-box"), _uA(
                            _cE("view", _uM("class" to "vistor-title"), _uA(
                                _cE("text", _uM("class" to "title"), "设置访客权限"),
                                _cE("text", _uM("onClick" to checkAll), "全选")
                            )),
                            _cV(_component_l_checkbox_group, _uM("ref_key" to "checkboxGroupRef", "ref" to checkboxGroupRef, "iconSize" to "35rpx", "fontSize" to "30rpx", "onChange" to onChange, "direction" to "horizontal"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_l_checkbox, _uM("value" to "1", "label" to "视频预览")),
                                    _cV(_component_l_checkbox, _uM("value" to "2", "label" to "视频回放")),
                                    _cV(_component_l_checkbox, _uM("value" to "3", "label" to "云台控制")),
                                    _cV(_component_l_checkbox, _uM("value" to "4", "label" to "对讲")),
                                    _cV(_component_l_checkbox, _uM("value" to "5", "label" to "声音")),
                                    _cV(_component_l_checkbox, _uM("value" to "6", "label" to "推送")),
                                    _cV(_component_l_checkbox, _uM("value" to "7", "label" to "设备管理"))
                                )
                            }
                            ), "_" to 1), 512)
                        ))
                    )),
                    _cE("view", _uM("class" to "btn"), _uA(
                        _cV(_component_l_button, _uM("type" to "primary", "block" to ""), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                "分享"
                            )
                        }
                        ), "_" to 1))
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "marginBottom" to "50rpx")), "share-title" to _uM(".container .content " to _uM("paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "list" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "shared-title" to _uM(".container .content .list " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0)), "shared-count" to _uM(".container .content .list .shared-title " to _uM("marginLeft" to "20rpx", "color" to "#9d2ddf", "fontWeight" to "bold")), "title" to _uM(".container .content " to _uM("paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx", "fontWeight" to "bold")), "share-type" to _uM(".container .content " to _uM("paddingTop" to "30rpx", "paddingRight" to "30rpx", "paddingBottom" to "30rpx", "paddingLeft" to "30rpx")), "fui-list__item" to _uM(".container .content .share-type " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-start", "alignItems" to "center")), "fui-align__center" to _uM(".container .content .share-type .fui-list__item " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-start", "alignItems" to "center")), "fui-text" to _uM(".container .content .share-type .fui-list__item .fui-align__center " to _uM("marginLeft" to "10rpx")), "share-content" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-start", "alignItems" to "center", "paddingTop" to "10rpx", "paddingRight" to "30rpx", "paddingBottom" to "10rpx", "paddingLeft" to "30rpx", "width" to "100%")), "l-input" to _uM(".container .content .share-content " to _uM("flex" to 1, "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#cccccc", "borderRightColor" to "#cccccc", "borderBottomColor" to "#cccccc", "borderLeftColor" to "#cccccc", "paddingTop" to "10rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "10rpx", "borderTopRightRadius" to "10rpx", "borderBottomRightRadius" to "10rpx", "borderBottomLeftRadius" to "10rpx", "marginLeft" to "20rpx")), "visitor-box" to _uM(".container .content " to _uM("paddingTop" to "30rpx", "paddingRight" to 0, "paddingBottom" to "30rpx", "paddingLeft" to 0)), "vistor-title" to _uM(".container .content .visitor-box " to _uM("paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "30rpx", "paddingLeft" to 0, "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center")), "l-checkbox-group" to _uM(".container .content .visitor-box " to _uM("display" to "flex", "flexDirection" to "row", "flexWrap" to "wrap", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "l-checkbox" to _uM(".container .content .visitor-box .l-checkbox-group " to _uM("marginTop" to 0, "marginRight" to "30rpx", "marginBottom" to "30rpx", "marginLeft" to 0)), "btn" to _uM(".container " to _uM("marginTop" to "100rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
