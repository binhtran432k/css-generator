import clsx from "clsx/lite";

export function Checkbox(props: {
	label: string;
	checked: boolean;
	toggleCheckedHandle: () => void;
}) {
	return (
		<label class="group relative flex items-center gap-2 cursor-pointer">
			<input
				type="checkbox"
				class="peer hidden"
				checked={props.checked}
				onChange={props.toggleCheckedHandle}
			/>
			<div class="w-4 h-4 border border-fg light:border-light-fg rounded opacity-40 group-hover:opacity-100 peer-checked:opacity-100">
				<div
					class={clsx(
						"relative w-2/3 h-1/3 top-3/7 left-1/2 -translate-1/2 -rotate-45 transition",
						"border-l-2 border-b-2 border-l-fg border-b-fg  light:border-l-light-fg light:border-b-light-fg",
						!props.checked && "opacity-0",
					)}
				/>
			</div>
			{props.label}
		</label>
	);
}
