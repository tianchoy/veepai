import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import _easycom_l_progress from '@/uni_modules/lime-progress/components/l-progress/l-progress.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _easycom_fui_radio from '@/uni_modules/firstui-unix/components/fui-radio/fui-radio.uvue'
import _easycom_fui_list_cell from '@/uni_modules/firstui-unix/components/fui-list-cell/fui-list-cell.uvue'
import _easycom_fui_label from '@/uni_modules/firstui-unix/components/fui-label/fui-label.uvue'
import _easycom_fui_radio_group from '@/uni_modules/firstui-unix/components/fui-radio-group/fui-radio-group.uvue'
import _easycom_fui_bottom_popup from '@/uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.uvue'
import { ref, onMounted } from 'vue'

	type RadioItem = { __$originalPosition?: UTSSourceMapPosition<"RadioItem", "pages/mine/rechargeDataTraffic/rechargeDataTraffic.uvue", 78, 7>;
		deviceTitle : string;
		iccid : string;
		cardid : string;
		cardState : string;
		currentPackage : string;
		useDate : string;
		percent : number;
		total : string;
		checked ?: boolean;
	}

	
const __sfc__ = defineComponent({
  __name: 'rechargeDataTraffic',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const totalDevice = ref<number>(4)
	const percent = ref<number>(50)
	const isShow = ref<boolean>(false)
		
	const currentDeviceInfo = ref<RadioItem>({
		deviceTitle: '',
		iccid: '',
		cardid: '',
		cardState: '',
		currentPackage: '',
		useDate: '',
		percent: 0,
		total: '',
		checked: true,
	})

	const radioItems = ref<RadioItem[]>([{
		deviceTitle: '设备信息',
		iccid: '1123456667777887',
		cardid: '13000001111',
		cardState: '在用',
		currentPackage: '店长推荐【终身流量】',
		useDate: '2025-07-07',
		percent: 50,
		total: '100',
	},
	{
		deviceTitle: '设备信息1',
		iccid: '1123456667777888',
		cardid: '13000001111',
		cardState: '停机',
		currentPackage: '店长推荐【100G流量】',
		useDate: '2025-07-08',
		percent: 70,
		total: '200',
	},
	{
		deviceTitle: '设备信息2',
		cardid: '13000001111',
		iccid: '310203030443',
		cardState: '注销',
		currentPackage: '加油包',
		useDate: '2025-07-09',
		percent: 100,
		total: '300',
	}])



	const getValue = (e : string) => {
		const selectedItem = radioItems.value.find(item => item.iccid == e)
		if (selectedItem != null) {
			selectedItem.checked = true
			currentDeviceInfo.value = selectedItem
		}

		uni.showToast({
			title: '更换成功',
			icon: 'none'
		})

	}

	const currentInfo = () => {
		radioItems.value.forEach(item => {
			item.checked = false
		})
		radioItems.value[0].checked = true
		currentDeviceInfo.value = radioItems.value[0]
	}

	const showPopup = () => {
		isShow.value = true
	}

	const closePopup = () => {
		isShow.value = false
	}

	const submit = () => {
		uni.showToast({
			title: '去充值',
			icon: 'none'
		})
	}

	const copyRight = () => {
		uni.setClipboardData({
			data: currentDeviceInfo.value.iccid,
			success: function () {
				uni.showToast({
					title: '复制成功',
					icon: 'none'
				})
			}
		});
	}

	onMounted(() => {
		currentInfo()
	})

return (): any | null => {

const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)
const _component_l_progress = resolveEasyComponent("l-progress",_easycom_l_progress)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)
const _component_fui_radio = resolveEasyComponent("fui-radio",_easycom_fui_radio)
const _component_fui_list_cell = resolveEasyComponent("fui-list-cell",_easycom_fui_list_cell)
const _component_fui_label = resolveEasyComponent("fui-label",_easycom_fui_label)
const _component_fui_radio_group = resolveEasyComponent("fui-radio-group",_easycom_fui_radio_group)
const _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup",_easycom_fui_bottom_popup)

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "device-total" }), [
      _cE("view", _uM({ class: "device-total-title" }), [
        _cE("text", null, "充值设备"),
        _cE("text", _uM({ class: "device-total-title-color" }), "（共" + _tD(totalDevice.value) + "台设备）", 1 /* TEXT */)
      ]),
      _cE("view", _uM({ class: "device-total-title" }), [
        _cE("text", _uM({ onClick: showPopup }), "更换设备"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          size: 50
        }))
      ])
    ]),
    _cE("view", _uM({ class: "device-info-box" }), [
      _cE("text", _uM({ class: "device-title" }), "设备信息"),
      _cE("view", _uM({ class: "device-info-item" }), [
        _cE("text", null, "ICCID"),
        _cE("view", _uM({ class: "iccid-info" }), [
          _cE("text", _uM({
            style: _nS(_uM({"margin-right":"10rpx"}))
          }), _tD(currentDeviceInfo.value.iccid), 5 /* TEXT, STYLE */),
          _cV(_component_l_icon, _uM({
            name: "file-copy",
            color: "#666",
            size: "16",
            onClick: copyRight
          }))
        ])
      ]),
      _cE("view", _uM({ class: "device-info-item" }), [
        _cE("text", null, "卡号"),
        _cE("text", null, _tD(currentDeviceInfo.value.cardid), 1 /* TEXT */)
      ]),
      _cE("view", _uM({ class: "device-info-item" }), [
        _cE("text", null, "卡片状态"),
        _cE("text", null, _tD(currentDeviceInfo.value.cardState), 1 /* TEXT */)
      ]),
      _cE("view", _uM({ class: "device-info-item" }), [
        _cE("text", null, "当前套餐"),
        _cE("text", null, _tD(currentDeviceInfo.value.currentPackage), 1 /* TEXT */)
      ]),
      _cE("view", _uM({ class: "device-info-item add-style" }), [
        _cE("text", null, "生效日期"),
        _cE("text", null, _tD(currentDeviceInfo.value.useDate), 1 /* TEXT */)
      ]),
      _cE("text", null, "流量"),
      _cE("view", _uM({ class: "progess" }), [
        _cV(_component_l_progress, _uM({
          percent: currentDeviceInfo.value.percent,
          "show-info": true
        }), null, 8 /* PROPS */, ["percent"])
      ]),
      _cE("view", _uM({ class: "device-info-item" }), [
        _cE("text", null, "已用50G(50%)"),
        _cE("text", null, "可用50G(共100G)")
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
    _cV(_component_fui_bottom_popup, _uM({
      visible: isShow.value,
      onClose: closePopup
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cE("view", _uM({ class: "fui-scroll__wrap" }), [
          _cE("view", _uM({ class: "popup-title" }), [
            _cE("text", null, "设备列表"),
            _cE("view", _uM({ onClick: closePopup }), [
              _cV(_component_fui_icon, _uM({
                name: "close",
                size: 40
              }))
            ])
          ]),
          _cV(_component_fui_radio_group, _uM({ onChange: getValue }), _uM({
            default: withSlotCtx((): any[] => [
              _cE(Fragment, null, RenderHelpers.renderList(radioItems.value, (item, index, __index, _cached): any => {
                return _cV(_component_fui_label, _uM({ key: index }), _uM({
                  default: withSlotCtx((): any[] => [
                    _cV(_component_fui_list_cell, null, _uM({
                      default: withSlotCtx((): any[] => [
                        _cE("view", _uM({ class: "fui-list__cell" }), [
                          _cE("text", null, _tD(item.deviceTitle), 1 /* TEXT */),
                          _cV(_component_fui_radio, _uM({
                            checked: item.checked,
                            value: item.iccid
                          }), null, 8 /* PROPS */, ["checked", "value"])
                        ])
                      ]),
                      _: 2 /* DYNAMIC */
                    }), 1024 /* DYNAMIC_SLOTS */)
                  ]),
                  _: 2 /* DYNAMIC */
                }), 1024 /* DYNAMIC_SLOTS */)
              }), 128 /* KEYED_FRAGMENT */)
            ]),
            _: 1 /* STABLE */
          }))
        ])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["visible"])
  ])
}
}

})
export default __sfc__
const GenPagesMineRechargeDataTrafficRechargeDataTrafficStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "30rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "30rpx"], ["paddingLeft", "20rpx"]]))], ["device-total", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"]])]])], ["device-total-title", _uM([[".container .device-total ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "center"], ["alignItems", "center"]])]])], ["device-total-title-color", _uM([[".container .device-total .device-total-title ", _uM([["color", "#999999"]])]])], ["device-info-box", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "30rpx"], ["paddingRight", "40rpx"], ["paddingBottom", "30rpx"], ["paddingLeft", "40rpx"], ["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0], ["display", "flex"], ["flexDirection", "column"]])]])], ["device-title", _uM([[".container .device-info-box ", _uM([["fontSize", "35rpx"]])]])], ["device-info-item", _uM([[".container .device-info-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["marginTop", "20rpx"]])]])], ["iccid-info", _uM([[".container .device-info-box .device-info-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"]])]])], ["add-style", _uM([[".container .device-info-box ", _uM([["paddingBottom", "60rpx"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#999999"], ["marginBottom", "60rpx"]])]])], ["progess", _uM([[".container .device-info-box ", _uM([["marginTop", "10rpx"], ["marginRight", 0], ["marginBottom", "10rpx"], ["marginLeft", 0]])]])], ["btn-box", _uM([[".container ", _uM([["marginTop", "60rpx"]])]])], ["popup-title", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["paddingTop", 0], ["paddingRight", "40rpx"], ["paddingBottom", 0], ["paddingLeft", "40rpx"]])]])], ["fui-scroll__wrap", _uM([[".container ", _uM([["width", "100%"], ["paddingTop", "30rpx"], ["paddingRight", 0], ["paddingBottom", "30rpx"], ["paddingLeft", 0], ["position", "relative"]])]])], ["fui-sub__title", _uM([[".container ", _uM([["textAlign", "center"], ["fontSize", "24rpx"], ["color", "#7F7F7F"], ["transform", "scale(0.9)"]])]])], ["fui-scroll__view", _uM([[".container ", _uM([["width", "100%"], ["height", "50%"]])]])], ["fui-list__cell", _uM([[".container ", _uM([["flex", 1], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])]])]
