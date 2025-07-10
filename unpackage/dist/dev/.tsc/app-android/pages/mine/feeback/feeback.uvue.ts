import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_fui_input from '@/uni_modules/firstui-unix/components/fui-input/fui-input.uvue'
import _easycom_l_textarea from '@/uni_modules/lime-textarea/components/l-textarea/l-textarea.uvue'
import _easycom_l_upload from '@/uni_modules/lime-upload/components/l-upload/l-upload.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _easycom_l_picker from '@/uni_modules/lime-picker/components/l-picker/l-picker.uvue'
import _easycom_fui_bottom_popup from '@/uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.uvue'
import { ref } from 'vue'
	import { UploadFile } from '@/uni_modules/lime-upload';
	import { PickerColumn ,PickerConfirmEvent} from '@/uni_modules/lime-picker';
	
const __sfc__ = defineComponent({
  __name: 'feeback',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const files = ref<UploadFile[]>([{
		url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png',
		name: 'uploaded4.png',
		type: 'image',
	}])

	const pickerOptions = ref<PickerColumn[]>([])
	const showPicker = ref<boolean>(false)

	const showQuestionsPicker = () => {
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
		showPicker.value = true
	}

	const onConfirm = (context : PickerConfirmEvent) => {
		showPicker.value = false
		console.log('context', context.values[0], " at pages/mine/feeback/feeback.uvue:92")
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
const _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup",_easycom_fui_bottom_popup)

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "content" }), [
      createElementVNode("view", utsMapOf({
        class: "item",
        onClick: showQuestionsPicker
      }), [
        createVNode(_component_fui_input, utsMapOf({
          "text-align": "right",
          label: "问题类型",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: true,
          required: true,
          placeholder: "请选择问题类型"
        }), utsMapOf({
          default: withSlotCtx((): any[] => [
            createElementVNode("text", null, [
              createVNode(_component_fui_icon, utsMapOf({
                name: "arrowright",
                size: 45
              }))
            ])
          ]),
          _: 1 /* STABLE */
        }))
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createVNode(_component_fui_input, utsMapOf({
          "text-align": "right",
          label: "设备型号",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: true,
          placeholder: "请选择设备型号(选填)"
        }), utsMapOf({
          default: withSlotCtx((): any[] => [
            createElementVNode("text", null, [
              createVNode(_component_fui_icon, utsMapOf({
                name: "arrowright",
                size: 45
              }))
            ])
          ]),
          _: 1 /* STABLE */
        }))
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createVNode(_component_fui_input, utsMapOf({
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
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("view", utsMapOf({ class: "item-label" }), [
          createElementVNode("image", utsMapOf({
            style: normalizeStyle(utsMapOf({"width":"40rpx","height":"40rpx","margin-right":"10rpx"})),
            src: "/static/required.png"
          }), null, 4 /* STYLE */),
          createElementVNode("text", null, "问题描述")
        ]),
        createVNode(_component_l_textarea, utsMapOf({
          placeholder: "请输入内容",
          maxlength: 200,
          indicator: true,
          autosize: true,
          autofocus: true,
          clearable: true,
          layout: "vertical"
        }))
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("view", utsMapOf({ class: "item-label" }), [
          createElementVNode("text", null, "图片"),
          createElementVNode("text", utsMapOf({ class: "little-title" }), "(问题截图,最多三张)")
        ]),
        createVNode(_component_l_upload, utsMapOf({
          max: 3,
          multiple: true,
          modelValue: files.value,
          "onUpdate:modelValue": ($event: UploadFile[]) => {(files).value = $event}
        }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])
      ])
    ]),
    createElementVNode("view", utsMapOf({ class: "btn-box" }), [
      createVNode(_component_fui_button, utsMapOf({
        color: "#fff",
        text: "去充值",
        background: "#1296db",
        height: "80rpx",
        onOnclick: submit
      }))
    ]),
    createVNode(_component_fui_bottom_popup, utsMapOf({ visible: showPicker.value }), utsMapOf({
      default: withSlotCtx((): any[] => [
        createVNode(_component_l_picker, utsMapOf({
          "cancel-btn": "取消",
          "confirm-btn": "确定",
          columns: pickerOptions.value,
          onConfirm: onConfirm
        }), null, 8 /* PROPS */, ["columns"])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["visible"])
  ])
}
}

})
export default __sfc__
const GenPagesMineFeebackFeebackStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["height", "100%"], ["backgroundColor", "#F5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["content", utsMapOf([[".container ", utsMapOf([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["item-label", utsMapOf([[".container .content ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["marginTop", "30rpx"]])]])], ["little-title", utsMapOf([[".container .content .item-label ", utsMapOf([["color", "#999999"], ["fontSize", "20rpx"], ["marginLeft", "10rpx"]])]])], ["btn-box", utsMapOf([[".container ", utsMapOf([["marginTop", "50rpx"]])]])], ["l-picker", utsMapOf([[".container ", utsMapOf([["width", "100%"]])]])]])]
