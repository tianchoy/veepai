import _easycom_fui_input from '@/uni_modules/firstui-unix/components/fui-input/fui-input.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import { ref } from 'vue'

	
const __sfc__ = defineComponent({
  __name: 'changePassword',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const oldPassword = ref<string>('')
	const newPassword = ref<string>('')
	const confirmPassword = ref<string>('')
	const btnDisabled = ref<boolean>(true)
	const errorMsg = ref<string>('') // 错误提示信息

	// 增强密码规则：必须包含两类及以上字符
	const passwordReg = /^(?:(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])|(?=.*\d)(?=.*[^a-zA-Z\d])).{8,16}$/

	// 验证密码格式
	function verPassword(psw : string) : boolean {
		return passwordReg.test(psw)
	}

	// 更新按钮状态
	const updateBtnState = () => {
		const allFieldsFilled = oldPassword.value.length > 0 &&
			newPassword.value.length > 0 &&
			confirmPassword.value.length > 0

		const passwordsMatch = newPassword.value === confirmPassword.value
		const newPwdValid = verPassword(newPassword.value)

		btnDisabled.value = !(allFieldsFilled && newPwdValid && passwordsMatch)
	}

	// 更新旧密码
	const updateOldPassword = (e : string) => {
		oldPassword.value = e
		updateBtnState()
	}

	// 更新新密码
	const updateNewPassword = (e : string) => {
		newPassword.value = e
		errorMsg.value = ''

		if (e.length > 0 && !verPassword(e)) {
			errorMsg.value = '密码格式不符合要求'
		} else if (confirmPassword.value.length > 0 && e != confirmPassword.value) {
			errorMsg.value = '两次输入的密码不一致'
		}

		updateBtnState()
	}

	// 更新确认密码
	const updateConfirmPassword = (e : string) => {
		confirmPassword.value = e
		errorMsg.value = ''

		if (e.length > 0) {
			if (!verPassword(e)) {
				errorMsg.value = '确认密码格式不符合要求'
			} else if (e != newPassword.value) {
				errorMsg.value = '两次输入的密码不一致'
			}
		}

		updateBtnState()
	}

	// 提交表单
	const submit = () => {
		if (!verPassword(newPassword.value)) {
			uni.showToast({
				title: '密码格式错误',
				icon: 'none'
			})
			return
		}
		if (newPassword.value != confirmPassword.value) {
			uni.showToast({
				title: '两次密码不一致',
				icon: 'none'
			})
			return
		}
		uni.showToast({
			title: '提交成功',
			icon: 'none'
		})
	}

return (): any | null => {

const _component_fui_input = resolveEasyComponent("fui-input",_easycom_fui_input)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "content" }), [
      _cV(_component_fui_input, _uM({
        label: "旧密码",
        placeholder: "请输入原密码",
        type: "password",
        modelValue: oldPassword.value,
        onInput: updateOldPassword
      }), null, 8 /* PROPS */, ["modelValue"]),
      _cV(_component_fui_input, _uM({
        label: "新密码",
        placeholder: "请输入新密码",
        type: "password",
        modelValue: newPassword.value,
        onInput: updateNewPassword
      }), null, 8 /* PROPS */, ["modelValue"]),
      _cV(_component_fui_input, _uM({
        label: "确认新密码",
        placeholder: "再次输入新密码",
        type: "password",
        modelValue: confirmPassword.value,
        onInput: updateConfirmPassword
      }), null, 8 /* PROPS */, ["modelValue"])
    ]),
    isTrue(errorMsg.value)
      ? _cE("view", _uM({ key: 0 }), [
          _cE("text", _uM({ class: "error-msg" }), _tD(errorMsg.value), 1 /* TEXT */)
        ])
      : _cC("v-if", true),
    _cE("view", _uM({ class: "tips" }), [
      _cE("text", _uM({ class: "tips-word" }), "密码8-16位,需包含英文字母、数字、特殊字符中两类及以上")
    ]),
    _cE("view", null, [
      _cV(_component_fui_button, _uM({
        color: "#fff",
        disabled: btnDisabled.value,
        text: "提交",
        background: "#1296db",
        height: "80rpx",
        onOnclick: submit
      }), null, 8 /* PROPS */, ["disabled"])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMineUserInfoChangePasswordChangePasswordStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "50rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "50rpx"], ["paddingLeft", "20rpx"]]))], ["fui-input__label-size", _uM([[".container ", _uM([["!fontSize", "26rpx"]])]])], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["tips", _uM([[".container ", _uM([["marginTop", "40rpx"], ["marginRight", 0], ["marginBottom", "40rpx"], ["marginLeft", 0]])]])], ["tips-word", _uM([[".container .tips ", _uM([["fontSize", "30rpx"], ["color", "#999999"]])]])], ["error-msg", _uM([[".container ", _uM([["marginTop", "10rpx"], ["color", "#e64340"], ["fontSize", "24rpx"]])]])]])]
