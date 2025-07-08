// @ts-nocheck
import {isNumeric} from '../isNumeric'
import {isDef} from '../isDef'
/**
 * 给一个值添加单位（像素 px）
 * @param value 要添加单位的值，可以是字符串或数字
 * @returns 添加了单位的值，如果值为 null 则返回 null
 */














function addUnit(value: string): string
function addUnit(value: number): string
function addUnit(value: any|null): string|null  {
  if (!isDef(value)) {
    return null;
  }
  value = `${value}` //value.toString(); // 将值转换为字符串

  // 如果值是数字，则在后面添加单位 "px"，否则保持原始值
  return isNumeric(value) ? `${value}px` : value;
}
export {addUnit}



// __f__('log','at uni_modules/lime-shared/addUnit/index.ts:38',addUnit(100)); // 输出: "100px"
// __f__('log','at uni_modules/lime-shared/addUnit/index.ts:39',addUnit("200")); // 输出: "200px"
// __f__('log','at uni_modules/lime-shared/addUnit/index.ts:40',addUnit("300px")); // 输出: "300px"（已经包含单位）
// __f__('log','at uni_modules/lime-shared/addUnit/index.ts:41',addUnit()); // 输出: undefined（值为 undefined）
// __f__('log','at uni_modules/lime-shared/addUnit/index.ts:42',addUnit(null)); // 输出: undefined（值为 null）