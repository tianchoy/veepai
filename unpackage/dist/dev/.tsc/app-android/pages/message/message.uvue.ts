import _easycom_l_date_strip from '@/uni_modules/lime-date-strip/components/l-date-strip/l-date-strip.uvue'
import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import _easycom_l_daily_punch from '@/uni_modules/lime-daily-punch/components/l-daily-punch/l-daily-punch.uvue'
import _easycom_fui_bottom_popup from '@/uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.uvue'
import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_fui_radio from '@/uni_modules/firstui-unix/components/fui-radio/fui-radio.uvue'
import _easycom_fui_list_cell from '@/uni_modules/firstui-unix/components/fui-list-cell/fui-list-cell.uvue'
import _easycom_fui_label from '@/uni_modules/firstui-unix/components/fui-label/fui-label.uvue'
import _easycom_fui_radio_group from '@/uni_modules/firstui-unix/components/fui-radio-group/fui-radio-group.uvue'
import _imports_0 from '@/static/notice.png'
import _imports_1 from '@/static/vedio.png'
import _imports_2 from '@/static/people.png'
import _imports_3 from '@/static/mobile.png'
import { ref,onMounted } from 'vue'
	import { dayuts } from '@/uni_modules/lime-dayuts';
	import { LDay, LYearMonth } from '@/uni_modules/lime-daily-punch'
	import { DateStriPDay } from '@/uni_modules/lime-date-strip';

	type RadioItem = { __$originalPosition?: UTSSourceMapPosition<"RadioItem", "pages/message/message.uvue", 103, 7>;
		deviceTitle : string;
		iccid : string;
		cardid : string;
		cardState : string;
		currentPackage : string;
		useDate : string;
		percent : number;
		total : string;
		checked ?: boolean;
	}

	
const __sfc__ = defineComponent({
  __name: 'message',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const checkIns = ref(['2025-07-07', '2025-07-08', '2025-07-09'])
	const today = ref(dayuts().format('MM-DD'))
	const showCalendar = ref<boolean>(false)
	const isShowMoreDevice = ref<boolean>(false)
	const currentDay = ref<number>(new Date().getTime())

	const activeTab = ref(0)
	const minDate : number = new Date(2022, 0, 10).getTime()
	const maxDate : number = new Date(2025, 7, 12).getTime()

	const customFormat = (day : DateStriPDay) : DateStriPDay => {
		const { date } = day;
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const curDate = date.getDate();
		console.log(day.key, " at pages/message/message.uvue:130")

		day.prefix = '' //不显示星期

		const specialDates = new Set<number>([7, 8, 10]);
		if (specialDates.has(curDate)) {
			day.suffix = 'true';
		}

		return day;
	};


	const onChange = (time : number) => {
		console.log(time, " at pages/message/message.uvue:144")
	}


	//选择日期
	const select = (day : LDay) => {
		today.value = dayuts(day.fullDate).format('YYYY-MM-DD')
		console.log(today.value, " at pages/message/message.uvue:151")
		currentDay.value = new Date(today.value).getTime()
		showCalendar.value = false
	}
	const change = (res : LYearMonth) => {
		console.log('res', res, " at pages/message/message.uvue:156")
	}

	const ShowCalendar = () => {
		showCalendar.value = !showCalendar.value
	}

	const hideCalendar = () => {
		showCalendar.value = false
	}

	const showMoreDevice = () => {
		isShowMoreDevice.value = true
	}
	const closePopup = () => {
		isShowMoreDevice.value = false
	}

	const currentDeviceInfo = ref<RadioItem>({
		deviceTitle: '',
		iccid: '',
		cardid: '',
		cardState: '',
		currentPackage: '',
		useDate: '',
		percent: 0,
		total: '',
		checked: true,
	})

	const radioItems = ref<RadioItem[]>([{
		deviceTitle: '设备信息',
		iccid: '1123456667777887',
		cardid: '13000001111',
		cardState: '在用',
		currentPackage: '店长推荐【终身流量】',
		useDate: '2025-07-07',
		percent: 50,
		total: '100',
	},
	{
		deviceTitle: '设备信息1',
		iccid: '1123456667777888',
		cardid: '13000001111',
		cardState: '停机',
		currentPackage: '店长推荐【100G流量】',
		useDate: '2025-07-08',
		percent: 70,
		total: '200',
	},
	{
		deviceTitle: '设备信息2',
		cardid: '13000001111',
		iccid: '310203030443',
		cardState: '注销',
		currentPackage: '加油包',
		useDate: '2025-07-09',
		percent: 100,
		total: '300',
	}])



	const getValue = (e : string) => {
		const selectedItem = radioItems.value.find(item => item.iccid == e)
		if (selectedItem != null) {
			console.log(selectedItem, " at pages/message/message.uvue:222")
			selectedItem.checked = true
			currentDeviceInfo.value = selectedItem
		}
	}

	const currentInfo = () => {
		radioItems.value.forEach(item => {
			item.checked = false
		})
		radioItems.value[0].checked = true
		currentDeviceInfo.value = radioItems.value[0]
	}

	onMounted(() => {
		currentInfo()
	})


return (): any | null => {

const _component_l_date_strip = resolveEasyComponent("l-date-strip",_easycom_l_date_strip)
const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)
const _component_l_daily_punch = resolveEasyComponent("l-daily-punch",_easycom_l_daily_punch)
const _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup",_easycom_fui_bottom_popup)
const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_fui_radio = resolveEasyComponent("fui-radio",_easycom_fui_radio)
const _component_fui_list_cell = resolveEasyComponent("fui-list-cell",_easycom_fui_list_cell)
const _component_fui_label = resolveEasyComponent("fui-label",_easycom_fui_label)
const _component_fui_radio_group = resolveEasyComponent("fui-radio-group",_easycom_fui_radio_group)

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "data-strip" }), [
      createElementVNode("view", utsMapOf({ class: "rili" }), [
        createVNode(_component_l_date_strip, utsMapOf({
          format: customFormat,
          switchMode: "week",
          value: currentDay.value,
          minDate: unref(minDate),
          height: "95rpx",
          shape: "square",
          onChange: onChange
        }), null, 8 /* PROPS */, ["value", "minDate"])
      ]),
      createElementVNode("image", utsMapOf({
        class: "down",
        onClick: ShowCalendar,
        src: "/static/down.png"
      }))
    ]),
    createElementVNode("view", utsMapOf({ class: "content-box" }), [
      createElementVNode("view", utsMapOf({ class: "sub-nav" }), [
        createElementVNode("view", utsMapOf({
          class: "today",
          onClick: showMoreDevice
        }), [
          createElementVNode("text", null, "设备编号"),
          createElementVNode("image", utsMapOf({
            class: "down",
            src: "/static/down.png"
          }))
        ]),
        createElementVNode("view", utsMapOf({ class: "select" }), [
          createElementVNode("image", utsMapOf({
            class: "notice",
            src: _imports_0
          }))
        ])
      ]),
      createElementVNode("view", utsMapOf({ class: "tab-content" }), [
        createElementVNode("view", utsMapOf({ class: "item-content" }), [
          createElementVNode("view", utsMapOf({ class: "title-box" }), [
            createElementVNode("text", utsMapOf({ class: "title" }), "设备名称"),
            createElementVNode("view", utsMapOf({ class: "more" }), [
              createElementVNode("text", null, "更多"),
              createVNode(_component_l_icon, utsMapOf({
                name: "chevron-right",
                size: "20"
              }))
            ])
          ]),
          createElementVNode("view", utsMapOf({ class: "item-detail" }), [
            createElementVNode("view", utsMapOf({ class: "item-left" }), [
              createElementVNode("image", utsMapOf({
                class: "device-img",
                src: _imports_1
              })),
              createElementVNode("view", utsMapOf({ class: "item-info" }), [
                createElementVNode("text", null, "人形侦测"),
                createElementVNode("text", null, "15:29")
              ])
            ]),
            createElementVNode("image", utsMapOf({
              class: "item-icon",
              mode: "aspectFit",
              src: _imports_2
            }))
          ])
        ]),
        createElementVNode("view", utsMapOf({ class: "item-content" }), [
          createElementVNode("view", utsMapOf({ class: "title-box" }), [
            createElementVNode("text", utsMapOf({ class: "title" }), "设备名称1"),
            createElementVNode("view", utsMapOf({ class: "more" }), [
              createElementVNode("text", null, "更多"),
              createVNode(_component_l_icon, utsMapOf({
                name: "chevron-right",
                size: "20"
              }))
            ])
          ]),
          createElementVNode("view", utsMapOf({ class: "item-detail" }), [
            createElementVNode("view", utsMapOf({ class: "item-left" }), [
              createElementVNode("image", utsMapOf({
                class: "device-img",
                src: _imports_1
              })),
              createElementVNode("view", utsMapOf({ class: "item-info" }), [
                createElementVNode("text", null, "移动侦测"),
                createElementVNode("text", null, "15:29")
              ])
            ]),
            createElementVNode("image", utsMapOf({
              class: "item-icon",
              mode: "aspectFit",
              src: _imports_3
            }))
          ])
        ])
      ])
    ]),
    createVNode(_component_fui_bottom_popup, utsMapOf({
      visible: showCalendar.value,
      onClose: hideCalendar
    }), utsMapOf({
      default: withSlotCtx((): any[] => [
        createElementVNode("view", utsMapOf({ class: "calendar-box" }), [
          createVNode(_component_l_daily_punch, utsMapOf({
            signedDates: checkIns.value,
            onSelect: select,
            onPanelChange: change,
            dayHeight: 60
          }), null, 8 /* PROPS */, ["signedDates"]),
          createElementVNode("button", utsMapOf({
            class: "btn-chanel-box",
            onClick: hideCalendar
          }), " 取消 ")
        ])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["visible"]),
    createVNode(_component_fui_bottom_popup, utsMapOf({
      visible: isShowMoreDevice.value,
      onClose: closePopup
    }), utsMapOf({
      default: withSlotCtx((): any[] => [
        createElementVNode("view", utsMapOf({ class: "fui-scroll__wrap" }), [
          createElementVNode("view", utsMapOf({ class: "popup-title" }), [
            createElementVNode("text", null, "设备列表"),
            createElementVNode("view", utsMapOf({ onClick: closePopup }), [
              createVNode(_component_fui_icon, utsMapOf({
                name: "close",
                size: 40
              }))
            ])
          ]),
          createVNode(_component_fui_radio_group, utsMapOf({ onChange: getValue }), utsMapOf({
            default: withSlotCtx((): any[] => [
              createElementVNode(Fragment, null, RenderHelpers.renderList(radioItems.value, (item, index, __index, _cached): any => {
                return createVNode(_component_fui_label, utsMapOf({ key: index }), utsMapOf({
                  default: withSlotCtx((): any[] => [
                    createVNode(_component_fui_list_cell, null, utsMapOf({
                      default: withSlotCtx((): any[] => [
                        createElementVNode("view", utsMapOf({ class: "fui-list__cell" }), [
                          createElementVNode("text", null, toDisplayString(item.deviceTitle), 1 /* TEXT */),
                          createVNode(_component_fui_radio, utsMapOf({
                            checked: item.checked,
                            value: item.iccid
                          }), null, 8 /* PROPS */, ["checked", "value"])
                        ])
                      ]),
                      _: 2 /* DYNAMIC */
                    }), 1024 /* DYNAMIC_SLOTS */)
                  ]),
                  _: 2 /* DYNAMIC */
                }), 1024 /* DYNAMIC_SLOTS */)
              }), 128 /* KEYED_FRAGMENT */)
            ]),
            _: 1 /* STABLE */
          }))
        ])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["visible"])
  ])
}
}

})
export default __sfc__
const GenPagesMessageMessageStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["width", "100%"], ["height", "100%"], ["position", "relative"], ["backgroundColor", "#f3f3f3"]]))], ["data-strip", utsMapOf([[".container ", utsMapOf([["width", "100%"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["backgroundColor", "#ffffff"], ["paddingRight", "20rpx"]])]])], ["rili", utsMapOf([[".container .data-strip ", utsMapOf([["flex", 3], ["height", "95rpx"]])]])], ["down", utsMapOf([[".container .data-strip ", utsMapOf([["width", "32rpx"], ["height", "32rpx"]])], [".container .content-box .sub-nav .today ", utsMapOf([["width", "25rpx"], ["height", "25rpx"]])]])], ["content-box", utsMapOf([[".container ", utsMapOf([["paddingTop", "30rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "30rpx"], ["paddingLeft", "20rpx"]])]])], ["sub-nav", utsMapOf([[".container .content-box ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["today", utsMapOf([[".container .content-box .sub-nav ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["width", "140rpx"]])]])], ["notice", utsMapOf([[".container .content-box .sub-nav .select ", utsMapOf([["width", "48rpx"], ["height", "48rpx"]])]])], ["tab-content", utsMapOf([[".container .content-box ", utsMapOf([["width", "100%"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"]])]])], ["item-content", utsMapOf([[".container .content-box .tab-content ", utsMapOf([["width", "100%"], ["backgroundColor", "#ffffff"], ["paddingTop", "30rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "30rpx"], ["paddingLeft", "30rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["marginTop", "30rpx"]])]])], ["title-box", utsMapOf([[".container .content-box .tab-content .item-content ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["marginBottom", "30rpx"]])]])], ["title", utsMapOf([[".container .content-box .tab-content .item-content .title-box ", utsMapOf([["fontSize", "30rpx"], ["color", "#333333"], ["fontWeight", "bold"]])]])], ["more", utsMapOf([[".container .content-box .tab-content .item-content .title-box ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["item-detail", utsMapOf([[".container .content-box .tab-content .item-content ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["item-left", utsMapOf([[".container .content-box .tab-content .item-content .item-detail ", utsMapOf([["display", "flex"], ["flexDirection", "row"]])]])], ["device-img", utsMapOf([[".container .content-box .tab-content .item-content .item-detail .item-left ", utsMapOf([["width", "200rpx"], ["height", "100rpx"], ["marginRight", "20rpx"]])]])], ["item-info", utsMapOf([[".container .content-box .tab-content .item-content .item-detail .item-left ", utsMapOf([["display", "flex"], ["flexDirection", "column"], ["alignItems", "flex-start"], ["justifyContent", "space-between"]])]])], ["item-icon", utsMapOf([[".container .content-box .tab-content .item-content .item-detail ", utsMapOf([["width", "50rpx"], ["height", "50rpx"]])]])], ["calendar-box", utsMapOf([[".container ", utsMapOf([["width", "100%"], ["backgroundColor", "#ffffff"]])]])], ["btn-chanel-box", utsMapOf([[".container .calendar-box ", utsMapOf([["position", "absolute"], ["width", "85%"], ["bottom", "45rpx"], ["left", "60rpx"], ["borderTopLeftRadius", "50rpx"], ["borderTopRightRadius", "50rpx"], ["borderBottomRightRadius", "50rpx"], ["borderBottomLeftRadius", "50rpx"]])]])], ["popup-title", utsMapOf([[".container ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["paddingTop", 0], ["paddingRight", "40rpx"], ["paddingBottom", 0], ["paddingLeft", "40rpx"]])]])], ["fui-scroll__wrap", utsMapOf([[".container ", utsMapOf([["width", "100%"], ["paddingTop", "30rpx"], ["paddingRight", 0], ["paddingBottom", "30rpx"], ["paddingLeft", 0], ["position", "relative"]])]])], ["fui-sub__title", utsMapOf([[".container ", utsMapOf([["textAlign", "center"], ["fontSize", "24rpx"], ["color", "#7F7F7F"], ["transform", "scale(0.9)"]])]])], ["fui-scroll__view", utsMapOf([[".container ", utsMapOf([["width", "100%"], ["height", "50%"]])]])], ["fui-list__cell", utsMapOf([[".container ", utsMapOf([["flex", 1], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])]])]
