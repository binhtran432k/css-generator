import {
	LocationProvider,
	Route,
	Router,
	hydrate,
	prerender as ssr,
} from "preact-iso";
import { useEffect } from "preact/compat";

import { Header } from "./components/Header.jsx";
import { BoxShadow } from "./pages/BoxShadow.jsx";
import { Home } from "./pages/Home.jsx";
import { NotFound } from "./pages/_404.jsx";
import { useDark } from "./hooks/useDark.js";

import { getRoutePath, pathMap } from "./utils/path.js";

import "@unocss/reset/tailwind-compat.css";
import "virtual:uno.css";

import "./style.css";

export function App() {
	const { isDark } = useDark();

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.remove("light");
		} else {
			document.documentElement.classList.add("light");
		}
		Coloris({ themeMode: isDark ? "dark" : "light" });
	}, [isDark]);

	return (
		<LocationProvider scope={pathMap.base}>
			<Header />
			<main>
				<Router>
					<Route path={getRoutePath(pathMap.base)} component={Home} />
					<Route path={getRoutePath(pathMap.boxShadow)} component={BoxShadow} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== "undefined") {
	hydrate(<App />, document.getElementById("app") as HTMLElement);
}

export async function prerender(data: object) {
	return await ssr(<App {...data} />);
}
