import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _easycom_l_input from '@/uni_modules/lime-input/components/l-input/l-input.uvue'
import _easycom_l_dialog from '@/uni_modules/lime-dialog/components/l-dialog/l-dialog.uvue'
import _imports_0 from '@/static/vedio.png'
import { ref } from 'vue'
	import TopNavBar from '@/components/TopNavBar'
	
const __sfc__ = defineComponent({
  __name: 'deviceSetting',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const showEditName = ref(false)
	const newName = ref('')

	const goBack = () =>{
		uni.navigateBack({
			delta: 1,
		})
	}

	const editName = () => {
		showEditName.value = true
	}

	const changeName = () => {
		uni.showToast({
			title: newName.value,
		})
		showEditName.value = false
	}

	const onClose = () => {
		showEditName.value = false
	}

	const copyUid = () => {
		uni.setClipboardData({
			data: '123456',
			success: function () {
				uni.showToast({
					'title': '复制成功'
				})
			}
		})
	}

	const goDeviceSettingInfo = () => {
		uni.navigateTo({
			url: '/pages/index/deviceSettingInfo/deviceSettingInfo',
		})
	}

	const goTrafficRecharge = () => {
		uni.navigateTo({
			url: '/pages/index/deviceRechargeData',
		})
	}

	const goIntelligentWatch = () => {
		uni.navigateTo({
			url: '/pages/index/intelligentWatch',
		})
	}

	const goTfCardSetting = () => {
		uni.navigateTo({
			url: '/pages/index/TFCardSetting',
		})
	}

	const goCloudStorageSetting = () => {
		uni.navigateTo({
			url: '/pages/index/cloudStorageSetting',
		})
	}

	const deleteDevice = () => {
		uni.showModal({
			title: '提示',
			content: '确认删除设备吗？',
			cancelText: '取消',
			confirmText: '删除',
			success: (res) => {
				if (res.confirm) {
					console.log('用户点击了确定', " at pages/index/deviceSetting.uvue:151")
				}
			}
		})
	}


return (): any | null => {

const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)
const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)
const _component_l_input = resolveEasyComponent("l-input",_easycom_l_input)
const _component_l_dialog = resolveEasyComponent("l-dialog",_easycom_l_dialog)

  return _cE("view", _uM({ class: "container" }), [
    _cV(unref(TopNavBar), _uM({
      showBack: true,
      title: "设备设置",
      onBack: goBack
    })),
    _cE("view", _uM({ class: "device-box" }), [
      _cE("image", _uM({
        class: "device-img",
        src: _imports_0,
        mode: "aspectFill"
      })),
      _cE("view", _uM({ class: "device-info" }), [
        _cE("view", _uM({ class: "device-name-box" }), [
          _cE("text", null, "设备名称"),
          _cV(_component_l_icon, _uM({
            name: "round-filled",
            color: "#e8782eff",
            size: "18"
          })),
          _cV(_component_l_icon, _uM({
            style: _nS(_uM({"margin-left":"50rpx"})),
            name: "edit",
            color: "#333",
            size: "18",
            onClick: editName
          }), null, 8 /* PROPS */, ["style"])
        ]),
        _cE("view", null, [
          _cE("view", _uM({ class: "model-uid" }), [
            _cE("text", null, "型号"),
            _cE("text", _uM({ class: "model-uid-text" }), "YY-1234567")
          ]),
          _cE("view", _uM({ class: "model-uid" }), [
            _cE("text", null, "UID"),
            _cE("view", _uM({ class: "model-uid" }), [
              _cE("text", _uM({ class: "model-uid-text" }), "YY-1234567"),
              _cV(_component_l_icon, _uM({
                name: "file-copy",
                color: "#999",
                size: "16",
                onClick: copyUid
              }))
            ])
          ])
        ]),
        _cE("text", _uM({ class: "network" }), "网络 中国电信")
      ])
    ]),
    _cE("view", _uM({ class: "device-list-box" }), [
      _cE("view", _uM({
        class: "item",
        onClick: goDeviceSettingInfo
      }), [
        _cE("text", null, "设备设置"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#111",
          size: "40"
        }))
      ]),
      _cE("view", _uM({
        class: "traffic",
        onClick: goTrafficRecharge
      }), [
        _cE("view", _uM({ class: "item" }), [
          _cE("text", null, "流量充值"),
          _cV(_component_fui_icon, _uM({
            name: "arrowright",
            color: "#111",
            size: "40"
          }))
        ]),
        _cE("view", _uM({ class: "date" }), [
          _cE("text", _uM({ class: "word" }), "已用80G(80%)"),
          _cE("text", _uM({ class: "word" }), "2025-8-10到期")
        ])
      ]),
      _cE("view", _uM({
        class: "item",
        onClick: goIntelligentWatch
      }), [
        _cE("text", null, "智能侦测"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#111",
          size: "40"
        }))
      ]),
      _cE("view", _uM({
        class: "item",
        onClick: goTfCardSetting
      }), [
        _cE("text", null, "TF卡设置"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#111",
          size: "40"
        }))
      ]),
      _cE("view", _uM({
        class: "item",
        onClick: goCloudStorageSetting
      }), [
        _cE("text", null, "云存储设置"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#111",
          size: "40"
        }))
      ]),
      _cE("view", _uM({ class: "item nounderline" }), [
        _cE("text", null, "存储管理"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#111",
          size: "40"
        }))
      ])
    ]),
    _cE("view", _uM({ class: "btn-box" }), [
      _cV(_component_fui_button, _uM({
        text: "删除设备",
        height: "80rpx",
        background: "#fff",
        color: "red",
        onClick: deleteDevice
      }))
    ]),
    _cV(_component_l_dialog, _uM({
      modelValue: showEditName.value,
      "onUpdate:modelValue": $event => {(showEditName).value = $event},
      title: "修改设备名称",
      "cancel-btn": { content: '取消', variant: 'text', size: 'large', type: 'default'},
      "confirm-btn": { content: '确认', variant: 'text', size: 'large'},
      onConfirm: changeName,
      onCancel: () => {showEditName.value = false}
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cV(_component_l_input, _uM({
          placeholder: "请输入设备新名称",
          modelValue: newName.value,
          "onUpdate:modelValue": $event => {(newName).value = $event},
          "l-style": "background: #f3f3f3; margin-top:16px; padding-top:12px;padding:12px"
        }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "onCancel"])
  ])
}
}

})
export default __sfc__
const GenPagesIndexDeviceSettingStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"]]))], ["device-box", _uM([[".container ", _uM([["marginTop", "20rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["display", "flex"], ["flexDirection", "row"], ["justifyContent", "flex-start"]])]])], ["device-img", _uM([[".container .device-box ", _uM([["width", "200rpx"], ["height", "200rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["marginRight", "20rpx"]])]])], ["device-info", _uM([[".container .device-box ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "flex-start"], ["justifyContent", "space-between"]])]])], ["device-name-box", _uM([[".container .device-box .device-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["model-uid", _uM([[".container .device-box .device-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "5rpx"], ["paddingRight", 0], ["paddingBottom", "5rpx"], ["paddingLeft", 0]])]])], ["model-uid-text", _uM([[".container .device-box .device-info .model-uid ", _uM([["marginLeft", "30rpx"], ["marginRight", "10rpx"]])]])], ["network", _uM([[".container .device-box .device-info ", _uM([["color", "#999999"]])]])], ["device-list-box", _uM([[".container ", _uM([["marginTop", "20rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["item", _uM([[".container .device-list-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "30rpx"], ["paddingRight", 0], ["paddingBottom", "30rpx"], ["paddingLeft", 0], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f9f9f9"]])], [".container .device-list-box .traffic ", _uM([["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])], ["traffic", _uM([[".container .device-list-box ", _uM([["display", "flex"], ["flexDirection", "column"], ["paddingTop", "40rpx"], ["paddingRight", 0], ["paddingBottom", "40rpx"], ["paddingLeft", 0], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f9f9f9"]])]])], ["date", _uM([[".container .device-list-box .traffic ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["word", _uM([[".container .device-list-box .traffic .date ", _uM([["color", "#999999"]])]])], ["nounderline", _uM([[".container .device-list-box ", _uM([["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])], ["btn-box", _uM([[".container ", _uM([["marginTop", "80rpx"]])]])]])]
