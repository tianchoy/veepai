<template>
	<view class="demo-block">
		<text class="demo-block__title-text ultra">Upload 上传</text>
		<text class="demo-block__desc-text">用于相册读取或拉起拍照的图片上传功能。</text>
		<view class="demo-block__body">
			<view class="demo-block card">
				<text class="demo-block__title-text">基础用法</text>
				<view class="demo-block__body row">
					<l-upload @add="handleAdd"/>
				</view>
			</view>
			<view class="demo-block card">
				<text class="demo-block__title-text">文件预览</text>
				<view class="demo-block__body row">
					<l-upload :column="4" :default-files="originFiles2">
					</l-upload>
				</view>
			</view>
			<view class="demo-block card">
				<text class="demo-block__title-text">上传状态</text>
				<view class="demo-block__body row">
					<l-upload :column="4" :autoUpload="true"
						:default-files="originFiles">
					</l-upload>
				</view>
			</view>
			<view class="demo-block card">
				<text class="demo-block__title-text">禁用</text>
				<view class="demo-block__body row">
					<l-upload :column="4" :max="2" :disabled="true" :default-files="originFiles3">
					</l-upload>
				</view>
			</view>
			<view class="demo-block card">
				<text class="demo-block__title-text">限制上传数量</text>
				<view class="demo-block__body row">
					<l-upload :column="4" :max="2" :default-files="originFiles3">
					</l-upload>
				</view>
			</view>
			<view class="demo-block card">
				<text class="demo-block__title-text">自定义样式</text>
				<view class="demo-block__body row">
					<l-upload v-model="files" @add="handleAdd" :multiple="false"  :column="1" grid-height="200px" add-bg-color="#fff">
						<view style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
							<image style="width: 100%; height: 100%; position: absolute; opacity: 0.5;" src="https://tdesign.gtimg.com/mobile/demos/upload1.png"></image>
							<view style="width: 72px; height: 72px; background: #e0eefe; border-radius: 50%; display: flex; justify-content: center; align-items: center; position: relative; z-index: 10;">
								<image style="width: 32px; height: 32px;" src="https://tdesign.gtimg.com/mobile/demos/upload3.png" />
							</view>
						</view>
					</l-upload>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				files: [],
				originFiles3: [
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png',
						name: 'uploaded4.png',
						type: 'image',
					},
					
				],
				originFiles2: [
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-tag_0.png',
						name: 'uploaded1.png',
						type: 'image',
					},
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-button_0.png',
						name: 'uploaded2.png',
						type: 'image',
					},
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-color_0.png',
						name: 'uploaded3.png',
						type: 'image',
					},
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png',
						name: 'uploaded4.png',
						type: 'image',
					},
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/aff13f50-b9d4-11ee-9303-15d888ed69e8_0.png',
						name: 'uploaded5.png',
						type: 'image',
					},
				],
				originFiles: [
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-tag_0.png',
						name: 'uploaded1.png',
						type: 'image',
						status: 'loading'
					},
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-button_0.png',
						name: 'uploaded2.png',
						type: 'image',
						status: 'loading',
						percent: 68,
					},
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-color_0.png',
						name: 'uploaded3.png',
						type: 'image',
						status: 'reload',
					},
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png',
						name: 'uploaded4.png',
						type: 'image',
						status: 'failed',
					},
					{
						url: 'https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/aff13f50-b9d4-11ee-9303-15d888ed69e8_0.png',
						name: 'uploaded5.png',
						type: 'image',
					},
				],
			}
		},
		methods: {
			handleAdd(files){
				console.log('files', files)
				files.forEach(file =>{
					const task = uni.uploadFile({
					    url: 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo', // 仅为示例，非真实的接口地址
					    filePath: file.url,
					    name: 'file',
					    formData: { user: 'test' },
					    success: (res) => {
							// console.log('res', JSON.parse(res.data))
							const obj = JSON.parse(res.data)
							console.log(`上传完成::0`, res)
							file.status = 'done'
							file.url = obj.url
					        console.log('上传完成::1', file.url)
					    }
					});
					task.onProgressUpdate((res) => {
						file.status = 'loading'
						file.percent = res.progress
					   console.log('上传进度:', res)
					});
				})
			},
			upload() {},
			onRemove(index) {
				uploadRef.value?.remove?.(index)
			},
		}
	}
</script>

<style lang="scss">
	.row {
		flex-direction: row;
		flex-wrap: wrap;
	}

	.btn {
		margin-bottom: 20rpx;
		margin-right: 20rpx;
		align-self: center;
	}

	.demo-block {
		margin: 32px 10px 0;

		// overflow: visible;
		&.card {
			background-color: white;
			padding: 30rpx;
			margin-bottom: 20rpx !important;
		}

		&__title {
			margin: 0;
			margin-top: 8px;

			&-text {
				color: rgba(0, 0, 0, 0.6);
				font-weight: 400;
				font-size: 14px;
				line-height: 16px;
				display: flex;

				&.large {
					color: rgba(0, 0, 0, 0.9);
					font-size: 18px;
					font-weight: 700;
					line-height: 26px;
				}

				&.ultra {
					color: rgba(0, 0, 0, 0.9);
					font-size: 24px;
					font-weight: 700;
					line-height: 32px;
				}
			}
		}

		&__desc-text {
			color: rgba(0, 0, 0, 0.6);
			margin: 8px 16px 0 0;
			font-size: 14px;
			line-height: 22px;
		}

		&__body {
			margin: 16px 0;
			overflow: visible;

			.demo-block {
				// margin-top: 0px;
				margin: 0;
			}
		}
	}
</style>