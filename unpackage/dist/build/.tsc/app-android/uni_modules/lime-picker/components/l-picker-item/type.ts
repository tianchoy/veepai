// @ts-nocheck
import type{ PickerColumnItem, PickerValue } from '../l-picker/type';

export type ManageChildInList = (child: LPickerItemComponentPublicInstance, shouldAdd: boolean) => void;
export type OnPick = (value: PickerValue, index:number, column: number) => void;
export type UpdateItems = (value: PickerValue, index:number, column: number) => void;

export interface PickerItemProps {
	options: PickerColumnItem[]
	value?: PickerValue;
	column: number
	name?: string|number
}
import { LPickerItemComponentPublicInstance  } from "@/uni_modules/lime-picker/components/l-picker-item/l-picker-item.uvue"