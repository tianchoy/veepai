<template>
	<view class="j-upload">
		<view class="j-upload--view" ref="jUploadRef">
			<slot>
				<view class="j-upload--item" :style="itemViewStyle" v-for="(item, index) in list" :key="index">
					<view class="j-upload--item--view">
						<video :style="itemStyle" v-if="item.type==='video'" :src="item.url" :controls="false"></video>
						<j-image :width="itemStyle.width" :height="itemStyle.height" @click="preview(index)" v-else :src="item.url" mode="aspectFill"></j-image>
						<view class="j-upload--item--modal j-upload--item--status" v-if="notSuccessStatus.includes(item.status)">
							<view v-if="item.status === 'await'" class="j-upload--item--status--view">
								<text class="j-upload--item--text">{{textObj.upWait}}</text>
							</view>
							<view v-else-if="item.status === 'loading'" class="j-upload--item--status--view">
								<j-loading-icon size="50rpx"></j-loading-icon>
								<text class="j-upload--item--text">{{textObj.upLoading}}</text>
							</view>
							<view @click="reUpload(item)" v-else-if="item.status === 'error'" class="j-upload--item--status--view j-upload--item--status--view__error">
								<j-icon type="loop" size="50rpx" color="red"></j-icon>
								<text class="j-upload--item--text">{{textObj.upError}}</text>
							</view>
						</view>
						<!-- #ifdef APP-VUE -->
						<cover-view class="j-upload--item--modal" @click="chooseItem(item,index)" v-if="item.type==='video'"></cover-view>
						<!-- #endif -->
						<!-- #ifndef APP-VUE -->
						<view class="j-upload--item--modal" @click="chooseItem(item,index)" v-if="item.type==='video'"></view>
						<!-- #endif -->
						<image class="j-upload--item--delete" mode="widthFix" src="../../images/del.png" v-if="clear&&!disabled" @click="deleteFile(item.id,index)"></image>
					</view>
				</view>
				<view class="j-upload--item" :style="itemViewStyle" v-if="showAdd">
					<view class="j-upload--item--view j-upload--item--view__add" @click="addFile">
						<j-icon type="camera" size="56rpx"></j-icon>
						<text class="j-upload--item--view--click">
							{{textObj.upClick}}
						</text>
					</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
import { getUuid, getPx, getDomStyle, deepClone } from "../../utils/index";
import {formatImage, formatVideo, formatMedia, formatFile} from "./util";
export default {
	name: 'j-upload',
	props: {
		// #ifdef VUE2
		value: {
			type: Array,
			default: []
		},
		// #endif
		// #ifdef VUE3
		modelValue: {
			type: Array,
			default: []
		},
		// #endif
		types: {
			type: Array,
			default: ['image','video']
		},
		rowCount: { // 每排站几个
			type: [Number, String],
			default: 3
		},
		maxCount: { // 最多上传几个文件，0时不限制数量
			type: [Number, String],
			default: 1
		},
		clear: { // 是否显示删除按钮
			type: Boolean,
			default: true
		},
		url:{ // 请求地址
			type:String,
			default:""
		},
		name:{
			type:String,
			default:"file"
		},
		header:{
			type:Object,
			default:()=>{
				return {}
			}
		},
		formData:{
			type:Object,
			default:()=>{
				return {}
			}
		},
		uploadHandle:{
			type:Object,
			default:()=>{
				return {}
			}
		},
		disabled: { // 是否禁用
			type: Boolean,
			default: false
		},
		textLabel:{
			type:Object,
			default:()=>{
				return {}
			}
		}
	},
	data() {
		return {
			width: 0,
			uploadFiles:[],
			textObj:{
				upWait:'等待上传',
				upLoading:'上传中',
				upError:'上传失败',
				upClick:'点击上传'
			},
			notSuccessStatus:['await','loading','error'],
		}
	},
	computed: {
		list() {
			let arr = [];
			// #ifdef VUE2
			arr = this.value;
			// #endif
			// #ifdef VUE3
			arr = this.modelValue;
			// #endif
			return [...arr,...this.uploadFiles];
		},
		itemViewStyle() {
			const width = this.width;
			const size = width + 'px';
			const top = getPx('16rpx');
			const right = getPx('24rpx');
			return {
				width: size,
				height: width + top - right + 'px',
				padding: `${top}px ${right}px 0 0`,
			}
		},
		itemStyle() {
			const width = this.width;
			const right = getPx('24rpx');
			const size = width-right+'px';
			return {
				width: size,
				height: size,
			}
		},
		accept(){
			let accept;
			let num = 0;
			if(this.types.includes('image')){
				num += 1;
			}
			if(this.types.includes('video')){
				num += 2;
			}
			if(num === 1){
				accept = "image"
			}else if(num === 2){ // 只有视频
				accept = "video"
			}else if(num === 3){ // 视频图片都有
				// #ifndef H5
				accept = "media"
				// #endif
				// #ifdef H5
				accept = "file"
				// #endif
			}
			return accept;
		},
		showAdd(){
			const {accept, maxCount, list, disabled} = this;
			let bool = !!accept && !disabled;
			if(maxCount!=0){
				if(list.length>=maxCount){
					bool = false;
				}
			}
			return bool
		},
		extension(){
			let arr = [];
			if(this.types.includes('image')){
				arr = ['.jpg','.jpge','.png','.webp','.gif','.bmp','.ico','.heic']
			}
			if(this.types.includes('video')){
				arr = [...arr,'.mp4', '.webm', '.ogg','.wmv','.flv','.mov','.h265','.hevc']
			}
			return arr;
		}
	},
	created() {
		this.textObj = {...this.textObj,...this.textLabel};
	},
	mounted() {
		this.getWidth();
	},
	methods: {
		getWidth(){
			getDomStyle(this, 'jUploadRef', '.j-upload--view').then(res => {
				this.width = Math.floor(res.width / this.rowCount);
			});
		},
		preview(index){
			this.$emit('preview',{list:deepClone(this.list), index})
		},
		deleteFile(id,index){
			const list = [...this.uploadFiles];
			const findIndex = list.findIndex(ite=>ite.id===id);
			if(findIndex!==-1){
				list.splice(findIndex,1);
				this.uploadFiles = list;
			}else{
				let arr;
				// #ifdef VUE2
				arr = [...this.value];
				// #endif
				// #ifdef VUE3
				arr = [...this.modelValue];
				// #endif
				if(id){
					const dex = arr.findIndex(ite=>ite.id===id);
					if(dex!==-1){ // 找到对应的id了还是根据id来删除， 没有才根据index删除
						arr.splice(dex,1);
					}else{
						arr.splice(index,1);
					}
				}else{
					arr.splice(index,1);
				}
				// #ifdef VUE2
				this.$emit("input", arr);
				// #endif
				// #ifdef VUE3
				this.$emit("update:modelValue", arr);
				// #endif
			}
		},
		addFile(){
			if(!this.accept) return;
			this.chooseFile({accept:this.accept}).then(res=>{
				if(res?.length){
					const result = [];
					[...res].forEach(item=>{
						if(this.types.includes(item.type)){
							result.push({
								...item,
								id:getUuid(),
							});
						}
					})
					if(this.url){
						let files = [];
						result.forEach(item=>{
							const {url,type,id} = item;
							files.push({
								url,
								type,
								id,
								status:'loading'
							});
							this.requestFile(url).then(result=>{
								this.handleResult(id,result);
							}).catch(()=>{
								this.handleResult(id);
							})
						})
						this.uploadFiles = [...this.uploadFiles,...files];
					}else{
						this.$emit('upload',result);
					}
					
				}
			}).catch(err=>{
				if(err){
					uni.showToast({
						title:err.errMsg,
						icon:'none'
					})
				}
			});
		},
		handleResult(id,result){
			let data = [...this.uploadFiles];
			const findIndex = data.findIndex(ite=>ite.id===id);
			if(findIndex === -1) return;
			const ite = data[findIndex];
			if(result){
				let add = data.splice(findIndex,1)[0]||{};
				if(typeof result === 'string'){
					add = {
						...add,
						url:result,
						status:'success'
					};
				}else{
					add = {
						...result,
						...add,
						status:'success'
					};
					if(result.url){
						add.url = result.url;
					}
				}
				// #ifdef VUE2
				this.$emit("input", [...this.value,add]);
				// #endif
				// #ifdef VUE3
				this.$emit("update:modelValue", [...this.modelValue,add]);
				// #endif
			}else{ // 上传失败了
				data[findIndex] = {
					...ite,
					status:'error',
				}
			}
			this.uploadFiles = data;
		},
		chooseItem(item,index){ // cover-view遮挡住了
			if(this.notSuccessStatus.includes(item.status)){
				if(item.status === 'error'){
					this.reUpload(item)
				}
			}else{
				this.preview(index);
			}
		},
		reUpload(item){ // 重新上传
			if(this.url){
				if(!item.id) return ;
				let data = [...this.uploadFiles];
				const findIndex = data.findIndex(ite=>ite.id===item.id);
				if(findIndex === -1) return;
				const ite = data[findIndex];
				data[findIndex] = {
					...ite,
					status:'loading',
				}
				this.uploadFiles = data;
				this.requestFile(item.url).then(result=>{
					this.handleResult(item.id,result);
				}).catch(()=>{
					this.handleResult(item.id);
				})
			}else{
				this.$emit('reUpload',item);
			}
		},
		requestFile(filePath){
			const {url, name, formData, header, uploadHandle} = this;
			let params = {
				url,
				header,
				filePath,
				name,
				formData,
			}
			if(uploadHandle?.before){
				params = uploadHandle.before(params);
			}
			return new Promise((rej,rsp) => {
				uni.uploadFile({
					...params,
					complete:async (res)=>{
						if(uploadHandle?.after){
							const result = await uploadHandle.after(res);
							if(!result){
								rsp();
							}else{
								rej(result);
							}
						}else{
							if (!res) {
								rsp({
									errMsg:'请求无响应，请检查网络'
								});
								return;
							}
							if (res.statusCode === 200) {
								const data = JSON.parse(res.data);
								if(data.url){
									rej(data.url);
								}else{
									rsp({
										errMsg:'上传失败，请重试'
									});
								}
								
							}else{
								rsp({
									errMsg:'上传失败，请重试'
								});
							}
						}
					}
				});
			})
		},
		chooseFile({
			accept
		}) {
			const maxNum = 9;
			let maxCount = this.maxCount;
			if(+maxCount === 0){
				maxCount = maxNum
			}else{
				maxCount = maxCount - this.list.length;
			}
			const extension = this.extension;
			const multiple = maxCount>1;
			const count = multiple ? Math.min(maxCount, maxNum) : 1;
			const sizeType = ['original', 'compressed'];
			const capture = ['album', 'camera']
			const maxDuration = 60;
			const camera = "back";
			return new Promise((resolve, reject) => {
				const failFn = (err)=>{
					const cancelList = ['user cancel',':fail cancel'];
					if(cancelList.find(item=>err.errMsg.endsWith(item))){
						reject(false);
					}else{
						reject(err);
					}
				}
				switch (accept) {
					case 'image':
						uni.chooseImage({
							count,
							sourceType: capture,
							sizeType,
							success: (res) => resolve(formatImage(res)),
							fail: failFn
						})
						break
					// 只有微信小程序才支持chooseMedia接口
					case 'media':
						if(uni.canIUse('chooseMedia')){
							uni.chooseMedia({
								count,
								sourceType: capture,
								maxDuration,
								sizeType,
								camera,
								success: (res) => resolve(formatMedia(res)),
								fail: failFn
							})
						}else{
							throw Error("不支持api【uni.chooseMedia】");
						}
						break
					case 'video':
						uni.chooseVideo({
							sourceType: capture,
							compressed,
							maxDuration,
							camera,
							success: (res) => resolve(formatVideo(res)),
							fail: failFn
						})
						break
					// #ifdef MP-WEIXIN || H5
					// 只有微信小程序才支持chooseMessageFile接口
					case 'file':
						// #ifdef MP-WEIXIN
						wx.chooseMessageFile({
							count,
							type: accept,
							sourceType: capture,
							success: (res) => resolve(formatFile(res)),
							fail: failFn
						})
						// #endif
						// #ifdef H5
						// 需要hx2.9.9以上才支持uni.chooseFile
						let params = {
							count,
							type: accept,
							sourceType: capture,
							success: (res) => resolve(formatFile(res)),
							fail: failFn
						}
						if (extension?.length) {
							params.extension = extension
						}
						uni.chooseFile(params)
						// #endif
						break
					// #endif
					default:
						// 此为保底选项，在accept不为上面任意一项的时候选取全部文件
						// #ifdef MP-WEIXIN
						wx.chooseMessageFile({
							count,
							type: 'all',
							sourceType: capture,
							success: (res) => resolve(formatFile(res)),
							fail: failFn
						})
						// #endif
						// #ifdef H5
						// 需要hx2.9.9以上才支持uni.chooseFile
						let paramsFile = {
							count,
							type: 'all',
							sourceType: capture,
							success: (res) => resolve(formatFile(res)),
							fail: failFn
						}
						if (extension?.length) {
							paramsFile.extension = extension
						}
						uni.chooseFile(paramsFile)
					// #endif
				}
			})
		},
		validate(){ // 检验是否还有需要上传的文件
			const status = ['await', 'loading'];
			if(this.url){
				return !!this.uploadFiles.find(item=>status.includes(item.status));
			}else{
				return !!this.list.find(item=>status.includes(item.status));
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../bem.scss";
view{
	box-sizing: border-box;
}
@include b(upload) {
	/* #ifndef APP-NVUE */
	width: 100%;
	/* #endif */
	display: flex;
	flex-direction: column;
	@include m(view) {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		flex:1;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	@include m(item) {
		display: flex;
		flex-direction: column;
		@include m(view) {
			position: relative;
			/* #ifndef APP-NVUE */
			width: 100%;
			/* #endif */
			height: 0;
			flex:1;
			@include flexRow(center);
			flex-direction: column;
			border-radius: 16rpx;
			@include e(add) {
				text-align: center;
				border: 2rpx dashed $color-border-placeholder;
			}
			@include m(click) {
				font-size: 24rpx;
				color: #88899E;
				padding-top: 20rpx;
			}
		}
		@include m(modal){
			position: absolute;
			top:0;
			left:0;
			right: 0;
			bottom:0;
		}
		@include m(status){
			@include flexRow(center);
			flex-direction: column;
			background-color: rgba(0,0,0,0.3);
			@include m(view){
				/* #ifndef APP-NVUE */
				width: 100%;
				/* #endif */
				height: 0;
				flex:1;
				@include flexRow(center);
				flex-direction: column;
				.j-upload--item--text{
					color:#fff;
					font-size: 24rpx;
					line-height: 36rpx;
				}
				@include e(error){
					.j-upload--item--text{
						color:red;
					}
				}
			}
		}
		@include m(delete){
			position: absolute;
			top:0;
			right: 0;
			height: 28rpx;
			width: 28rpx;
			z-index: 3;
		}
	}
	
}
</style>