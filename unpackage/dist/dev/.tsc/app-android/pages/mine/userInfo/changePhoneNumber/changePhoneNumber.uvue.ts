import _easycom_fui_input from '@/uni_modules/firstui-unix/components/fui-input/fui-input.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _imports_0 from '@/static/phone.png'
import _imports_1 from '@/static/captcha.png'
import { ref } from 'vue'
	
	
const __sfc__ = defineComponent({
  __name: 'changePhoneNumber',
  setup(__props): any | null {
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
		
		console.log('发送验证码请求...', " at pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue:55")
		isCounting.value = true
		
		countDown(60)
	}

return (): any | null => {

const _component_fui_input = resolveEasyComponent("fui-input",_easycom_fui_input)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "content" }), [
      createVNode(_component_fui_input, utsMapOf({ placeholder: "请输入手机号" }), utsMapOf({
        left: withSlotCtx((): any[] => [
          createElementVNode("view", null, [
            createElementVNode("image", utsMapOf({
              class: "icon",
              src: _imports_0
            }))
          ])
        ]),
        _: 1 /* STABLE */
      })),
      createVNode(_component_fui_input, utsMapOf({
        padding: "20rpx 32rpx",
        placeholder: "请输入验证码",
        bottomLeft: 0
      }), utsMapOf({
        left: withSlotCtx((): any[] => [
          createElementVNode("view", null, [
            createElementVNode("image", utsMapOf({
              class: "icon",
              src: _imports_1
            }))
          ])
        ]),
        default: withSlotCtx((): any[] => [
          createVNode(_component_fui_button, utsMapOf({
            type: "gray",
            bold: true,
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
const GenPagesMineUserInfoChangePhoneNumberChangePhoneNumberStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["height", "100%"], ["backgroundImage", "none"], ["backgroundColor", "#f3f3f3"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"]]))], ["content", utsMapOf([[".container ", utsMapOf([["backgroundColor", "#ffffff"], ["paddingTop", "30rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "30rpx"], ["paddingLeft", "30rpx"], ["borderTopLeftRadius", "10rpx"], ["borderTopRightRadius", "10rpx"], ["borderBottomRightRadius", "10rpx"], ["borderBottomLeftRadius", "10rpx"]])]])], ["icon", utsMapOf([[".container .content ", utsMapOf([["width", "40rpx"], ["height", "40rpx"], ["marginRight", "10rpx"]])]])]])]
