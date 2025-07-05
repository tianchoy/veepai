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
open class GenPagesMineUserInfoUserInfo : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _cache = this.`$`.renderCache
        return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
            createElementVNode("view", utsMapOf("class" to "title"), utsArrayOf(
                createElementVNode("text", null, "个人信息")
            )),
            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                createElementVNode("view", utsMapOf("class" to "info-item"), utsArrayOf(
                    createElementVNode("text", null, "账号"),
                    createElementVNode("text", null, "18888888888")
                )),
                createElementVNode("view", utsMapOf("class" to "info-item nobottom"), utsArrayOf(
                    createElementVNode("text", null, "账号"),
                    createElementVNode("text", null, "18888888888")
                ))
            )),
            createElementVNode("view", utsMapOf("class" to "title"), utsArrayOf(
                createElementVNode("text", null, "安全信息")
            )),
            createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                createElementVNode("view", utsMapOf("class" to "info-item"), utsArrayOf(
                    createElementVNode("text", null, "账号"),
                    createElementVNode("image", utsMapOf("class" to "icon", "src" to default1, "mode" to "aspectFit"))
                )),
                createElementVNode("view", utsMapOf("class" to "info-item nobottom"), utsArrayOf(
                    createElementVNode("text", null, "账号"),
                    createElementVNode("image", utsMapOf("class" to "icon", "src" to default1, "mode" to "aspectFit"))
                ))
            )),
            createElementVNode("view", utsMapOf("class" to "title"), utsArrayOf(
                createElementVNode("text", null, "第三方账号")
            )),
            createElementVNode("view", utsMapOf("class" to "info"))
        ))
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ), utsArrayOf(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundImage" to "none", "backgroundColor" to "#f3f3f3", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "title" to utsMapOf(".container " to utsMapOf("fontSize" to "30rpx", "color" to "#333333", "paddingTop" to "50rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to "20rpx")), "info" to utsMapOf(".container " to utsMapOf("backgroundImage" to "none", "backgroundColor" to "#ffffff", "paddingTop" to "10rpx", "paddingRight" to "30rpx", "paddingBottom" to "10rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "10rpx", "borderTopRightRadius" to "10rpx", "borderBottomRightRadius" to "10rpx", "borderBottomLeftRadius" to "10rpx")), "info-item" to utsMapOf(".container .info " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0, "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "icon" to utsMapOf(".container .info .info-item " to utsMapOf("width" to "35rpx", "height" to "35rpx")), "nobottom" to utsMapOf(".container .info " to utsMapOf("borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
