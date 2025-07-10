<template>
	<view class="l-upload" ref="uploadRef" :style="[styles]">
		<view class="l-upload__item" v-for="(file, index) in customFiles" :style="[itemStyle]" :key="file.url">
			<view class="l-upload__item-inner" :style="[innerStyle]">
				<slot name="file" :file="file" :index="index">
					<image class="l-upload__image" v-if="file.type == 'image'" :src="file.url" :data-file="file"
						:mode="imageFit" @click="onProofTap(index)" />
					<video class="l-upload__image" v-if="file.type == 'video'" :src="file.url" :data-file="file"
						:poster="file.thumb" :autoplay="false" objectFit="contain" @click="onFileClick(index)" />
					<view class="l-upload__progress-mask" v-if="file.status != null && file.status != 'done'"
						:data-file="file" @click="onFileClick(index)">
						<template v-if="file.status == 'loading'">
							<l-loading class="l-upload__progress-loading" size="24px" color="white" />
							<text class="l-upload__progress-text" v-if="file.percent != null">{{file.percent}}%</text>
							<text class="l-upload__progress-text" v-else>{{loadingText}}</text>
						</template>
						<l-icon v-else class="l-upload__progress-icon"
							:name="file.status == 'reload' ? 'refresh' : 'close-circle'" size="48rpx" aria-hidden />
							
						<text v-if="file.status == 'reload' || file.status == 'failed'" class="l-upload__progress-text">
							{{file.status == 'reload' ? reloadText : failedText}}
						</text>
					</view>
					<view  v-if="!isReadonly" class="l-upload__delete-btn" aria-role="button" aria-label="删除" :data-index="index"
						@click="onDelete(index)">
						<l-icon name="close" size="16px" color="#fff" />
					</view>
				</slot>
			</view>
		</view>
		<view class="l-upload__item l-upload__item--add" :class="{'l-upload__item--disabled':isDisabled}"
			:style="[itemStyle]" aria-label="上传"
			v-if="!isReadonly"
			v-show="!multiple ? customFiles.length == 0 : max == 0 || customFiles.length != max" @click="onAddTap">
			<view class="l-upload__item-inner" :style="[innerStyle, {background: addBgColor}]">
				<slot>
					<l-icon class="l-upload__add-icon" :size="uploadIconSize" :name="uploadIcon" />
				</slot>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
	// @ts-nocheck
	/**
	 * Upload 文件上传组件
	 * @description 用于图片、视频等文件的上传，支持预览、删除、重传等功能
	 * <br>插件类型：LUploadComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-upload
	 * 
	 * @property {string} name 表单字段名
	 * @property {UTSJSONObject[]} modelValue 已上传文件列表（支持v-model）
	 * @property {boolean} disabled 是否禁用（默认：false）
	 * @property {boolean} readonly 是否只读（默认：false）
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
	import { defineComponent, ref, computed, watch, onUnmounted, inject } from '@/uni_modules/lime-shared/vue';
	import { unitConvert } from '@/uni_modules/lime-shared/unitConvert'
	import uploadProps from './props'
	import { chooseFiles } from './utils'
	import { UploadFile, ChooseFileOptions } from './type';
	export default defineComponent({
		name: 'l-upload',
		props: uploadProps,
		emit: ['fail', 'remove', 'success', 'click', 'add', 'input', 'update:modelValue'],
		setup(props, { expose, emit }) {
			const formDisabled = inject<Ref<boolean | null> | null>('formDisabled', null)
			const formReadonly = inject<Ref<boolean | null> | null>('formReadonly', null)

			const customFiles = ref<UploadFile[]>(props.value ?? props.modelValue ?? props.defaultFiles ?? []);
			const isReadonly = computed(() : boolean => {
				if (props.readonly) return props.readonly;
				return formReadonly?.value ?? false;
			})
			const isDisabled = computed(() : boolean => {
				if (props.disabled) return props.disabled;
				return formDisabled?.value ?? false;
			})
			const styles = computed(() => {
				const style : Record<string, string> = {}
				const gutter = unitConvert(props.gutter ?? 8) / 2 * -1;
				style['margin-left'] = `${gutter}px`;
				style['margin-right'] = `${gutter}px`;
				style['margin-top'] = `${gutter}px`;
				return style
			})

			const itemStyle = computed(() => {
				const style : Record<string, string> = {}

				let column = props.column ?? 4;
				if (props.column) {
					style['width'] = `${100 / column}%`
				}
				if (props.gridWidth) {
					// const gutter = unitConvert(props.gutter ?? 8)
					// style['width'] = `${unitConvert(props.gridWidth) + gutter}px`
					style['--l-upload-width'] = props.gridWidth
				}
				return style
			})

			const innerStyle = computed(() => {
				const style : Record<string, string> = {};

				const gutter = unitConvert(props.gutter ?? 8) / 2
				style['margin'] = `${gutter}px`

				// if(props.gridWidth) {
				// 	style['width'] = props.gridWidth
				// }
				if (props.gridBgColor) {
					style.set('background', props.gridBgColor!)
				}
				if (props.gridHeight) {
					style['height'] = props.gridHeight
				}
				return style
			})


			const onFileClick = (index : number) => {
				const file = customFiles.value[index]
				emit('click', { file })
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
				if (isReadonly.value || isDisabled.value) return
				const delFile = customFiles.value[index]
				customFiles.value = customFiles.value.filter((file, i) : boolean => index != i)
				emit('remove', { index, file: delFile })
			}

			let last = 0;
			const upload = (files : UploadFile[]) => {
				if (!props.autoUpload || props.action == null || props.action!.length < 5) return
				if (props.action == 'uniCloud') {
					let uploadImgs : Promise<UniCloudUploadFileResult>[] = [];
					files.forEach((file, index) => {
						const promise = new Promise<UniCloudUploadFileResult>((resolve, reject) => {
							const dotIndex = file.name.lastIndexOf('.'); // 找到最后一个点的位置
							const baseName = file.name.substring(0, dotIndex);
							const extension = file.name.substring(dotIndex);
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
								// resolve(res)
								// 获取临时URL
								uniCloud.getTempFileURL({
									fileList: [res.fileID]
								}).then(result => {
									if (result.fileList && result.fileList.length > 0) {
										file.url = result.fileList[0].tempFileURL;
									}
									resolve(res)
								}).catch(error => {
									console.error('获取临时URL失败', error);
									resolve(res)
								})
							}).catch(err => {
								file.status = 'failed'
								reject(err)
							})
						})
						uploadImgs.push(promise as Promise<UniCloudUploadFileResult>)
					})

					Promise.all(uploadImgs).then(res => {
						emit('success', res)
					}).catch(err => {
						emit('fail', err)
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
												const data = JSON.parse<UTSJSONObject>(res.data);
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
						emit('success', res)
					}).catch(err => {
						emit('fail', err)
					})
				}
			};
			const customLimit = computed(() : number => props.max == 0 ? 20 : props.max - customFiles.value.length)
			const onAddTap = () => {
				if (isReadonly.value || isDisabled.value) return
				chooseFiles({
					mediaType: props.mediaType,
					count: customLimit.value,
					sourceType: props.sourceType,
					sizeType: props.sizeType,
					sizeLimit: props.sizeLimit
				} as ChooseFileOptions).then((files) => {
					last = customFiles.value.length
					customFiles.value = customFiles.value.concat(files)
					const _files = customFiles.value.filter((it, i) : boolean => i > last - 1)
					upload(_files)
					emit('add', _files)
				})
			}
			const stop = watch(customFiles, (v : UploadFile[]) => {
				emit('update:modelValue', v)
				// #ifdef VUE2
				emit('input', v)
				// #endif
			})
			// #ifdef VUE2
			const stopValue = watch(() => props.value, (v : UploadFile[]) => {
				if (v.length != customFiles.value.length) {
					customFiles.value = v
				}
			})
			// #endif
			// #ifdef VUE3
			const stopValue = watch(() => props.modelValue, (v : UploadFile[]) => {
				if (v.length != customFiles.value.length) {
					customFiles.value = v
				}
			})
			// #endif
			// #ifdef VUE3
			expose({
				remove: onDelete
			});
			// #endif


			onUnmounted(() => {
				stopValue()
				stop()
			})


			return {
				isDisabled,
				styles,
				customFiles,
				itemStyle,
				innerStyle,
				onProofTap,
				onDelete,
				onAddTap,
				onFileClick,
				isReadonly,
				// #ifdef VUE2
				remove: onDelete,
				// #endif
			}
		}
	})
</script>
<style lang="scss">
	@import './index';
</style>