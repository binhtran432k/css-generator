const IS_DARK_KEY = "isDark";

export const setIsDarkMode =
	typeof window !== "undefined"
		? (isDark: boolean) => {
				window.localStorage.setItem(IS_DARK_KEY, isDark ? "1" : "0");
			}
		: (_isDark: boolean) => {};

export const getIsDarkMode =
	typeof window !== "undefined"
		? () => {
				const isDarkStorage = window.localStorage.getItem(IS_DARK_KEY);
				if (isDarkStorage === null)
					return !window.matchMedia("(prefers-color-scheme: light)").matches;
				return isDarkStorage === "1";
			}
		: () => true;
