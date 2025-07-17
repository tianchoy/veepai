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
import io.dcloud.uniapp.extapi.switchTab as uni_switchTab
open class GenPagesMineMine : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineMine) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineMine
            val _cache = __ins.renderCache
            val localFiles = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/localFiles/localFiles"))
            }
            val userInfo = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/userInfo/userInfo"))
            }
            val rechargeDataTraffic = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/rechargeDataTraffic/rechargeDataTraffic"))
            }
            val myorders = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/myOrders/myOrders"))
            }
            val helpCenter = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/helpCenter/helpCenter"))
            }
            val msgCenter = fun(){
                uni_switchTab(SwitchTabOptions(url = "/pages/message/message"))
            }
            val feedback = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/feeback/feeback"))
            }
            val systemSetting = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/systemSetting/systemSetting"))
            }
            val aboutPage = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/about/about"))
            }
            return fun(): Any? {
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "files"), _uA(
                        _cE("view", _uM("class" to "file", "onClick" to localFiles), _uA(
                            _cE("image", _uM("class" to "fileIcon", "src" to "/static/mine/local.png", "mode" to "aspectFit")),
                            _cE("text", _uM("class" to "file-text"), "本地文件")
                        )),
                        _cE("view", _uM("class" to "file"), _uA(
                            _cE("image", _uM("class" to "fileIcon", "src" to "/static/mine/cloud.png", "mode" to "aspectFit")),
                            _cE("text", _uM("class" to "file-text"), "永久备份")
                        )),
                        _cE("view", _uM("class" to "file", "onClick" to msgCenter), _uA(
                            _cE("image", _uM("class" to "fileIcon", "src" to "/static/mine/msgList.png", "mode" to "aspectFit")),
                            _cE("text", _uM("class" to "file-text"), "消息列表")
                        ))
                    )),
                    _cE("view", _uM("class" to "tools-list"), _uA(
                        _cE("view", _uM("class" to "item", "onClick" to userInfo), _uA(
                            _cE("view", _uM("class" to "info"), _uA(
                                _cE("image", _uM("class" to "item-icon", "src" to "/static/mine/user.png", "mode" to "aspectFit")),
                                _cE("text", _uM("class" to "item-text"), "个人信息")
                            )),
                            _cE("view", null, _uA(
                                _cE("image", _uM("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        _cE("view", _uM("class" to "item", "onClick" to rechargeDataTraffic), _uA(
                            _cE("view", _uM("class" to "info"), _uA(
                                _cE("image", _uM("class" to "item-icon", "src" to "/static/mine/liuliang.png", "mode" to "aspectFit")),
                                _cE("text", _uM("class" to "item-text"), "流量充值")
                            )),
                            _cE("view", null, _uA(
                                _cE("image", _uM("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        _cE("view", _uM("class" to "item", "onClick" to myorders), _uA(
                            _cE("view", _uM("class" to "info"), _uA(
                                _cE("image", _uM("class" to "item-icon", "src" to "/static/mine/order.png", "mode" to "aspectFit")),
                                _cE("text", _uM("class" to "item-text"), "我的订单")
                            )),
                            _cE("view", null, _uA(
                                _cE("image", _uM("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        _cE("view", _uM("class" to "item", "onClick" to helpCenter), _uA(
                            _cE("view", _uM("class" to "info"), _uA(
                                _cE("image", _uM("class" to "item-icon", "src" to "/static/mine/quetion.png", "mode" to "aspectFit")),
                                _cE("text", _uM("class" to "item-text"), "常见问题")
                            )),
                            _cE("view", null, _uA(
                                _cE("image", _uM("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("view", _uM("class" to "info"), _uA(
                                _cE("image", _uM("class" to "item-icon", "src" to "/static/mine/online.png", "mode" to "aspectFit")),
                                _cE("text", _uM("class" to "item-text"), "在线客服")
                            )),
                            _cE("view", null, _uA(
                                _cE("image", _uM("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        _cE("view", _uM("class" to "item", "onClick" to feedback), _uA(
                            _cE("view", _uM("class" to "info"), _uA(
                                _cE("image", _uM("class" to "item-icon", "src" to "/static/mine/advice.png", "mode" to "aspectFit")),
                                _cE("text", _uM("class" to "item-text"), "意见反馈")
                            )),
                            _cE("view", null, _uA(
                                _cE("image", _uM("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        _cE("view", _uM("class" to "item", "onClick" to systemSetting), _uA(
                            _cE("view", _uM("class" to "info"), _uA(
                                _cE("image", _uM("class" to "item-icon", "src" to "/static/mine/setting.png", "mode" to "aspectFit")),
                                _cE("text", _uM("class" to "item-text"), "设置")
                            )),
                            _cE("view", null, _uA(
                                _cE("image", _uM("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        _cE("view", _uM("class" to "item no-bottom", "onClick" to aboutPage), _uA(
                            _cE("view", _uM("class" to "info"), _uA(
                                _cE("image", _uM("class" to "item-icon", "src" to "/static/mine/about.png", "mode" to "aspectFit")),
                                _cE("text", _uM("class" to "item-text"), "关于")
                            )),
                            _cE("view", null, _uA(
                                _cE("image", _uM("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
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
                return _uM("container" to _pS(_uM("width" to "100%", "height" to "100%", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx", "display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f1f1f1")), "files" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "width" to "100%", "height" to "100rpx", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "15rpx", "borderTopRightRadius" to "15rpx", "borderBottomRightRadius" to "15rpx", "borderBottomLeftRadius" to "15rpx", "paddingTop" to "70rpx", "paddingRight" to "80rpx", "paddingBottom" to "70rpx", "paddingLeft" to "80rpx", "marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0)), "file" to _uM(".container .files " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "fileIcon" to _uM(".container .files .file " to _uM("width" to "48rpx", "height" to "48rpx", "marginBottom" to "15rpx")), "file-text" to _uM(".container .files .file " to _uM("fontSize" to "20rpx", "color" to "#333333", "fontWeight" to "bold")), "tools-list" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "15rpx", "borderTopRightRadius" to "15rpx", "borderBottomRightRadius" to "15rpx", "borderBottomLeftRadius" to "15rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "item" to _uM(".container .tools-list " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "height" to "100rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "info" to _uM(".container .tools-list .item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginLeft" to "40rpx")), "item-icon" to _uM(".container .tools-list .item .info " to _uM("width" to "48rpx", "height" to "48rpx")), "item-text" to _uM(".container .tools-list .item .info " to _uM("fontSize" to "25rpx", "color" to "#333333", "marginLeft" to "20rpx")), "right-icon" to _uM(".container .tools-list .item " to _uM("width" to "35rpx", "height" to "35rpx")), "no-bottom" to _uM(".container .tools-list " to _uM("borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
