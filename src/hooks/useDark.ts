import { useStore } from "#src/store.js";
import { setIsDarkMode } from "#src/utils/dark.js";
import { flushSync, useCallback } from "preact/compat";

const needAppearanceTransition =
	typeof document !== "undefined" &&
	!!document.startViewTransition &&
	!window?.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useDark() {
	const [isDark, setIsDark] = useStore.isDark();

	const toggleDark = useCallback((event: MouseEvent) => {
		toggleDarkHandle(
			setIsDark.bind(null, (oldIsDark) => {
				const isDark = !oldIsDark;
				setIsDarkMode(isDark);
				return isDark;
			}),
			event,
		);
	}, []);

	return { isDark, toggleDark };
}

function toggleDarkHandle(toggleDark: () => void, event: MouseEvent): void {
	if (!needAppearanceTransition || !event) {
		return toggleDark();
	}

	const x = event.clientX;
	const y = event.clientY;
	const endRadius = Math.hypot(
		Math.max(x, innerWidth - x),
		Math.max(y, innerHeight - y),
	);

	const transition = document.startViewTransition(() => flushSync(toggleDark));
	transition.ready.then(() =>
		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${endRadius}px at ${x}px ${y}px)`,
				],
			},
			{
				duration: 300,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)",
			},
		),
	);
}
