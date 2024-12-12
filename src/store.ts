import createStore from "teaful";

import {
	createDefaultBoxShadowLayer,
	type DBoxShadowLayer,
} from "./utils/boxShadow.js";
import { getIsDarkMode } from "./utils/dark.js";

export type MyStore = {
	isDark: boolean;
	boxShadow: {
		index: number;
		layers: DBoxShadowLayer[];
	};
};

export const { useStore } = createStore<MyStore>({
	isDark: getIsDarkMode(),
	boxShadow: {
		index: 0,
		layers: [createDefaultBoxShadowLayer()],
	},
});
