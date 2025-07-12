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
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesMineHelpCenterHelpCenter : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineHelpCenterHelpCenter) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineHelpCenterHelpCenter
            val _cache = __ins.renderCache
            val value = ref("")
            val tabIndex = ref(0)
            val search = fun(){
                uni_showToast(ShowToastOptions(title = value.value))
            }
            val questionDetail = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/helpCenter/questionDetail/questionDetail"))
            }
            return fun(): Any? {
                val _component_l_button = resolveEasyComponent("l-button", GenUniModulesLimeButtonComponentsLButtonLButtonClass)
                val _component_l_search = resolveEasyComponent("l-search", GenUniModulesLimeSearchComponentsLSearchLSearchClass)
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                val _component_l_tab_panel = resolveEasyComponent("l-tab-panel", GenUniModulesLimeTabsComponentsLTabPanelLTabPanelClass)
                val _component_l_tabs = resolveEasyComponent("l-tabs", GenUniModulesLimeTabsComponentsLTabsLTabsClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "search-bar"), _uA(
                        _cV(_component_l_search, _uM("class" to "search", "padding" to "10rpx 5rpx 10rpx 24rpx", "modelValue" to unref(value), "onUpdate:modelValue" to fun(`$event`: String){
                            trySetRefValue(value, `$event`)
                        }
                        , "shape" to "round", "placeholder" to "请输入关键字"), _uM("right-icon" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cV(_component_l_button, _uM("type" to "primary", "size" to "small", "shape" to "round", "onClick" to search), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "搜索"
                                    )
                                }
                                ), "_" to 1))
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "modelValue"
                        ))
                    )),
                    _cE("view", _uM("class" to "question-box"), _uA(
                        _cV(_component_l_tabs, _uM("modelValue" to unref(tabIndex), "onUpdate:modelValue" to fun(`$event`: Number){
                            trySetRefValue(tabIndex, `$event`)
                        }
                        , "space-evenly" to false, "animated" to true), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cV(_component_l_tab_panel, _uM("value" to 0, "label" to "添加设备", "onClick" to questionDetail), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _cE("view", _uM("class" to "question-item"), _uA(
                                            _cE("text", null, "如何添加设备？"),
                                            _cV(_component_l_icon, _uM("name" to "chevron-right", "size" to "28"))
                                        ))
                                    )
                                }
                                ), "_" to 1)),
                                _cV(_component_l_tab_panel, _uM("value" to 1, "label" to "网络问题"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _cE("view", _uM("class" to "question-item"), _uA(
                                            _cE("text", null, "网络连不上？"),
                                            _cV(_component_l_icon, _uM("name" to "chevron-right", "size" to "28"))
                                        ))
                                    )
                                }
                                ), "_" to 1)),
                                _cV(_component_l_tab_panel, _uM("value" to 2, "label" to "报警问题"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _cE("view", _uM("class" to "question-item"), _uA(
                                            _cE("text", null, "报警文件在哪查看？"),
                                            _cV(_component_l_icon, _uM("name" to "chevron-right", "size" to "28"))
                                        ))
                                    )
                                }
                                ), "_" to 1))
                            )
                        }
                        ), "_" to 1), 8, _uA(
                            "modelValue"
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "search-bar" to _uM(".container " to _uM("marginTop" to "30rpx", "marginRight" to 0, "marginBottom" to "30rpx", "marginLeft" to 0)), "l-tabs" to _uM(".container " to _uM("borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "question-item" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
