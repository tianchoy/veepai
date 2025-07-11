import _easycom_fui_switch from '@/uni_modules/firstui-unix/components/fui-switch/fui-switch.uvue'
import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'
import _easycom_fui_input from '@/uni_modules/firstui-unix/components/fui-input/fui-input.uvue'
import _easycom_l_picker from '@/uni_modules/lime-picker/components/l-picker/l-picker.uvue'
import _easycom_fui_bottom_popup from '@/uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.uvue'
import { ref } from 'vue'
	import { PickerColumn ,PickerConfirmEvent} from '@/uni_modules/lime-picker';
	type AuthType = { __$originalPosition?: UTSSourceMapPosition<"AuthType", "pages/mine/systemSetting/systemSetting.uvue", 49, 7>;
		code:string
		state: string
	}

	type PermissionItem = { __$originalPosition?: UTSSourceMapPosition<"PermissionItem", "pages/mine/systemSetting/systemSetting.uvue", 70, 7>;
		name: string
		code: string
		status: string
	}

	// 权限列表数据
	
const __sfc__ = defineComponent({
  __name: 'systemSetting',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const checked = ref<boolean>(true)
	const showPicker = ref<boolean>(false)
	const pickerOptions = ref<PickerColumn[]>([])
	const playTypeItem = ref<string>('WIFI下自动播放')
	const systemNotifyState = ref<string>('')

	//授权类型
	const AuthState = ref<AuthType[]>([
		{
			code:'authorized',
			state: '已授权',
		},
		{
			code:'not determined',
			state: '未授权',
		},
		{
			code:'denied',
			state: '未授权',
		},
	])

	// 权限项类型
	const permissionList = ref<PermissionItem[]>([
		{ name: '位置信息', code: 'locationAuthorized', status: 'notDetermined' },
		{ name: '相册', code: 'albumAuthorized', status: 'notDetermined' },
		{ name: '麦克风', code: 'microphoneAuthorized', status: 'notDetermined' },
		{ name: '蓝牙', code: 'bluetoothAuthorized', status: 'notDetermined' },
		{ name: '系统通知', code: 'notificationAuthorized', status: 'notDetermined' },
		{ name: '相机', code: 'cameraAuthorized', status: 'notDetermined' },
	])

	const getSystemAuth = (item:PermissionItem) => {
		const res = uni.getAppAuthorizeSetting();
		const code = item.code
		if(code == 'bluetoothAuthorized'){
			const resu = uni.getSystemSetting();
			console.log(resu, " at pages/mine/systemSetting/systemSetting.uvue:91")
			if(resu.bluetoothEnabled == false){
				uni.showToast({
					title: '请先手动打开蓝牙',
				})
			}else{
				permissionList.value.map(item => {
					if(item.code == 'bluetoothAuthorized'){
						item.status = '已授权'
					}
				})
			}
		}else{
			const status = res[code]
			if(status == 'denied' || status == "not determined"){
				uni.openAppAuthorizeSetting({
					success: (res) => {
						console.log(res, " at pages/mine/systemSetting/systemSetting.uvue:108")
						// item.status = '已授权' 
					}
				})
			}
		}
		
	}


	const changeChecked = () => {
		console.log(checked.value, " at pages/mine/systemSetting/systemSetting.uvue:119")
	}

	const isChecked = () => {
		checked.value = !checked.value
	}

	const getSystemNotify = () => {
		const res = uni.getAppAuthorizeSetting();
		console.log(res.notificationAuthorized, " at pages/mine/systemSetting/systemSetting.uvue:128")
		if(res.notificationAuthorized == 'denied' || res.notificationAuthorized == "not determined"){
			uni.showToast({
				title: '请先授权通知权限',
			})
			uni.openAppAuthorizeSetting({
				success: (res) => {
					console.log(res, " at pages/mine/systemSetting/systemSetting.uvue:135")
					systemNotifyState.value = '已授权'
				}
			})
		}
	}

	const playType = () => {
		pickerOptions.value = [
			[
				{
					label: 'WIFI下自动播放',
					value: 'WIFI下自动播放',
				},
				{
					label: '总是播放',
					value: '总是播放',
				},
				{
					label: '不播放',
					value: '不播放',
				}
			]
		]  as PickerColumn[]
		showPicker.value = true
	}

	const onConfirm = (context : PickerConfirmEvent) => {
		showPicker.value = false
		playTypeItem.value = context.values[0].toString()
	}

	const oncancel = () => {
		showPicker.value = false
	}

	onPageShow(() => {
    const res = uni.getAppAuthorizeSetting();
    const resu = uni.getSystemSetting();
    
    permissionList.value = permissionList.value.map(item => {
        const newItem = {...item} as PermissionItem;
        if (item.code == 'bluetoothAuthorized' && resu.bluetoothEnabled == true) {
            newItem.status = '已授权';
        } else {
            AuthState.value.forEach((auth) => {
                if (auth.code === res[item.code]) {
                    newItem.status = auth.state;
                }
            });
        }
        
        return newItem;
    });
})

	// onLoad(()=>{
	// 	const res = uni.getAppAuthorizeSetting();
	// 	console.log(res)
	// })

return (): any | null => {

const _component_fui_switch = resolveEasyComponent("fui-switch",_easycom_fui_switch)
const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)
const _component_fui_input = resolveEasyComponent("fui-input",_easycom_fui_input)
const _component_l_picker = resolveEasyComponent("l-picker",_easycom_l_picker)
const _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup",_easycom_fui_bottom_popup)

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "content" }), [
      createElementVNode("view", utsMapOf({ class: "items underline" }), [
        createElementVNode("view", utsMapOf({ class: "offline" }), [
          createElementVNode("text", null, "离线提醒"),
          createVNode(_component_fui_switch, utsMapOf({
            checked: checked.value,
            onChange: changeChecked,
            "onUpdate:checked": isChecked
          }), null, 8 /* PROPS */, ["checked"])
        ]),
        createElementVNode("text", utsMapOf({ class: "tips" }), "设备离线8小时后,推送消息到APP")
      ]),
      createElementVNode("view", utsMapOf({ class: "items" }), [
        createVNode(_component_fui_input, utsMapOf({
          label: "自动播放",
          labelSize: 28,
          textAlign: "right",
          borderBottom: false,
          placeholderStyle: "font-size: 28rpx;",
          disabled: true,
          placeholder: playTypeItem.value,
          onClick: playType
        }), utsMapOf({
          default: withSlotCtx((): any[] => [
            createElementVNode("text", null, [
              createVNode(_component_fui_icon, utsMapOf({
                name: "arrowright",
                size: 48
              }))
            ])
          ]),
          _: 1 /* STABLE */
        }), 8 /* PROPS */, ["placeholder"]),
        createElementVNode("text", utsMapOf({ class: "tips" }), "摄像机视频是否自动播放")
      ])
    ]),
    createElementVNode("view", utsMapOf({ class: "content" }), [
      createElementVNode(Fragment, null, RenderHelpers.renderList(permissionList.value, (item, index, __index, _cached): any => {
        return createElementVNode("view", utsMapOf({ key: index }), [
          createVNode(_component_fui_input, utsMapOf({
            label: item.name,
            labelSize: 28,
            textAlign: "right",
            borderBottom: true,
            placeholderStyle: item.status == '未授权' ? 'font-size: 28rpx;color:red;' : 'font-size: 28rpx;color:green;',
            disabled: true,
            placeholder: item.status,
            onClick: () => {getSystemAuth(item)}
          }), utsMapOf({
            default: withSlotCtx((): any[] => [
              createElementVNode("text", null, [
                createVNode(_component_fui_icon, utsMapOf({
                  name: "arrowright",
                  size: 48
                }))
              ])
            ]),
            _: 2 /* DYNAMIC */
          }), 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "placeholderStyle", "placeholder", "onClick"])
        ])
      }), 128 /* KEYED_FRAGMENT */)
    ]),
    createVNode(_component_fui_bottom_popup, utsMapOf({ visible: showPicker.value }), utsMapOf({
      default: withSlotCtx((): any[] => [
        createVNode(_component_l_picker, utsMapOf({
          "cancel-btn": "取消",
          "confirm-btn": "确定",
          columns: pickerOptions.value,
          onCancel: oncancel,
          onConfirm: onConfirm
        }), null, 8 /* PROPS */, ["columns"])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["visible"])
  ])
}
}

})
export default __sfc__
const GenPagesMineSystemSettingSystemSettingStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["height", "100%"], ["backgroundColor", "#f5f5f5"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["content", utsMapOf([[".container ", utsMapOf([["backgroundColor", "#ffffff"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["marginBottom", "20rpx"]])]])], ["items", utsMapOf([[".container .content ", utsMapOf([["display", "flex"], ["flexDirection", "column"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["fui-input__wrap", utsMapOf([[".container .content .items ", utsMapOf([["!paddingTop", "20rpx"], ["!paddingRight", 0], ["!paddingBottom", "20rpx"], ["!paddingLeft", 0]])]])], ["offline", utsMapOf([[".container .content .items ", utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingBottom", "10rpx"]])]])], ["tips", utsMapOf([[".container .content .items ", utsMapOf([["color", "#999999"], ["fontSize", "24rpx"]])]])], ["underline", utsMapOf([[".container .content ", utsMapOf([["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f5f5f5"]])]])], ["l-picker", utsMapOf([[".container ", utsMapOf([["width", "100%"]])]])]])]
