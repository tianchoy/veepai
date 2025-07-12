import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _imports_0 from '@/static/error_big.png'

const __sfc__ = defineComponent({
  __name: 'CancelAnAccount',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const cancelAccount = () => {
		uni.showToast({
			title: '注销成功',
			icon: 'success',
			duration: 2000
		})
	}

return (): any | null => {

const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)

  return _cE("view", _uM({ class: "container" }), [
    _cE("image", _uM({
      src: _imports_0,
      class: "close"
    })),
    _cE("view", _uM({ class: "content" }), [
      _cE("text", _uM({ class: "content-word" }), "账号注销后将会删除个人数据且无法恢复，请谨慎操作。"),
      _cE("text", _uM({ class: "content-word" }), "注销前，请您自行备份重要数据及信息。")
    ]),
    _cE("view", _uM({ class: "btn-box" }), [
      _cE("view", _uM({ class: "btn" }), [
        _cV(_component_fui_button, _uM({
          text: "取消",
          background: "#fff",
          color: "#1296db",
          borderColor: "#666",
          height: "70rpx"
        }))
      ]),
      _cE("view", _uM({ class: "btn" }), [
        _cV(_component_fui_button, _uM({
          text: "申请注销",
          background: "#1296db",
          color: "#fff",
          height: "70rpx",
          onOnclick: cancelAccount
        }))
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMineUserInfoCancelAnAccountCancelAnAccountStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundImage", "none"], ["backgroundColor", "#F5F5F5"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["paddingTop", "100rpx"], ["paddingRight", "100rpx"], ["paddingBottom", "100rpx"], ["paddingLeft", "100rpx"]]))], ["content", _uM([[".container ", _uM([["marginTop", "50rpx"], ["marginRight", 0], ["marginBottom", "50rpx"], ["marginLeft", 0]])]])], ["content-word", _uM([[".container .content ", _uM([["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0]])]])], ["close", _uM([[".container ", _uM([["width", "120rpx"], ["height", "120rpx"]])]])], ["btn-box", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["width", "100%"]])]])], ["btn", _uM([[".container .btn-box ", _uM([["width", "45%"]])]])]])]
