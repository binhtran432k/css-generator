import createStore from "teaful";
import { getIsDarkMode } from "./utils/dark";
import {
	DEFAULT_BOX_SHADOW_LAYER,
	type DBoxShadowLayer,
} from "./utils/boxShadow";

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
		layers: [DEFAULT_BOX_SHADOW_LAYER],
	},
});
