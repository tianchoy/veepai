export interface ProgressProps {
	// percent: number,
	showInfo: boolean,
	infoType: string,
	infoAlign: string,
	// #ifdef APP-ANDROID
	strokeColor: string,//|string[],
	trailColor: string,
	linecap: string,
	infoColor: string
	fontSize: any,
	strokeWidth: any,
	// #endif
	// #ifndef APP-ANDROID
	strokeColor?: string,
	trailColor?: string,
	linecap?: string,
	infoColor?: string
	fontSize?: string|number,
	strokeWidth?: string|number,
	// #endif
}

export type LProgressOptions = {
	showInfo?: boolean,
	strokeColor?: string,
	trailColor?: string,
	linecap?: string,
	fontSize?: number,
	infoAlign?: string,
	infoType?: string,
	strokeWidth?: number,
	infoColor?: string
}