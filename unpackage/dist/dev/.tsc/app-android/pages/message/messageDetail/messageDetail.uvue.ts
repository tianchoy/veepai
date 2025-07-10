import { ref } from 'vue'
    
const __sfc__ = defineComponent({
  __name: 'messageDetail',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

    const title = ref('消息详情')

    onLoad((options:UTSJSONObject) => {
        console.log(options.id, " at pages/message/messageDetail/messageDetail.uvue:17")
    })

return (): any | null => {

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "content" }), [
      createElementVNode("view", utsMapOf({ class: "title" }), "标题"),
      createElementVNode("view", utsMapOf({ class: "desc" }), [
        createElementVNode("text", null, "描述")
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMessageMessageDetailMessageDetailStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["content", utsMapOf([[".container ", utsMapOf([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["title", utsMapOf([[".container .content ", utsMapOf([["fontSize", "36rpx"], ["fontWeight", "bold"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["desc", utsMapOf([[".container .content ", utsMapOf([["marginTop", "40rpx"], ["marginRight", 0], ["marginBottom", "40rpx"], ["marginLeft", 0]])]])]])]
