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
open class GenPagesMineMine : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineMine) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineMine
            val _cache = __ins.renderCache
            val title = utsArrayOf(
                NavTitleItem(name = "首页", isCurrent = false, url = "/pages/index/index"),
                NavTitleItem(name = "消息", isCurrent = false, url = "/pages/message/message"),
                NavTitleItem(name = "我的", isCurrent = true, url = "/pages/mine/mine")
            ) as UTSArray<NavTitleItem>
            return fun(): Any? {
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "nav_bar"), utsArrayOf(
                        createVNode(unref(GenComponentsTopNavBarClass), utsMapOf("showBack" to false, "title" to title))
                    )),
                    createElementVNode("view", utsMapOf("class" to "content"), " Mine ")
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("width" to "100%", "height" to "100%", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx", "display" to "flex", "flexDirection" to "column")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
