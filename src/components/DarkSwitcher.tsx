import { useDark } from "#src/hooks/useDark.js";

export function DarkSwitcher() {
	const { toggleDark } = useDark();
	return (
		<button
			class="i-material-symbols-dark-mode light:i-material-symbols-light-mode"
			onClick={toggleDark}
			aria-label="Dark Switcher"
		/>
	);
}
