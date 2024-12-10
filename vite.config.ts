import preact from "@preact/preset-vite";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		UnoCSS(),
		preact({
			prerender: {
				enabled: true,
				renderTarget: "#app",
				additionalPrerenderRoutes: ["/404.html"],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: "/404",
			},
		}),
	],
});
