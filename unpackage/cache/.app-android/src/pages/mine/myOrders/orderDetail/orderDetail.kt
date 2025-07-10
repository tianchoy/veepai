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
open class GenPagesMineMyOrdersOrderDetailOrderDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineMyOrdersOrderDetailOrderDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineMyOrdersOrderDetailOrderDetail
            val _cache = __ins.renderCache
            val id = ref<String>("")
            onLoad(fun(options: UTSJSONObject){
                id.value = options["id"]!!.toString()
            }
            )
            return fun(): Any? {
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "content"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createElementVNode("text", null, "包年120G套餐"),
                            createElementVNode("text", utsMapOf("class" to "price"), "¥128")
                        )),
                        createElementVNode("view", utsMapOf("class" to "item underline"), utsArrayOf(
                            createElementVNode("text", null, "有效期"),
                            createElementVNode("text", null, "60个月")
                        )),
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createElementVNode("text", null, "设备名称"),
                            createElementVNode("text", null, "办公室设备")
                        )),
                        createElementVNode("view", utsMapOf("class" to "item underline"), utsArrayOf(
                            createElementVNode("text", null, "ICCID "),
                            createElementVNode("text", null, "8986042400000000000")
                        )),
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createElementVNode("text", null, "实付款"),
                            createElementVNode("text", null, "¥128")
                        )),
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createElementVNode("text", null, "订单编号"),
                            createElementVNode("text", null, "ASW22333332222")
                        )),
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createElementVNode("text", null, "下单时间"),
                            createElementVNode("text", null, "2024-10-23 17:21:11")
                        )),
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createElementVNode("text", null, "支付时间"),
                            createElementVNode("text", null, "2024-10-23 17:21:22")
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "backgroundColor" to "#F5F5F5")), "content" to utsMapOf(".container " to utsMapOf("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "40rpx", "paddingBottom" to "20rpx", "paddingLeft" to "40rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "item" to utsMapOf(".container .content " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)), "price" to utsMapOf(".container .content .item " to utsMapOf("fontSize" to "38rpx", "color" to "#555555", "fontWeight" to "bold")), "underline" to utsMapOf(".container .content " to utsMapOf("borderBottomWidth" to "2rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#F1f1f1")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
