// @ts-nocheck
import { HSL, HSLA, HSV, HSVA, HSB, HSBA,RGB, RGBA, LColorInfo, LColorFormats } from '../utssdk/interface.uts';
import { convertHexToDecimal, hslToRgb, hsvToRgb, parseIntFromHex, rgbToRgb } from './conversion';
import { names } from './css-color-names';
import { boundAlpha, convertToPercentage, toBoolean } from './util';
type ColorMatchers = {
	CSS_UNIT : RegExp,
	rgb : RegExp,
	rgba : RegExp,
	hsl : RegExp,
	hsla : RegExp,
	hsv : RegExp,
	hsva : RegExp,
	hsb : RegExp,
	hsba : RegExp,
	hex3 : RegExp,
	hex6 : RegExp,
	hex4 : RegExp,
	hex8 : RegExp,
}





// <http://www.w3.org/TR/css3-values/#integers>
const CSS_INTEGER = '[-\\+]?\\d+%?';

// <http://www.w3.org/TR/css3-values/#number-value>
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';

// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
// 允许正负整数/数字。不要捕获要么/或者，只需捕获整个结果。
const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`;

// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
// 实际匹配。
// 圆括号和逗号是可选的，但不是必需的。
// 空格可以代替逗号或左括号
const PERMISSIVE_MATCH3 = '[\\s|\\(]+(' +
	CSS_UNIT +
	')[,|\\s]+(' +
	CSS_UNIT +
	')[,|\\s]+(' +
	CSS_UNIT +
	')\\s*\\)?';;
// const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;
const PERMISSIVE_MATCH4 = '[\\s|\\(]+(' +
	CSS_UNIT +
	')[,|\\s]+(' +
	CSS_UNIT +
	')[,|\\s]+(' +
	CSS_UNIT +
	')[,|\\s]+(' +
	CSS_UNIT +
	')\\s*\\)?';
// const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;

export const matchers = {
	CSS_UNIT: new RegExp(CSS_UNIT),
	rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
	rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
	hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
	hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
	hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
	hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
	hsb: new RegExp('hsb' + PERMISSIVE_MATCH3),
	hsba: new RegExp('hsba' + PERMISSIVE_MATCH4),
	hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
} as ColorMatchers;

/**
 * Check to see if it looks like a CSS unit
 * 检查它是否看起来像一个 CSS 单位
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color : string) : boolean
function isValidCSSUnit(color : number) : boolean



function isValidCSSUnit(color : any|null) : boolean {
	return toBoolean(matchers.CSS_UNIT.exec(`${color}`));
}
export { isValidCSSUnit }

function inputToRGB(color : string) : LColorInfo
function inputToRGB(color : RGB) : LColorInfo
function inputToRGB(color : RGBA) : LColorInfo
function inputToRGB(color : HSL) : LColorInfo
function inputToRGB(color : HSLA) : LColorInfo
function inputToRGB(color : HSV) : LColorInfo
function inputToRGB(color : HSVA) : LColorInfo
function inputToRGB(color : HSB) : LColorInfo
function inputToRGB(color : HSBA) : LColorInfo
function inputToRGB(color : any) : LColorInfo {
	let _color: UTSJSONObject|null = null
	let rgb = { r: 0, g: 0, b: 0 } as RGB;
	let a:any = 1;
	let s: any | null;
	let v: any | null;
	let l: any | null;
	let ok = false;
	let format: LColorFormats | null = null;
	
	if (typeof color == 'string') {
		_color = stringInputToObject(color as string);
	} else if(typeof color == 'object'){
		_color = JSON.parse(JSON.stringify(color)) as UTSJSONObject
	} else {
		// _color = {} as UTSJSONObject
	}
	if(_color != null){
		if (isValidCSSUnit(_color['r']) && isValidCSSUnit(_color['g']) && isValidCSSUnit(_color['b'])){
			rgb = rgbToRgb(_color['r']!, _color['g']!, _color['b']!);
			ok = true;
			format = `${_color['r']}`.endsWith('%') ? 'prgb' : 'rgb';
		} else if(isValidCSSUnit(_color['h']) && isValidCSSUnit(_color['s']) && (isValidCSSUnit(_color['v']) || isValidCSSUnit(_color['b'])) ){
			const isHSV = _color['v'] != null
			s = convertToPercentage(_color['s']!);
			v = isHSV ? convertToPercentage(_color['v']!) : convertToPercentage(_color['b']!);
			rgb = hsvToRgb(_color['h']!, s, v);
			ok = true;
			format = isHSV ? 'hsv' : 'hsb';
		} else if(isValidCSSUnit(_color['h']) && isValidCSSUnit(_color['s']) && isValidCSSUnit(_color['l'])){
			s = convertToPercentage(_color['s']!);
			l = convertToPercentage(_color['l']!);

			rgb = hslToRgb(_color['h']!, s, l);
			ok = true;
			format = 'hsl';
		}
		if(_color['a']!=null){
			a = _color['a']!;
		}
	}
	a = boundAlpha(a);
	return {
		ok,
		format: _color?.['format'] as (string | null) ?? format,
		r: Math.min(255, Math.max(rgb.r, 0)),
		g: Math.min(255, Math.max(rgb.g, 0)),
		b: Math.min(255, Math.max(rgb.b, 0)),
		a,
	} as LColorInfo
}

export {
	inputToRGB
}

/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */

export function stringInputToObject(color : string) : UTSJSONObject | null {
	let _color = color.trim().toLowerCase();
	if (_color.length == 0) {
		return null;
	}
	let named = false;
	if (names.get(_color) != null) {
		_color = names.get(_color)!;
		named = true;
	} else if (_color == 'transparent') {
		return { r: 0, g: 0, b: 0, a: 0, format: 'name' } as UTSJSONObject;
		// return new Map([
		// 	['r', 0],
		// 	['g', 0],
		// 	['b', 0],
		// 	['a', 0],
		// 	['format', 'name'],
		// ])
	}
	// Try to match string input using regular expressions.
	// Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
	// Just return an object and let the conversion functions handle that.
	// This way the result will be the same whether the tinycolor is initialized with string or object.

	let match = matchers.rgb.exec(_color);
	if (match != null) {
		const r = match[1]
		const g = match[2]
		const b = match[3]
                                     
		return { r, g, b } as UTSJSONObject;
		// return new Map([
		// 	['r', match[1]],
		// 	['g', match[2]],
		// 	['b', match[3]],
		// ])
	}

	match = matchers.rgba.exec(_color);
	if (match != null) {
		const r = match[1]
		const g = match[2]
		const b = match[3]
		const a = match[4]
		return { r, g, b, a } as UTSJSONObject;
		// return new Map([
		// 	['r', match[1]],
		// 	['g', match[2]],
		// 	['b', match[3]],
		// 	['a', match[4]],
		// ])
	}

	match = matchers.hsl.exec(_color);
	if (match != null) {
		const h = match[1]
		const s = match[2]
		const l = match[3]
		return { h, s, l } as UTSJSONObject;
		// return new Map([
		// 	['h', match[1]],
		// 	['s', match[2]],
		// 	['l', match[3]],
		// ])
	}

	match = matchers.hsla.exec(_color);
	if (match != null) {
		const h = match[1]
		const s = match[2]
		const l = match[3]
		const a = match[4]
		return { h, s, l, a } as UTSJSONObject;
		// return new Map([
		// 	['h', match[1]],
		// 	['s', match[2]],
		// 	['l', match[3]],
		// 	['a', match[4]],
		// ])
	}

	match = matchers.hsv.exec(_color);
	if (match != null) {
		const h = match[1]
		const s = match[2]
		const v = match[3]
		return { h, s, v } as UTSJSONObject;
		// return new Map([
		// 	['h', match[1]],
		// 	['s', match[2]],
		// 	['v', match[3]],
		// ])
	}

	match = matchers.hsva.exec(_color);
	if (match != null) {
		const h = match[1]
		const s = match[2]
		const v = match[3]
		const a = match[4]
		return { h, s, v, a } as UTSJSONObject;
		// return new Map([
		// 	['h', match[1]],
		// 	['s', match[2]],
		// 	['v', match[3]],
		// 	['a', match[4]],
		// ])
	}

	match = matchers.hex8.exec(_color);
	if (match != null) {
		const r = parseIntFromHex(match[1]!)
		const g = parseIntFromHex(match[2]!)
		const b = parseIntFromHex(match[3]!)
		const a = convertHexToDecimal(match[4]!)
		return {
		  r,
		  g,
		  b,
		  a,
		  format: named ? 'name' : 'hex8',
		} as UTSJSONObject;
		// return new Map([
		// 	['r', parseIntFromHex(match[1])],
		// 	['g', parseIntFromHex(match[2])],
		// 	['b', parseIntFromHex(match[3])],
		// 	['a', convertHexToDecimal(match[4])],
		// 	['format', named ? 'name' : 'hex8'],
		// ])
	}

	match = matchers.hex6.exec(_color);
	if (match != null) {
		const r = parseIntFromHex(match[1]!)
		const g = parseIntFromHex(match[2]!)
		const b = parseIntFromHex(match[3]!)
		// const a = parseIntFromHex(match[4])
		return {
		  r,
		  g,
		  b,
		  format: named ? 'name' : 'hex',
		} as UTSJSONObject;
		// return new Map([
		// 	['r', parseIntFromHex(match[1])],
		// 	['g', parseIntFromHex(match[2])],
		// 	['b', parseIntFromHex(match[3])],
		// 	['format', named ? 'name' : 'hex'],
		// ])
	}

	match = matchers.hex4.exec(_color);
	if (match != null) {
		const r = parseIntFromHex((match[1] + match[1]))
		const g = parseIntFromHex((match[2] + match[2]))
		const b = parseIntFromHex((match[3] + match[3]))
		const a = convertHexToDecimal((match[4] + match[4]))
		return {
		  r,
		  g,
		  b,
		  a,
		  format: named ? 'name' : 'hex8',
		} as UTSJSONObject;
		// return new Map([
		// 	['r', parseIntFromHex(match[1] + match[1])],
		// 	['g', parseIntFromHex(match[2] + match[2])],
		// 	['b', parseIntFromHex(match[3] + match[3])],
		// 	['a', convertHexToDecimal(match[4] + match[4])],
		// 	['format', named ? 'name' : 'hex8'],
		// ])
	}

	match = matchers.hex3.exec(_color);
	if (match != null) {
		const r = parseIntFromHex((match[1] + match[1]))
		const g = parseIntFromHex((match[2] + match[2]))
		const b = parseIntFromHex((match[3] + match[3]))
		return {
		  r,
		  g,
		  b,
		  format: named ? 'name' : 'hex',
		} as UTSJSONObject;
		// return new Map([
		// 	['r', parseIntFromHex(match[1] + match[1])],
		// 	['g', parseIntFromHex(match[2] + match[2])],
		// 	['b', parseIntFromHex(match[3] + match[3])],
		// 	['format', named ? 'name' : 'hex'],
		// ])
	}
	return null
}


