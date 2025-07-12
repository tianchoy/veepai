const __sfc__ = defineComponent({})
export default __sfc__
function GenPagesMineAboutAboutRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "appinfo" }), [
      _cE("image", _uM({
        class: "logo",
        src: _imports_0
      })),
      _cE("text", _uM({ class: "title" }), "夜鹰智联"),
      _cE("text", _uM({ class: "version" }), "V1.0.1.250512")
    ]),
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "用户协议"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#333",
          size: 55
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "隐私政策"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#333",
          size: 55
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "个人信息收集"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#333",
          size: 55
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "第三方共享"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#333",
          size: 55
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "检查更新"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#333",
          size: 55
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "分享APP"),
        _cV(_component_fui_icon, _uM({
          name: "arrowright",
          color: "#333",
          size: 55
        }))
      ])
    ]),
    _cE("view", _uM({ class: "copyright" }), [
      _cE("text", _uM({ class: "txt" }), "版权所有：夜鹰智联"),
      _cE("text", _uM({ class: "txt" }), "粤ICP备18088888号")
    ])
  ])
}
const GenPagesMineAboutAboutStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["appinfo", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"]])]])], ["logo", _uM([[".container ", _uM([["width", "150rpx"], ["height", "150rpx"], ["marginTop", "100rpx"], ["marginRight", 0], ["marginBottom", "50rpx"], ["marginLeft", 0]])]])], ["title", _uM([[".container ", _uM([["fontSize", "30rpx"], ["fontWeight", "bold"], ["marginBottom", "50rpx"]])]])], ["version", _uM([[".container ", _uM([["fontSize", "20rpx"], ["color", "#999999"], ["marginBottom", "50rpx"]])]])], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["paddingTop", "20rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "30rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["item", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f5f5f5"], ["paddingTop", "10rpx"], ["paddingRight", 0], ["paddingBottom", "10rpx"], ["paddingLeft", 0]])]])], ["copyright", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["marginTop", "200rpx"]])]])], ["txt", _uM([[".container .copyright ", _uM([["fontSize", "15rpx"], ["color", "#999999"]])]])]])]

import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _imports_0 from '@/static/logo.png'
