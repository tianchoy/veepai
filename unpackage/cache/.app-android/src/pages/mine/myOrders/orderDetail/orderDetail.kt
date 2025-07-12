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
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("text", null, "包年120G套餐"),
                            _cE("text", _uM("class" to "price"), "¥128")
                        )),
                        _cE("view", _uM("class" to "item underline"), _uA(
                            _cE("text", null, "有效期"),
                            _cE("text", null, "60个月")
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("text", null, "设备名称"),
                            _cE("text", null, "办公室设备")
                        )),
                        _cE("view", _uM("class" to "item underline"), _uA(
                            _cE("text", null, "ICCID "),
                            _cE("text", null, "8986042400000000000")
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("text", null, "实付款"),
                            _cE("text", null, "¥128")
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("text", null, "订单编号"),
                            _cE("text", null, "ASW22333332222")
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("text", null, "下单时间"),
                            _cE("text", null, "2024-10-23 17:21:11")
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("text", null, "支付时间"),
                            _cE("text", null, "2024-10-23 17:21:22")
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
                return _uM("container" to _pS(_uM("height" to "100%", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "backgroundColor" to "#F5F5F5")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "40rpx", "paddingBottom" to "20rpx", "paddingLeft" to "40rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "item" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)), "price" to _uM(".container .content .item " to _uM("fontSize" to "38rpx", "color" to "#555555", "fontWeight" to "bold")), "underline" to _uM(".container .content " to _uM("borderBottomWidth" to "2rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#F1f1f1")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
