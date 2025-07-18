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
open class GenPagesIndexDeviceShareVisitorDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexDeviceShareVisitorDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexDeviceShareVisitorDetail
            val _cache = __ins.renderCache
            val checkboxGroupRef = ref<LCheckboxGroupComponentPublicInstance?>(null)
            val checked = ref(_uA<String>("1", "3", "7"))
            val onChange = fun(e: UTSArray<String>){
                console.log("onChange", e)
                checked.value = e
            }
            val checkAll = fun(){
                if (checkboxGroupRef.value == null) {
                    return
                }
                checkboxGroupRef.value!!.toggleAll(true)
            }
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                val _component_l_checkbox = resolveEasyComponent("l-checkbox", GenUniModulesLimeCheckboxComponentsLCheckboxLCheckboxClass)
                val _component_l_checkbox_group = resolveEasyComponent("l-checkbox-group", GenUniModulesLimeCheckboxComponentsLCheckboxGroupLCheckboxGroupClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("text", null, "访客信息"),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "访客姓名"),
                            _cE("text", null, "张三")
                        )),
                        _cE("view", _uM("class" to "list nounderline"), _uA(
                            _cE("text", null, "分享时间"),
                            _cE("text", null, "2023-12-12 12:12:12")
                        ))
                    )),
                    _cE("view", _uM("class" to "content-title"), _uA(
                        _cE("text", null, "访客权限"),
                        _cV(_component_l_icon, _uM("name" to "task-checked", "onClick" to checkAll, "size" to "20"))
                    )),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cV(_component_l_checkbox_group, _uM("ref_key" to "checkboxGroupRef", "ref" to checkboxGroupRef, "modelValue" to checked.value, "onUpdate:modelValue" to fun(`$event`: UTSArray<String>){
                            checked.value = `$event`
                        }
                        , "onChange" to onChange, "fontSize" to "28rpx", "iconSize" to "20", "direction" to "vertical"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
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
                        ), "_" to 1), 8, _uA(
                            "modelValue",
                            "onUpdate:modelValue"
                        ))
                    )),
                    _cE("view", _uM("class" to "btn-box"), _uA(
                        _cV(_component_fui_button, _uM("type" to "default", "borderColor" to "#6831ff", "color" to "#6831ff", "width" to "40%", "text" to "删除访客")),
                        _cV(_component_fui_button, _uM("type" to "primary", "width" to "40%", "text" to "保存"))
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "30rpx", "paddingBottom" to "20rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "50rpx", "marginLeft" to 0)), "list" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0, "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f5f5f5")), "nounderline" to _uM(".container .content " to _uM("borderBottomWidth" to 0, "borderBottomStyle" to "none", "borderBottomColor" to "#000000")), "l-checkbox" to _uM(".container .content " to _uM("width" to "100%", "display" to "flex", "flexDirection" to "row-reverse", "justifyContent" to "space-between", "paddingTop" to "30rpx", "paddingRight" to 0, "paddingBottom" to "30rpx", "paddingLeft" to 0, "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f5f5f5")), "content-title" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingRight" to "30rpx")), "btn-box" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
