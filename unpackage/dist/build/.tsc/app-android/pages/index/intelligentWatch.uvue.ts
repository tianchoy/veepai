import _easycom_fui_switch from '@/uni_modules/firstui-unix/components/fui-switch/fui-switch.uvue'
import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_l_picker from '@/uni_modules/lime-picker/components/l-picker/l-picker.uvue'
import _easycom_l_popup from '@/uni_modules/lime-popup/components/l-popup/l-popup.uvue'
import {ref} from 'vue'
	import { PickerColumn,PickerConfirmEvent } from '@/uni_modules/lime-picker';

	
const __sfc__ = defineComponent({
  __name: 'intelligentWatch',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const peopleWatch = ref<boolean>(true)
	const mobileWatch = ref<boolean>(true)
	const flashlight = ref<boolean>(true)
	const redBlueWatch = ref<boolean>(true)
	const policeWatch = ref<boolean>(true)
	const peopleSelectWatch = ref<boolean>(true)
	const peopleFindWatch = ref<boolean>(true)
	const showPicker = ref<boolean>(false)
	const peopleWatchLevel = ref<string>('中')
	const timeWatchLevel = ref<string>('全天')
	const pickerOptions = ref<PickerColumn[]>([])
	const PickerModeOptions = ref<PickerColumn[]>([])
	const mobileWatchLevel = ref<string>('高')
	const mobileTimeWatchLevel = ref<string>('全天')

	let currentCallback: ((value: string) => void) | null = null

	const peopeWatchOptions = [
		[
			{
				label: '高',
				value: '高',
			},
			{
				label: '中',
				value: '中',
			},
			{
				label: '低',
				value: '低',
			}
		]
	]  as PickerColumn[]

	const typeModeWatchOptions = [
		[
			{
				label: '全天模式',
				value: '全天',
			},
			{
				label: '白天模式',
				value: '白天模式',
			},
			{
				label: '夜晚模式',
				value: '夜晚模式',
			}
		]
	] as PickerColumn[]


	const peopleWatchFun = (e:boolean) => {
		peopleWatch.value = e
	}

	const peopeWatchChange = () => {
		pickerOptions.value = peopeWatchOptions
		currentCallback = (value: string) => {
			peopleWatchLevel.value = value
		}
		showPicker.value = true
	}

	const timeWatchChange = () => {
		pickerOptions.value = typeModeWatchOptions
		currentCallback = (value: string) => {
			timeWatchLevel.value = value
		}
		showPicker.value = true
	}

	const pickerFun = (e:PickerConfirmEvent) => {
		const selectedValue = e.values[0].toString()
		currentCallback?.(selectedValue)
		showPicker.value = false
		currentCallback = null
	}

	const mobileWatchChange = () => {
		pickerOptions.value = peopeWatchOptions
		currentCallback = (value: string) => {
			mobileWatchLevel.value = value
		}
		showPicker.value = true
	}

	const mTimeWatchChange = () => {
		pickerOptions.value = typeModeWatchOptions
		currentCallback = (value: string) => {
			mobileTimeWatchLevel.value = value
		}
		showPicker.value = true
	}


	const mobileWatchFun = (e:boolean) => {
		mobileWatch.value = e
	}

	const flashlightFun = (e:boolean) => {
		flashlight.value = e
	}

	const redBlueWatchFun = (e:boolean) => {
		redBlueWatch.value = e
	}

	const policeWatchFun = (e:boolean) => {
		policeWatch.value = e
	}

	const peopleSelectWatchFun = (e:boolean) => {
		peopleSelectWatch.value = e
	}

	const peopleFindWatchFun = (e:boolean) => {
		peopleFindWatch.value = e
	}


return (): any | null => {

const _component_fui_switch = resolveEasyComponent("fui-switch",_easycom_fui_switch)
const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_l_picker = resolveEasyComponent("l-picker",_easycom_l_picker)
const _component_l_popup = resolveEasyComponent("l-popup",_easycom_l_popup)

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "人形侦测"),
        _cV(_component_fui_switch, _uM({
          scaleRatio: 0.8,
          checked: peopleWatch.value,
          onChange: peopleWatchFun
        }), null, 8 /* PROPS */, ["checked"])
      ]),
      isTrue(peopleWatch.value)
        ? _cE("view", _uM({
            key: 0,
            class: "list",
            onClick: peopeWatchChange
          }), [
            _cE("text", null, "侦测灵敏度"),
            _cE("view", _uM({ class: "level" }), [
              _cE("text", null, _tD(peopleWatchLevel.value), 1 /* TEXT */),
              _cV(_component_fui_icon, _uM({
                name: "arrowright",
                color: "#333",
                size: "60"
              }))
            ])
          ])
        : _cC("v-if", true),
      isTrue(peopleWatch.value)
        ? _cE("view", _uM({
            key: 1,
            class: "list",
            onClick: timeWatchChange
          }), [
            _cE("text", null, "侦测时间段"),
            _cE("view", _uM({ class: "level" }), [
              _cE("text", null, _tD(timeWatchLevel.value), 1 /* TEXT */),
              _cV(_component_fui_icon, _uM({
                name: "arrowright",
                color: "#333",
                size: "60"
              }))
            ])
          ])
        : _cC("v-if", true),
      isTrue(peopleWatch.value)
        ? _cE("view", _uM({
            key: 2,
            class: "list nounderline"
          }), [
            _cE("text", null, "侦测范围"),
            _cE("view", _uM({ class: "level" }), [
              _cE("text", null, "全部"),
              _cV(_component_fui_icon, _uM({
                name: "arrowright",
                color: "#333",
                size: "60"
              }))
            ])
          ])
        : _cC("v-if", true)
    ]),
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "移动侦测"),
        _cV(_component_fui_switch, _uM({
          scaleRatio: 0.8,
          checked: mobileWatch.value,
          onChange: mobileWatchFun
        }), null, 8 /* PROPS */, ["checked"])
      ]),
      isTrue(mobileWatch.value)
        ? _cE("view", _uM({
            key: 0,
            class: "list",
            onClick: mobileWatchChange
          }), [
            _cE("text", null, "侦测灵敏度"),
            _cE("view", _uM({ class: "level" }), [
              _cE("text", null, _tD(mobileWatchLevel.value), 1 /* TEXT */),
              _cV(_component_fui_icon, _uM({
                name: "arrowright",
                color: "#333",
                size: "60"
              }))
            ])
          ])
        : _cC("v-if", true),
      isTrue(mobileWatch.value)
        ? _cE("view", _uM({
            key: 1,
            class: "list",
            onClick: mTimeWatchChange
          }), [
            _cE("text", null, "侦测时间段"),
            _cE("view", _uM({ class: "level" }), [
              _cE("text", null, _tD(mobileTimeWatchLevel.value), 1 /* TEXT */),
              _cV(_component_fui_icon, _uM({
                name: "arrowright",
                color: "#333",
                size: "60"
              }))
            ])
          ])
        : _cC("v-if", true),
      isTrue(mobileWatch.value)
        ? _cE("view", _uM({
            key: 2,
            class: "list nounderline"
          }), [
            _cE("text", null, "侦测范围"),
            _cE("view", _uM({ class: "level" }), [
              _cE("text", null, "全部"),
              _cV(_component_fui_icon, _uM({
                name: "arrowright",
                color: "#333",
                size: "60"
              }))
            ])
          ])
        : _cC("v-if", true)
    ]),
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "闪光灯"),
        _cV(_component_fui_switch, _uM({
          scaleRatio: 0.8,
          checked: flashlight.value,
          onChange: flashlightFun
        }), null, 8 /* PROPS */, ["checked"])
      ]),
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "红蓝警灯"),
        _cV(_component_fui_switch, _uM({
          scaleRatio: 0.8,
          checked: redBlueWatch.value,
          onChange: redBlueWatchFun
        }), null, 8 /* PROPS */, ["checked"])
      ]),
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "报警声"),
        _cV(_component_fui_switch, _uM({
          scaleRatio: 0.8,
          checked: policeWatch.value,
          onChange: policeWatchFun
        }), null, 8 /* PROPS */, ["checked"])
      ])
    ]),
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "list-box" }), [
        _cE("view", _uM({ class: "list nounderline" }), [
          _cE("view", _uM({ class: "text-box" }), [
            _cE("text", null, "人形框定"),
            _cV(_component_fui_icon, _uM({
              name: "help",
              size: "30"
            }))
          ]),
          _cV(_component_fui_switch, _uM({
            scaleRatio: 0.8,
            checked: peopleSelectWatch.value,
            onChange: peopleSelectWatchFun
          }), null, 8 /* PROPS */, ["checked"])
        ]),
        _cE("text", _uM({ class: "tips" }))
      ]),
      _cE("view", _uM({ class: "list-box nounderline" }), [
        _cE("view", _uM({ class: "list nounderline" }), [
          _cE("view", _uM({ class: "text-box" }), [
            _cE("text", null, "人形追踪"),
            _cV(_component_fui_icon, _uM({
              name: "help",
              size: "30"
            }))
          ]),
          _cV(_component_fui_switch, _uM({
            scaleRatio: 0.8,
            checked: peopleFindWatch.value,
            onChange: peopleFindWatchFun
          }), null, 8 /* PROPS */, ["checked"])
        ]),
        _cE("text", _uM({ class: "tips" }))
      ])
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
          onCancel: () => {showPicker.value = false},
          onConfirm: pickerFun
        }), null, 8 /* PROPS */, ["columns", "onCancel"])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])
  ])
}
}

})
export default __sfc__
const GenPagesIndexIntelligentWatchStyles = [_uM([["container", _pS(_uM([["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["height", "100%"], ["backgroundColor", "#f5f5f5"]]))], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"], ["marginBottom", "50rpx"]])]])], ["list", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["level", _uM([[".container .content .list ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["nounderline", _uM([[".container .content ", _uM([["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])], ["list-box", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "column"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["text-box", _uM([[".container .content .list-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"]])]])], ["tips", _uM([[".container .content .list-box ", _uM([["color", "#999999"], ["fontSize", "24rpx"]])]])]])]
