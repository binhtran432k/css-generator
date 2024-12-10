import { useLocation } from "preact-iso";
import clsx from "clsx/lite";

import { checkPath, pathMap } from "#src/utils/path.js";
import { DarkSwitcher } from "./DarkSwitcher";

export function Header() {
	return (
		<header class="py-5">
			<div class="bg-bg-alt light:bg-light-bg-alt p-5">
				<nav class="container m-auto flex items-center justify-center gap-4">
					<Link href={pathMap.base} label="Home" />
					<Link href={pathMap.boxShadow} label="Box shadow" />
					<ExternalIconLink
						href="https://github.com/binhtran432k/css-generator"
						icon="i-simple-icons-github"
						label="Github"
					/>
					<DarkSwitcher />
				</nav>
			</div>
		</header>
	);
}

function Link(props: { href: string; label: string }) {
	const { url } = useLocation();

	return (
		<a
			href={props.href}
			class={
				checkPath(url, props.href)
					? "color-primary light:color-light-primary"
					: "hover:color-primary hover:light:color-light-primary"
			}
		>
			{props.label}
		</a>
	);
}

function ExternalIconLink(props: {
	href: string;
	label: string;
	icon: string;
}) {
	return (
		<a
			href={props.href}
			class={clsx(props.icon, "hover:color-primary hover:light:color-light-primary")}
			aria-label={props.label}
			target="_blank"
		/>
	);
}
