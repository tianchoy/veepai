const __sfc__ = defineComponent({
  __name: 'mine',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	
	const userInfo = () => {
		uni.navigateTo({
			url: '/pages/mine/userInfo/userInfo'
		})
	}

	const rechargeDataTraffic = () => {
		uni.navigateTo({
			url: '/pages/mine/rechargeDataTraffic/rechargeDataTraffic'
		})
	}
	
	const myorders = () => {
		uni.navigateTo({
			url: '/pages/mine/myOrders/myOrders'
		})

	}
	
	const helpCenter = () => {
		uni.navigateTo({
			url: '/pages/mine/helpCenter/helpCenter'
		})
	}

	const msgCenter = () => {
		uni.switchTab({
			url: '/pages/message/message'
		})
	}

	const feedback = () => {
		uni.navigateTo({
			url: '/pages/mine/feeback/feeback'
		})
	}



return (): any | null => {

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "files" }), [
      createElementVNode("view", utsMapOf({ class: "file" }), [
        createElementVNode("image", utsMapOf({
          class: "fileIcon",
          src: "/static/mine/local.png",
          mode: "aspectFit"
        })),
        createElementVNode("text", utsMapOf({ class: "file-text" }), "本地文件")
      ]),
      createElementVNode("view", utsMapOf({ class: "file" }), [
        createElementVNode("image", utsMapOf({
          class: "fileIcon",
          src: "/static/mine/cloud.png",
          mode: "aspectFit"
        })),
        createElementVNode("text", utsMapOf({ class: "file-text" }), "永久备份")
      ]),
      createElementVNode("view", utsMapOf({
        class: "file",
        onClick: msgCenter
      }), [
        createElementVNode("image", utsMapOf({
          class: "fileIcon",
          src: "/static/mine/msgList.png",
          mode: "aspectFit"
        })),
        createElementVNode("text", utsMapOf({ class: "file-text" }), "消息列表")
      ])
    ]),
    createElementVNode("view", utsMapOf({ class: "tools-list" }), [
      createElementVNode("view", utsMapOf({
        class: "item",
        onClick: userInfo
      }), [
        createElementVNode("view", utsMapOf({ class: "info" }), [
          createElementVNode("image", utsMapOf({
            class: "item-icon",
            src: "/static/mine/user.png",
            mode: "aspectFit"
          })),
          createElementVNode("text", utsMapOf({ class: "item-text" }), "个人信息")
        ]),
        createElementVNode("view", null, [
          createElementVNode("image", utsMapOf({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      createElementVNode("view", utsMapOf({
        class: "item",
        onClick: rechargeDataTraffic
      }), [
        createElementVNode("view", utsMapOf({ class: "info" }), [
          createElementVNode("image", utsMapOf({
            class: "item-icon",
            src: "/static/mine/liuliang.png",
            mode: "aspectFit"
          })),
          createElementVNode("text", utsMapOf({ class: "item-text" }), "流量充值")
        ]),
        createElementVNode("view", null, [
          createElementVNode("image", utsMapOf({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      createElementVNode("view", utsMapOf({
        class: "item",
        onClick: myorders
      }), [
        createElementVNode("view", utsMapOf({ class: "info" }), [
          createElementVNode("image", utsMapOf({
            class: "item-icon",
            src: "/static/mine/order.png",
            mode: "aspectFit"
          })),
          createElementVNode("text", utsMapOf({ class: "item-text" }), "我的订单")
        ]),
        createElementVNode("view", null, [
          createElementVNode("image", utsMapOf({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      createElementVNode("view", utsMapOf({
        class: "item",
        onClick: helpCenter
      }), [
        createElementVNode("view", utsMapOf({ class: "info" }), [
          createElementVNode("image", utsMapOf({
            class: "item-icon",
            src: "/static/mine/quetion.png",
            mode: "aspectFit"
          })),
          createElementVNode("text", utsMapOf({ class: "item-text" }), "常见问题")
        ]),
        createElementVNode("view", null, [
          createElementVNode("image", utsMapOf({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("view", utsMapOf({ class: "info" }), [
          createElementVNode("image", utsMapOf({
            class: "item-icon",
            src: "/static/mine/online.png",
            mode: "aspectFit"
          })),
          createElementVNode("text", utsMapOf({ class: "item-text" }), "在线客服")
        ]),
        createElementVNode("view", null, [
          createElementVNode("image", utsMapOf({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      createElementVNode("view", utsMapOf({
        class: "item",
        onClick: feedback
      }), [
        createElementVNode("view", utsMapOf({ class: "info" }), [
          createElementVNode("image", utsMapOf({
            class: "item-icon",
            src: "/static/mine/advice.png",
            mode: "aspectFit"
          })),
          createElementVNode("text", utsMapOf({ class: "item-text" }), "意见反馈")
        ]),
        createElementVNode("view", null, [
          createElementVNode("image", utsMapOf({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      createElementVNode("view", utsMapOf({ class: "item" }), [
        createElementVNode("view", utsMapOf({ class: "info" }), [
          createElementVNode("image", utsMapOf({
            class: "item-icon",
            src: "/static/mine/setting.png",
            mode: "aspectFit"
          })),
          createElementVNode("text", utsMapOf({ class: "item-text" }), "设置")
        ]),
        createElementVNode("view", null, [
          createElementVNode("image", utsMapOf({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      createElementVNode("view", utsMapOf({ class: "item no-bottom" }), [
        createElementVNode("view", utsMapOf({ class: "info" }), [
          createElementVNode("image", utsMapOf({
            class: "item-icon",
            src: "/static/mine/about.png",
            mode: "aspectFit"
          })),
          createElementVNode("text", utsMapOf({ class: "item-text" }), "关于")
        ]),
        createElementVNode("view", null, [
          createElementVNode("image", utsMapOf({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMineMineStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["width", "100%"], ["height", "100%"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"], ["display", "flex"], ["flexDirection", "column"], ["backgroundColor", "#f1f1f1"]]))], ["files", utsMapOf([[".container ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["width", "100%"], ["height", "100rpx"], ["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "15rpx"], ["borderTopRightRadius", "15rpx"], ["borderBottomRightRadius", "15rpx"], ["borderBottomLeftRadius", "15rpx"], ["paddingTop", "70rpx"], ["paddingRight", "80rpx"], ["paddingBottom", "70rpx"], ["paddingLeft", "80rpx"], ["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0]])]])], ["file", utsMapOf([[".container .files ", utsMapOf([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"]])]])], ["fileIcon", utsMapOf([[".container .files .file ", utsMapOf([["width", "48rpx"], ["height", "48rpx"], ["marginBottom", "15rpx"]])]])], ["file-text", utsMapOf([[".container .files .file ", utsMapOf([["fontSize", "20rpx"], ["color", "#333333"], ["fontWeight", "bold"]])]])], ["tools-list", utsMapOf([[".container ", utsMapOf([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "15rpx"], ["borderTopRightRadius", "15rpx"], ["borderBottomRightRadius", "15rpx"], ["borderBottomLeftRadius", "15rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["item", utsMapOf([[".container .tools-list ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["height", "100rpx"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["info", utsMapOf([[".container .tools-list .item ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["marginLeft", "40rpx"]])]])], ["item-icon", utsMapOf([[".container .tools-list .item .info ", utsMapOf([["width", "48rpx"], ["height", "48rpx"]])]])], ["item-text", utsMapOf([[".container .tools-list .item .info ", utsMapOf([["fontSize", "25rpx"], ["color", "#333333"], ["marginLeft", "20rpx"]])]])], ["right-icon", utsMapOf([[".container .tools-list .item ", utsMapOf([["width", "35rpx"], ["height", "35rpx"]])]])], ["no-bottom", utsMapOf([[".container .tools-list ", utsMapOf([["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])]])]
