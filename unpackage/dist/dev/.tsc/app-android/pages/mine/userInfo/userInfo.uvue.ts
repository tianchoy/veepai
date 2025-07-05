const __sfc__ = defineComponent({})
export default __sfc__
function GenPagesMineUserInfoUserInfoRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "title" }), [
      createElementVNode("text", null, "个人信息")
    ]),
    createElementVNode("view", utsMapOf({ class: "info" }), [
      createElementVNode("view", utsMapOf({ class: "info-item" }), [
        createElementVNode("text", null, "账号"),
        createElementVNode("text", null, "18888888888")
      ]),
      createElementVNode("view", utsMapOf({ class: "info-item nobottom" }), [
        createElementVNode("text", null, "账号"),
        createElementVNode("text", null, "18888888888")
      ])
    ]),
    createElementVNode("view", utsMapOf({ class: "title" }), [
      createElementVNode("text", null, "安全信息")
    ]),
    createElementVNode("view", utsMapOf({ class: "info" }), [
      createElementVNode("view", utsMapOf({ class: "info-item" }), [
        createElementVNode("text", null, "账号"),
        createElementVNode("image", utsMapOf({
          class: "icon",
          src: _imports_0,
          mode: "aspectFit"
        }))
      ]),
      createElementVNode("view", utsMapOf({ class: "info-item nobottom" }), [
        createElementVNode("text", null, "账号"),
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
    createElementVNode("view", utsMapOf({ class: "info" }))
  ])
}
const GenPagesMineUserInfoUserInfoStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["height", "100%"], ["backgroundImage", "none"], ["backgroundColor", "#f3f3f3"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"]]))], ["title", utsMapOf([[".container ", utsMapOf([["fontSize", "30rpx"], ["color", "#333333"], ["paddingTop", "50rpx"], ["paddingRight", 0], ["paddingBottom", "10rpx"], ["paddingLeft", "20rpx"]])]])], ["info", utsMapOf([[".container ", utsMapOf([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["paddingTop", "10rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "30rpx"], ["borderTopLeftRadius", "10rpx"], ["borderTopRightRadius", "10rpx"], ["borderBottomRightRadius", "10rpx"], ["borderBottomLeftRadius", "10rpx"]])]])], ["info-item", utsMapOf([[".container .info ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["icon", utsMapOf([[".container .info .info-item ", utsMapOf([["width", "35rpx"], ["height", "35rpx"]])]])], ["nobottom", utsMapOf([[".container .info ", utsMapOf([["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])]])]

import _imports_0 from '@/static/mine/right.png'
