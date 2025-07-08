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
open class GenUniModulesLimeLoadingComponentsLLoadingLLoading : VueComponent, LoadingProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var color: String? by `$props`
    override var type: String by `$props`
    override var size: String by `$props`
    override var text: String? by `$props`
    override var textColor: String? by `$props`
    override var textSize: String? by `$props`
    override var mode: String by `$props`
    override var vertical: Boolean by `$props`
    override var animated: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeLoadingComponentsLLoadingLLoading) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeLoadingComponentsLLoadingLLoading
            val _cache = __ins.renderCache
            val name = "l-loading"
            val props = __props
            val classes = computed<Map<String, Any>>(fun(): Map<String, Any> {
                val cls = Map<String, Any>()
                cls.set(name + "--" + props.type, true)
                if (props.vertical) {
                    cls.set("is-vertical", props.vertical)
                } else {
                    cls.set("is-horizontal", !props.vertical)
                }
                return cls
            }
            )
            val spinnerStyle = computed<Map<String, Any>>(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                style.set("width", props.size)
                style.set("height", props.size)
                return style
            }
            )
            val textStyle = computed<Map<String, Any>>(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.textColor != null) {
                    style.set("color", props.textColor!!)
                }
                if (props.textSize != null) {
                    style.set("font-size", props.textSize!!)
                }
                return style
            }
            )
            val loadingRef = ref<UniElement?>(null)
            val loading = useLoading(loadingRef)
            loading.type = props.type
            loading.mode = props.mode
            if (props.animated) {
                loading.play()
            }
            watchEffect(fun(){
                if (loadingRef.value == null) {
                    return
                }
                val color = props.color ?: loadingRef.value?.style?.getPropertyValue("border-left-color")
                loading.color = if (color == null || color.length == 0) {
                    "#1677ff"
                } else {
                    color
                }
                if (props.animated) {
                    loading.play()
                } else {
                    loading.pause()
                }
            }
            )
            return fun(): Any? {
                return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
                    "l-loading",
                    unref(classes)
                ))), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "l-loading__view", "ref_key" to "loadingRef", "ref" to loadingRef, "style" to normalizeStyle(unref(spinnerStyle))), null, 4),
                    if (isTrue(_ctx.`$slots`["default"] != null || _ctx.text != null)) {
                        createElementVNode("text", utsMapOf("key" to 0, "class" to "l-loading__text", "style" to normalizeStyle(unref(textStyle))), utsArrayOf(
                            renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                                return utsArrayOf(
                                    toDisplayString(_ctx.text)
                                )
                            })
                        ), 4)
                    } else {
                        createCommentVNode("v-if", true)
                    }
                ), 2)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-loading" to utsMapOf("" to utsMapOf("display" to "flex", "position" to "relative", "flexDirection" to "row", "alignItems" to "center", "borderLeftColor" to "#3283ff", "borderLeftWidth" to 0), ".is-vertical" to utsMapOf("flexDirection" to "column")), "l-loading__text" to utsMapOf("" to utsMapOf("marginLeft" to "16rpx", "color" to "rgba(0,0,0,0.45)", "fontSize" to 14), ".l-loading.is-vertical " to utsMapOf("marginTop" to "8rpx", "marginRight" to 0, "marginBottom" to 0, "marginLeft" to 0)), "l-loading__ball" to padStyleMapOf(utsMapOf("width" to "40rpx", "height" to "40rpx")), "l-loading__circular" to padStyleMapOf(utsMapOf("width" to "40rpx", "height" to "40rpx")), "l-loading__spinner" to padStyleMapOf(utsMapOf("width" to "40rpx", "height" to "40rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf("color" to utsMapOf("type" to "String", "required" to false), "type" to utsMapOf("type" to "String", "required" to true, "default" to "circular"), "size" to utsMapOf("type" to "String", "required" to true, "default" to "40rpx"), "text" to utsMapOf("type" to "String", "required" to false), "textColor" to utsMapOf("type" to "String", "required" to false), "textSize" to utsMapOf("type" to "String", "required" to false), "mode" to utsMapOf("type" to "String", "required" to true, "default" to "raf"), "vertical" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "animated" to utsMapOf("type" to "Boolean", "required" to true, "default" to true)))
        var propsNeedCastKeys = utsArrayOf(
            "type",
            "size",
            "mode",
            "vertical",
            "animated"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
