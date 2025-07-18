import { ref } from 'vue'
    
const __sfc__ = defineComponent({
  __name: 'messageDetail',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

    const title = ref('消息详情')

    onLoad((options:UTSJSONObject) => {
        console.log(options.id, " at pages/message/messageDetail/messageDetail.uvue:17")
    })

return (): any | null => {

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "title" }), "标题"),
      _cE("view", _uM({ class: "desc" }), [
        _cE("text", null, "描述")
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMessageMessageDetailMessageDetailStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["title", _uM([[".container .content ", _uM([["fontSize", "36rpx"], ["fontWeight", "bold"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["desc", _uM([[".container .content ", _uM([["marginTop", "40rpx"], ["marginRight", 0], ["marginBottom", "40rpx"], ["marginLeft", 0]])]])]])]
