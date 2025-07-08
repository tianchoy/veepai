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
open class GenUniModulesLimeProgressComponentsLProgressLProgress : VueComponent, ProgressProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var showInfo: Boolean by `$props`
    override var infoType: String by `$props`
    override var infoAlign: String by `$props`
    override var strokeColor: String by `$props`
    override var trailColor: String by `$props`
    override var linecap: String by `$props`
    override var infoColor: String by `$props`
    override var fontSize: Any by `$props`
    override var strokeWidth: Any by `$props`
    open var percent: Number by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeProgressComponentsLProgressLProgress) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeProgressComponentsLProgressLProgress
            val _cache = __ins.renderCache
            val props = __props
            val percent = useModel<Number>(__ins.props, "percent")
            val classes = computed(fun(): Map<String, Boolean> {
                val _class = Map<String, Boolean>()
                return _class
            }
            )
            val progressRef = ref<UniElement?>(null)
            var progress: Progress? = null
            val current = useTransition(fun(): Number {
                return percent.value
            }
            , UseTransitionOptions(duration = 300, immediate = true))
            val stopWatch = watch(current, fun(v: Number){
                if (progress != null) {
                    progress!!.render(v)
                }
            }
            )
            onMounted(fun(){
                nextTick(fun(){
                    if (progressRef.value == null) {
                        return
                    }
                    progress = Progress(progressRef.value!!)
                    console.log("props.strokeColor", props.strokeColor, " at uni_modules/lime-progress/components/l-progress/l-progress.uvue:178")
                    val opt = LProgressOptions(showInfo = props.showInfo, strokeColor = props.strokeColor, strokeWidth = unitConvert(props.strokeWidth), trailColor = props.trailColor, linecap = props.linecap, fontSize = unitConvert(props.fontSize), infoAlign = props.infoAlign, infoType = props.infoType, infoColor = props.infoColor)
                    progress!!.setOption(opt)
                    progress!!.render(current.value)
                }
                )
            }
            )
            onUnmounted(fun(){
                stopWatch()
                progress?.disconnect()
            }
            )
            return fun(): Any? {
                return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
                    "l-progress",
                    unref(classes)
                )), "ref_key" to "progressRef", "ref" to progressRef), null, 2)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("update:percent" to null)
        var props = normalizePropsOptions(utsMapOf("showInfo" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "infoType" to utsMapOf("type" to "String", "required" to true, "default" to "outer"), "infoAlign" to utsMapOf("type" to "String", "required" to true, "default" to "end"), "strokeColor" to utsMapOf("type" to "String", "required" to true, "default" to "#1677ff"), "trailColor" to utsMapOf("type" to "String", "required" to true, "default" to "rgba(0, 0, 0, 0.06)"), "linecap" to utsMapOf("type" to "String", "required" to true, "default" to "round"), "infoColor" to utsMapOf("type" to "String", "required" to true, "default" to "black"), "fontSize" to utsMapOf("required" to true, "default" to 12), "strokeWidth" to utsMapOf("required" to true, "default" to 4), "percent" to utsMapOf("type" to "Number", "default" to 0)))
        var propsNeedCastKeys = utsArrayOf(
            "showInfo",
            "infoType",
            "infoAlign",
            "strokeColor",
            "trailColor",
            "linecap",
            "infoColor",
            "fontSize",
            "strokeWidth",
            "percent"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
