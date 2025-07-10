// @ts-nocheck
import { UploadFile, ChooseFileOptions, Oversize } from './type'
// import { chooseFile, ChooseFileOption, ChooseFileSuccessCallbackResult } from '@/uni_modules/lime-choose-file'
/**
 * 由于小程序暂时在ios上不支持返回上传文件的fileType，这里用文件的后缀来判断
 * @param mediaType
 * @param tempFilePath
 * @returns string
 * @link https://developers.weixin.qq.com/community/develop/doc/00042820b28ee8fb41fc4d0c254c00
 */
export function getFileType(tempFilePath : string, fileType ?: string) : string {
	if (fileType != null) return fileType.replace(/\/.+/,''); // 如果有返回fileType就直接用
	
	// 否则根据文件后缀进行判读
	const videoType = ['avi', 'wmv', 'mkv', 'mp4', 'mov', 'rm', '3gp', 'flv', 'mpg', 'rmvb'];
	const temp = tempFilePath.split('.');
	const postfix = temp[temp.length - 1];
	if (videoType.includes(postfix.toLocaleLowerCase())) {
		return 'video';
	}
	return 'image';
}

// 选中文件之后，计算一个随机的短文件名
// export function getRandFileName(filePath: string):string {
// 	const extIndex = filePath.lastIndexOf('.');
// 	const extName = extIndex === -1 ? '' : filePath.substr(extIndex);
// 	return parseInt(`${Date.now()}${Math.floor(Math.random() * 900 + 100)}`, 10).toString(36) + extName;
// }
export function getFileName(filePath: string): string {
	return filePath.substring(filePath.lastIndexOf('/') + 1)
}

export const isOverSize = (size:number, sizeLimit:number|null):boolean => {
  if (sizeLimit == null) return false;

  const base = 1000;
  // const unitMap = {
  //   B: 1,
  //   KB: base,
  //   MB: base * base,
  //   GB: base * base * base,
  // };
  const computedSize =  sizeLimit * base 
  // const computedSize = typeof sizeLimit == 'number' ? sizeLimit * base : sizeLimit?.size * unitMap[sizeLimit?.unit ?? 'KB']; // 单位 KB

  return size > computedSize;
};



export function chooseImage(opts : ChooseFileOptions) {
	// #ifdef MP-WEIXIN
	uni.chooseMedia({
		...opts,
		mediaType: ['image'],
	})
	// #endif
	// #ifndef MP-WEIXIN
	uni.chooseImage({
		count: opts.count,
		sizeType: opts.sizeType,
		sourceType: opts.sourceType,
		extension: opts.extension,
		success(res){
			opts.success?.(res)
		},
		fail(err) {
			opts.fail?.(err)
		}
	})
	// #endif
}

export function chooseVideo(opts : ChooseFileOptions) {
	// #ifdef MP-WEIXIN
	uni.chooseMedia({
		...opts,
		mediaType: ['video'],
		maxDuration: opts.maxDuration ?? 10,
	})
	// #endif
	// #ifndef MP-WEIXIN
	uni.chooseVideo({
		sourceType: opts.sourceType,
		// #ifndef APP-ANDROID || APP-IOS
		// compressed: opts.compressed ?? true,
		maxDuration: opts.maxDuration ?? 10,
		camera: opts.camera ?? 'back',
		// extension: opts.extension,
		// #endif
		success(res){
			opts.success?.(res)
		},
		fail(err) {
			opts.fail?.(err)
		}
	})
	// #endif
}

export function chooseMedia(opts : ChooseFileOptions) {
	// #ifdef APP-ANDROID || APP-IOS
	// #ifdef uniVersion >= 4.51
	uni.chooseMedia({
		count: opts.count,
		mediaType: ['image', 'video'],
		sourceType: opts.sourceType,
		maxDuration: opts.maxDuration ?? 10,
		camera: opts.camera ?? 'back',
		success(res) {
			opts.success?.(res)
		},
		fail(err) {
			opts.fail?.(err)
		}
	} as ChooseMediaOptions)
	// #endif
	// #ifdef uniVersion < 4.51
	console.warn("【lime-upload】chooseMedia 当前环境不支持")
	// #endif
	// #endif
	
	// #ifndef APP-ANDROID || APP-IOS
	try {
		uni.chooseMedia({
			...opts,
			mediaType: ['image', 'video'],
		})
	} catch (error) {
		console.error('error', error)
		uni.chooseImage(opts)
		//TODO handle the exception
	}
	
	// #endif
}

export function chooseAll(opts : ChooseFileOptions) {
	// #ifdef MP-WEIXIN
	uni.chooseMessageFile({
		...opts,
		type: 'all',
	})
	// #endif
	// #ifndef MP-WEIXIN || APP-IOS || APP-ANDROID
	uni.chooseFile({
		count: opts.count,
		type: 'all',
		success(res) {
			opts.success?.(res)
		},
		fail(err) {
			opts.fail?.(err)
		}
	} as ChooseFileOption)
	// #endif
	
	// #ifdef APP-ANDROID && uniVersion >= 4.51
	uni.chooseFile({
		count: opts.count,
		type: 'all',
		success(res) {
			opts.success?.(res)
		},
		fail(err) {
			opts.fail?.(err)
		}
	})
	// #endif
	// #ifdef APP-IOS || APP-ANDROID && uniVersion < 4.51
	console.warn("【lime-upload】chooseAll 当前环境不支持")
	// #endif
}


function normalizeChooseFiles(
	type: string, 
	tempFiles: UTSJSONObject[], //ChooseImageTempFile
	tempFilePaths:string[], 
	sizeLimit:number|null,
	oversize: Oversize | null
	):UploadFile[]{
	const files : UploadFile[] = [];

	tempFiles.forEach((temp, index) =>{
		const tempFilePath = (temp['tempFilePath'] as string | null) ?? tempFilePaths[index]
		const name = (temp['name'] as string | null) ?? getFileName(tempFilePath);
		const size = (temp['size'] as number | null) ?? 0;
		const width = (temp['width'] as number | null);
		const height = (temp['height'] as number | null)
		const duration = (temp['duration'] as number | null);
		const path = (temp['path'] as string | null) ?? tempFilePath;
		const thumb = (temp['thumbTempFilePath'] as string | null);
		const _type = (type == 'all' ? getFileType(tempFilePath, temp['type'] as string | null) : type) as "video" | "image"; 
		
		
		if (isOverSize(size, sizeLimit)) {
			oversize?.(temp)
			return
		};
		
		files.push({
			name,
			type: _type,
			url: path,
			path,
			size,
			width,
			height,
			duration,
			thumb,
			percent: 0,
			// status: 'done'
		} as UploadFile)
	})
	return files
}

export function chooseFiles(opts: ChooseFileOptions):Promise<UploadFile[]> {
	return new Promise((resolve, reject)=>{
		if(opts.mediaType == 'image') {
			chooseImage({
				count: opts.count,
				mediaType: opts.mediaType,
				sizeType: opts.sizeType,
				sourceType: opts.sourceType,
				success(result: any){
					const res = result as ChooseImageSuccess
					// #ifndef APP-ANDROID || APP-IOS
					const tempFiles = res.tempFiles as UTSJSONObject[]
					const tempFilePaths = (res.tempFilePaths ?? []) as string[]
					// #endif
					// #ifdef APP-ANDROID || APP-IOS
					const tempFilePaths = res.tempFilePaths
					const tempFiles = res.tempFiles.map((item):UTSJSONObject => {
						return {
							name: item.name, 
							path: item.path, 
							size: item.size, 
							type: item.type
						}
					})
					// #endif
					const files = normalizeChooseFiles('image', tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize)
					resolve(files)
				}
			} as ChooseFileOptions)
		} else if(opts.mediaType == 'video') {
			chooseVideo({
				count: opts.count,
				mediaType: opts.mediaType,
				sourceType: opts.sourceType,
				sizeType: opts.sizeType,
				maxDuration: opts.maxDuration,
				success(result) {
					const res = result as ChooseVideoSuccess 
					// #ifndef APP-ANDROID || APP-IOS
					const tempFilePaths = res.tempFilePaths ?? [res.tempFilePath] as string[]
					const tempFiles = res.tempFiles ?? [res.tempFile] as UTSJSONObject[]
					// #endif
					// #ifdef APP-ANDROID || APP-IOS
					const tempFilePaths = [res.tempFilePath] as string[]
					const {tempFilePath, duration, size, height, width} = res
					const tempFiles = [{path: tempFilePath, duration, duration, size, height, width}] as UTSJSONObject[]
					// #endif
					const files = normalizeChooseFiles('video', tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize)
					
					resolve(files)
				}
			} as ChooseFileOptions)
		} else if(opts.mediaType == 'media') {
			chooseMedia({
				count: opts.count,
				mediaType: 'media',
				sourceType: opts.sourceType,
				maxDuration: opts.maxDuration ?? 10,
				camera: opts.camera ?? 'back',
				sizeType: opts.sizeType,
				success(result: any) {
					// #ifndef UNI-APP-X && APP && uniVersion < 4.51
					const res = result as  ChooseMediaSuccess
					// #ifndef APP-ANDROID || APP-IOS
					const tempFilePaths = res.tempFilePaths ? res.tempFilePaths : res.tempFiles.map((it):string => it.tempFilePath)
					const tempFiles = res.tempFiles//.map((it):UTSJSONObject => ({path: it.tempFilePath, size: it.size, type: it.fileType}));
					// #endif
					// #ifdef APP-ANDROID || APP-IOS
					const tempFilePaths = res.tempFiles.map((it):string => it.tempFilePath)
					const tempFiles = res.tempFiles.map((it):UTSJSONObject => ({path: it.tempFilePath, size: it.size, type: it.fileType}));
					// #endif
					
					const files = normalizeChooseFiles('all', tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize)
					resolve(files)
					// #endif
					// #ifdef UNI-APP-X && APP && uniVersion < 4.51
					reject("【lime-upload】chooseMedia 当前环境不支持")
					// #endif
					
				}
			} as ChooseFileOptions)
		} else {
			chooseAll({
				count: opts.count,
				mediaType: opts.mediaType,
				sourceType: opts.sourceType,
				sizeType: opts.sizeType,
				success(result: any){
					// #ifndef APP-ANDROID || APP-IOS
					const res = result as ChooseFileSuccessCallbackResult
					const tempFilePaths = res.tempFiles
					const tempFiles = res.tempFiles
					const files = normalizeChooseFiles('all', tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize)
					resolve(files)
					// #endif
					
					// #ifdef APP-ANDROID && uniVersion >= 4.51
					
					const res = result as ChooseFileSuccess
					const tempFilePaths = res.tempFilePaths//.map((it):string => it.tempFilePath)
					const tempFiles = res.tempFiles.map((it):UTSJSONObject => ({path: it.path, size: it.size, type: it.type, name: it.name}));
					const files = normalizeChooseFiles('all', tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize)
					resolve(files)
					
					// #endif
					// #ifdef APP-IOS || APP-ANDROID && uniVersion < 4.51
					reject("【lime-upload】chooseAll 当前环境不支持")
					// #endif
					
					// #ifdef uniVersion < 4.51
					
					// const tempFilePaths = res.tempFiles.map((it):string => it.path)
					// const tempFiles = res.tempFiles.map((it):UTSJSONObject => ({name: it.name, path: it.path, size: it.size, type: it.type}));
					// #endif
					// #ifdef uniVersion >= 4.51
					// #ifdef APP-ANDROID || APP-IOS
					
					// const res = result as  ChooseMediaSuccess // ChooseFileSuccess
					// const tempFilePaths = res.tempFiles.map((it):string => it.tempFilePath)
					// const tempFiles = res.tempFiles.map((it):UTSJSONObject => ({path: it.tempFilePath, size: it.size}));
					// const files = normalizeChooseFiles('all', tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize)
					// resolve(files)
					// #endif
					// #endif
				}
			} as ChooseFileOptions)
			
		}
	})
}