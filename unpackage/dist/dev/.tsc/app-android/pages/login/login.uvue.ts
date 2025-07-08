import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_fui_input from '@/uni_modules/firstui-unix/components/fui-input/fui-input.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _easycom_fui_checkbox from '@/uni_modules/firstui-unix/components/fui-checkbox/fui-checkbox.uvue'
import _easycom_fui_label from '@/uni_modules/firstui-unix/components/fui-label/fui-label.uvue'
import _easycom_fui_checkbox_group from '@/uni_modules/firstui-unix/components/fui-checkbox-group/fui-checkbox-group.uvue'
import _easycom_fui_bottom_popup from '@/uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.uvue'
import _imports_0 from '@/static/login_banner.png'
import { ref } from 'vue'
    
const __sfc__ = defineComponent({
  __name: 'login',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const loginType = ref<boolean>(true)
    const isCheck = ref<string>('')
	const btnWord = ref<string>('获取验证码')
	const isCounting = ref<boolean>(false)
    const user_info = ref<boolean>(false)
    const user_text = ref<UTSJSONObject>({
        title:'',
        content:''
    })

    const changeType = (bool:boolean) => {
        loginType.value = bool
    }

    const closeUserPopup = () => {
        user_info.value = false
    }

    const showUserInfo = () =>{
        user_info.value = true
        user_text.value = {
            title:'用户协议',
            content:'用户协议内容'
        }
    }

    const priviteInfo = () =>{
		user_info.value = true
        user_text.value = {
            title:'隐私政策',
            content:'隐私政策内容'
        }
    }

    const isChecked = (e: string[]) =>{
        isCheck.value = e.join(',')
    }

	function countDown(seconds : number) {
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

		console.log('发送验证码请求...', " at pages/login/login.uvue:144")
		isCounting.value = true

		countDown(90)
	}
	const login = () => {
		if(isCheck.value == ''){
            uni.showToast({
                title:'请先同意用户协议和隐私政策',
                icon:'none'
            })
        }else{
            uni.showToast({
                title:'登录成功',
                icon:'none'
            })
        }
	}

return (): any | null => {

const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_fui_input = resolveEasyComponent("fui-input",_easycom_fui_input)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)
const _component_fui_checkbox = resolveEasyComponent("fui-checkbox",_easycom_fui_checkbox)
const _component_fui_label = resolveEasyComponent("fui-label",_easycom_fui_label)
const _component_fui_checkbox_group = resolveEasyComponent("fui-checkbox-group",_easycom_fui_checkbox_group)
const _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup",_easycom_fui_bottom_popup)

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("image", utsMapOf({
      src: _imports_0,
      class: "longin_banner"
    })),
    createElementVNode("view", utsMapOf({ class: "content" }), [
      isTrue(loginType.value)
        ? createElementVNode("view", utsMapOf({ key: 0 }), [
            createVNode(_component_fui_input, utsMapOf({
              "placeholder-style": "color:#000",
              backgroundColor: "#d3a0fa",
              radius: 40,
              borderBottom: false,
              placeholder: "请输入账号"
            }), utsMapOf({
              left: withSlotCtx((): any[] => [
                createElementVNode("view", utsMapOf({
                  style: normalizeStyle(utsMapOf({"margin-right":"20rpx"}))
                }), [
                  createVNode(_component_fui_icon, utsMapOf({
                    name: "mobile",
                    color: "#1296db",
                    size: 48
                  }))
                ], 4 /* STYLE */)
              ]),
              _: 1 /* STABLE */
            })),
            createVNode(_component_fui_input, utsMapOf({
              "placeholder-style": "color:#000",
              backgroundColor: "#d3a0fa",
              marginTop: 40,
              radius: 40,
              borderBottom: false,
              placeholder: "请输入密码",
              type: "password"
            }), utsMapOf({
              left: withSlotCtx((): any[] => [
                createElementVNode("view", utsMapOf({
                  style: normalizeStyle(utsMapOf({"margin-right":"20rpx"}))
                }), [
                  createVNode(_component_fui_icon, utsMapOf({
                    name: "captcha",
                    color: "#1296db",
                    size: 48
                  }))
                ], 4 /* STYLE */)
              ]),
              _: 1 /* STABLE */
            })),
            createElementVNode("view", utsMapOf({ class: "tips" }), [
              createElementVNode("text", utsMapOf({
                onClick: () => {changeType(false)}
              }), "短信登陆", 8 /* PROPS */, ["onClick"]),
              createElementVNode("text", null, "忘记密码")
            ])
          ])
        : createElementVNode("view", utsMapOf({ key: 1 }), [
            createVNode(_component_fui_input, utsMapOf({
              "placeholder-style": "color:#000",
              backgroundColor: "#d3a0fa",
              radius: 40,
              borderBottom: false,
              placeholder: "请输入账号"
            }), utsMapOf({
              left: withSlotCtx((): any[] => [
                createElementVNode("view", utsMapOf({
                  style: normalizeStyle(utsMapOf({"margin-right":"20rpx"}))
                }), [
                  createVNode(_component_fui_icon, utsMapOf({
                    name: "mobile",
                    color: "#1296db",
                    size: 48
                  }))
                ], 4 /* STYLE */)
              ]),
              _: 1 /* STABLE */
            })),
            createVNode(_component_fui_input, utsMapOf({
              padding: "20rpx 32rpx",
              backgroundColor: "#d3a0fa",
              placeholder: "请输入验证码",
              bottomLeft: 0,
              marginTop: 40,
              radius: 40,
              placeholderStyle: "font-size: 26rpx;",
              "placeholder-style": "color:#000",
              borderBottom: false
            }), utsMapOf({
              left: withSlotCtx((): any[] => [
                createElementVNode("view", utsMapOf({
                  style: normalizeStyle(utsMapOf({"margin-right":"20rpx"}))
                }), [
                  createVNode(_component_fui_icon, utsMapOf({
                    name: "captcha",
                    color: "#1296db",
                    size: 48
                  }))
                ], 4 /* STYLE */)
              ]),
              default: withSlotCtx((): any[] => [
                createVNode(_component_fui_button, utsMapOf({
                  width: "200rpx",
                  height: "64rpx",
                  size: 28,
                  onClick: getPsw,
                  text: btnWord.value,
                  background: "none",
                  color: "#333",
                  disabled: isCounting.value
                }), null, 8 /* PROPS */, ["text", "disabled"])
              ]),
              _: 1 /* STABLE */
            })),
            createElementVNode("view", utsMapOf({ class: "tips" }), [
              createElementVNode("text", utsMapOf({
                onClick: () => {changeType(true)}
              }), "密码登陆", 8 /* PROPS */, ["onClick"]),
              createElementVNode("text", null, "忘记密码")
            ])
          ]),
      createVNode(_component_fui_checkbox_group, utsMapOf({
        name: "checkbox",
        class: "check-box",
        onChange: isChecked
      }), utsMapOf({
        default: withSlotCtx((): any[] => [
          createVNode(_component_fui_label, null, utsMapOf({
            default: withSlotCtx((): any[] => [
              createVNode(_component_fui_checkbox, utsMapOf({ value: "1" }))
            ]),
            _: 1 /* STABLE */
          })),
          createElementVNode("view", utsMapOf({ class: "fui-text-box" }), [
            createElementVNode("text", null, "已阅读并同意"),
            createElementVNode("text", utsMapOf({
              class: "fui-text",
              onClick: showUserInfo
            }), "《用户协议》"),
            createElementVNode("text", null, "和"),
            createElementVNode("text", utsMapOf({
              class: "fui-text",
              onClick: priviteInfo
            }), "《隐私政策》")
          ])
        ]),
        _: 1 /* STABLE */
      })),
      createVNode(_component_fui_button, utsMapOf({
        text: "登录",
        margin: "20rpx 0 0 0",
        background: "#1296db",
        color: "#fff",
        size: 40,
        onOnclick: login
      }))
    ]),
    createElementVNode("view", null, [
      createVNode(_component_fui_bottom_popup, utsMapOf({
        visible: user_info.value,
        onClose: closeUserPopup
      }), utsMapOf({
        default: withSlotCtx((): any[] => [
          createElementVNode("view", utsMapOf({ class: "fui-scroll__wrap" }), [
            createElementVNode("view", utsMapOf({ class: "fui-title__pb" }), [
              createElementVNode("text", null, toDisplayString(user_text.value.title), 1 /* TEXT */),
              createElementVNode("view", utsMapOf({ onClick: closeUserPopup }), [
                createVNode(_component_fui_icon, utsMapOf({
                  name: "close",
                  size: 48
                }))
              ])
            ]),
            createElementVNode("scroll-view", utsMapOf({
              "scroll-y": true,
              "show-scrollbar": false
            }), [
              createElementVNode("view", null, toDisplayString(user_text.value.content), 1 /* TEXT */)
            ])
          ])
        ]),
        _: 1 /* STABLE */
      }), 8 /* PROPS */, ["visible"])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesLoginLoginStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["height", "100%"], ["backgroundColor", "#ffffff"], ["paddingTop", "20rpx"], ["paddingRight", "40rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "40rpx"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"]]))], ["longin_banner", utsMapOf([[".container ", utsMapOf([["width", "250rpx"], ["height", "400rpx"], ["marginBottom", "20rpx"]])]])], ["content", utsMapOf([[".container ", utsMapOf([["width", "100%"]])]])], ["check-box", utsMapOf([[".container .content ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "flex-start"], ["marginTop", "20rpx"]])]])], ["fui-text-box", utsMapOf([[".container .content .check-box ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "flex-start"], ["marginLeft", "10rpx"]])]])], ["fui-text", utsMapOf([[".container .content .check-box .fui-text-box ", utsMapOf([["color", "#1296db"]])]])], ["tips", utsMapOf([[".container .content ", utsMapOf([["marginTop", "20rpx"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["fui-scroll__wrap", utsMapOf([[".container ", utsMapOf([["width", "100%"], ["paddingTop", "40rpx"], ["paddingRight", "40rpx"], ["paddingBottom", "40rpx"], ["paddingLeft", "40rpx"]])]])], ["fui-title__pb", utsMapOf([[".container .fui-scroll__wrap ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"]])]])]])]
