// import {isNumber} from '@/uni_modules/lime-shared/isNumber'
// import {isString} from '@/uni_modules/lime-shared/isString'
// import {isNumeric} from '@/uni_modules/lime-shared/isNumeric'

import BigDecimal from 'java.math.BigDecimal'

export function isNumber(value: any|null):boolean{

	return ['Byte', 'UByte','Short','UShort','Int','UInt','Long','ULong','Float','Double','number'].includes(typeof value)







}
export function isString(value: any|null):boolean{
	return typeof value == 'string';
}
export function isNumeric(value: any|null):boolean{
	if(isNumber(value)) {
		return true
	} else if(isString(value)) {
		// const regex = "-?\\d+(\\.\\d+)?".toRegex()
		const regex = new RegExp("^(-)?\\d+(\\.\\d+)?$")
		return  regex.test(value as string) //regex.matches(value as string) 
	}
	return false
}


export function toBoolean(value: any|null):boolean{

	// 根据输入值的类型，返回相应的布尔值
	if(isNumber(value)){
		return (value as number) != 0;
	}
	if(isString(value)){
		return `${value}`.length > 0;
	}
	if(typeof value == 'boolean'){
		return value as boolean;
	}
	
	return value != null




}

/**
 * Check to see if string passed in is a percentage
 * 检查传入的字符串是否为百分比
 * @hidden
 */
export function isPercentage(n : any) : boolean {
	return isString(n) && (n as string).indexOf('%') != -1;
}

/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * 需要处理 1.0 为 100%，因为一旦它是数字，它与 1 没有区别
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
export function isOnePointZero(n : any) : boolean {
	return isString(n) && (n as string).indexOf('.') != -1 && parseFloat(n as string) == 1;
}


/**
 * Take input from [0, n] and return it as [0, 1]
 * 将输入值从 [0, n] 转换为 [0, 1]
 * @hidden
 */
function bound01(n: string, max: number): number 
function bound01(n: number, max: number): number 



function bound01(n : any, max : number) : number {
	if(!(isNumber(n) || isString(n))){
		return 1
	}
	if (isOnePointZero(n)) {
		n = '100%';
	}

	const isPercent = isPercentage(n);
	n = (isNumber(n) ? n : parseFloat(n as string)) as number
	n = max == 360 ? n : Math.min(max, Math.max(0, n));

	// Automatically convert percentage into number
	// 自动将百分比转换为数字
	if (isPercent) {
		n = parseInt(`${Math.min(n, 100) * max}`, 10) / 100;
	}

	// Handle floating point rounding errors
	//  处理浮点数舍入误差
	
	if ( Math.abs(n - max) < 0.000001) {
		return 1;
	}

	// Convert into [0, 1] range if it isn't already
	// 如果它还不是，将其转换为 [0, 1] 范围
	if (max == 360) {
		// If n is a hue given in degrees,
		// wrap around out-of-range values into [0, 360] range
		// then convert into [0, 1].
		// 如果 n 是以度为单位的色调，
		// 将超出范围的值环绕到 [0, 360] 范围内
		// 然后将其转换为 [0, 1]。
		n = (n < 0 ? (n % max) + max : n % max) / max // parseFloat(`${max}`);
	} else {
		// If n not a hue given in degrees
		// Convert into [0, 1] range if it isn't already.
		// 如果 n 不是以度为单位的色调
		// 如果它还不是，将其转换为 [0, 1] 范围。
		n = (n % max) / max //parseFloat(`${max}`);
	}

	return n;
}
export {bound01}


/**
 * Force a number between 0 and 1
 * 在 0 和 1 之间强制一个数字
 * @hidden
 */
export function clamp01(val : number) : number {
	return Math.min(1, Math.max(0, val));
}





/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * 返回一个有效的 alpha 值 [0,1]，将所有无效值设置为 1
 * @hidden
 */
function boundAlpha(a: number):number
function boundAlpha(a: string):number



function boundAlpha(a: any|null) : number {
	let n = a == null ? 1 : (isString(a) ? parseFloat(a as string) : a as number)

	if (isNaN(n) || n < 0 || n > 1) {
		n = 1;
	}

	return n;
}
export {
	boundAlpha
}
/**
 * Replace a decimal with it's percentage value
 * 用百分比值替换小数
 * number | string
 * @hidden
 */
function convertToPercentage(n:number):number
function convertToPercentage(n:string):string



function convertToPercentage(n:any): any{

	n = isNumeric(n) ? parseFloat(typeof n == 'string' ? n as string : BigDecimal.valueOf((n as number).toDouble()).toPlainString()) : n// as number




	if(isNumber(n) &&  (n as number) <= 1){
		return `${n * 100}%`.replace('.0%','%');
	}
	return n;
}

export {convertToPercentage}

/**
 * Force a hex value to have 2 characters
 * 强制使十六进制值具有 2 个字符
 * @hidden
 */
export function pad2(c : string) : string {
	//c.padStart(2, '0');//
	return c.length == 1 ? '0' + c : `${c}`;
}