import { useId, useState } from "preact/compat";

import { Card } from "../Card.jsx";

export function Preview() {
	const [color, setColor] = useState("#FFFFFD");
	const [boxColor, setBoxColor] = useState("#3B89DD");

	return (
		<Card
			name="preview"
			label="Preview"
			actionElem={
				<div class="flex gap-2">
					<ColorInput color={color} setColor={setColor} name="background" />
					<ColorInput color={boxColor} setColor={setBoxColor} name="box" />
				</div>
			}
		>
			<div style={{ backgroundColor: color }} class="p-6">
				<div
					style={{
						backgroundColor: boxColor,
						boxShadow: "rgba(0,0,0,0.2) 0px 0px 5px 3px",
					}}
					class="flex w-[12rem] h-[12rem] m-4"
				></div>
			</div>
		</Card>
	);
}

function ColorInput(props: {
	color: string;
	setColor: (color: string) => void;
	name: string;
}) {
	const id = "preview-color-input-" + useId();
	return (
		<div class="relative overflow-hidden">
			<label
				for={id}
				class="p-1 h-8 w-12 cursor-pointer block border rounded border-fg/40 light:border-light-fg/20"
			>
				<div class="w-full h-full" style={{ backgroundColor: props.color }} />
			</label>
			<div class="absolute -pos-left-[9.5rem] pos-top-1/2 w-full h-full opacity-0">
				<input
					type="text"
					id={id}
					value={props.color}
					class="w-full h-full"
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
