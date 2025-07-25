import _easycom_fui_switch from '@/uni_modules/firstui-unix/components/fui-switch/fui-switch.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _imports_0 from '@/static/mine/right.png'
import { ref } from 'vue'
	
const __sfc__ = defineComponent({
  __name: 'userInfo',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const switchVal = ref(false)
	const change = () => {
		const isCurrentlyBound = switchVal.value
		if (isCurrentlyBound) {
			uni.showModal({
				title: '确认解绑',
				content: '确定要解除微信绑定吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: (res) => {
					console.log(res, " at pages/mine/userInfo/userInfo.uvue:62")
					if (res.confirm) {
						console.log('调用解绑API...', " at pages/mine/userInfo/userInfo.uvue:64")

						switchVal.value = false
						uni.showToast({
							title: '已成功解绑微信',
							icon: 'none'
						})
					}
					else if (res.cancel) {
						console.log('用户点击取消',isCurrentlyBound, " at pages/mine/userInfo/userInfo.uvue:73");
						switchVal.value = isCurrentlyBound
					}
				},
			})
		} else {
			uni.showModal({
				title: '确认绑定',
				content: '确定要绑定微信账号吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: (res) => {
					if (res.confirm) {
						console.log('调用绑定API...', " at pages/mine/userInfo/userInfo.uvue:86")

						switchVal.value = true
						uni.showToast({
							title: '已成功绑定微信',
							icon: 'none'
						})
					}else if (res.cancel) {
						console.log('用户点击取消',isCurrentlyBound, " at pages/mine/userInfo/userInfo.uvue:94");
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
	
	//修改密码
	const editPassword = () => {
		//通过接口返回类型判断是去找回密码还是修改密码
		if(true){
			uni.navigateTo({
				url: '/pages/mine/userInfo/changePassword/changePassword'
			})
		}
	}

return (): any | null => {

const _component_fui_switch = resolveEasyComponent("fui-switch",_easycom_fui_switch)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "title" }), [
      _cE("text", _uM({ class: "title-text" }), "个人信息")
    ]),
    _cE("view", _uM({ class: "info" }), [
      _cE("view", _uM({ class: "info-item" }), [
        _cE("text", null, "账号"),
        _cE("text", null, "18888888888")
      ]),
      _cE("view", _uM({
        class: "info-item nobottom",
        onClick: changePhoneNumber
      }), [
        _cE("text", null, "手机号"),
        _cE("view", _uM({ class: "phone" }), [
          _cE("text", null, "18888888888"),
          _cE("image", _uM({
            class: "icon",
            src: _imports_0,
            mode: "aspectFit"
          }))
        ])
      ])
    ]),
    _cE("view", _uM({ class: "title" }), [
      _cE("text", null, "安全信息")
    ]),
    _cE("view", _uM({ class: "info" }), [
      _cE("view", _uM({
        class: "info-item",
        onClick: editPassword
      }), [
        _cE("text", null, "修改密码"),
        _cE("image", _uM({
          class: "icon",
          src: _imports_0,
          mode: "aspectFit"
        }))
      ]),
      _cE("view", _uM({
        class: "info-item nobottom",
        onClick: cancelAnAccount
      }), [
        _cE("text", null, "注销账号"),
        _cE("image", _uM({
          class: "icon",
          src: _imports_0,
          mode: "aspectFit"
        }))
      ])
    ]),
    _cE("view", _uM({ class: "title" }), [
      _cE("text", null, "第三方账号")
    ]),
    _cE("view", _uM({ class: "info" }), [
      _cE("view", _uM({ class: "info-item nobottom" }), [
        _cE("text", null, "微信"),
        _cE("view", _uM({ class: "switch-state" }), [
          _cE("text", _uM({
            style: _nS(_uM({"margin-right":"10rpx"}))
          }), _tD(switchVal.value ? '已绑定' : '未绑定'), 5 /* TEXT, STYLE */),
          _cV(_component_fui_switch, _uM({
            checked: switchVal.value,
            color: "#1296db",
            onChange: change
          }), null, 8 /* PROPS */, ["checked"])
        ])
      ])
    ]),
    _cE("view", _uM({ class: "btn-box" }), [
      _cV(_component_fui_button, _uM({
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
const GenPagesMineUserInfoUserInfoStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundImage", "none"], ["backgroundColor", "#f3f3f3"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"]]))], ["title", _uM([[".container ", _uM([["paddingTop", "50rpx"], ["paddingRight", 0], ["paddingBottom", "10rpx"], ["paddingLeft", "20rpx"]])]])], ["title-text", _uM([[".container .title ", _uM([["fontSize", "30rpx"], ["color", "#333333"]])]])], ["info", _uM([[".container ", _uM([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["paddingTop", "10rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "30rpx"], ["borderTopLeftRadius", "10rpx"], ["borderTopRightRadius", "10rpx"], ["borderBottomRightRadius", "10rpx"], ["borderBottomLeftRadius", "10rpx"]])]])], ["info-item", _uM([[".container .info ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["icon", _uM([[".container .info .info-item ", _uM([["width", "30rpx"], ["height", "30rpx"]])]])], ["switch-state", _uM([[".container .info .info-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "flex-end"], ["alignItems", "center"]])]])], ["phone", _uM([[".container .info .info-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "flex-end"], ["alignItems", "center"]])]])], ["nobottom", _uM([[".container .info ", _uM([["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])], ["btn-box", _uM([[".container ", _uM([["marginTop", "200rpx"]])]])]])]
