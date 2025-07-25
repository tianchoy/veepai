// @ts-nocheck
import { numberInputToObject, rgbaToHex, rgbToHex, rgbToHsl, rgbToHsv } from './conversion';
import { names } from './css-color-names';
import { inputToRGB } from './format-input';
import { HSL, HSLA, HSV, HSVA, HSBA, RGB, RGBA, RGBAString, LColorInfo, LColorFormats, LColorOptions, LColorInput } from '../utssdk/interface.uts';
import { bound01, boundAlpha, clamp01, toBoolean, isNumber } from './util';

export class TinyColor {
	r : number;
	g : number;
	b : number;
	a : number;
	/** 用于创建 limeColor 实例的格式 */
	format ?: LColorFormats;
	/** 传递给构造函数以创建 limeColor 实例的输入 */
	originalInput : LColorInput;
	/** 颜色已被成功解析 */
	isValid : boolean;

	gradientType ?: string;

	/** rounded alpha */
	roundA : number;

	reversedNames : Map<string, string>;

	constructor(color : LColorInput = '', opts : LColorOptions = {} as LColorOptions) {
		let _color : any = color
		// if(color instanceof TinyColor){
		// 	return color as TinyColor
		// } 
		if (isNumber(color)) {
			_color = numberInputToObject(color as number);
		}
		this.originalInput = _color;
		const rgb = inputToRGB(_color);
		this.r = rgb.r;
		this.g = rgb.g;
		this.b = rgb.b;
		this.a = rgb.a;
		this.roundA = Math.round(100 * this.a) / 100;
		this.format = opts.format ?? rgb.format;
		this.gradientType = opts.gradientType;

		// 不要让范围在 [0,255] 中的值返回成 [0,1]。 
		// 这里可能会失去一些精度，但可以解决原来 
		// .5 被解释为总数的半数，而不是1的一半的问题 
		// 如果本来应该是128，那么这个已经在 inputToRgb 中处理过了		if (this.r < 1) {
		if (this.r < 1) {
			this.r = Math.round(this.r);
		}

		if (this.g < 1) {
			this.g = Math.round(this.g);
		}

		if (this.b < 1) {
			this.b = Math.round(this.b);
		}

		this.isValid = rgb.ok ?? false;


		this.reversedNames = new Map<string, string>()
		names.forEach((value : string, key : string) => {
			this.reversedNames.set(value, key)
		})

	}
	/**
	 * 判断当前颜色是否为暗色。
	 * @returns 一个布尔值，表示当前颜色是否为暗色。
	 */
	isDark() : boolean {
		return this.getBrightness() < 128;
	}
	/**
	 * 判断当前颜色是否为亮色。
	 * @returns 一个布尔值，表示当前颜色是否为亮色。
	 */
	isLight() : boolean {
		return !this.isDark();
	}

	/**
	 * 计算当前颜色的亮度值。
	 * 亮度值是根据 RGB 颜色空间中的红、绿、蓝三个通道的值计算得出的，计算公式为：(r * 299 + g * 587 + b * 114) / 1000。
	 * @returns 返回颜色的感知亮度，范围从0-255。
	 */
	getBrightness() : number {
		// http://www.w3.org/TR/AERT#color-contrast
		const rgb = this.toRgb();
		return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	}
	/**
	 * 计算当前颜色的相对亮度值。
	 * 相对亮度值是根据 RGB 颜色空间中的红、绿、蓝三个通道的值计算得出的，计算公式为：0.2126 * R + 0.7152 * G + 0.0722 * B。
	 * @returns 返回颜色的感知亮度，范围从0-1。
	 */
	getLuminance() : number {
		// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
		const rgb = this.toRgb();
		let R : number;
		let G : number;
		let B : number;
		const RsRGB : number = rgb.r / 255;
		const GsRGB : number = rgb.g / 255;
		const BsRGB : number = rgb.b / 255;

		if (RsRGB <= 0.03928) {
			R = RsRGB / 12.92;
		} else {
			// eslint-disable-next-line prefer-exponentiation-operator
			R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
		}

		if (GsRGB <= 0.03928) {
			G = GsRGB / 12.92;
		} else {
			// eslint-disable-next-line prefer-exponentiation-operator
			G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
		}

		if (BsRGB <= 0.03928) {
			B = BsRGB / 12.92;
		} else {
			// eslint-disable-next-line prefer-exponentiation-operator
			B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
		}

		return 0.2126 * R + 0.7152 * G + 0.0722 * B;
	}

	/**
	 * 获取当前颜色的透明度值。
	 * 透明度值的范围是 0 到 1，其中 0 表示完全透明，1 表示完全不透明。
	 * @returns 一个数字，表示当前颜色的透明度值。
	 */
	getAlpha() : number {
		return this.a;
	}

	/**
	 * 设置当前颜色的透明度值。
	 * @param alpha - 要设置的透明度值。透明度值的范围是 0 到 1，其中 0 表示完全透明，1 表示完全不透明。
	 * @returns 一个 `TinyColor` 对象，表示设置透明度后的颜色。
	 */
	setAlpha(alpha ?: string) : TinyColor
	setAlpha(alpha ?: number) : TinyColor
	setAlpha(alpha ?: any) : TinyColor {
		this.a = boundAlpha(alpha);
		this.roundA = Math.round(100 * this.a) / 100;
		return this;
	}
	/**
	 * 判断当前颜色是否为单色。
	 * 单色是指颜色的饱和度（S）为 0 的颜色，这些颜色只有明度（L）变化，没有颜色变化。
	 * @returns 一个布尔值，表示当前颜色是否为单色。
	 */
	isMonochrome() : boolean {
		const { s } = this.toHsl();
		return s == 0;
	}

	/**
	 * 将当前颜色转换为 HSV（色相、饱和度、亮度）颜色空间。
	 * @returns 一个对象，包含四个属性：`h`（色相）、`s`（饱和度）、`v`（亮度）和 `a`（透明度）。
	 */
	toHsv() : HSVA {
		const hsv = rgbToHsv(this.r, this.g, this.b);
		return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a } as HSVA;
	}

	/**
	 * 将当前颜色转换为 HSV（色相、饱和度、亮度）颜色空间的字符串表示。
	 * @returns 一个字符串，表示当前颜色的 HSV 或 HSVA 格式 hsva(xxx, xxx, xxx, xx)。
	 */
	toHsvString() : string {
		const hsv = rgbToHsv(this.r, this.g, this.b);
		const h = Math.round(hsv.h * 360);
		const s = Math.round(hsv.s * 100);
		const v = Math.round(hsv.v * 100);
		return this.a == 1 ? `hsv(${h}, ${s}%, ${v}%)` : `hsva(${h}, ${s}%, ${v}%, ${this.roundA})`;
	}

	/**
	 * 将当前颜色对象转换为HSBA颜色空间,即Hue（色相）、Saturation（饱和度）、Brightness（亮度）和Alpha（透明度
	 * @returns {HSBA} 返回一个HSBA对象，表示当前颜色对象在HSBA颜色空间中的值
	 */
	toHsb() : HSBA {
		const hsv = rgbToHsv(this.r, this.g, this.b);
		return { h: hsv.h * 360, s: hsv.s, b: hsv.v, a: this.a } as HSBA;
	}
	/**
	 * 将当前颜色对象转换为CSS风格的HSB或HSVA字符串
	 * @returns {string} 返回一个CSS风格的HSB或HSVA字符串，表示当前颜色对象的颜色值
	 */
	toHsbString() : string {
		const hsb = this.toHsb();
		const h = Math.round(hsb.h);
		const s = Math.round(hsb.s * 100);
		const b = Math.round(hsb.b * 100);
		return this.a == 1
			? `hsb(${h}, ${s}%, ${b}%)`
			: `hsva(${h}, ${s}%, ${b}%, ${this.roundA})`;
	}
	/**
	 * 将当前颜色转换为 HSL（色相、饱和度、明度）颜色空间。
	 * @returns 一个对象，包含四个属性：`h`（色相）、`s`（饱和度）、`l`（明度）和 `a`（透明度）。
	 */
	toHsl() : HSLA {
		const hsl = rgbToHsl(this.r, this.g, this.b);
		return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a } as HSLA;
	}

	/**
	 * 将当前颜色转换为 HSL（色相、饱和度、明度）颜色空间的字符串表示。
	 * @returns 一个字符串，表示当前颜色的 HSL 或 HSLA 格式 hsla(xxx, xxx, xxx, xx)。
	 */
	toHslString() : string {
		const hsl = rgbToHsl(this.r, this.g, this.b);
		const h = Math.round(hsl.h * 360);
		const s = Math.round(hsl.s * 100);
		const l = Math.round(hsl.l * 100);
		return this.a == 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${this.roundA})`;
	}

	/**
	 * 将当前颜色转换为十六进制颜色表示。
	 * @param allow3Char 是否允许返回简写的十六进制颜色表示（如果可能）。默认值为 `false`。
	 * @returns 一个字符串，表示当前颜色的十六进制格式。
	 */
	toHex(allow3Char = false) : string {
		return rgbToHex(this.r, this.g, this.b, allow3Char);
	}
	/**
	 * 将当前颜色转换为带有井号（`#`）前缀的十六进制颜色表示。
	 * @param allow3Char 是否允许返回简写的十六进制颜色表示（如果可能）。默认值为 `false`。
	 * @returns 一个字符串，表示当前颜色的带有井号前缀的十六进制格式。
	 */
	toHexString(allow3Char = false) : string {
		return '#' + this.toHex(allow3Char);
	}
	/**
	 * 返回颜色的八位十六进制值.
	 * @param allow4Char 如果可能的话，将十六进制值缩短为4个字符
	 */
	toHex8(allow4Char = false) : string {
		return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
	}
	/**
	 * 返回颜色的八位十六进制值，并且值前面带有#符号.
	 * @param allow4Char 如果可能的话，将十六进制值缩短为4个字符
	 */
	toHex8String(allow4Char = false) : string {
		return '#' + this.toHex8(allow4Char);
	}
	/**
	 * 根据颜色的透明度（Alpha值）返回较短的十六进制值，并且值前面带有#符号。
	 * @param allowShortChar 如果可能的话，将十六进制值缩短至3个或4个字符
	 */
	toHexShortString(allowShortChar = false) : string {
		return this.a == 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
	}
	/**
	 * 将当前颜色转换为 RGB（红、绿、蓝）颜色空间的对象表示。
	 * @returns 一个包含 `r`、`g`、`b` 和 `a` 属性的对象，表示当前颜色的 RGB 格式。
	 */
	toRgb() : RGBA {
		return {
			r: Math.round(this.r),
			g: Math.round(this.g),
			b: Math.round(this.b),
			a: this.a,
		} as RGBA;
	}

	/**
	 * 将当前颜色对象转换为CSS风格的RGB或RGBA字符串
	 * @returns {string} 返回一个CSS风格的RGB或RGBA字符串，表示当前颜色对象的颜色值
	 */
	toRgbString() : string {
		const r = Math.round(this.r);
		const g = Math.round(this.g);
		const b = Math.round(this.b);
		return this.a == 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${this.roundA})`;
	}
	/**
	 * 将当前颜色转换为百分比表示的 RGB（红、绿、蓝）颜色空间的对象表示。
	 * @returns 一个包含 `r`、`g`、`b` 和 `a` 属性的对象，表示当前颜色的百分比表示的 RGB 格式。
	 */
	toPercentageRgb() : RGBAString {
		// 定义一个格式化函数，将颜色值转换为百分比表示
		const fmt = (x : number) : string => `${Math.round(bound01(x, 255) * 100)}%`;
		// 返回一个RGBA对象，其中颜色值已转换为百分比表示
		return {
			r: fmt(this.r),
			g: fmt(this.g),
			b: fmt(this.b),
			a: this.a,
		} as RGBAString;
	}
	/**
	 * 将RGBA相对值插值为一个字符串，颜色值以百分比表示。
	 */
	toPercentageRgbString() : string {
		// 定义一个四舍五入函数，将颜色值转换为百分比表示的整数
		const rnd = (x : number) : number => Math.round(bound01(x, 255) * 100);
		// 根据alpha值返回不同的字符串表示
		return this.a == 1
			? `rgb(${rnd(this.r)}%, ${rnd(this.g)}%, ${rnd(this.b)}%)`
			: `rgba(${rnd(this.r)}%, ${rnd(this.g)}%, ${rnd(this.b)}%, ${this.roundA})`;
	}
	/**
	 * 返回这个颜色的'真实'名称,不存在返回null
	 */
	toName() : string | null {
		if (this.a == 0) {
			return 'transparent';
		}

		if (this.a < 1) {
			return null;
		}
		const hex = this.toHexString()//'#' + rgbToHex(this.r, this.g, this.b, false);












		return this.reversedNames.get(hex)

	}
	/**
	 * 将颜色转换为字符串表示。
	 *
	 * @param format - 用于显示字符串表示的格式。
	 */
	// toString<T extends 'name'>(format : T) : string;
	// toString<T extends LColorFormats>(format ?: T) : string;


	override toString() : string {
		return this.toString(null)
	}

	toString(format ?: LColorFormats) : string {
		const formatSet = toBoolean(format);
		let _format = format ?? this.format;

		let formattedString : string | null = null;
		const hasAlpha = this.a < 1 && this.a >= 0;
		const needsAlphaFormat = !formatSet && hasAlpha && (_format != null && _format.startsWith('hex') || _format == 'name');

		if (needsAlphaFormat) {
			// 特殊情况：透明度，所有其他非透明度格式都会在有透明度时返回rgba。
			// 当透明度为0时，返回"transparent"。
			if (_format == 'name' && this.a == 0) {
				return this.toName() ?? 'transparent';
			}
			return this.toRgbString();
		}

		if (_format == 'rgb') {
			formattedString = this.toRgbString();
		}

		if (_format == 'prgb') {
			formattedString = this.toPercentageRgbString();
		}

		if (_format == 'hex' || _format == 'hex6') {
			formattedString = this.toHexString();
		}

		if (_format == 'hex3') {
			formattedString = this.toHexString(true);
		}

		if (_format == 'hex4') {
			formattedString = this.toHex8String(true);
		}

		if (_format == 'hex8') {
			formattedString = this.toHex8String();
		}

		if (_format == 'name') {
			formattedString = this.toName();
		}

		if (_format == 'hsl') {
			formattedString = this.toHslString();
		}

		if (_format == 'hsv') {
			formattedString = this.toHsvString();
		}
		if (_format == 'hsb') {
			formattedString = this.toHsbString();
		}
		return formattedString ?? this.toHexString();
	}
	toNumber() : number {
		return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
	}
	clone() : TinyColor {
		return new TinyColor(this.toString());
	}
	/**
	 * 将颜色变浅指定的量。提供100将始终返回白色。
	 * @param amount - 有效值介于1-100之间
	 */
	lighten(amount = 10) : TinyColor {
		const hsl = this.toHsl();
		hsl.l += amount / 100;
		hsl.l = clamp01(hsl.l);
		return new TinyColor(hsl, { format: this.format } as LColorOptions);
	}
	/**
	 * 将颜色变亮一定的量，范围从0到100。
	 * @param amount - 有效值在1-100之间
	 */
	brighten(amount = 10) : TinyColor {
		const rgb = this.toRgb();
		rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
		rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
		rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
		return new TinyColor(rgb, { format: this.format } as LColorOptions);
	}
	/**
	 * 将颜色变暗一定的量，范围从0到100。
	 * 提供100将始终返回黑色。
	 * @param amount - 有效值在1-100之间
	 */
	darken(amount = 10) : TinyColor {
		const hsl = this.toHsl();
		hsl.l -= amount / 100;
		hsl.l = clamp01(hsl.l);
		return new TinyColor(hsl, { format: this.format } as LColorOptions);
	}
	/**
	 * 将颜色与纯白色混合，范围从0到100。
	 * 提供0将什么都不做，提供100将始终返回白色。
	 * @param amount - 有效值在1-100之间
	 */
	tint(amount = 10) : TinyColor {
		return this.mix('white', amount);
	}
	/**
	 * 将颜色与纯黑色混合，范围从0到100。
	 * 提供0将什么都不做，提供100将始终返回黑色。
	 * @param amount - 有效值在1-100之间
	 */
	shade(amount = 10) : TinyColor {
		return this.mix('black', amount);
	}
	/**
	 * 将颜色的饱和度降低一定的量，范围从0到100。
	 * 提供100与调用greyscale相同
	 * @param amount - 有效值在1-100之间
	 */
	desaturate(amount = 10) : TinyColor {
		const hsl = this.toHsl();
		hsl.s -= amount / 100;
		hsl.s = clamp01(hsl.s);
		return new TinyColor(hsl, { format: this.format } as LColorOptions);
	}
	/**
	 * 将颜色饱和度提高一定数量，范围从 0 到 100。
	 * @param amount - 有效值介于 1 到 100 之间。
	 */
	saturate(amount = 10) : TinyColor {
		const hsl = this.toHsl();
		hsl.s += amount / 100;
		hsl.s = clamp01(hsl.s);
		return new TinyColor(hsl, { format: this.format } as LColorOptions);
	}
	/**
	 * 将颜色完全去饱和为灰度。
	 * 等同于调用 `desaturate(100)`。
	 */
	greyscale() : TinyColor {
		return this.desaturate(100);
	}
	/**
	 * spin 方法接收一个正数或负数作为参数，表示色相的变化量，变化范围在 [-360, 360] 之间。
	 * 如果提供的值超出此范围，它将被限制在此范围内。
	 */
	spin(amount : number) : TinyColor {
		const hsl = this.toHsl();
		const hue = (hsl.h + amount) % 360;
		hsl.h = hue < 0 ? 360 + hue : hue;
		return new TinyColor(hsl, { format: this.format } as LColorOptions);
	}
	/**
	 * 将当前颜色与另一种颜色按给定的比例混合，范围从0到100。
	 * 0表示不混合（返回当前颜色）
	 */
	mix(color : LColorInput, amount = 50) : TinyColor {
		const rgb1 = this.toRgb();
		const rgb2 = new TinyColor(color).toRgb();

		const p = amount / 100;
		const rgba = {
			r: (rgb2.r - rgb1.r) * p + rgb1.r,
			g: (rgb2.g - rgb1.g) * p + rgb1.g,
			b: (rgb2.b - rgb1.b) * p + rgb1.b,
			a: (rgb2.a - rgb1.a) * p + rgb1.a,
		};

		return new TinyColor(rgba, { format: this.format } as LColorOptions);
	}
	/**
	 * 生成一组与当前颜色相似的颜色。
	 * 这些颜色在色相环上是相邻的，形成一个类似于彩虹的颜色序列。
	 * @param results - 要生成的相似颜色的数量，默认值为 6。
	 * @param slices - 将色相环划分为多少个部分，默认值为 30。
	 * @returns 一个包含当前颜色及其相似颜色的 TinyColor 对象数组。
	 */
	analogous(results = 6, slices = 30) : TinyColor[] {
		const hsl = this.toHsl();
		const part = 360 / slices;
		const ret : TinyColor[] = [this];
		let _results = results
		// for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
		// 	hsl.h = (hsl.h + part) % 360;
		// 	ret.push(new TinyColor(hsl));
		// }
		hsl.h = (hsl.h - ((part * _results) >> 1) + 720) % 360;
		while (_results > 0) {
			hsl.h = (hsl.h + part) % 360;
			ret.push(new TinyColor(hsl));
			_results--;
		}
		return ret;
	}
	/**
	 * 计算当前颜色的补色。
	 * 补色是指在色相环上相对位置的颜色，它们的色相差为 180°。
	 * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
	 * @returns 一个 TinyColor 对象，表示当前颜色的补色。
	 */
	complement() : TinyColor {
		const hsl = this.toHsl();
		hsl.h = (hsl.h + 180) % 360;
		return new TinyColor(hsl, { format: this.format } as LColorOptions);
	}
	/**
	 * 生成一组与当前颜色具有相同色相和饱和度的颜色。
	 * 这些颜色的亮度值不同，形成一个单色调的颜色序列。
	 * @param results - 要生成的单色调颜色的数量，默认值为 6。
	 * @returns 一个包含当前颜色及其单色调颜色的 TinyColor 对象数组。
	 */
	monochromatic(results = 6) : TinyColor[] {
		const hsv = this.toHsv();
		const { h } = hsv;
		const { s } = hsv;
		let { v } = hsv;
		const res : TinyColor[] = [];
		const modification = 1 / results;
		let _results = results
		// while (results--) {
		// 	res.push(new TinyColor({ h, s, v }));
		// 	v = (v + modification) % 1;
		// }
		while (_results > 0) {
			res.push(new TinyColor({ h, s, v }));
			v = (v + modification) % 1;
			_results--
		}
		return res;
	}
	/**
	 * 生成当前颜色的分裂补色。
	 * 分裂补色是指在色相环上位于当前颜色的两侧的颜色，它们的色相差为 180°。
	 * @returns 一个包含当前颜色及其分裂补色的 TinyColor 对象数组。
	 */
	splitcomplement() : TinyColor[] {
		const hsl = this.toHsl();
		const { h } = hsl;
		return [
			this,
			new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
			new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
		] as TinyColor[];
	}
	/**
	 * 计算当前颜色在给定背景颜色上的显示效果。
	 * @param background - 背景颜色，可以是任何 LColorInput 类型的值。
	 * @returns 一个 TinyColor 对象，表示当前颜色在给定背景颜色上的显示效果。
	 */
	onBackground(background : LColorInput) : TinyColor {
		const fg = this.toRgb();
		const bg = new TinyColor(background).toRgb();
		const alpha = fg.a + bg.a * (1 - fg.a);

		return new TinyColor({
			r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
			g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
			b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
			a: alpha,
		});
	}
	/**
	 * 生成当前颜色的三色调。
	 * 三色调是指在色相环上位于当前颜色的两侧的颜色，它们的色相差为 120°。
	 * 这是 `polyad(3)` 方法的别名。
	 * @returns 一个包含当前颜色及其三色调颜色的 TinyColor 对象数组。
	 */
	triad() : TinyColor[] {
		return this.polyad(3);
	}
	/**
	 * 生成当前颜色的四色调。
	 * 四色调是指在色相环上位于当前颜色的两侧的颜色，它们的色相差为 90°。
	 * 这是 `polyad(4)` 方法的别名。
	 * @returns 一个包含当前颜色及其四色调颜色的 TinyColor 对象数组。
	 */
	tetrad() : TinyColor[] {
		return this.polyad(4);
	}
	/**
	 * 生成当前颜色的 n 色调。
	 * n 色调是指在色相环上位于当前颜色的两侧的颜色，它们的色相差为 360° / n。
	 * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
	 * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
	 * @param n - 一个整数，表示要生成的色调数量。
	 * @returns 一个包含当前颜色及其 n 色调颜色的 TinyColor 对象数组。
	 */
	polyad(n : number) : TinyColor[] {
		const hsl = this.toHsl();
		const { h } = hsl;

		const result : TinyColor[] = [this];
		const increment = 360 / n;
		for (let i = 1; i < n; i++) {
			result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
		}

		return result;
	}
	/**
	 * 比较当前颜色与给定颜色是否相等。
	 * @param color - 一个 LColorInput 类型的值，表示要比较的颜色。
	 * @returns 一个布尔值，表示当前颜色与给定颜色是否相等。
	 */












	override equals(other ?: LColorInput) : boolean {
		if (other == null) {
			return false
		} else if (other instanceof TinyColor) {
			return this.toRgbString() == (other as TinyColor).toRgbString()
		}
		return this.toRgbString() == new TinyColor(other).toRgbString();
	}

}

export function tinyColor(color : LColorInput = '', opts : LColorOptions = {} as LColorOptions) : TinyColor {
	return new TinyColor(color, opts);
}