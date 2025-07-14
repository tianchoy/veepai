<template>
	<l-popup 
		:visible="innerValue"
		:overlay="innerOptions.overlay || overlay"
		bg-color="transparent"
		:closeOnClickOverlay="innerOptions.closeOnClickOverlay || closeOnClickOverlay"
		:preventScrollThrough="innerOptions.preventScrollThrough || preventScrollThrough"
		:zIndex="dialogZIndex"
		@change="overlayClick"
		position="center">
		<view class="l-dialog">
			<slot name="top"></slot>
			<view class="l-dialog__close" v-if="closeBtnProps" @click="onClose('close')">
				<l-icon class="l-dialog__close-icon" name="close" size="44rpx"></l-icon>
			</view>
			<view class="l-dialog__content">
				<slot name="title">
					<text v-if="innerTitle" class="l-dialog__header">{{title || innerOptions.title }}</text>
				</slot>
				<view class="l-dialog__body" :class="{'l-dialog__body--gap': innerTitle || $slots['title']}">
					<slot>
						<text class="l-dialog__body-text">{{innerOptions.content || content}}</text>
					</slot>
				</view>
			</view>
			<slot name="middle"></slot>
			<view class="l-dialog__footer" :class="[
				'l-dialog__footer--' + innerButtonLayout, {
				'l-dialog__footer--column': innerButtonLayout == 'vertical',
				'l-dialog__footer--full': buttonVariant,
			}]">
				<slot name="actions">
					<template v-if="innerActions">
						<l-button 
							class="l-dialog__button"
							:class="[
								'l-dialog__button--' + innerButtonLayout,{
								'l-dialog__button--text': buttonVariant,
								}
							]"
							v-for="(action, index) in innerActions!" :key="index"
							:style="[
								buttonStyle,
								{
									'margin-left': innerButtonLayout == 'horizontal' && !buttonVariant && index > 0? '20rpx': '0',
									'margin-bottom': innerButtonLayout == 'vertical' && !buttonVariant  && index > 0 ? '20rpx': '0',
								}
							]"
							:block="action.block || false"
							:disabled="action.disabled || false"
							:data-extra="index"
							:content="action.content || ''"
							:icon="action.icon || ''"
							:loading="action.loading || false"
							:type="action.type || 'primary'"
							:ghost="action.loading || false"
							:shape="action.shape || 'rectangle'"
							:size="action.size || 'medium'"
							:variant="action.variant"
							:open-type="action.openType || ''"
							:color="action.color"
							:textColor="action.textColor"
							:fontSize="action.fontSize"
							
							:hover-stop-propagation="action.hoverStopPropagation || false"
							:hover-start-time="action.hoverStartTime || 20"
							:hover-stay-time="action.hoverStayTime || 70"
							:lang="action.lang || 'en'"
							:session-from="action.sessionFrom || ''"
							:send-message-title="action.sendMessageTitle || ''"
							:send-message-path="action.sendMessagePath || ''"
							:send-message-img="action.sendMessageImg || ''"
							:app-parameter="action.appParameter || ''"
							:show-message-card="action.showMessageCard || false"
							@click="onTplButtonTap('action', index)"
							@getuserinfo="getuserinfo"
							@contact="contact" 
							@getphonenumber="getphonenumber"
							@error="error" 
							@opensetting="opensetting" 
							@launchapp="launchapp" 
							@agreeprivacyauthorization="agreeprivacyauthorization">
							{{action['content']}}
						</l-button>
					</template>
				</slot>
				<slot name="cancel-btn">
					<l-button 
						class="l-dialog__button"
						:style="[buttonStyle]"
						:class="[
							'l-dialog__button--' + innerButtonLayout,
							{
								'l-dialog__button--text': buttonVariant
							}
						]"
						v-if="cancelBtnProps"
						:block="cancelBtnProps.block || false"
						:disabled="cancelBtnProps.disabled || false"
						:content="cancelBtnProps.content || ''"
						:icon="cancelBtnProps.icon || ''"
						:loading="cancelBtnProps.loading || false"
						:type="cancelBtnProps.type || 'primary'"
						:ghost="cancelBtnProps.loading || false"
						:shape="cancelBtnProps.shape || 'rectangle'"
						:size="cancelBtnProps.size || 'medium'"
						:variant="cancelBtnProps.variant || 'light'"
						:open-type="cancelBtnProps.openType || ''"
						:color="cancelBtnProps.color"
						:textColor="cancelBtnProps.textColor"
						:fontSize="cancelBtnProps.fontSize"
						
						:hover-stop-propagation="cancelBtnProps.hoverStopPropagation || false"
						:hover-start-time="cancelBtnProps.hoverStartTime || 20"
						:hover-stay-time="cancelBtnProps.hoverStayTime || 70"
						:lang="cancelBtnProps.lang || 'en'"
						:session-from="cancelBtnProps.sessionFrom || ''"
						:send-message-title="cancelBtnProps.sendMessageTitle || ''"
						:send-message-path="cancelBtnProps.sendMessagePath || ''"
						:send-message-img="cancelBtnProps.sendMessageImg || ''"
						:app-parameter="cancelBtnProps.appParameter || ''"
						:show-message-card="cancelBtnProps.showMessageCard || false"
						@click="onTplButtonTap('cancel', null)"
						@getuserinfo="getuserinfo"
						@contact="contact" 
						@getphonenumber="getphonenumber"
						@error="error" 
						@opensetting="opensetting" 
						@launchapp="launchapp" 
						@agreeprivacyauthorization="agreeprivacyauthorization"
						>{{cancelBtnProps.content}}</l-button> 
				</slot>
				<slot name="confirm-btn">
					<l-button 
						class="l-dialog__button"
						:class="[
							'l-dialog__button--' + innerButtonLayout,
							{
								'l-dialog__button--text': buttonVariant
							}
						]"
						:style="[
							buttonStyle,
							{
								'margin-left': (cancelBtnProps != null) && innerButtonLayout == 'horizontal' && !buttonVariant ? '24rpx': '0',
								'margin-bottom': (cancelBtnProps != null) && innerButtonLayout == 'vertical' && !buttonVariant ? '24rpx': '0',
							}
						]"
						data-type="confirm" 
						v-if="confirmBtnProps != null"
						:block="confirmBtnProps.block || false"
						:disabled="confirmBtnProps.disabled || false"
						:content="confirmBtnProps.content || ''"
						:icon="confirmBtnProps.icon || ''"
						:loading="confirmBtnProps.loading || false"
						:type="confirmBtnProps.type || 'primary'"
						:ghost="confirmBtnProps.loading || false"
						:shape="confirmBtnProps.shape || 'rectangle'"
						:size="confirmBtnProps.size || 'medium'"
						:variant="confirmBtnProps.variant || 'solid'"
						:open-type="confirmBtnProps.openType || ''"
						:color="confirmBtnProps.color"
						:textColor="confirmBtnProps.textColor"
						:fontSize="confirmBtnProps.fontSize"
						
						:hover-stop-propagation="confirmBtnProps.hoverStopPropagation || false"
						:hover-start-time="confirmBtnProps.hoverStartTime || 20"
						:hover-stay-time="confirmBtnProps.hoverStayTime || 70"
						:lang="confirmBtnProps.lang || 'en'"
						:session-from="confirmBtnProps.sessionFrom || ''"
						:send-message-title="confirmBtnProps.sendMessageTitle || ''"
						:send-message-path="confirmBtnProps.sendMessagePath || ''"
						:send-message-img="confirmBtnProps.sendMessageImg || ''"
						:app-parameter="confirmBtnProps.appParameter || ''"
						:show-message-card="confirmBtnProps.showMessageCard || false"
						@click="onTplButtonTap('confirm', null)"
						@getuserinfo="getuserinfo"
						@contact="contact" 
						@getphonenumber="getphonenumber"
						@error="error" 
						@opensetting="opensetting" 
						@launchapp="launchapp" 
						@agreeprivacyauthorization="agreeprivacyauthorization"
						>{{confirmBtnProps.content}}</l-button> 
				</slot>
			</view>
		</view>
	</l-popup>
</template>
<script lang="ts">
	// @ts-nocheck
	/**
	 * Dialog 弹窗组件
	 * @description 用于显示模态对话框的通用组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-dialog
	 * 
	 * @property {Object[]} actions 操作按钮列表（最多显示6个）
	 * @property {'horizontal'|'vertical'} buttonLayout [buttonLayout=horizontal] 按钮排列方式
	 * @value horizontal 水平排列
	 * @value vertical 垂直排列
	 * @property {string|Object} cancelBtn 取消按钮配置（null隐藏/string文本/Object按钮属性）
	 * @property {boolean} closeBtn 是否显示关闭按钮
	 * @property {boolean} closeOnClickOverlay 点击蒙层关闭
	 * @property {string|Object} confirmBtn 确认按钮配置（null隐藏/string文本/Object按钮属性）
	 * @property {string} content 弹窗内容（支持HTML）
	 * @property {string}  overlayStyle 遮罩层样式（支持CSS字符串）
	 * @property {boolean} preventScrollThrough 防止滚动穿透
	 * @property {boolean} overlay 是否显示遮罩
	 * @property {string} title 弹窗标题
	 * @property {boolean} visible 控制显示状态
	 * @property {number} zIndex 层级设置
	 * @property {string} lStyle 自定义根节点样式
	 * @event {Function} action 操作按钮点击时触发
	 * @param {number} index 点击的按钮索引
	 * @event {Function} confirm 确认按钮点击时触发
	 * @event {Function} cancel 取消/关闭按钮点击时触发
	 * @event {Function} click 通用点击事件（透传底层点击）
	 * @event {Function} agreeprivacyauthorization 用户同意隐私协议时触发（需配置隐私协议）
	 * @event {Function} chooseavatar 用户选择头像时触发（需启用头像选择功能）
	 * @event {Function} getuserinfo 用户授权信息回调
	 * @event {Function} contact 客服消息回调
	 * @event {Function} getphonenumber 获取用户手机号回调
	 * @event {Function} error 发生错误时触发
	 * @param {Object} detail 错误详细信息
	 * @event {Function} opensetting 用户打开系统设置时触发
	 * @event {Function} launchapp 从小程序唤醒App时触发
	 */
	import { defineComponent, reactive, computed, ref } from '@/uni_modules/lime-shared/vue';
	import { DialogOptions, DialogExpose, BeforeClose } from './type';
	import dialogProps from './props';
	import { parseToObject } from './utils';
	
	
	export default defineComponent({
		name: 'l-dialog',
		props: dialogProps,
		emits: ['action', 'confirm', 'cancel', 'click','agreeprivacyauthorization', 'chooseavatar', 'getuserinfo','contact', 'getphonenumber', 'error', 'opensetting', 'launchapp', 'input', 'update:modelValue'],
		setup(props, {emit, expose}) {
			const dialogCallbacks = reactive({
				beforeClose: null,
				onAction: null,
				onConfirm: null,
				onCancel: null,
			} as DialogExpose)
			const innerOptions = reactive<DialogOptions>({
				actions: props.actions,
				buttonLayout: props.buttonLayout,
				cancelBtn: props.cancelBtn,
				closeBtn: props.closeBtn,
				closeOnClickOverlay: props.closeOnClickOverlay,
				confirmBtn: props.confirmBtn,
				content: props.content,
				overlayStyle: props.overlayStyle,
				preventScrollThrough: props.preventScrollThrough,
				overlay: props.overlay,
				title: props.title,
				visible: props.visible,
				zIndex: props.zIndex,
			})
			
			const modelValue = ref(false);
			const innerValue = computed({
				set(value: boolean) {
					modelValue.value = value;
					
					emit('update:modelValue', value)
					// #ifdef VUE2
					emit('input', value)
					// #endif
					
					if(!value) {
						dialogCallbacks.beforeClose = null;
						dialogCallbacks.onConfirm = null;
						dialogCallbacks.onCancel = null;
					}
				},
				get(): boolean {
					return props.visible || props.value || props.modelValue || modelValue.value
				},
			} as WritableComputedOptions<boolean>);
			const dialogZIndex = computed(() => (props.zIndex ?? innerOptions.zIndex) ?? undefined)
			const closeBtnProps = computed(()=>{
				return innerOptions.closeBtn || props.closeBtn ||  false
			})
			const cancelBtnProps = computed(() => {
				return parseToObject(props.cancelBtn || innerOptions.cancelBtn)
			})
			const confirmBtnProps = computed(() => {
				return parseToObject(props.confirmBtn || innerOptions.confirmBtn)
			})
			
			const innerTitle = computed(() => props.title || innerOptions.title)
			const innerButtonLayout = computed(() => innerOptions.buttonLayout || props.buttonLayout)
			const innerActions = computed(() => {
				return props.actions || innerOptions.actions
			})
			const buttonVariant = computed(():boolean=> {
				const res1 = [confirmBtnProps.value, cancelBtnProps.value].some((item):boolean => {
					return item?.['variant'] == 'text'
				})
				const res2 = innerActions.value?.some((item):boolean => {
					return item['variant'] == 'text'
				})
				
				return res1 || res2
			})
			const buttonStyle = computed(() => {
				const style: Record<string, any> = {};
				style['padding'] = 0;
				style['flex'] = 1;
				if(buttonVariant.value) {
					//$border-color-2
					style['border-top'] = `1px solid #e7e7e7`
					style['border-radius'] = '0'
					style['border-left'] = `1px solid #e7e7e7`
				}
				return style
			})
			
			const onClose = (type: string) => {
				if(dialogCallbacks.beforeClose) {
					dialogCallbacks.beforeClose!(type).then((res)=>{
						innerValue.value = false;
					})
					return
				}
				innerValue.value = false
			}
			const onTplButtonTap = (type: string, extra:number|null) => {
				if(type == 'confirm') {
					emit('confirm')
					if(dialogCallbacks.onConfirm) {
						dialogCallbacks.onConfirm!(null)
						onClose('confirm')
					}
				} else if(type == 'cancel') {
					emit('cancel')
					if(dialogCallbacks.onCancel) {
						dialogCallbacks.onCancel!(true)
						onClose('cancel')
					}
				} else if(type == 'action' && extra) {
					emit('action', extra)
					if(dialogCallbacks.onAction) {
						// dialogCallbacks.onAction!(extra)
						dialogCallbacks.onAction!(extra)
						onClose('action')
					}
				}
			}
			const getuserinfo = (e: UniEvent) => {
				emit('getuserinfo', e);
			}
			const contact = (e: UniEvent) => {
				emit('contact', e);
			}
			const getphonenumber = (e: UniEvent) => {
				emit('getphonenumber', e);
			}
			const error = (e: UniEvent) => {
				emit('error', e);
			}
			const opensetting = (e: UniEvent) => {
				emit('opensetting', e);
			}
			const launchapp = (e: UniEvent) => {
				emit('launchapp', e);
			}
			const chooseavatar = (e: UniEvent) => {
				emit('chooseavatar', e);
			}
			const agreeprivacyauthorization = (e: UniEvent) => {
				emit('agreeprivacyauthorization', e);
			}
			
			const overlayClick = () => {
				if(props.closeOnClickOverlay) {
					onClose('cancel')
				}
			}
			const _updateOptions = (options: UTSJSONObject) => {
				innerOptions.actions = options.actions ?? props.actions
				innerOptions.buttonLayout = options.buttonLayout ?? props.buttonLayout
				const maxLengthSuggestion = innerOptions.buttonLayout == 'vertical' ? 7 : 3;
				if(innerOptions.actions != null && (innerOptions.actions!.length == 0 || innerOptions.actions!.length > maxLengthSuggestion)) {
					console.warn(`action 数量建议控制在1至${maxLengthSuggestion}个`);
				}
				innerOptions.cancelBtn =  options.cancelBtn ?? props.cancelBtn
				innerOptions.closeBtn = options.closeBtn ?? props.closeBtn
				innerOptions.closeOnClickOverlay =  options.closeOnClickOverlay ?? props.closeOnClickOverlay
				innerOptions.confirmBtn = options.confirmBtn ?? props.confirmBtn
				innerOptions.content = options.content ?? props.content
				innerOptions.overlayStyle = options.overlayStyle ?? props.overlayStyle
				innerOptions.preventScrollThrough =  options.preventScrollThrough ?? props.preventScrollThrough
				innerOptions.overlay = options.overlay ?? props.overlay
				innerOptions.title = options.title ?? props.title
				// innerOptions.visible = options..visible
				innerOptions.zIndex = options.zIndex ?? props.zIndex
			}
			const _show = (options: UTSJSONObject):Promise<number|null> => {
				_updateOptions(options)
				innerValue.value = true;
				try {
					const beforeClose = options['beforeClose']
					if(typeof beforeClose == 'function') {
						dialogCallbacks.beforeClose = beforeClose as BeforeClose
					}
					
				} catch(err) {
					console.warn(err)
				}
				
				return new Promise((resolve, reject) => {
					dialogCallbacks.onConfirm = resolve;
					dialogCallbacks.onAction = resolve;
					dialogCallbacks.onCancel = reject;
				})
			}
			const _close = () => {
				innerValue.value = false
			}
			
			// #ifdef VUE3
			expose({
				close: _close,
				show: _show,
			})
			// #endif
			
			return {
				buttonStyle,
				dialogZIndex,
				innerOptions,
				innerValue,
				closeBtnProps,
				cancelBtnProps,
				confirmBtnProps,
				innerTitle,
				innerButtonLayout,
				innerActions,
				buttonVariant,
				onClose,
				onTplButtonTap,
				getuserinfo,
				contact,
				getphonenumber,
				error,
				opensetting,
				launchapp,
				chooseavatar,
				agreeprivacyauthorization,
				overlayClick,
				// #ifdef VUE2
				close: _close,
				show: _show,
				// #endif
			}
		}
	})
</script>
<style lang="scss">
	@import './index';
</style>
