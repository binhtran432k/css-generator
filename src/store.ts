import createStore from "teaful";
import { getIsDarkMode } from "./utils/dark";

type MyStore = {
	isDark: boolean;
};

export const { useStore } = createStore<MyStore>({
	isDark: getIsDarkMode(),
});
