import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import { ref } from 'vue'
	import TopNavBar from '@/components/TopNavBar.uvue'

	
const __sfc__ = defineComponent({
  __name: 'deviceRechargeData',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const goBack = () => {
		uni.navigateBack({
			delta: 1,
		})
	}

	const rightIcon = () => {
		uni.navigateTo({
			url: '/pages/index/deviceRechargeOrder',
		})
	}


	const copyiccid = () => {
		uni.setClipboardData({
			data: '8986000000000000',
		})
	}

return (): any | null => {

const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)

  return _cE("view", _uM({ class: "container" }), [
    _cV(unref(TopNavBar), _uM({
      title: "流量充值",
      onBack: goBack,
      onRightEvent: rightIcon,
      showBack: true,
      rightText: "order"
    })),
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "ICCID"),
        _cE("view", _uM({ class: "right-item" }), [
          _cE("text", null, "8986000000000000"),
          _cV(_component_l_icon, _uM({
            style: _nS(_uM({"margin-left":"10rpx"})),
            name: "file-copy",
            size: "20",
            onClick: copyiccid
          }), null, 8 /* PROPS */, ["style"])
        ])
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesIndexDeviceRechargeDataStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["list", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"]])]])], ["right-item", _uM([[".container .content .list ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"]])]])]])]
