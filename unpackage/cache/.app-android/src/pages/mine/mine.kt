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
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
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
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "files"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "file", "onClick" to localFiles), utsArrayOf(
                            createElementVNode("image", utsMapOf("class" to "fileIcon", "src" to "/static/mine/local.png", "mode" to "aspectFit")),
                            createElementVNode("text", utsMapOf("class" to "file-text"), "本地文件")
                        )),
                        createElementVNode("view", utsMapOf("class" to "file"), utsArrayOf(
                            createElementVNode("image", utsMapOf("class" to "fileIcon", "src" to "/static/mine/cloud.png", "mode" to "aspectFit")),
                            createElementVNode("text", utsMapOf("class" to "file-text"), "永久备份")
                        )),
                        createElementVNode("view", utsMapOf("class" to "file", "onClick" to msgCenter), utsArrayOf(
                            createElementVNode("image", utsMapOf("class" to "fileIcon", "src" to "/static/mine/msgList.png", "mode" to "aspectFit")),
                            createElementVNode("text", utsMapOf("class" to "file-text"), "消息列表")
                        ))
                    )),
                    createElementVNode("view", utsMapOf("class" to "tools-list"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "item", "onClick" to userInfo), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "item-icon", "src" to "/static/mine/user.png", "mode" to "aspectFit")),
                                createElementVNode("text", utsMapOf("class" to "item-text"), "个人信息")
                            )),
                            createElementVNode("view", null, utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item", "onClick" to rechargeDataTraffic), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "item-icon", "src" to "/static/mine/liuliang.png", "mode" to "aspectFit")),
                                createElementVNode("text", utsMapOf("class" to "item-text"), "流量充值")
                            )),
                            createElementVNode("view", null, utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item", "onClick" to myorders), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "item-icon", "src" to "/static/mine/order.png", "mode" to "aspectFit")),
                                createElementVNode("text", utsMapOf("class" to "item-text"), "我的订单")
                            )),
                            createElementVNode("view", null, utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item", "onClick" to helpCenter), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "item-icon", "src" to "/static/mine/quetion.png", "mode" to "aspectFit")),
                                createElementVNode("text", utsMapOf("class" to "item-text"), "常见问题")
                            )),
                            createElementVNode("view", null, utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "item-icon", "src" to "/static/mine/online.png", "mode" to "aspectFit")),
                                createElementVNode("text", utsMapOf("class" to "item-text"), "在线客服")
                            )),
                            createElementVNode("view", null, utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item", "onClick" to feedback), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "item-icon", "src" to "/static/mine/advice.png", "mode" to "aspectFit")),
                                createElementVNode("text", utsMapOf("class" to "item-text"), "意见反馈")
                            )),
                            createElementVNode("view", null, utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item", "onClick" to systemSetting), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "item-icon", "src" to "/static/mine/setting.png", "mode" to "aspectFit")),
                                createElementVNode("text", utsMapOf("class" to "item-text"), "设置")
                            )),
                            createElementVNode("view", null, utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item no-bottom", "onClick" to aboutPage), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "item-icon", "src" to "/static/mine/about.png", "mode" to "aspectFit")),
                                createElementVNode("text", utsMapOf("class" to "item-text"), "关于")
                            )),
                            createElementVNode("view", null, utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "right-icon", "src" to "/static/mine/right.png", "mode" to "aspectFit"))
                            ))
                        ))
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ), utsArrayOf(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("container" to padStyleMapOf(utsMapOf("width" to "100%", "height" to "100%", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx", "display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f1f1f1")), "files" to utsMapOf(".container " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "width" to "100%", "height" to "100rpx", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "15rpx", "borderTopRightRadius" to "15rpx", "borderBottomRightRadius" to "15rpx", "borderBottomLeftRadius" to "15rpx", "paddingTop" to "70rpx", "paddingRight" to "80rpx", "paddingBottom" to "70rpx", "paddingLeft" to "80rpx", "marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0)), "file" to utsMapOf(".container .files " to utsMapOf("display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "fileIcon" to utsMapOf(".container .files .file " to utsMapOf("width" to "48rpx", "height" to "48rpx", "marginBottom" to "15rpx")), "file-text" to utsMapOf(".container .files .file " to utsMapOf("fontSize" to "20rpx", "color" to "#333333", "fontWeight" to "bold")), "tools-list" to utsMapOf(".container " to utsMapOf("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "15rpx", "borderTopRightRadius" to "15rpx", "borderBottomRightRadius" to "15rpx", "borderBottomLeftRadius" to "15rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "item" to utsMapOf(".container .tools-list " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "height" to "100rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "info" to utsMapOf(".container .tools-list .item " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginLeft" to "40rpx")), "item-icon" to utsMapOf(".container .tools-list .item .info " to utsMapOf("width" to "48rpx", "height" to "48rpx")), "item-text" to utsMapOf(".container .tools-list .item .info " to utsMapOf("fontSize" to "25rpx", "color" to "#333333", "marginLeft" to "20rpx")), "right-icon" to utsMapOf(".container .tools-list .item " to utsMapOf("width" to "35rpx", "height" to "35rpx")), "no-bottom" to utsMapOf(".container .tools-list " to utsMapOf("borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
