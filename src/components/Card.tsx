import clsx from "clsx/lite";
import type { ReactNode, PropsWithChildren } from "preact/compat";

export function Card(
	props: PropsWithChildren<{
		name: string;
		label: string;
		actionElem?: ReactNode;
		footerElem?: ReactNode;
	}>,
) {
	return (
		<section
			class={clsx(
				props.name,
				"bg-bg-alt shadow-md rounded shadow-comment/40 light:bg-light-bg-alt light:shadow-light-comment/40",
			)}
		>
			<div>
				<div class="flex justify-between items-center p-4">
					<h3 class="font-bold">{props.label}</h3>
					{props.actionElem}
				</div>
				{props.children}
			</div>
			{props.footerElem && (
				<div class="border-t border-t-comment light:border-t-light-comment text-sm">
					{props.footerElem}
				</div>
			)}
		</section>
	);
}
