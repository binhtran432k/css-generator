import createStore from "teaful";
import { getIsDarkMode } from "./utils/dark";
import type { DBoxShadow } from "./utils/boxShadow";

export type MyStore = {
	isDark: boolean;
	boxShadow: DBoxShadow;
};

export const { useStore } = createStore<MyStore>({
	isDark: getIsDarkMode(),
	boxShadow: {
    rgb: [0, 0, 0],
		shiftRight: 0,
		shiftDown: 0,
		spread: 3,
		blur: 5,
		opacity: 20,
    isInset: false,
	},
});
