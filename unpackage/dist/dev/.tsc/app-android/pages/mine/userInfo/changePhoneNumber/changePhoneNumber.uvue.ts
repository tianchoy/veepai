import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_fui_input from '@/uni_modules/firstui-unix/components/fui-input/fui-input.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import { ref } from 'vue'
	
	
const __sfc__ = defineComponent({
  __name: 'changePhoneNumber',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const btnWord = ref('获取验证码')
	const isCounting = ref(false)
	
	function countDown(seconds: number) {
		if (seconds <= 0) {
			btnWord.value = '获取验证码'
			isCounting.value = false
			return
		}
		
		btnWord.value = `${seconds}秒后重发`

		setTimeout(() => {
			countDown(seconds - 1)
		}, 1000)
	}
	
	const getPsw = () => {
		if (isCounting.value) return
		
		console.log('发送验证码请求...', " at pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue:56")
		isCounting.value = true
		
		countDown(60)
	}

return (): any | null => {

const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_fui_input = resolveEasyComponent("fui-input",_easycom_fui_input)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "content" }), [
      _cV(_component_fui_input, _uM({
        placeholder: "请输入手机号",
        placeholderStyle: "font-size: 26rpx;"
      }), _uM({
        left: withSlotCtx((): any[] => [
          _cE("view", null, [
            _cV(_component_fui_icon, _uM({
              name: "mobile",
              color: "#1296db",
              size: 48
            }))
          ])
        ]),
        _: 1 /* STABLE */
      })),
      _cV(_component_fui_input, _uM({
        padding: "20rpx 32rpx",
        placeholder: "请输入验证码",
        bottomLeft: 0,
        placeholderStyle: "font-size: 26rpx;"
      }), _uM({
        left: withSlotCtx((): any[] => [
          _cE("view", null, [
            _cV(_component_fui_icon, _uM({
              name: "captcha",
              color: "#1296db",
              size: 48
            }))
          ])
        ]),
        default: withSlotCtx((): any[] => [
          _cV(_component_fui_button, _uM({
            type: "gray",
            width: "200rpx",
            height: "64rpx",
            size: 28,
            onClick: getPsw,
            text: btnWord.value,
            disabled: isCounting.value
          }), null, 8 /* PROPS */, ["text", "disabled"])
        ]),
        _: 1 /* STABLE */
      }))
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMineUserInfoChangePhoneNumberChangePhoneNumberStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundImage", "none"], ["backgroundColor", "#f3f3f3"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"]]))], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["paddingTop", "30rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "30rpx"], ["paddingLeft", "30rpx"], ["borderTopLeftRadius", "10rpx"], ["borderTopRightRadius", "10rpx"], ["borderBottomRightRadius", "10rpx"], ["borderBottomLeftRadius", "10rpx"]])]])], ["icon", _uM([[".container .content ", _uM([["width", "40rpx"], ["height", "40rpx"], ["marginRight", "10rpx"]])]])]])]
