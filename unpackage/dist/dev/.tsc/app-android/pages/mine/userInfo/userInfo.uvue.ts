import _easycom_fui_switch from '@/uni_modules/firstui-unix/components/fui-switch/fui-switch.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _imports_0 from '@/static/mine/right.png'
import { ref } from 'vue'
	
const __sfc__ = defineComponent({
  __name: 'userInfo',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const switchVal = ref(false)
	const change = () => {
		const isCurrentlyBound = switchVal.value
		if (isCurrentlyBound) {
			// 解绑操作
			uni.showModal({
				title: '确认解绑',
				content: '确定要解除微信绑定吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: (res) => {
					if (res.confirm) {
						console.log('调用解绑API...', " at pages/mine/userInfo/userInfo.uvue:64")

						switchVal.value = false
						uni.showToast({
							title: '已成功解绑微信',
							icon: 'none'
						})
					} else {
						switchVal.value = isCurrentlyBound
					}
				}
			})
		} else {
			uni.showModal({
				title: '确认绑定',
				content: '确定要绑定微信账号吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: (res) => {
					if (res.confirm) {
						console.log('调用绑定API...', " at pages/mine/userInfo/userInfo.uvue:84")

						switchVal.value = true
						uni.showToast({
							title: '已成功绑定微信',
							icon: 'none'
						})
					} else {
						switchVal.value = isCurrentlyBound
					}
				}
			})
		}
	}
	const logout = () => {
		uni.showModal({
			content: '确定退出登陆吗？',
			cancelText: '取消',
			confirmText: '确定',
			success(res) {
				if (res.confirm) {
					uni.showToast({
						title: '退出成功',
						icon: 'none',
						duration: 500,
					})
				}
			}
		})
	}

	//修改手机号
	const changePhoneNumber = () => {
		uni.navigateTo({
			url: '/pages/mine/userInfo/changePhoneNumber/changePhoneNumber'
		})
	}

	//注销账号
	const cancelAnAccount = () => {
		uni.navigateTo({
			url: '/pages/mine/userInfo/CancelAnAccount/CancelAnAccount'
		})
	}

return (): any | null => {

const _component_fui_switch = resolveEasyComponent("fui-switch",_easycom_fui_switch)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "title" }), [
      createElementVNode("text", null, "个人信息")
    ]),
    createElementVNode("view", utsMapOf({ class: "info" }), [
      createElementVNode("view", utsMapOf({ class: "info-item" }), [
        createElementVNode("text", null, "账号"),
        createElementVNode("text", null, "18888888888")
      ]),
      createElementVNode("view", utsMapOf({
        class: "info-item nobottom",
        onClick: changePhoneNumber
      }), [
        createElementVNode("text", null, "手机号"),
        createElementVNode("view", utsMapOf({ class: "phone" }), [
          createElementVNode("text", null, "18888888888"),
          createElementVNode("image", utsMapOf({
            class: "icon",
            src: _imports_0,
            mode: "aspectFit"
          }))
        ])
      ])
    ]),
    createElementVNode("view", utsMapOf({ class: "title" }), [
      createElementVNode("text", null, "安全信息")
    ]),
    createElementVNode("view", utsMapOf({ class: "info" }), [
      createElementVNode("view", utsMapOf({ class: "info-item" }), [
        createElementVNode("text", null, "修改密码"),
        createElementVNode("image", utsMapOf({
          class: "icon",
          src: _imports_0,
          mode: "aspectFit"
        }))
      ]),
      createElementVNode("view", utsMapOf({
        class: "info-item nobottom",
        onClick: cancelAnAccount
      }), [
        createElementVNode("text", null, "注销账号"),
        createElementVNode("image", utsMapOf({
          class: "icon",
          src: _imports_0,
          mode: "aspectFit"
        }))
      ])
    ]),
    createElementVNode("view", utsMapOf({ class: "title" }), [
      createElementVNode("text", null, "第三方账号")
    ]),
    createElementVNode("view", utsMapOf({ class: "info" }), [
      createElementVNode("view", utsMapOf({ class: "info-item nobottom" }), [
        createElementVNode("text", null, "微信"),
        createElementVNode("view", utsMapOf({ class: "switch-state" }), [
          createElementVNode("text", utsMapOf({
            style: normalizeStyle(utsMapOf({"margin-right":"10rpx"}))
          }), toDisplayString(switchVal.value ? '已绑定' : '未绑定'), 5 /* TEXT, STYLE */),
          createVNode(_component_fui_switch, utsMapOf({
            color: "#1296db",
            onChange: change
          }))
        ])
      ])
    ]),
    createElementVNode("view", utsMapOf({ class: "btn-box" }), [
      createVNode(_component_fui_button, utsMapOf({
        color: "#fff",
        text: "退出登陆",
        background: "#1296db",
        onOnclick: logout
      }))
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMineUserInfoUserInfoStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["height", "100%"], ["backgroundImage", "none"], ["backgroundColor", "#f3f3f3"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"]]))], ["title", utsMapOf([[".container ", utsMapOf([["fontSize", "30rpx"], ["color", "#333333"], ["paddingTop", "50rpx"], ["paddingRight", 0], ["paddingBottom", "10rpx"], ["paddingLeft", "20rpx"]])]])], ["info", utsMapOf([[".container ", utsMapOf([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["paddingTop", "10rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "30rpx"], ["borderTopLeftRadius", "10rpx"], ["borderTopRightRadius", "10rpx"], ["borderBottomRightRadius", "10rpx"], ["borderBottomLeftRadius", "10rpx"]])]])], ["info-item", utsMapOf([[".container .info ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["icon", utsMapOf([[".container .info .info-item ", utsMapOf([["width", "30rpx"], ["height", "30rpx"]])]])], ["switch-state", utsMapOf([[".container .info .info-item ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "flex-end"], ["alignItems", "center"]])]])], ["phone", utsMapOf([[".container .info .info-item ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "flex-end"], ["alignItems", "center"]])]])], ["nobottom", utsMapOf([[".container .info ", utsMapOf([["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])], ["btn-box", utsMapOf([[".container ", utsMapOf([["marginTop", "200rpx"]])]])]])]
