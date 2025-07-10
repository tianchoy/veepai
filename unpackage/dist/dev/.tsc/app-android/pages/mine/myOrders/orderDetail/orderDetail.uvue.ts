import { ref } from 'vue'
	
const __sfc__ = defineComponent({
  __name: 'orderDetail',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const id = ref<string>('')

	onLoad((options:UTSJSONObject)=>{
		id.value =  options.id!.toString()
	})

return (): any | null => {

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "content" }), [
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("text", null, "包年120G套餐"),
        createElementVNode("text", utsMapOf({ class: "price" }), "¥128")
      ]),
      createElementVNode("view", utsMapOf({ class: "item underline" }), [
        createElementVNode("text", null, "有效期"),
        createElementVNode("text", null, "60个月")
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("text", null, "设备名称"),
        createElementVNode("text", null, "办公室设备")
      ]),
      createElementVNode("view", utsMapOf({ class: "item underline" }), [
        createElementVNode("text", null, "ICCID "),
        createElementVNode("text", null, "8986042400000000000")
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("text", null, "实付款"),
        createElementVNode("text", null, "¥128")
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("text", null, "订单编号"),
        createElementVNode("text", null, "ASW22333332222")
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("text", null, "下单时间"),
        createElementVNode("text", null, "2024-10-23 17:21:11")
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("text", null, "支付时间"),
        createElementVNode("text", null, "2024-10-23 17:21:22")
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMineMyOrdersOrderDetailOrderDetailStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["height", "100%"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["backgroundColor", "#F5F5F5"]]))], ["content", utsMapOf([[".container ", utsMapOf([["backgroundColor", "#ffffff"], ["paddingTop", "20rpx"], ["paddingRight", "40rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "40rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["item", utsMapOf([[".container .content ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0]])]])], ["price", utsMapOf([[".container .content .item ", utsMapOf([["fontSize", "38rpx"], ["color", "#555555"], ["fontWeight", "bold"]])]])], ["underline", utsMapOf([[".container .content ", utsMapOf([["borderBottomWidth", "2rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#F1f1f1"]])]])]])]
