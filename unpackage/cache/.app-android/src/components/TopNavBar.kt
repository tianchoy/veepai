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
open class GenComponentsTopNavBar : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var title: String by `$props`
    open var showBack: Boolean by `$props`
    open var messageCount: Number by `$props`
    open var rightText: String by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenComponentsTopNavBar) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenComponentsTopNavBar
            val _cache = __ins.renderCache
            val props = __props
            fun emits(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val goBack = fun(){
                return emits("back")
            }
            val onAdd = fun(){
                return emits("add")
            }
            return fun(): Any? {
                return createElementVNode("view", utsMapOf("class" to "custom-nav"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "nav-back", "onClick" to goBack), utsArrayOf(
                        if (isTrue(props.showBack)) {
                            createElementVNode("image", utsMapOf("key" to 0, "class" to "nav-icon", "onClick" to goBack, "src" to "/static/tabbar/back.png"))
                        } else {
                            createCommentVNode("v-if", true)
                        }
                    )),
                    createElementVNode("view", utsMapOf("class" to "nav-item"), utsArrayOf(
                        createElementVNode("text", utsMapOf("class" to "nav-title"), toDisplayString(props.title), 1)
                    )),
                    createElementVNode("view", utsMapOf("class" to "nav-actions", "onClick" to onAdd), toDisplayString(props.rightText), 1)
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("custom-nav" to padStyleMapOf(utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "30rpx", "paddingRight" to "25rpx", "paddingBottom" to "30rpx", "paddingLeft" to "25rpx", "backgroundColor" to "#ffffff", "marginTop" to "50rpx", "width" to "100%")), "nav-back" to padStyleMapOf(utsMapOf("width" to "32rpx", "height" to "32rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center")), "nav-item" to padStyleMapOf(utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "flex-end", "justifyContent" to "space-around")), "nav-title" to padStyleMapOf(utsMapOf("color" to "#333333", "marginTop" to 0, "marginRight" to "20rpx", "marginBottom" to 0, "marginLeft" to "20rpx", "maxWidth" to "400rpx", "textAlign" to "center", "overflow" to "hidden", "textOverflow" to "ellipsis", "whiteSpace" to "nowrap")), "nav-actions" to padStyleMapOf(utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "nav-icon" to padStyleMapOf(utsMapOf("width" to "60rpx", "height" to "60rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center", "position" to "relative", "marginLeft" to "16rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("back" to null, "message" to null, "add" to null, "changeNav" to null)
        var props = normalizePropsOptions(utsMapOf("title" to utsMapOf("type" to "String", "default" to "首页"), "showBack" to utsMapOf("type" to "Boolean", "default" to false), "messageCount" to utsMapOf("type" to "Number", "default" to 0), "rightText" to utsMapOf("type" to "String", "default" to "")))
        var propsNeedCastKeys = utsArrayOf(
            "title",
            "showBack",
            "messageCount",
            "rightText"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
