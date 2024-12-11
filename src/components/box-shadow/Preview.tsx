import { useState } from "preact/compat";

import { useStore } from "#src/store.js";
import { getBoxShadow } from "#src/utils/boxShadow.js";

import { Card } from "../Card.jsx";
import { ColorPicker } from "./ColorPicker.jsx";

export function Preview() {
	const [color, setColor] = useState("#FFFFFD");
	const [boxColor, setBoxColor] = useState("#3B89DD");
	const [boxShadowState] = useStore.boxShadow();

	return (
		<Card
			name="preview"
			label="Preview"
			actionElem={
				<div class="flex gap-2">
					<ColorPicker color={color} setColor={setColor} name="background" isRight />
					<ColorPicker color={boxColor} setColor={setBoxColor} name="box" isRight />
				</div>
			}
		>
			<div style={{ backgroundColor: color }} class="p-6">
				<div
					style={{
						backgroundColor: boxColor,
						boxShadow: getBoxShadow(boxShadowState),
					}}
					class="flex w-[12rem] h-[12rem] m-4 transition relative"
				></div>
			</div>
		</Card>
	);
}
