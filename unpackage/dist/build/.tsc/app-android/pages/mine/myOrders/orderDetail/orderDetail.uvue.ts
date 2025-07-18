import { ref } from 'vue'
	
const __sfc__ = defineComponent({
  __name: 'orderDetail',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const id = ref<string>('')

	onLoad((options:UTSJSONObject)=>{
		id.value =  options.id!.toString()
	})

return (): any | null => {

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "包年120G套餐"),
        _cE("text", _uM({ class: "price" }), "¥128")
      ]),
      _cE("view", _uM({ class: "item underline" }), [
        _cE("text", null, "有效期"),
        _cE("text", null, "60个月")
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "设备名称"),
        _cE("text", null, "办公室设备")
      ]),
      _cE("view", _uM({ class: "item underline" }), [
        _cE("text", null, "ICCID "),
        _cE("text", null, "8986042400000000000")
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "实付款"),
        _cE("text", null, "¥128")
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "订单编号"),
        _cE("text", null, "ASW22333332222")
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "下单时间"),
        _cE("text", null, "2024-10-23 17:21:11")
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", null, "支付时间"),
        _cE("text", null, "2024-10-23 17:21:22")
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMineMyOrdersOrderDetailOrderDetailStyles = [_uM([["container", _pS(_uM([["height", "100%"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["backgroundColor", "#F5F5F5"]]))], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["paddingTop", "20rpx"], ["paddingRight", "40rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "40rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["item", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0]])]])], ["price", _uM([[".container .content .item ", _uM([["fontSize", "38rpx"], ["color", "#555555"], ["fontWeight", "bold"]])]])], ["underline", _uM([[".container .content ", _uM([["borderBottomWidth", "2rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#F1f1f1"]])]])]])]
