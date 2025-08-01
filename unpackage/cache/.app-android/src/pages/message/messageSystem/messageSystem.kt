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
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesMessageMessageSystemMessageSystem : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMessageMessageSystemMessageSystem) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMessageMessageSystemMessageSystem
            val _cache = __ins.renderCache
            val content = ref(_uA<msgType>(msgType(id = 1, desc = "您的XXX设备(ICCID:123456789)流量即将到期，请及时续费", time = "2024-10-24 15:58:32", type = "notice", flag = "unread"), msgType(id = 2, desc = "您的XXX设备(ICCID:123456789)流量已到期", time = "2024-10-24 15:58:32", type = "announcement", flag = "read"), msgType(id = 3, desc = "您的XXX设备(ICCID:123456789)流量已到期", time = "2024-10-24 15:58:32", type = "share", flag = "read")))
            val read = fun(id: Number){
                uni_showToast(ShowToastOptions(title = "已标记为已读" + id.toString(10)))
            }
            val submit = fun(){
                uni_showToast(ShowToastOptions(title = "确认分享", icon = "none"))
            }
            return fun(): Any? {
                val _component_fui_tag = resolveEasyComponent("fui-tag", GenUniModulesFirstuiUnixComponentsFuiTagFuiTagClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE(Fragment, null, RenderHelpers.renderList(content.value, fun(item, index, __index, _cached): Any {
                            return _cE("view", _uM("class" to "item", "key" to index), _uA(
                                _cE("image", _uM("class" to "unread", "src" to if (item.flag == "unread") {
                                    "/static/dot.png"
                                } else {
                                    ""
                                }
                                ), null, 8, _uA(
                                    "src"
                                )),
                                _cE("view", _uM("class" to "item-content"), _uA(
                                    _cE("text", _uM("onClick" to fun(){
                                        read(item.id)
                                    }
                                    ), _tD(item.desc), 9, _uA(
                                        "onClick"
                                    )),
                                    _cE("view", _uM("class" to "item-content-bottom"), _uA(
                                        _cE("view", _uM("class" to "tag-time"), _uA(
                                            if (item.type == "notice") {
                                                _cV(_component_fui_tag, _uM("key" to 0, "text" to "通知", "margin-bottom" to 24, "margin-right" to 24))
                                            } else {
                                                if (item.type == "announcement") {
                                                    _cV(_component_fui_tag, _uM("key" to 1, "text" to "公告", "type" to "success", "margin-bottom" to 24, "margin-right" to 24))
                                                } else {
                                                    if (item.type == "share") {
                                                        _cV(_component_fui_tag, _uM("key" to 2, "text" to "分享", "type" to "warning", "margin-bottom" to 24, "margin-right" to 24))
                                                    } else {
                                                        _cC("v-if", true)
                                                    }
                                                }
                                            }
                                            ,
                                            _cE("text", null, _tD(item.time), 1)
                                        )),
                                        if (item.type == "share") {
                                            _cV(_component_fui_button, _uM("key" to 0, "width" to "100rpx", "height" to "40rpx", "size" to 25, "text" to "确认", "onOnclick" to submit))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    ))
                                ))
                            ))
                        }
                        ), 128)
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
                return _uM("container" to _pS(_uM("height" to "100%", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "backgroundColor" to "#f5f5f5")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "30rpx", "paddingRight" to "30rpx", "paddingBottom" to "30rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "item" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row")), "unread" to _uM(".container .content .item " to _uM("width" to "20rpx", "height" to "20rpx", "marginRight" to "10rpx")), "item-content" to _uM(".container .content .item " to _uM("borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f9f9f9", "paddingBottom" to "20rpx", "marginBottom" to "20rpx", "flex" to 1)), "item-content-bottom" to _uM(".container .content .item .item-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "flex-end", "justifyContent" to "space-between", "marginTop" to "10rpx")), "tag-time" to _uM(".container .content .item .item-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "flex-end", "justifyContent" to "space-between", "marginTop" to "10rpx")), "fui-tag__wrap" to _uM(".container .content .item .item-content .tag-time " to _uM("!width" to "70rpx", "!height" to "40rpx", "!paddingTop" to "5rpx", "!paddingRight" to "10rpx", "!paddingBottom" to "5rpx", "!paddingLeft" to "10rpx", "!marginBottom" to 0)), "fui-tag__text" to _uM(".container .content .item .item-content .tag-time .fui-tag__wrap " to _uM("!fontSize" to "22rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
