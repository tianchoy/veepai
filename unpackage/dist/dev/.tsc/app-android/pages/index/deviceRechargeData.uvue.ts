import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_l_progress from '@/uni_modules/lime-progress/components/l-progress/l-progress.uvue'
import _easycom_fui_empty from '@/uni_modules/firstui-unix/components/fui-empty/fui-empty.uvue'
import _easycom_l_tab_panel from '@/uni_modules/lime-tabs/components/l-tab-panel/l-tab-panel.uvue'
import _easycom_l_tabs from '@/uni_modules/lime-tabs/components/l-tabs/l-tabs.uvue'
import _easycom_l_button from '@/uni_modules/lime-button/components/l-button/l-button.uvue'
import { ref } from 'vue'
	import TopNavBar from '@/components/TopNavBar.uvue'
	type tabItem = { __$originalPosition?: UTSSourceMapPosition<"tabItem", "pages/index/deviceRechargeData.uvue", 78, 7>;
	id : string;
	title : string;
	content : Array<ContentType>
	}

	type ContentType = { __$originalPosition?: UTSSourceMapPosition<"ContentType", "pages/index/deviceRechargeData.uvue", 84, 7>;
		id : string;
		title : string;
		date : string;
		price : string;
		category: string;
	}

	
const __sfc__ = defineComponent({
  __name: 'deviceRechargeData',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const tabVal = ref<number>(0)
	const percent = ref<number | string>(60)
	const selectedPackage = ref<ContentType | null>(null)
	
	const tabsVal = ref<tabItem[]>([
		{
			id:'0',
			title:'订购套餐',
			content:[] as ContentType[]
		},
		{
			id:'1',
			title:'订购加油包',
			content:[] as ContentType[]
		}
	])

	const content  = ref<ContentType[]>([
		{
			id:'1111',
			title:'五年畅想套餐',
			date:'',
			price:'100',
			category:'0',
		},
		{
			id:'1113',
			title:'五年畅想套餐',
			date:'',
			price:'102',
			category:'0',
		},
		{
			id:'1112',
			title:'五年畅想套餐111',
			date:'2025-07-09',
			price:'230',
			category:'1',
		},
		{
			id:'1114',
			title:'五年畅想套餐111',
			date:'2025-07-09',
			price:'205',
			category:'1',
		},
		{
			id:'1115',
			title:'五年畅想套餐111',
			date:'2025-07-09',
			price:'150',
			category:'0',
		}
	])

	const goBack = () => {
		uni.navigateBack({
			delta: 1,
		})
	}

	const rightIcon = () => {
		uni.navigateTo({
			url: '/pages/index/deviceRechargeOrder',
		})
	}

	const copyiccid = () => {
		uni.setClipboardData({
			data: '8986112223504991234',
			success: () => {
				uni.showToast({
					title: '复制成功',
				})
			}
		})
	}

	const getFilteredEvents = (): ContentType[] => {
		const selectedType = tabsVal.value[tabVal.value].id;
		return content.value.filter(event => event.category == selectedType);
	}

	const changeTab = (val: number) => {
		tabVal.value = val
	}

	const selectPackge = (item:ContentType) => {
		selectedPackage.value = item
	}

return (): any | null => {

const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)
const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_l_progress = resolveEasyComponent("l-progress",_easycom_l_progress)
const _component_fui_empty = resolveEasyComponent("fui-empty",_easycom_fui_empty)
const _component_l_tab_panel = resolveEasyComponent("l-tab-panel",_easycom_l_tab_panel)
const _component_l_tabs = resolveEasyComponent("l-tabs",_easycom_l_tabs)
const _component_l_button = resolveEasyComponent("l-button",_easycom_l_button)

  return _cE("view", _uM({ class: "container" }), [
    _cV(unref(TopNavBar), _uM({
      title: "流量充值",
      onBack: goBack,
      onRightEvent: rightIcon,
      showBack: true,
      rightText: "order"
    })),
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "ICCID"),
        _cE("view", _uM({ class: "right-item" }), [
          _cE("text", null, "8986112223504991234"),
          _cV(_component_l_icon, _uM({
            style: _nS(_uM({"margin-left":"10rpx"})),
            name: "file-copy",
            size: "20",
            onClick: copyiccid
          }), null, 8 /* PROPS */, ["style"])
        ])
      ]),
      _cE("view", _uM({ class: "list underline" }), [
        _cE("text", null, "卡号"),
        _cE("view", _uM({ class: "right-item" }), [
          _cE("text", null, "8986112223504991234"),
          _cE("text", _uM({
            style: _nS(_uM({"color":"#FF4D4F"}))
          }), "[停用]", 4 /* STYLE */)
        ])
      ]),
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "当前套餐"),
        _cE("view", _uM({ class: "right-item" }), [
          _cE("text", null, "店长推荐"),
          _cE("text", null, "[终身流量]")
        ])
      ]),
      _cE("view", _uM({ class: "list underline" }), [
        _cE("text", null, "生效日期"),
        _cE("text", null, "套餐将于 2025-5-13 到期")
      ]),
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "流量 - 异常"),
        _cV(_component_fui_icon, _uM({
          name: "right",
          size: "50"
        }))
      ]),
      _cE("view", _uM({ class: "progress" }), [
        _cV(_component_l_progress, _uM({
          percent: percent.value,
          "info-align": "end",
          "show-info": true
        }), null, 8 /* PROPS */, ["percent"])
      ]),
      _cE("view", _uM({ class: "list" }), [
        _cE("text", null, "已用 60G (60%)"),
        _cE("text", null, "可用 20G/共100G")
      ])
    ]),
    _cE("view", _uM({ class: "package-box" }), [
      _cV(_component_l_tabs, _uM({
        value: tabVal.value,
        onClick: changeTab,
        spaceEvenly: false,
        bgColor: "transparent",
        color: "#000",
        activeColor: "#FF5722"
      }), _uM({
        default: withSlotCtx((): any[] => [
          _cE(Fragment, null, RenderHelpers.renderList(tabsVal.value, (item, index, __index, _cached): any => {
            return _cV(_component_l_tab_panel, _uM({
              key: index,
              value: index,
              label: item.title
            }), _uM({
              default: withSlotCtx((): any[] => [
                _cE("view", _uM({ class: "product-container" }), [
                  _cE(Fragment, null, RenderHelpers.renderList(getFilteredEvents(), (it, index, __index, _cached): any => {
                    return _cE("view", _uM({
                      class: _nC(["list-item", _uM({'selected-item': selectedPackage.value?.id === it.id})]),
                      key: index,
                      onClick: () => {selectPackge(it)}
                    }), [
                      _cE("text", _uM({ class: "product-name" }), _tD(it.title), 1 /* TEXT */),
                      _cE("text", _uM({ class: "product-date" }), _tD(it.date), 1 /* TEXT */),
                      _cE("text", _uM({ class: "product-price" }), "¥" + _tD(it.price), 1 /* TEXT */)
                    ], 10 /* CLASS, PROPS */, ["onClick"])
                  }), 128 /* KEYED_FRAGMENT */)
                ]),
                getFilteredEvents().length == 0
                  ? _cE("view", _uM({ key: 0 }), [
                      _cV(_component_fui_empty, _uM({
                        color: "#999",
                        size: 25,
                        title: "暂无套餐"
                      }))
                    ])
                  : _cC("v-if", true)
              ]),
              _: 2 /* DYNAMIC */
            }), 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "label"])
          }), 128 /* KEYED_FRAGMENT */)
        ]),
        _: 1 /* STABLE */
      }), 8 /* PROPS */, ["value"])
    ]),
    isTrue(selectedPackage.value)
      ? _cE("view", _uM({
          key: 0,
          class: "btn-box"
        }), [
          _cE("view", _uM({ class: "price" }), [
            _cE("text", _uM({ class: "price-title" }), "金额"),
            _cE("text", _uM({ class: "price-text" }), "¥" + _tD(selectedPackage.value?.price), 1 /* TEXT */)
          ]),
          _cE("view", _uM({ class: "btn" }), [
            _cV(_component_l_button, _uM({ type: "primary" }), _uM({
              default: withSlotCtx((): any[] => ["流量充值"]),
              _: 1 /* STABLE */
            }))
          ])
        ])
      : _cC("v-if", true)
  ])
}
}

})
export default __sfc__
const GenPagesIndexDeviceRechargeDataStyles = [_uM([["container", _pS(_uM([["position", "relative"], ["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["content", _uM([[".container ", _uM([["backgroundColor", "#ffffff"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["list", _uM([[".container .content ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "40rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "40rpx"], ["paddingLeft", "20rpx"]])]])], ["right-item", _uM([[".container .content .list ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", 0], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", 0], ["borderBottomWidth", "medium"], ["borderBottomStyle", "none"], ["borderBottomColor", "#000000"]])]])], ["progress", _uM([[".container .content ", _uM([["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"]])]])], ["underline", _uM([[".container .content ", _uM([["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f9f9f9"]])]])], ["package-box", _uM([[".container ", _uM([["marginTop", "50rpx"]])]])], ["product-container", _uM([[".container .package-box ", _uM([["display", "flex"], ["flexWrap", "wrap"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["list-item", _uM([[".container .package-box .product-container ", _uM([["width", "48%"], ["marginBottom", "30rpx"], ["paddingTop", "40rpx"], ["paddingRight", "40rpx"], ["paddingBottom", "40rpx"], ["paddingLeft", "40rpx"], ["boxSizing", "border-box"], ["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "10rpx"], ["borderTopRightRadius", "10rpx"], ["borderBottomRightRadius", "10rpx"], ["borderBottomLeftRadius", "10rpx"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#ffffff"], ["borderRightColor", "#ffffff"], ["borderBottomColor", "#ffffff"], ["borderLeftColor", "#ffffff"]])], [".container .package-box .product-container .selected-item", _uM([["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#FF5722"], ["borderRightColor", "#FF5722"], ["borderBottomColor", "#FF5722"], ["borderLeftColor", "#FF5722"]])]])], ["product-name", _uM([[".container .package-box .product-container .list-item ", _uM([["fontSize", "30rpx"]])]])], ["product-date", _uM([[".container .package-box .product-container .list-item ", _uM([["fontSize", "20rpx"], ["color", "#999999"], ["height", "50rpx"], ["lineHeight", "50rpx"]])]])], ["product-price", _uM([[".container .package-box .product-container .list-item ", _uM([["fontSize", "30rpx"], ["color", "#FF5722"], ["fontWeight", "bold"]])]])], ["l-tabs", _uM([[".container ", _uM([["!backgroundColor", "rgba(0,0,0,0)"]])]])], ["btn-box", _uM([[".container ", _uM([["position", "fixed"], ["width", "100%"], ["left", 0], ["bottom", 0], ["height", "100rpx"], ["display", "flex"], ["flexDirection", "row"]])]])], ["price", _uM([[".container .btn-box ", _uM([["flex", 1], ["height", "100%"], ["display", "flex"], ["flexDirection", "row"], ["justifyContent", "center"], ["alignItems", "center"], ["backgroundColor", "#ffffff"], ["gap", "10rpx"]])]])], ["price-title", _uM([[".container .btn-box .price ", _uM([["fontSize", "20rpx"]])]])], ["price-text", _uM([[".container .btn-box .price ", _uM([["fontSize", "40rpx"], ["color", "#FF5722"], ["fontWeight", "bold"], ["marginLeft", "15rpx"]])]])], ["btn", _uM([[".container .btn-box ", _uM([["flex", 1], ["height", "100%"]])]])], ["l-button", _uM([[".container .btn-box .btn ", _uM([["height", "100%"]])]])]])]
