const __sfc__ = defineComponent({})
export default __sfc__
function GenPagesIndexCloudStorageSettingRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "当前套餐"),
        _cE("text", null, "7天滚动云存储 - 月卡")
      ]),
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "到期时间"),
        _cE("text", null, "2025-10-29")
      ]),
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "自动续费"),
        _cE("text", null, "否")
      ]),
      _cE("view", _uM({ class: "btn-box" }), [
        _cV(_component_fui_button, _uM({
          width: "45%",
          height: "80rpx",
          text: "存储管理"
        })),
        _cV(_component_fui_button, _uM({
          width: "45%",
          height: "80rpx",
          text: "立即续费"
        }))
      ])
    ])
  ])
}
const GenPagesIndexCloudStorageSettingStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["list", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["btn-box", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["borderBottomWidth", 0], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"], ["marginTop", "50rpx"]])]])]])]

import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
