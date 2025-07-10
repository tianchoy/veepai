import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import _easycom_l_tab_panel from '@/uni_modules/lime-tabs/components/l-tab-panel/l-tab-panel.uvue'
import _easycom_l_tabs from '@/uni_modules/lime-tabs/components/l-tabs/l-tabs.uvue'
import { ref } from 'vue'
	type tabItem = { __$originalPosition?: UTSSourceMapPosition<"tabItem", "pages/mine/myOrders/myOrders.uvue", 33, 7>;
		id : string;
		title : string;
		content : Array<Object>
	}

	type ContentType = { __$originalPosition?: UTSSourceMapPosition<"ContentType", "pages/mine/myOrders/myOrders.uvue", 39, 7>;
		id : string;
		title : string;
		date : string;
		price : string;
		state : string;
		iccid : string;
		isPay : string;
	}

	
const __sfc__ = defineComponent({
  __name: 'myOrders',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const tabVal = ref(0)

	const tabsVal = ref<tabItem[]>([
		{
			id:'0',
			title:'全部',
			content:[]
		},
		{
			id:'1',
			title:'待付款',
			content:[]
		},
		{
			id:'2',
			title:'已完成',
			content:[]
		},
		{
			id:'3',
			title:'已取消',
			content:[]
		},
		{
			id:'4',
			title:'退款',
			content:[]
		}
	])

	const content  = ref<ContentType[]>([
		{
			id:'1111',
			title:'五年畅想套餐',
			date:'2025-07-09 15:00:00',
			price:'¥300',
			state:'已完成',
			iccid:'89862235957372384387456',
			isPay:'2',
		},
		{
			id:'1112',
			title:'五年畅想套餐',
			date:'2025-07-09 15:00:00',
			price:'¥300',
			state:'已取消',
			iccid:'89862235957372384387454',
			isPay:'3',
		},
		{
			id:'1113',
			title:'五年畅想套餐',
			date:'2025-07-09 15:00:00',
			price:'¥300',
			state:'待付款',
			iccid:'89862235957372384387467',
			isPay:'1',
		},
		{
			id:'1114',
			title:'五年畅想套餐',
			date:'2025-07-09 15:00:00',
			price:'¥300',
			state:'已退款',
			iccid:'89862235957372384387465',
			isPay:'4',
		},
	])

	const getFilteredEvents = (): ContentType[] => {
		if (tabVal.value == 0) return [...content.value];
		const selectedType = tabsVal.value[tabVal.value].id;
		return content.value.filter(event => event.isPay == selectedType);
	}

	const changeTab = (val: number) => {
		tabVal.value = val
	}

	const goDetail = (id:string) => {
		uni.navigateTo({
			url: '/pages/mine/myOrders/orderDetail/orderDetail?id=' + id
		})
	}

	const goPay = () => {
		uni.showToast({
			title: '去付款',
			icon: 'none'
		})
	}

return (): any | null => {

const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)
const _component_l_tab_panel = resolveEasyComponent("l-tab-panel",_easycom_l_tab_panel)
const _component_l_tabs = resolveEasyComponent("l-tabs",_easycom_l_tabs)

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createVNode(_component_l_tabs, utsMapOf({
      value: tabVal.value,
      onClick: changeTab,
      bgColor: "transparent",
      color: "#000000",
      activeColor: "#FF5722"
    }), utsMapOf({
      default: withSlotCtx((): any[] => [
        createElementVNode(Fragment, null, RenderHelpers.renderList(tabsVal.value, (item, index, __index, _cached): any => {
          return createVNode(_component_l_tab_panel, utsMapOf({
            key: index,
            value: index,
            label: item.title
          }), utsMapOf({
            default: withSlotCtx((): any[] => [
              createElementVNode(Fragment, null, RenderHelpers.renderList(getFilteredEvents(), (item, index, __index, _cached): any => {
                return createElementVNode("view", utsMapOf({
                  class: "list-item",
                  key: index
                }), [
                  createElementVNode("view", utsMapOf({
                    onClick: () => {goDetail(item.id)}
                  }), [
                    createElementVNode("view", utsMapOf({ class: "title-state" }), [
                      createElementVNode("text", utsMapOf({ class: "title-style" }), toDisplayString(item.title), 1 /* TEXT */),
                      createElementVNode("text", utsMapOf({ class: "state-style" }), toDisplayString(item.state), 1 /* TEXT */)
                    ]),
                    createElementVNode("view", utsMapOf({ class: "device-type" }), [
                      createElementVNode("text", null, "办公室设备"),
                      createElementVNode("text", null, "ICCID " + toDisplayString(item.iccid), 1 /* TEXT */)
                    ]),
                    createElementVNode("view", utsMapOf({ class: "date-price" }), [
                      createElementVNode("text", null, toDisplayString(item.date), 1 /* TEXT */),
                      createElementVNode("text", utsMapOf({ class: "price" }), toDisplayString(item.price), 1 /* TEXT */)
                    ])
                  ], 8 /* PROPS */, ["onClick"]),
                  item.isPay == '1'
                    ? createElementVNode("view", utsMapOf({
                        key: 0,
                        class: "btn"
                      }), [
                        createVNode(_component_fui_button, utsMapOf({
                          text: "去付款",
                          type: "primary",
                          width: "120rpx",
                          height: "50rpx",
                          size: 24,
                          onClick: goPay
                        }))
                      ])
                    : createCommentVNode("v-if", true)
                ])
              }), 128 /* KEYED_FRAGMENT */)
            ]),
            _: 2 /* DYNAMIC */
          }), 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "label"])
        }), 128 /* KEYED_FRAGMENT */)
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["value"])
  ])
}
}

})
export default __sfc__
const GenPagesMineMyOrdersMyOrdersStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["width", "100%"], ["height", "100%"], ["backgroundColor", "#F5F5F5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["l-tabs", utsMapOf([[".container ", utsMapOf([["!backgroundColor", "rgba(0,0,0,0)"]])]])], ["list-item", utsMapOf([[".container ", utsMapOf([["backgroundColor", "#ffffff"], ["paddingTop", "20rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "30rpx"], ["marginTop", "20rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["title-state", utsMapOf([[".container .list-item ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "10rpx"], ["paddingRight", 0], ["paddingBottom", "10rpx"], ["paddingLeft", 0]])]])], ["date-price", utsMapOf([[".container .list-item ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "10rpx"], ["paddingRight", 0], ["paddingBottom", "10rpx"], ["paddingLeft", 0]])]])], ["device-type", utsMapOf([[".container .list-item ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "10rpx"], ["paddingRight", 0], ["paddingBottom", "10rpx"], ["paddingLeft", 0]])]])], ["title-style", utsMapOf([[".container .list-item .title-state ", utsMapOf([["fontSize", "30rpx"], ["color", "#000000"], ["fontWeight", "bold"]])], [".container .list-item .date-price ", utsMapOf([["fontSize", "30rpx"], ["color", "#000000"], ["fontWeight", "bold"]])], [".container .list-item .device-type ", utsMapOf([["fontSize", "30rpx"], ["color", "#000000"], ["fontWeight", "bold"]])]])], ["state-style", utsMapOf([[".container .list-item .title-state ", utsMapOf([["fontSize", "24rpx"], ["color", "#FF5722"]])], [".container .list-item .date-price ", utsMapOf([["fontSize", "24rpx"], ["color", "#FF5722"]])], [".container .list-item .device-type ", utsMapOf([["fontSize", "24rpx"], ["color", "#FF5722"]])]])], ["price", utsMapOf([[".container .list-item .date-price ", utsMapOf([["fontSize", "38rpx"]])]])], ["btn", utsMapOf([[".container .list-item ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "flex-end"], ["paddingTop", "10rpx"], ["paddingRight", 0], ["paddingBottom", "10rpx"], ["paddingLeft", 0]])]])]])]
