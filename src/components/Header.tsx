import { useLocation } from "preact-iso";

import { checkPath, pathMap } from "../utils/path.js";

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<a href={pathMap.base} class={checkPath(url, pathMap.base) && "active"}>
					Home
				</a>
				<a
					href={pathMap.notFound}
					class={checkPath(url, pathMap.notFound) && "active"}
				>
					404
				</a>
			</nav>
		</header>
	);
}
