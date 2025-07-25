// @ts-nocheck
/**
 * 将一个值限制在指定的范围内
 * @param val 要限制的值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的值
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}


// __f__('log','at uni_modules/lime-shared/clamp/index.ts:14',clamp(5 ,0, 10)); // 输出: 5（在范围内，不做更改）
// __f__('log','at uni_modules/lime-shared/clamp/index.ts:15',clamp(-5 ,0, 10)); // 输出: 0（小于最小值，被限制为最小值）
// __f__('log','at uni_modules/lime-shared/clamp/index.ts:16',clamp(15 ,0, 10)); // 输出: 10（大于最大值，被限制为最大值）