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
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesMineFeebackFeeback : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineFeebackFeeback) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineFeebackFeeback
            val _cache = __ins.renderCache
            val questionType = ref<String>("请选择问题类型")
            val files = ref(utsArrayOf<UploadFile>(UploadFile(url = "https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png", name = "uploaded4.png", type = "image")))
            val pickerOptions = ref(utsArrayOf<PickerColumn>())
            val showPicker = ref<Boolean>(false)
            val showQuestionsPicker = fun(){
                pickerOptions.value = utsArrayOf<PickerColumn>(utsArrayOf(
                    PickerColumnItem(label = "产品", value = "产品"),
                    PickerColumnItem(label = "服务", value = "服务"),
                    PickerColumnItem(label = "其他", value = "其他")
                ))
                showPicker.value = true
            }
            val onConfirm = fun(context: PickerConfirmEvent){
                showPicker.value = false
                questionType.value = context.values[0].toString()
            }
            val oncancel = fun(){
                showPicker.value = false
            }
            val submit = fun(){
                uni_showToast(ShowToastOptions(title = "提交成功"))
            }
            return fun(): Any? {
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_fui_input = resolveEasyComponent("fui-input", GenUniModulesFirstuiUnixComponentsFuiInputFuiInputClass)
                val _component_l_textarea = resolveEasyComponent("l-textarea", GenUniModulesLimeTextareaComponentsLTextareaLTextareaClass)
                val _component_l_upload = resolveEasyComponent("l-upload", GenUniModulesLimeUploadComponentsLUploadLUploadClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                val _component_l_picker = resolveEasyComponent("l-picker", GenUniModulesLimePickerComponentsLPickerLPickerClass)
                val _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup", GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopupClass)
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "content"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "item", "onClick" to showQuestionsPicker), utsArrayOf(
                            createVNode(_component_fui_input, utsMapOf("text-align" to "right", "label" to "问题类型", "labelSize" to 28, "textAlign" to "left", "placeholderStyle" to "font-size: 28rpx;", "disabled" to true, "required" to true, "placeholder" to questionType.value), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return utsArrayOf(
                                    createElementVNode("text", null, utsArrayOf(
                                        createVNode(_component_fui_icon, utsMapOf("name" to "arrowright", "size" to 45))
                                    ))
                                )
                            }
                            ), "_" to 1), 8, utsArrayOf(
                                "placeholder"
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item underline"), utsArrayOf(
                            createVNode(_component_fui_input, utsMapOf("text-align" to "right", "label" to "设备型号", "labelSize" to 28, "textAlign" to "left", "placeholderStyle" to "font-size: 28rpx;", "disabled" to true, "placeholder" to "请选择设备型号(选填)"), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return utsArrayOf(
                                    createElementVNode("text", null, utsArrayOf(
                                        createVNode(_component_fui_icon, utsMapOf("name" to "arrowright", "size" to 45))
                                    ))
                                )
                            }
                            ), "_" to 1))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createVNode(_component_fui_input, utsMapOf("text-align" to "right", "label" to "联系方式", "labelSize" to 28, "textAlign" to "left", "placeholderStyle" to "font-size: 28rpx;", "disabled" to false, "required" to true, "placeholder" to "请输入联系方式"))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "item-label"), utsArrayOf(
                                createElementVNode("image", utsMapOf("style" to normalizeStyle(utsMapOf("width" to "40rpx", "height" to "40rpx", "margin-right" to "10rpx")), "src" to "/static/required.png"), null, 4),
                                createElementVNode("text", null, "问题描述")
                            )),
                            createVNode(_component_l_textarea, utsMapOf("placeholder" to "请输入内容", "maxlength" to 200, "indicator" to true, "autosize" to true, "autofocus" to true, "clearable" to true, "layout" to "vertical"))
                        )),
                        createElementVNode("view", utsMapOf("class" to "item"), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "item-label"), utsArrayOf(
                                createElementVNode("text", null, "图片"),
                                createElementVNode("text", utsMapOf("class" to "little-title"), "(问题截图,最多三张)")
                            )),
                            createVNode(_component_l_upload, utsMapOf("max" to 3, "multiple" to true, "modelValue" to files.value, "onUpdate:modelValue" to fun(`$event`: UTSArray<UploadFile>){
                                files.value = `$event`
                            }
                            ), null, 8, utsArrayOf(
                                "modelValue",
                                "onUpdate:modelValue"
                            ))
                        ))
                    )),
                    createElementVNode("view", utsMapOf("class" to "btn-box"), utsArrayOf(
                        createVNode(_component_fui_button, utsMapOf("color" to "#fff", "text" to "去充值", "background" to "#1296db", "height" to "80rpx", "onOnclick" to submit))
                    )),
                    createVNode(_component_fui_bottom_popup, utsMapOf("visible" to showPicker.value), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return utsArrayOf(
                            createVNode(_component_l_picker, utsMapOf("cancel-btn" to "取消", "confirm-btn" to "确定", "columns" to pickerOptions.value, "onCancel" to oncancel, "onConfirm" to onConfirm), null, 8, utsArrayOf(
                                "columns"
                            ))
                        )
                    }
                    ), "_" to 1), 8, utsArrayOf(
                        "visible"
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundColor" to "#F5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "content" to utsMapOf(".container " to utsMapOf("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "underline" to utsMapOf(".container .content " to utsMapOf("borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "item-label" to utsMapOf(".container .content " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginTop" to "30rpx")), "little-title" to utsMapOf(".container .content .item-label " to utsMapOf("color" to "#999999", "fontSize" to "20rpx", "marginLeft" to "10rpx")), "btn-box" to utsMapOf(".container " to utsMapOf("marginTop" to "50rpx")), "l-picker" to utsMapOf(".container " to utsMapOf("width" to "100%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
