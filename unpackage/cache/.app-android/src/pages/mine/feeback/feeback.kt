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
            val files = ref(_uA<UploadFile>(UploadFile(url = "https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png", name = "uploaded4.png", type = "image")))
            val pickerOptions = ref(_uA<PickerColumn>())
            val showPicker = ref<Boolean>(false)
            val showQuestionsPicker = fun(){
                console.log("aaaa", " at pages/mine/feeback/feeback.uvue:72")
                showPicker.value = true
                pickerOptions.value = _uA<PickerColumn>(_uA(
                    PickerColumnItem(label = "产品", value = "产品"),
                    PickerColumnItem(label = "服务", value = "服务"),
                    PickerColumnItem(label = "其他", value = "其他")
                ))
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
                val _component_l_popup = resolveEasyComponent("l-popup", GenUniModulesLimePopupComponentsLPopupLPopupClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "item", "onClick" to showQuestionsPicker), _uA(
                            _cV(_component_fui_input, _uM("text-align" to "right", "label" to "问题类型", "labelSize" to 28, "textAlign" to "left", "placeholderStyle" to "font-size: 28rpx;", "disabled" to true, "required" to true, "placeholder" to questionType.value), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cE("text", null, _uA(
                                        _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to 45))
                                    ))
                                )
                            }
                            ), "_" to 1), 8, _uA(
                                "placeholder"
                            ))
                        )),
                        _cE("view", _uM("class" to "item underline"), _uA(
                            _cV(_component_fui_input, _uM("text-align" to "right", "label" to "设备型号", "labelSize" to 28, "textAlign" to "left", "placeholderStyle" to "font-size: 28rpx;", "disabled" to true, "placeholder" to "请选择设备型号(选填)"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    _cE("text", null, _uA(
                                        _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to 45))
                                    ))
                                )
                            }
                            ), "_" to 1))
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cV(_component_fui_input, _uM("text-align" to "right", "label" to "联系方式", "labelSize" to 28, "textAlign" to "left", "placeholderStyle" to "font-size: 28rpx;", "disabled" to false, "required" to true, "placeholder" to "请输入联系方式"))
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("view", _uM("class" to "item-label"), _uA(
                                _cE("image", _uM("style" to _nS(_uM("width" to "40rpx", "height" to "40rpx", "margin-right" to "10rpx")), "src" to "/static/required.png"), null, 4),
                                _cE("text", null, "问题描述")
                            )),
                            _cV(_component_l_textarea, _uM("placeholder" to "请输入内容", "maxlength" to 200, "indicator" to true, "autosize" to true, "autofocus" to true, "clearable" to true, "layout" to "vertical"))
                        )),
                        _cE("view", _uM("class" to "item"), _uA(
                            _cE("view", _uM("class" to "item-label"), _uA(
                                _cE("text", null, "图片"),
                                _cE("text", _uM("class" to "little-title"), "(问题截图,最多三张)")
                            )),
                            _cV(_component_l_upload, _uM("max" to 3, "multiple" to true, "modelValue" to files.value, "onUpdate:modelValue" to fun(`$event`: UTSArray<UploadFile>){
                                files.value = `$event`
                            }
                            ), null, 8, _uA(
                                "modelValue",
                                "onUpdate:modelValue"
                            ))
                        ))
                    )),
                    _cE("view", _uM("class" to "btn-box"), _uA(
                        _cV(_component_fui_button, _uM("color" to "#fff", "text" to "去充值", "background" to "#1296db", "height" to "80rpx", "onOnclick" to submit))
                    )),
                    _cV(_component_l_popup, _uM("modelValue" to showPicker.value, "onUpdate:modelValue" to fun(`$event`: Boolean){
                        showPicker.value = `$event`
                    }
                    , "position" to "bottom"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(_component_l_picker, _uM("cancel-btn" to "取消", "confirm-btn" to "确定", "columns" to pickerOptions.value, "onCancel" to oncancel, "onConfirm" to onConfirm), null, 8, _uA(
                                "columns"
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "modelValue",
                        "onUpdate:modelValue"
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#F5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "underline" to _uM(".container .content " to _uM("borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "item-label" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginTop" to "30rpx")), "little-title" to _uM(".container .content .item-label " to _uM("color" to "#999999", "fontSize" to "20rpx", "marginLeft" to "10rpx")), "btn-box" to _uM(".container " to _uM("marginTop" to "50rpx")), "l-picker" to _uM(".container " to _uM("width" to "100%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
