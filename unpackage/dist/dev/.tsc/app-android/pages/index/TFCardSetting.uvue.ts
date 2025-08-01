import _easycom_l_button from '@/uni_modules/lime-button/components/l-button/l-button.uvue'
import _easycom_l_progress from '@/uni_modules/lime-progress/components/l-progress/l-progress.uvue'
import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_l_picker from '@/uni_modules/lime-picker/components/l-picker/l-picker.uvue'
import _easycom_l_date_time_picker from '@/uni_modules/lime-date-time-picker/components/l-date-time-picker/l-date-time-picker.uvue'
import _easycom_l_popup from '@/uni_modules/lime-popup/components/l-popup/l-popup.uvue'
import { ref } from 'vue'
	import { PickerColumn,PickerConfirmEvent } from '@/uni_modules/lime-picker';

	
const __sfc__ = defineComponent({
  __name: 'TFCardSetting',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const types = ref<boolean>(true)
	const pickerOptions = ref<PickerColumn[]>([])
	const percent = ref<number | string>(80)
	const showPicker = ref<boolean>(false)
	const vedioModeType = ref<string>('事件录像')
	const pictureQualityType = ref<string>('高清')
	const startTime = ref<string>('00:00')
	const endTime = ref<string>('23:59')
	
	let currentCallback: ((value: string) => void) | null = null
	
	const vedioModeOptions = [
		[
			{
				label: '一直录像',
				value: '一直录像'
			},
			{
				label: '事件录像',
				value: '事件录像'
			},
		]
	] as PickerColumn[]

	const pictureQualityOptions = [
		[
			{
				label: '高清',
				value: '高清'
			},
			{
				label: '超清',
				value: '超清'
			},
		]
	] as PickerColumn[]

	const vedioMode = () => {
		types.value = true
		pickerOptions.value = vedioModeOptions
		currentCallback = (value: string) => {
			vedioModeType.value = value
		}
		showPicker.value = true
	}

	const pictureQuality = () => {
		types.value = true
		pickerOptions.value = pictureQualityOptions
		currentCallback = (value: string) => {
			pictureQualityType.value = value
		}
		showPicker.value = true
	}

	const pickerFun = (e:PickerConfirmEvent) => {
		const selectedValue = e.values[0].toString()
		currentCallback?.(selectedValue)
		showPicker.value = false
		currentCallback = null
	}

	const vedioTime = () => {
		types.value = false
		showPicker.value = true
	}

	const startTimeChange = (value: string) => {
		startTime.value = value
	}

	const endTimeChange = (value: string) => {
		endTime.value = value
	}

	const getVedioTime = () => {
		showPicker.value = false
	}


return (): any | null => {

const _component_l_button = resolveEasyComponent("l-button",_easycom_l_button)
const _component_l_progress = resolveEasyComponent("l-progress",_easycom_l_progress)
const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_l_picker = resolveEasyComponent("l-picker",_easycom_l_picker)
const _component_l_date_time_picker = resolveEasyComponent("l-date-time-picker",_easycom_l_date_time_picker)
const _component_l_popup = resolveEasyComponent("l-popup",_easycom_l_popup)

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "list-box" }), [
        _cE("view", _uM({ class: "title" }), [
          _cE("text", null, "存储空间"),
          _cV(_component_l_button, _uM({
            type: "primary",
            size: "mini"
          }), _uM({
            default: withSlotCtx((): any[] => ["存储管理"]),
            _: 1 /* STABLE */
          }))
        ]),
        _cV(_component_l_progress, _uM({
          percent: percent.value,
          "info-align": "end",
          "show-info": true
        }), null, 8 /* PROPS */, ["percent"]),
        _cE("view", _uM({ class: "title" }), [
          _cE("text", null, "已用80G"),
          _cE("text", null, "可用 20G/共100G")
        ])
      ]),
      _cE("view", _uM({
        class: "list",
        onClick: vedioMode
      }), [
        _cE("text", null, "录像模式"),
        _cE("view", _uM({ class: "right" }), [
          _cE("text", null, _tD(vedioModeType.value), 1 /* TEXT */),
          _cV(_component_fui_icon, _uM({
            name: "arrowright",
            size: "50"
          }))
        ])
      ]),
      _cE("view", _uM({
        class: "list",
        onClick: pictureQuality
      }), [
        _cE("text", null, "录像画质"),
        _cE("view", _uM({ class: "right" }), [
          _cE("text", null, _tD(pictureQualityType.value), 1 /* TEXT */),
          _cV(_component_fui_icon, _uM({
            name: "arrowright",
            size: "50"
          }))
        ])
      ]),
      _cE("view", _uM({
        class: "list nobottom",
        onClick: vedioTime
      }), [
        _cE("text", null, "录像时间"),
        _cE("view", _uM({ class: "right" }), [
          _cE("text", null, _tD(startTime.value) + "至" + _tD(endTime.value), 1 /* TEXT */),
          _cV(_component_fui_icon, _uM({
            name: "arrowright",
            size: "50"
          }))
        ])
      ])
    ]),
    _cV(_component_l_popup, _uM({
      modelValue: showPicker.value,
      "onUpdate:modelValue": $event => {(showPicker).value = $event},
      position: "bottom"
    }), _uM({
      default: withSlotCtx((): any[] => [
        isTrue(types.value)
          ? _cV(_component_l_picker, _uM({
              key: 0,
              "cancel-btn": "取消",
              "confirm-btn": "确定",
              columns: pickerOptions.value,
              onCancel: () => {showPicker.value = false},
              onConfirm: pickerFun
            }), null, 8 /* PROPS */, ["columns", "onCancel"])
          : _cE("view", _uM({
              key: 1,
              class: "time-picker"
            }), [
              _cE("view", _uM({ class: "time-picker-title" }), [
                _cV(_component_l_button, _uM({
                  type: "default",
                  size: "mini",
                  onClick: () => {showPicker.value = false}
                }), _uM({
                  default: withSlotCtx((): any[] => ["取消"]),
                  _: 1 /* STABLE */
                }), 8 /* PROPS */, ["onClick"]),
                _cE("text", null, "选择时间"),
                _cV(_component_l_button, _uM({
                  type: "primary",
                  size: "mini",
                  onClick: getVedioTime
                }), _uM({
                  default: withSlotCtx((): any[] => ["确定"]),
                  _: 1 /* STABLE */
                }))
              ]),
              _cE("view", _uM({ class: "time-picker-content" }), [
                _cV(_component_l_date_time_picker, _uM({
                  modelValue: startTime.value,
                  "onUpdate:modelValue": $event => {(startTime).value = $event},
                  onChange: startTimeChange,
                  mode: 8|16
                }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"]),
                _cE("text", null, "至"),
                _cV(_component_l_date_time_picker, _uM({
                  modelValue: endTime.value,
                  "onUpdate:modelValue": $event => {(endTime).value = $event},
                  onChange: endTimeChange,
                  mode: 8|16
                }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])
              ])
            ])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])
  ])
}
}

})
export default __sfc__
const GenPagesIndexTFCardSettingStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["list-box", _uM([[".container .content ", _uM([["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f9f9f9"]])]])], ["title", _uM([[".container .content .list-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["list", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "40rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "40rpx"], ["paddingLeft", "20rpx"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f9f9f9"]])]])], ["right", _uM([[".container .content .list ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", 0], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", 0], ["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])], ["nobottom", _uM([[".container .content ", _uM([["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])], ["time-picker", _uM([[".container ", _uM([["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["time-picker-title", _uM([[".container .time-picker ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["marginBottom", "20rpx"]])]])], ["time-picker-content", _uM([[".container .time-picker ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"]])]])], ["l-picker", _uM([[".container .time-picker .time-picker-content ", _uM([["width", "45%"]])]])]])]
