import _easycom_fui_tag from '@/uni_modules/firstui-unix/components/fui-tag/fui-tag.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import {ref} from 'vue'

	type msgType = { __$originalPosition?: UTSSourceMapPosition<"msgType", "pages/message/messageSystem/messageSystem.uvue", 26, 7>;
		id: number,
		desc: string,
		time: string,
		type:string,
		flag:string,
	}

	
const __sfc__ = defineComponent({
  __name: 'messageSystem',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const content = ref<msgType[]>([
		{
			id:1,
			desc:'您的XXX设备(ICCID:123456789)流量即将到期，请及时续费',
			time:'2024-10-24 15:58:32',
			type:'notice',
			flag:'unread',
		},
		{
			id:2,
			desc:'您的XXX设备(ICCID:123456789)流量已到期',
			time:'2024-10-24 15:58:32',
			type:'announcement',
			flag:'read',
		},
		{
			id:3,
			desc:'您的XXX设备(ICCID:123456789)流量已到期',
			time:'2024-10-24 15:58:32',
			type:'share',
			flag:'read',
		},
	])

	const read = (id:number) => {
		uni.showToast({
			title:'已标记为已读'+ id.toString(),
		})
	}

	const submit = () => {
		uni.showToast({
			title:'确认分享',
			icon:'none',
		})
	}

return (): any | null => {

const _component_fui_tag = resolveEasyComponent("fui-tag",_easycom_fui_tag)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "content" }), [
      createElementVNode(Fragment, null, RenderHelpers.renderList(content.value, (item, index, __index, _cached): any => {
        return createElementVNode("view", utsMapOf({
          class: "item",
          key: index
        }), [
          createElementVNode("image", utsMapOf({
            class: "unread",
            src: item.flag == 'unread' ? '/static/dot.png' : ''
          }), null, 8 /* PROPS */, ["src"]),
          createElementVNode("view", utsMapOf({ class: "item-content" }), [
            createElementVNode("text", utsMapOf({
              onClick: () => {read(item.id)}
            }), toDisplayString(item.desc), 9 /* TEXT, PROPS */, ["onClick"]),
            createElementVNode("view", utsMapOf({ class: "item-content-bottom" }), [
              createElementVNode("view", utsMapOf({ class: "tag-time" }), [
                item.type == 'notice'
                  ? createVNode(_component_fui_tag, utsMapOf({
                      key: 0,
                      text: "通知",
                      "margin-bottom": 24,
                      "margin-right": 24
                    }))
                  : item.type == 'announcement'
                    ? createVNode(_component_fui_tag, utsMapOf({
                        key: 1,
                        text: "公告",
                        type: "success",
                        "margin-bottom": 24,
                        "margin-right": 24
                      }))
                    : item.type == 'share'
                      ? createVNode(_component_fui_tag, utsMapOf({
                          key: 2,
                          text: "分享",
                          type: "warning",
                          "margin-bottom": 24,
                          "margin-right": 24
                        }))
                      : createCommentVNode("v-if", true),
                createElementVNode("text", null, toDisplayString(item.time), 1 /* TEXT */)
              ]),
              item.type == 'share'
                ? createVNode(_component_fui_button, utsMapOf({
                    key: 0,
                    width: "100rpx",
                    height: "40rpx",
                    size: 25,
                    text: "确认",
                    onOnclick: submit
                  }))
                : createCommentVNode("v-if", true)
            ])
          ])
        ])
      }), 128 /* KEYED_FRAGMENT */)
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMessageMessageSystemMessageSystemStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["height", "100%"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["backgroundColor", "#f5f5f5"]]))], ["content", utsMapOf([[".container ", utsMapOf([["backgroundColor", "#ffffff"], ["paddingTop", "30rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "30rpx"], ["paddingLeft", "30rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["item", utsMapOf([[".container .content ", utsMapOf([["display", "flex"], ["flexDirection", "row"]])]])], ["unread", utsMapOf([[".container .content .item ", utsMapOf([["width", "20rpx"], ["height", "20rpx"], ["marginRight", "10rpx"]])]])], ["item-content", utsMapOf([[".container .content .item ", utsMapOf([["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"], ["paddingBottom", "20rpx"], ["marginBottom", "20rpx"], ["flex", 1]])]])], ["item-content-bottom", utsMapOf([[".container .content .item .item-content ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "flex-end"], ["justifyContent", "space-between"], ["marginTop", "10rpx"]])]])], ["tag-time", utsMapOf([[".container .content .item .item-content ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "flex-end"], ["justifyContent", "space-between"], ["marginTop", "10rpx"]])]])], ["fui-tag__wrap", utsMapOf([[".container .content .item .item-content .tag-time ", utsMapOf([["!width", "70rpx"], ["!height", "40rpx"], ["!paddingTop", "5rpx"], ["!paddingRight", "10rpx"], ["!paddingBottom", "5rpx"], ["!paddingLeft", "10rpx"], ["!marginBottom", 0]])]])], ["fui-tag__text", utsMapOf([[".container .content .item .item-content .tag-time .fui-tag__wrap ", utsMapOf([["!fontSize", "22rpx"]])]])]])]
