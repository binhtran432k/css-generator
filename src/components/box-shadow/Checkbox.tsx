import clsx from "clsx/lite";

export function Checkbox(props: {
	label: string;
	checked: boolean;
	toggleChecked: () => void;
}) {
	return (
		<label class="group relative flex items-center gap-2 cursor-pointer">
			<input
				type="checkbox"
				class="peer w-4 h-0 opacity-0"
				checked={props.checked}
				onChange={props.toggleChecked}
			/>
			<div class="absolute w-4 h-4 top-1/2 left-0 -translate-y-1/2 border border-fg light:border-light-fg rounded opacity-40 group-hover:opacity-100 peer-checked:opacity-100">
				<div
					class={clsx(
						"w-2/3 h-1/3 relative top-2/5 left-1/2 -translate-1/2 -rotate-45 transition",
						"border-l-2 border-b-2 border-l-fg border-b-fg  light:border-l-light-fg light:border-b-light-fg",
						!props.checked && "opacity-0",
					)}
				/>
			</div>
			{props.label}
		</label>
	);
}
