const __sfc__ = defineComponent({
  __name: 'mine',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	
	const localFiles = () => {
		uni.navigateTo({
			url: '/pages/mine/localFiles/localFiles'
		})
	}

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

	const systemSetting = () => {
		uni.navigateTo({
			url: '/pages/mine/systemSetting/systemSetting'
		})
	}

	const aboutPage = () => {
		uni.navigateTo({
			url: '/pages/mine/about/about'
		})
	}



return (): any | null => {

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "files" }), [
      _cE("view", _uM({
        class: "file",
        onClick: localFiles
      }), [
        _cE("image", _uM({
          class: "fileIcon",
          src: "/static/mine/local.png",
          mode: "aspectFit"
        })),
        _cE("text", _uM({ class: "file-text" }), "本地文件")
      ]),
      _cE("view", _uM({ class: "file" }), [
        _cE("image", _uM({
          class: "fileIcon",
          src: "/static/mine/cloud.png",
          mode: "aspectFit"
        })),
        _cE("text", _uM({ class: "file-text" }), "永久备份")
      ]),
      _cE("view", _uM({
        class: "file",
        onClick: msgCenter
      }), [
        _cE("image", _uM({
          class: "fileIcon",
          src: "/static/mine/msgList.png",
          mode: "aspectFit"
        })),
        _cE("text", _uM({ class: "file-text" }), "消息列表")
      ])
    ]),
    _cE("view", _uM({ class: "tools-list" }), [
      _cE("view", _uM({
        class: "item",
        onClick: userInfo
      }), [
        _cE("view", _uM({ class: "info" }), [
          _cE("image", _uM({
            class: "item-icon",
            src: "/static/mine/user.png",
            mode: "aspectFit"
          })),
          _cE("text", _uM({ class: "item-text" }), "个人信息")
        ]),
        _cE("view", null, [
          _cE("image", _uM({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      _cE("view", _uM({
        class: "item",
        onClick: rechargeDataTraffic
      }), [
        _cE("view", _uM({ class: "info" }), [
          _cE("image", _uM({
            class: "item-icon",
            src: "/static/mine/liuliang.png",
            mode: "aspectFit"
          })),
          _cE("text", _uM({ class: "item-text" }), "流量充值")
        ]),
        _cE("view", null, [
          _cE("image", _uM({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      _cE("view", _uM({
        class: "item",
        onClick: myorders
      }), [
        _cE("view", _uM({ class: "info" }), [
          _cE("image", _uM({
            class: "item-icon",
            src: "/static/mine/order.png",
            mode: "aspectFit"
          })),
          _cE("text", _uM({ class: "item-text" }), "我的订单")
        ]),
        _cE("view", null, [
          _cE("image", _uM({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      _cE("view", _uM({
        class: "item",
        onClick: helpCenter
      }), [
        _cE("view", _uM({ class: "info" }), [
          _cE("image", _uM({
            class: "item-icon",
            src: "/static/mine/quetion.png",
            mode: "aspectFit"
          })),
          _cE("text", _uM({ class: "item-text" }), "常见问题")
        ]),
        _cE("view", null, [
          _cE("image", _uM({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("view", _uM({ class: "info" }), [
          _cE("image", _uM({
            class: "item-icon",
            src: "/static/mine/online.png",
            mode: "aspectFit"
          })),
          _cE("text", _uM({ class: "item-text" }), "在线客服")
        ]),
        _cE("view", null, [
          _cE("image", _uM({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      _cE("view", _uM({
        class: "item",
        onClick: feedback
      }), [
        _cE("view", _uM({ class: "info" }), [
          _cE("image", _uM({
            class: "item-icon",
            src: "/static/mine/advice.png",
            mode: "aspectFit"
          })),
          _cE("text", _uM({ class: "item-text" }), "意见反馈")
        ]),
        _cE("view", null, [
          _cE("image", _uM({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      _cE("view", _uM({
        class: "item",
        onClick: systemSetting
      }), [
        _cE("view", _uM({ class: "info" }), [
          _cE("image", _uM({
            class: "item-icon",
            src: "/static/mine/setting.png",
            mode: "aspectFit"
          })),
          _cE("text", _uM({ class: "item-text" }), "设置")
        ]),
        _cE("view", null, [
          _cE("image", _uM({
            class: "right-icon",
            src: "/static/mine/right.png",
            mode: "aspectFit"
          }))
        ])
      ]),
      _cE("view", _uM({
        class: "item no-bottom",
        onClick: aboutPage
      }), [
        _cE("view", _uM({ class: "info" }), [
          _cE("image", _uM({
            class: "item-icon",
            src: "/static/mine/about.png",
            mode: "aspectFit"
          })),
          _cE("text", _uM({ class: "item-text" }), "关于")
        ]),
        _cE("view", null, [
          _cE("image", _uM({
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
const GenPagesMineMineStyles = [_uM([["container", _pS(_uM([["width", "100%"], ["height", "100%"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"], ["display", "flex"], ["flexDirection", "column"], ["backgroundColor", "#f1f1f1"]]))], ["files", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["width", "100%"], ["height", "100rpx"], ["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "15rpx"], ["borderTopRightRadius", "15rpx"], ["borderBottomRightRadius", "15rpx"], ["borderBottomLeftRadius", "15rpx"], ["paddingTop", "70rpx"], ["paddingRight", "80rpx"], ["paddingBottom", "70rpx"], ["paddingLeft", "80rpx"], ["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0]])]])], ["file", _uM([[".container .files ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"]])]])], ["fileIcon", _uM([[".container .files .file ", _uM([["width", "48rpx"], ["height", "48rpx"], ["marginBottom", "15rpx"]])]])], ["file-text", _uM([[".container .files .file ", _uM([["fontSize", "20rpx"], ["color", "#333333"], ["fontWeight", "bold"]])]])], ["tools-list", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "15rpx"], ["borderTopRightRadius", "15rpx"], ["borderBottomRightRadius", "15rpx"], ["borderBottomLeftRadius", "15rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["item", _uM([[".container .tools-list ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["height", "100rpx"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f1f1f1"]])]])], ["info", _uM([[".container .tools-list .item ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["marginLeft", "40rpx"]])]])], ["item-icon", _uM([[".container .tools-list .item .info ", _uM([["width", "48rpx"], ["height", "48rpx"]])]])], ["item-text", _uM([[".container .tools-list .item .info ", _uM([["fontSize", "25rpx"], ["color", "#333333"], ["marginLeft", "20rpx"]])]])], ["right-icon", _uM([[".container .tools-list .item ", _uM([["width", "35rpx"], ["height", "35rpx"]])]])], ["no-bottom", _uM([[".container .tools-list ", _uM([["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])]])]
