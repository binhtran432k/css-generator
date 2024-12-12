import { defineConfig, presetUno, presetIcons } from "unocss";

export default defineConfig({
	theme: {
		colors: {
			fg: "#F8F8F2",
			bg: "#282A36",
			bgAlt: "#21222C",
			primary: "#BD93F9",
			comment: "#6272A4",
			light: {
				fg: "#282A36",
				bg: "#F8F8F2",
				bgAlt: "#FFFFFD",
				primary: "#8D63D9",
				comment: "#B2C2F4",
			},
		},
	},
	presets: [presetUno(), presetIcons()],
});
