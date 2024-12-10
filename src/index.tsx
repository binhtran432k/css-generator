import {
	LocationProvider,
	Route,
	Router,
	hydrate,
	prerender as ssr,
} from "preact-iso";

import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import "./style.css";
import { pathMap } from "./utils/path.js";

export function App() {
	return (
		<LocationProvider scope={pathMap.base}>
			<Header />
			<main>
				<Router>
					<Route path={pathMap.base} component={Home} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== "undefined") {
	hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data: object) {
	return await ssr(<App {...data} />);
}
