import clsx from "clsx/lite";
import { useId } from "preact/compat";

export function ColorPicker(props: {
	color: string;
	setColor: (color: string) => void;
	name: string;
	isRight?: boolean;
}) {
	const id = "preview-color-input-" + useId();
	return (
		<div class="relative overflow-hidden">
			<label
				for={id}
				class="p-1 h-8 w-12 cursor-pointer block border rounded border-comment light:border-light-comment"
			>
				<div class="w-full h-full" style={{ backgroundColor: props.color }} />
			</label>
			<div
				class={clsx(
					"absolute pos-top-0 w-0 h-full opacity-0",
					props.isRight ? "-pos-left-[9.5rem]": "pos-left-0",
				)}
			>
				<input
					type="text"
					id={id}
					value={props.color}
					class="h-8 w-0"
					onChange={(e) =>
						props.setColor((e.target as unknown as { value: string }).value)
					}
					title={`Choose ${props.name} color`}
					data-coloris
				/>
			</div>
		</div>
	);
}
