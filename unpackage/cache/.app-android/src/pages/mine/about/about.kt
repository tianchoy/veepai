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
open class GenPagesMineAboutAbout : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _cache = this.`$`.renderCache
        val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
        return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
            createElementVNode("view", utsMapOf("class" to "appinfo"), utsArrayOf(
                createElementVNode("image", utsMapOf("class" to "logo", "src" to default10)),
                createElementVNode("text", utsMapOf("class" to "title"), "夜鹰智联"),
                createElementVNode("text", utsMapOf("class" to "version"), "V1.0.1.250512")
            )),
            createElementVNode("view", utsMapOf("class" to "content"), utsArrayOf(
                createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                    createElementVNode("text", null, "用户协议"),
                    createVNode(_component_fui_icon, utsMapOf("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                    createElementVNode("text", null, "隐私政策"),
                    createVNode(_component_fui_icon, utsMapOf("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                    createElementVNode("text", null, "个人信息收集"),
                    createVNode(_component_fui_icon, utsMapOf("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                    createElementVNode("text", null, "第三方共享"),
                    createVNode(_component_fui_icon, utsMapOf("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                    createElementVNode("text", null, "检查更新"),
                    createVNode(_component_fui_icon, utsMapOf("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                    createElementVNode("text", null, "分享APP"),
                    createVNode(_component_fui_icon, utsMapOf("name" to "arrowright", "color" to "#333", "size" to 55))
                ))
            )),
            createElementVNode("view", utsMapOf("class" to "copyright"), utsArrayOf(
                createElementVNode("text", utsMapOf("class" to "txt"), "版权所有：夜鹰智联"),
                createElementVNode("text", utsMapOf("class" to "txt"), "粤ICP备18088888号")
            ))
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "appinfo" to utsMapOf(".container " to utsMapOf("display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "logo" to utsMapOf(".container " to utsMapOf("width" to "150rpx", "height" to "150rpx", "marginTop" to "100rpx", "marginRight" to 0, "marginBottom" to "50rpx", "marginLeft" to 0)), "title" to utsMapOf(".container " to utsMapOf("fontSize" to "30rpx", "fontWeight" to "bold", "marginBottom" to "50rpx")), "version" to utsMapOf(".container " to utsMapOf("fontSize" to "20rpx", "color" to "#999999", "marginBottom" to "50rpx")), "content" to utsMapOf(".container " to utsMapOf("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "30rpx", "paddingBottom" to "20rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "item" to utsMapOf(".container .content " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f5f5f5", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)), "copyright" to utsMapOf(".container " to utsMapOf("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "marginTop" to "200rpx")), "txt" to utsMapOf(".container .copyright " to utsMapOf("fontSize" to "15rpx", "color" to "#999999")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
