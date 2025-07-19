import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_fui_input from '@/uni_modules/firstui-unix/components/fui-input/fui-input.uvue'
import _easycom_l_textarea from '@/uni_modules/lime-textarea/components/l-textarea/l-textarea.uvue'
import _easycom_l_upload from '@/uni_modules/lime-upload/components/l-upload/l-upload.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _easycom_l_picker from '@/uni_modules/lime-picker/components/l-picker/l-picker.uvue'
import _easycom_l_popup from '@/uni_modules/lime-popup/components/l-popup/l-popup.uvue'
import { ref } from 'vue'
	import { UploadFile } from '@/uni_modules/lime-upload';
	import { PickerColumn ,PickerConfirmEvent} from '@/uni_modules/lime-picker';
	
const __sfc__ = defineComponent({
  __name: 'feeback',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const questionType = ref<string>('请选择问题类型')
	const files = ref<UploadFile[]>([{
		url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png',
		name: 'uploaded4.png',
		type: 'image',
	}])

	const pickerOptions = ref<PickerColumn[]>([])
	const showPicker = ref<boolean>(false)

	const showQuestionsPicker = () => {
		console.log('aaaa', " at pages/mine/feeback/feeback.uvue:72")
		showPicker.value = true
		pickerOptions.value = [
			[
				{
					label: '产品',
					value: '产品',
				},
				{
					label: '服务',
					value: '服务',
				},
				{
					label: '其他',
					value: '其他',
				}
			]
		]  as PickerColumn[]
		
	}

	const onConfirm = (context : PickerConfirmEvent) => {
		showPicker.value = false
		questionType.value = context.values[0].toString()
	}

	const oncancel = () => {
		showPicker.value = false
	}

	const submit = () => {
		uni.showToast({
			title: '提交成功',
		})
	}

return (): any | null => {

const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_fui_input = resolveEasyComponent("fui-input",_easycom_fui_input)
const _component_l_textarea = resolveEasyComponent("l-textarea",_easycom_l_textarea)
const _component_l_upload = resolveEasyComponent("l-upload",_easycom_l_upload)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)
const _component_l_picker = resolveEasyComponent("l-picker",_easycom_l_picker)
const _component_l_popup = resolveEasyComponent("l-popup",_easycom_l_popup)

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({
        class: "item",
        onClick: showQuestionsPicker
      }), [
        _cV(_component_fui_input, _uM({
          "text-align": "right",
          label: "问题类型",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: true,
          required: true,
          placeholder: questionType.value
        }), _uM({
          default: withSlotCtx((): any[] => [
            _cE("text", null, [
              _cV(_component_fui_icon, _uM({
                name: "arrowright",
                size: 45
              }))
            ])
          ]),
          _: 1 /* STABLE */
        }), 8 /* PROPS */, ["placeholder"])
      ]),
      _cE("view", _uM({ class: "item underline" }), [
        _cV(_component_fui_input, _uM({
          "text-align": "right",
          label: "设备型号",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: true,
          placeholder: "请选择设备型号(选填)"
        }), _uM({
          default: withSlotCtx((): any[] => [
            _cE("text", null, [
              _cV(_component_fui_icon, _uM({
                name: "arrowright",
                size: 45
              }))
            ])
          ]),
          _: 1 /* STABLE */
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cV(_component_fui_input, _uM({
          "text-align": "right",
          label: "联系方式",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: false,
          required: true,
          placeholder: "请输入联系方式"
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("view", _uM({ class: "item-label" }), [
          _cE("image", _uM({
            style: _nS(_uM({"width":"40rpx","height":"40rpx","margin-right":"10rpx"})),
            src: "/static/required.png"
          }), null, 4 /* STYLE */),
          _cE("text", null, "问题描述")
        ]),
        _cV(_component_l_textarea, _uM({
          placeholder: "请输入内容",
          maxlength: 200,
          indicator: true,
          autosize: true,
          autofocus: true,
          clearable: true,
          layout: "vertical"
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("view", _uM({ class: "item-label" }), [
          _cE("text", null, "图片"),
          _cE("text", _uM({ class: "little-title" }), "(问题截图,最多三张)")
        ]),
        _cV(_component_l_upload, _uM({
          max: 3,
          multiple: true,
          modelValue: files.value,
          "onUpdate:modelValue": ($event: UploadFile[]) => {(files).value = $event}
        }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])
      ])
    ]),
    _cE("view", _uM({ class: "btn-box" }), [
      _cV(_component_fui_button, _uM({
        color: "#fff",
        text: "去充值",
        background: "#1296db",
        height: "80rpx",
        onOnclick: submit
      }))
    ]),
    _cV(_component_l_popup, _uM({
      modelValue: showPicker.value,
      "onUpdate:modelValue": $event => {(showPicker).value = $event},
      position: "bottom"
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cV(_component_l_picker, _uM({
          "cancel-btn": "取消",
          "confirm-btn": "确定",
          columns: pickerOptions.value,
          onCancel: oncancel,
          onConfirm: onConfirm
        }), null, 8 /* PROPS */, ["columns"])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])
  ])
}
}

})
export default __sfc__
const GenPagesMineFeebackFeebackStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundColor", "#F5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["underline", _uM([[".container .content ", _uM([["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["item-label", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["marginTop", "30rpx"]])]])], ["little-title", _uM([[".container .content .item-label ", _uM([["color", "#999999"], ["fontSize", "20rpx"], ["marginLeft", "10rpx"]])]])], ["btn-box", _uM([[".container ", _uM([["marginTop", "50rpx"]])]])], ["l-picker", _uM([[".container ", _uM([["width", "100%"]])]])]])]
