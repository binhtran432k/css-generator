import { useId } from "preact/compat";

export function Range(props: {
	label: string;
	min: number;
	max: number;
	value: number;
	setValue: (x: number) => void;
	step?: number;
}) {
	const id = "range-" + useId();
	const percent = Math.round(
		((props.value - props.min) / (props.max - props.min)) * 100,
	);
	return (
		<div class="relative">
			<label for={id}>{props.label}</label>
			<div class="relative py-4 peer group z-2">
				<div class="relative h-1 w-full bg-comment light:bg-light-comment cursor-pointer rounded">
					<div
						class="absolute h-1 bg-primary cursor-pointer rounded light:bg-light-primary"
						style={{ width: `${percent}%` }}
					/>
				</div>
				<div
					class="absolute top-1/2 -translate-1/2 w-6 h-6 bg-fg border-2 rounded-1/2 border-comment light:border-light-comment group-hover:border-primary transition light:group-hover:border-light-primary"
					style={{
						left: `${percent}%`,
					}}
				/>
				<input
					id={id}
					type="range"
					min={props.min}
					max={props.max}
					value={props.value}
					step={props.step}
					class="absolute top-0 left-0 w-full h-full appearance-none opacity-0 cursor-pointer"
					// @ts-expect-error: e.target has value
					onChange={(e) => props.setValue(e.target.value)}
				/>
			</div>
			<div
				class="peer-hover:block hidden absolute -top-1/6 -translate-x-1/2 text-sm z-3"
				style={{
					left: `${percent}%`,
				}}
			>
				<div class="animate-fade-in-up animate-duration-150 w-8 h-8 flex justify-center items-center bg-light-bg color-light-fg rounded light:bg-bg light:color-fg">
					{props.value}
				</div>
			</div>
		</div>
	);
}
