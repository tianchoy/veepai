export interface ProgressProps {
	// percent: number,
	showInfo: boolean,
	infoType: string,
	infoAlign: string,

	strokeColor: string,//|string[],
	trailColor: string,
	linecap: string,
	infoColor: string
	fontSize: any,
	strokeWidth: any,









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