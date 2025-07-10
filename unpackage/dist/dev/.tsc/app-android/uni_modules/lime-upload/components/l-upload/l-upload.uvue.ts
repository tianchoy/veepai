import _easycom_l_loading from '@/uni_modules/lime-loading/components/l-loading/l-loading.uvue'
import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import { unitConvert } from '@/uni_modules/lime-shared/unitConvert'
	import { chooseFiles } from './utils'
	import { UploadProps, UploadFile, ChooseFileOptions } from './type';

	
const __sfc__ = defineComponent({
  __name: 'l-upload',
  slots: Object as SlotsType<{file:  { file : UploadFile, index : number }}>,
  __props: UploadProps,
  props: {
    name: { type: String, required: false },
    modelValue: { type: Array as PropType<UTSJSONObject[]>, required: false },
    disabled: { type: Boolean, required: true, default: false },
    readonly: { type: Boolean, required: true, default: false },
    multiple: { type: Boolean, required: true, default: true },
    imageFit: { type: String, required: true, default: 'aspectFill' },
    gutter: { type: String, required: false },
    column: { type: Number, required: false },
    max: { type: Number, required: true, default: 0 },
    sizeLimit: { type: Number, required: false },
    uploadIcon: { type: String, required: true, default: 'camera' },
    uploadIconSize: { type: String, required: false },
    gridWidth: { type: String, required: false },
    gridHeight: { type: String, required: false },
    gridBgColor: { type: String, required: false },
    addBgColor: { type: String, required: false },
    gridBorderRadius: { type: String, required: false },
    defaultFiles: { type: Array as PropType<UTSJSONObject[]>, required: false },
    loadingText: { type: String, required: true, default: '上传中...' },
    reloadText: { type: String, required: true, default: '重新上传' },
    failedText: { type: String, required: true, default: '上传失败' },
    disablePreview: { type: Boolean, required: true, default: false },
    autoUpload: { type: Boolean, required: true, default: false },
    mediaType: { type: String, required: true, default: 'image' },
    maxDuration: { type: Number, required: false },
    sizeType: { type: Array as PropType<string[]>, required: true, default: ['original', 'compressed'] },
    sourceType: { type: Array as PropType<string[]>, required: true, default: ['album', 'camera'] },
    action: { type: String, required: false },
    headers: { type: UTSJSONObject, required: false },
    formData: { type: UTSJSONObject, required: false },
    mode: { type: String, required: true, default: 'grid' }
  },
  emits: ['fail', 'remove', 'success', 'click', 'add', 'update:modelValue'],
  setup(__props, { expose: __expose }: SetupContext): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * Upload 文件上传组件
	 * @description 用于图片、视频等文件的上传，支持预览、删除、重传等功能
	 * <br>插件类型：LUploadComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-upload
	 * 
	 * @property {string} name 表单字段名
	 * @property {UTSJSONObject[]} modelValue 已上传文件列表（支持v-model）
	 * @property {boolean} disabled 是否禁用（默认：false）
	 * @property {boolean} readonly 只读（默认：false）
	 * @property {boolean} multiple 是否支持多选（默认：false）
	 * @property {'scaleToFill'|'aspectFit'|'aspectFill'|'widthFix'|'heightFix'|'top'|'bottom'|'center'|'left'|'right'|'top left'|'top right'|'bottom left'|'bottom right'} imageFit 图片裁剪模式（默认："aspectFill"）
	 * @value scaleToFill
	 * @value aspectFit
	 * @value aspectFill
	 * @value widthFix
	 * @value heightFix
	 * @value top
	 * @value bottom
	 * @value 'top left'
	 * @value 'top right'
	 * @value 'bottom left'
	 * @value "bottom right"
	 * @property {string} gutter 项目间距（支持CSS单位）
	 * @property {number} column 每行显示数量（默认：4）
	 * @property {number} max 最大上传数量（默认：9）
	 * @property {number} sizeLimit 文件大小限制（单位KB）
	 * @property {string} uploadIcon 上传按钮图标
	 * @property {string} uploadIconSize 上传按钮图标尺寸
	 * @property {string} gridWidth 项目宽度（支持CSS单位）
	 * @property {string} gridHeight 项目高度（支持CSS单位）
	 * @property {string} gridBgColor 项目背景色
	 * @property {string} addBgColor 添加按钮背景色
	 * @property {string} gridBorderRadius 项目圆角
	 * @property {UTSJSONObject[]} defaultFiles 默认文件列表
	 * @property {string} loadingText 上传中提示文字
	 * @property {string} reloadText 重传提示文字
	 * @property {string} failedText 失败提示文字
	 * @property {boolean} disablePreview 禁用预览（默认：false）
	 * @property {boolean} autoUpload 自动上传（默认：true）
	 * @property {'image' | 'video' | 'all' | 'media'} mediaType 上传文件类型（默认："image"）
	 * @value image
	 * @value video
	 * @value media
	 * @value all
	 * @property {number} maxDuration 视频最大时长（秒）
	 * @property {string[]} sizeType 文件尺寸类型（默认：["original", "compressed"]）
	 * @property {string[]} sourceType 文件来源（默认：["album", "camera"]）
	 * @property {string} action 上传地址（uniCloud服务请设置为"uniCloud"）
	 * @property {UTSJSONObject} headers 请求头部
	 * @property {UTSJSONObject} formData 额外表单数据
	 * @property {string} mode 显示模式（默认："grid"）
	 * @event {Function} add 点击增加时触发
	 * @event {Function} success 上传成功时触发
	 * @event {Function} fail 上传失败时触发
	 * @event {Function} remove 点击删除时触发
	 * @event {Function} click 点击时触发
	 */

	

	const formDisabled = inject<Ref<boolean | null> | null>('formDisabled', null)
	const formReadonly = inject<Ref<boolean | null> | null>('formReadonly', null)

	function emits(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}
	const props = __props

	const isReadonly = computed(() : boolean => {
		console.log('isReadonly', props.readonly, " at uni_modules/lime-upload/components/l-upload/l-upload.uvue:150")
		if (props.readonly) return props.readonly;
		return formReadonly?.value ?? false;
	})
	const isDisabled = computed(() : boolean => {
		if (props.disabled) return props.disabled;
		return formDisabled?.value ?? false;
	})

	const transformFiles = (it : any) : UploadFile => {

		if (it instanceof UploadFile) {
			return it
		}






		const file = UTSJSONObject.assign({}, it as UTSJSONObject) //it as UTSJSONObject

		return {
			url: file.getString('url') ?? '',
			path: file.getString('path'),
			name: file.getString('name'),
			thumb: file.getString('thumb'),
			size: file.getNumber('size'),
			type: file.getString('type'),
			percent: file.getNumber('percent'),
			status: file.getString('status') ?? 'done',
		} as UploadFile
	}
	const customFiles = ref<UploadFile[]>((props.modelValue ?? props.defaultFiles)?.map(transformFiles) ?? []);

	const listWidth = ref(0);
	const uploadRef = ref<UniElement | null>(null);
	const styles = computed(() : Map<string, any> => {
		const style = new Map<string, any>();
		const gutter = unitConvert(props.gutter ?? 8) / 2 * -1
		style.set('margin-left', `${gutter}px`)
		style.set('margin-right', `${gutter}px`)
		style.set('margin-top', `${gutter}px`)
		return style
	})
	const itemStyle = computed(() : Map<string, any> => {
		const style = new Map<string, any>();

		// const gridWidth = unitConvert(props.gridWidth ?? 80)
		const gutter = unitConvert(props.gutter ?? 8) / 2
		let column = props.column ?? 4;

		if (props.gridWidth != null || props.column != null) {

			const width = listWidth.value / column - gutter * 2.0275;// ios 计算精度导致不均分
			style.set('width', props.gridWidth ?? `${width}px`)








		}


		if (props.gridHeight != null) {
			style.set('height', props.gridHeight!)
		}
		style.set('margin', `${gutter}px`)
		if (props.gridBgColor != null) {
			style.set('background', props.gridBgColor!)
		}

		return style
	})
















	const onFileClick = (index : number) => {
		const file = customFiles.value[index]
		emits('click', { file })
	}
	const onProofTap = (index : number) => {
		onFileClick(index);
		if (props.disablePreview) return
		uni.previewImage({
			urls: customFiles.value.filter((file) : boolean => file.percent != -1).map((file) : string => file.url),
			current: index
		});
	}
	const onDelete = (index : number) => {
		if (isDisabled.value || isReadonly.value) return;
		const delFile = customFiles.value[index]
		customFiles.value = customFiles.value.filter((file, i) : boolean => index != i)
		emits('remove', { index, file: delFile })
	}

	let last : number// = 0
	const upload = (files : UploadFile[]) => {
		if (!props.autoUpload || props.action == null || props.action!.length < 5) return
		if (props.action == 'uniCloud') {
			let uploadImgs : Promise<UniCloudUploadFileResult>[] = [];
			files.forEach((file, index) => {
				// props.beforeRead(file).then((res)=>{})

				const promise = new Promise<UniCloudUploadFileResult>((resolve, reject) => {
					const dotIndex = file.name!.lastIndexOf('.'); // 找到最后一个点的位置
					const baseName = file.name!.substring(0, dotIndex);
					const extension = file.name!.substring(dotIndex);
					const timestamp = Date.now();
								
					uniCloud.uploadFile({
						filePath: file.url,
						cloudPath: `${baseName}_${timestamp}${extension}`,
						// cloudPath: file.name!.substring(file.name!.lastIndexOf('.')),
						onUploadProgress: (res) => {
							file.status = 'loading'
							file.percent = Math.floor(res.loaded / res.total * 100)
						},
					}).then(res => {
						file.path = res.fileID;
						file.status = 'done'
						// 获取临时URL
						uniCloud.getTempFileURL({
							fileList: [res.fileID]
						}).then(result => {
							if (result.fileList.length > 0) {
								file.url = result.fileList[0].tempFileURL;
							}
							resolve(res)
						}).catch(error => {
							console.error('获取临时URL失败', error, " at uni_modules/lime-upload/components/l-upload/l-upload.uvue:296");
							resolve(res)
						})
						// resolve(res)
					}).catch(err => {
						file.status = 'failed'
						reject(err)
					})
				})
				uploadImgs.push(promise as Promise<UniCloudUploadFileResult>)
			})

			Promise.all(uploadImgs).then(res => {
				emits('success', res)
			}).catch(err => {
				emits('fail', err)
			})
		} else {
			let uploadImgs : Promise<UploadFileSuccess>[] = [];
			files.forEach((file, index) => {
				const promise = new Promise<UploadFileSuccess>((resolve, reject) => {
					const task = uni.uploadFile({
						url: props.action!,
						filePath: file.url,
						name: file.name,
						formData: props.formData,
						header: props.headers,
						success: (res) => {
							file.status = 'done'
							if (res.statusCode == 200) {
								if (typeof res.data == 'string') {
									try {
										const data = UTSAndroid.consoleDebugError(JSON.parse<UTSJSONObject>(res.data), " at uni_modules/lime-upload/components/l-upload/l-upload.uvue:328");
										const url = data?.getString('url');
										if (url != null) {
											file.path = url
										}
									} catch (e) {
										//TODO handle the exception
									}
								}
							}
							resolve(res)
						},
						fail(err) {
							file.status = 'failed'
							reject(err)
						}
					});
					task.onProgressUpdate((res) => {
						file.status = 'loading'
						file.percent = res.progress
					});
				})
				uploadImgs.push(promise as Promise<UploadFileSuccess>)
			})
			Promise.all(uploadImgs).then(res => {
				emits('success', res)
			}).catch(err => {
				emits('fail', err)
			})
		}
	}

	const customLimit = computed(() : number => props.max == 0 ? 20 : props.max - customFiles.value.length)
	const onAddTap = () => {
		if (isDisabled.value || isReadonly.value) return;
		chooseFiles({
			mediaType: props.mediaType,
			count: customLimit.value,
			sourceType: props.sourceType,
			sizeType: props.sizeType,
			sizeLimit: props.sizeLimit
		} as ChooseFileOptions).then((files) => {
			last = customFiles.value.length
			customFiles.value = customFiles.value.concat(files)
			// @ts-ignore
			const _files = customFiles.value.filter((it, i) : boolean => i > last - 1)
			upload(_files)
			emits('add', _files)
		})
	}




	const stop = watch(customFiles, (v : UploadFile[]) => {
		emits('update:modelValue', v)
	})

	const stopValue = watch(() : (UTSJSONObject[] | null) => props.modelValue, (v : UTSJSONObject[] | null) => {
		if (v != null && v.length != customFiles.value.length) {
			customFiles.value = v.map(transformFiles)
		}
	})

	__expose({
		remove: onDelete
	})


	const resizeObserver = new UniResizeObserver((entries : Array<UniResizeObserverEntry>) => {
		listWidth.value = entries[0].target.getBoundingClientRect().width
	})

	onMounted(() => {
		nextTick(() => {
			listWidth.value = uploadRef.value?.getBoundingClientRect().width ?? 0;
			resizeObserver.observe(uploadRef.value!)
		})
	})


	onUnmounted(() => {
		stop()

		resizeObserver.disconnect()

	})

return (): any | null => {

const _component_l_loading = resolveEasyComponent("l-loading",_easycom_l_loading)
const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)

  return createElementVNode("view", utsMapOf({
    class: "l-upload",
    ref_key: "uploadRef",
    ref: uploadRef,
    style: normalizeStyle(unref(styles))
  }), [
    createElementVNode(Fragment, null, RenderHelpers.renderList(unref(customFiles), (file, index, __index, _cached): any => {
      return createElementVNode("view", utsMapOf({
        class: "l-upload__item",
        style: normalizeStyle([unref(itemStyle)]),
        key: file.url
      }), [
        renderSlot(_ctx.$slots, "file", utsMapOf({
          file: file,
          index: index
        }), (): any[] => [
          file.type == 'image'
            ? createElementVNode("image", utsMapOf({
                key: 0,
                class: "l-upload__image",
                src: file.url,
                "data-file": file,
                mode: _ctx.imageFit,
                onClick: () => {onProofTap(index)}
              }), null, 8 /* PROPS */, ["src", "data-file", "mode", "onClick"])
            : createCommentVNode("v-if", true),
          file.type == 'video'
            ? createElementVNode("video", utsMapOf({
                key: 1,
                class: "l-upload__image",
                src: file.url,
                "data-file": file,
                autoplay: false,
                objectFit: "contain",
                onClick: () => {onFileClick(index)}
              }), null, 8 /* PROPS */, ["src", "data-file", "onClick"])
            : createCommentVNode("v-if", true),
          isTrue(file.status != null && file.status != 'done')
            ? createElementVNode("view", utsMapOf({
                key: 2,
                class: "l-upload__progress-mask",
                "data-file": file,
                onClick: () => {onFileClick(index)}
              }), [
                file.status == 'loading'
                  ? createElementVNode(Fragment, utsMapOf({ key: 0 }), [
                      createVNode(_component_l_loading, utsMapOf({
                        class: "l-upload__progress-loading",
                        size: "24px",
                        color: "white"
                      })),
                      file.percent != null
                        ? createElementVNode("text", utsMapOf({
                            key: 0,
                            class: "l-upload__progress-text"
                          }), toDisplayString(file.percent) + "%", 1 /* TEXT */)
                        : createElementVNode("text", utsMapOf({
                            key: 1,
                            class: "l-upload__progress-text"
                          }), toDisplayString(_ctx.loadingText), 1 /* TEXT */)
                    ], 64 /* STABLE_FRAGMENT */)
                  : createVNode(_component_l_icon, utsMapOf({
                      key: 1,
                      class: "l-upload__progress-icon",
                      name: file.status == 'reload' ? 'refresh' : 'close-circle',
                      size: "48rpx",
                      "aria-hidden": ""
                    }), null, 8 /* PROPS */, ["name"]),
                isTrue(file.status == 'reload' || file.status == 'failed')
                  ? createElementVNode("text", utsMapOf({
                      key: 2,
                      class: "l-upload__progress-text"
                    }), toDisplayString(file.status == 'reload' ? _ctx.reloadText : _ctx.failedText), 1 /* TEXT */)
                  : createCommentVNode("v-if", true)
              ], 8 /* PROPS */, ["data-file", "onClick"])
            : createCommentVNode("v-if", true),
          isTrue(!unref(isReadonly))
            ? createElementVNode("view", utsMapOf({
                key: 3,
                class: "l-upload__delete-btn",
                "aria-role": "button",
                "aria-label": "删除",
                "data-index": index,
                onClick: () => {onDelete(index)}
              }), [
                createVNode(_component_l_icon, utsMapOf({
                  name: "close",
                  size: "16px",
                  color: "#fff"
                }))
              ], 8 /* PROPS */, ["data-index", "onClick"])
            : createCommentVNode("v-if", true)
        ])
      ], 4 /* STYLE */)
    }), 128 /* KEYED_FRAGMENT */),
    isTrue(!unref(isReadonly))
      ? withDirectives(createElementVNode("view", utsMapOf({
          key: 0,
          class: normalizeClass(["l-upload__item l-upload__item--add", utsMapOf({'l-upload__item--disabled':unref(isDisabled)})]),
          style: normalizeStyle([unref(itemStyle),  _ctx.addBgColor!=null ? utsMapOf({background: _ctx.addBgColor}): '']),
          "aria-label": "上传",
          onClick: onAddTap
        }), [
          renderSlot(_ctx.$slots, "default", {}, (): any[] => [
            createVNode(_component_l_icon, utsMapOf({
              class: "l-upload__add-icon",
              size: _ctx.uploadIconSize,
              name: _ctx.uploadIcon
            }), null, 8 /* PROPS */, ["size", "name"])
          ])
        ], 6 /* CLASS, STYLE */), [
          [vShow, !_ctx.multiple ? unref(customFiles).length == 0 : _ctx.max == 0 || unref(customFiles).length != _ctx.max]
        ])
      : createCommentVNode("v-if", true)
  ], 4 /* STYLE */)
}
}

})
export default __sfc__
export type LUploadComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeUploadComponentsLUploadLUploadStyles = [utsMapOf([["l-upload", padStyleMapOf(utsMapOf([["flex", 1], ["position", "relative"], ["flexDirection", "row"], ["flexWrap", "wrap"]]))], ["l-upload__item", padStyleMapOf(utsMapOf([["position", "relative"], ["display", "flex"], ["width", 80], ["height", 80], ["borderTopLeftRadius", "12rpx"], ["borderTopRightRadius", "12rpx"], ["borderBottomRightRadius", "12rpx"], ["borderBottomLeftRadius", "12rpx"], ["overflow", "hidden"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["l-upload__item--add", padStyleMapOf(utsMapOf([["backgroundImage", "none"], ["backgroundColor", "#f3f3f3"]]))], ["l-upload__item--disabled", padStyleMapOf(utsMapOf([["opacity", 0.5]]))], ["l-upload__image", padStyleMapOf(utsMapOf([["width", "100%"], ["height", "100%"]]))], ["l-upload__add-icon", padStyleMapOf(utsMapOf([["fontSize", 28], ["color", "rgba(0,0,0,0.25)"]]))], ["l-upload__delete-btn", padStyleMapOf(utsMapOf([["position", "absolute"], ["top", 0], ["right", 0], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"], ["width", 20], ["height", 20], ["borderTopRightRadius", "12rpx"], ["borderBottomLeftRadius", "12rpx"], ["backgroundColor", "rgba(0,0,0,0.65)"]]))], ["l-upload__progress-mask", padStyleMapOf(utsMapOf([["position", "absolute"], ["left", 0], ["top", 0], ["bottom", 0], ["width", "100%"], ["backgroundColor", "rgba(0,0,0,0.45)"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"], ["borderTopLeftRadius", "12rpx"], ["borderTopRightRadius", "12rpx"], ["borderBottomRightRadius", "12rpx"], ["borderBottomLeftRadius", "12rpx"], ["paddingTop", 16], ["paddingRight", 0], ["paddingBottom", 16], ["paddingLeft", 0]]))], ["l-upload__progress-text", padStyleMapOf(utsMapOf([["fontSize", 12], ["lineHeight", "20px"], ["marginTop", 4], ["color", "#FFFFFF"]]))], ["l-upload__progress-loading", padStyleMapOf(utsMapOf([["alignSelf", "center"]]))], ["l-upload__progress-icon", padStyleMapOf(utsMapOf([["color", "#FFFFFF"], ["!fontSize", 24], ["!width", 24]]))]])]
