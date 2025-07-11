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
open class GenPagesMineLocalFilesLocalFiles : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineLocalFilesLocalFiles) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineLocalFilesLocalFiles
            val _cache = __ins.renderCache
            return fun(): Any? {
                val _component_l_grid_item = resolveEasyComponent("l-grid-item", GenUniModulesLimeGridComponentsLGridItemLGridItemClass)
                val _component_l_grid = resolveEasyComponent("l-grid", GenUniModulesLimeGridComponentsLGridLGridClass)
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createVNode(_component_l_grid, utsMapOf("column" to 3, "border" to true, "gutter" to 20), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return utsArrayOf(
                            createVNode(_component_l_grid_item, utsMapOf("text" to "标题文字", "image" to "https://tdesign.gtimg.com/mobile/demos/avatar1.png")),
                            createVNode(_component_l_grid_item, utsMapOf("text" to "标题文字", "image" to "https://tdesign.gtimg.com/mobile/demos/avatar2.png")),
                            createVNode(_component_l_grid_item, utsMapOf("text" to "标题文字", "image" to "https://tdesign.gtimg.com/mobile/demos/avatar3.png")),
                            createVNode(_component_l_grid_item, utsMapOf("text" to "标题文字", "image" to "https://tdesign.gtimg.com/mobile/demos/avatar4.png")),
                            createVNode(_component_l_grid_item, utsMapOf("text" to "最多四字", "image" to "https://tdesign.gtimg.com/mobile/demos/avatar5.png")),
                            createVNode(_component_l_grid_item, utsMapOf("text" to "标题文字", "image" to "https://tdesign.gtimg.com/mobile/demos/avatar1.png")),
                            createVNode(_component_l_grid_item, utsMapOf("text" to "标题文字", "image" to "https://tdesign.gtimg.com/mobile/demos/avatar2.png")),
                            createVNode(_component_l_grid_item, utsMapOf("text" to "标题文字", "image" to "https://tdesign.gtimg.com/mobile/demos/avatar3.png")),
                            createVNode(_component_l_grid_item, utsMapOf("text" to "标题文字", "image" to "https://tdesign.gtimg.com/mobile/demos/avatar4.png"))
                        )
                    }
                    ), "_" to 1))
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundColor" to "#f5f5f5")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
