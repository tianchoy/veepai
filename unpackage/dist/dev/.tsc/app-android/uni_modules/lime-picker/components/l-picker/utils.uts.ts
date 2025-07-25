// @ts-nocheck
/**
 * 在数组的指定位置插入或更新值。
 * 如果指定的索引小于数组的长度，则更新该位置的值。
 * 如果指定的索引大于或等于数组的长度，则将值添加到数组的末尾。
 *
 * @param {number[]} arr - 要操作的数字数组。
 * @param {number} index - 要插入或更新值的索引位置。
 * @param {number} value - 要插入或更新的值。
 */
export function pushAt<T>(arr: T[], index: number, value: T){

	if (index < arr.length) {
		arr[index] = value;
	} else {
		arr.push(value);
	}




};