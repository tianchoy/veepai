// @ts-nocheck
export { UploadFile } from '../../index'
export type MediaType = 'image' | 'video';
export type SizeTypeValues = 'original' | 'compressed';
export type SourceTypeValues = 'album' | 'camera';
export type Oversize = (file: any) => void



export type ChooseFileOptions = {
	count: number,
	mediaType: string,
	sizeType: string[],
	sourceType: string[],
	sizeLimit?: number,
	maxDuration?:number,
	camera?: 'back' | 'front' ,
	extension?:string[],
	success?:(res: any) => void,
	fail?:(res: any) => void,
	oversize?: (file: any) => void
}

// export type UploadFile = {
// 	url : string;
// 	name ?: string;
// 	thumb ?: string;
// 	size ?: number;
// 	width ?: number;
// 	height ?: number;
// 	duration ?: number;
// 	type ?: 'image' | 'video';
// 	percent ?: number;
// 	status ?: 'loading' | 'reload' | 'failed' | 'done';
// }

export interface UploadProps {
	name ?: string;
	modelValue ?: UTSJSONObject[];
	/**
	 * 是否禁用组件
	 */
	disabled : boolean;
	readonly : boolean;
	multiple : boolean;
	imageFit : 'scaleToFill'|'aspectFit'|'aspectFill'|'widthFix'|'heightFix'|'top'|'bottom'|'center'|'left'|'right'|'top left'|'top right'|'bottom left'|'bottom right';
	gutter ?: string;
	column ?: number;
	max : number;
	sizeLimit ?: number;
	uploadIcon : string;
	uploadIconSize ?: string;
	gridWidth ?: string;
	gridHeight ?: string;
	gridBgColor?: string;
	addBgColor?: string;
	gridBorderRadius?: string;
	defaultFiles?: UTSJSONObject[];
	loadingText: string; 
	reloadText: string; 
	failedText: string; 
	disablePreview: boolean;
	autoUpload: boolean;
	mediaType: 'image' | 'video' | 'all' | 'media';
	maxDuration?: number;
	sizeType: string[],
	sourceType: string[],
	//上传地址 如需使用uniCloud服务，设置为uniCloud即可
	action?: string;
	//上传的请求头部
	headers?: UTSJSONObject;
	//HTTP 请求中其他额外的 form data
	formData?: UTSJSONObject
	mode: string
}