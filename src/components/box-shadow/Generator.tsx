import { produce } from "immer";
import { useCallback } from "preact/hooks";

import { useStore } from "#src/store.js";
import type { DBoxShadowLayer } from "#src/utils/boxShadow.js";
import { hexToRgb, rgbToHex } from "#src/utils/color.js";

import { Card } from "../Card.jsx";
import { Checkbox } from "./Checkbox.jsx";
import { ColorPicker } from "./ColorPicker.jsx";
import { Layers } from "./Layers.jsx";
import { Range } from "./Range.jsx";

type DRange = {
	name: keyof DBoxShadowLayer;
	min: number;
	max: number;
	step: number;
	label: string;
};

const rangeList: DRange[] = [
	{ name: "shiftRight", min: -50, max: 50, step: 1, label: "Shift right" },
	{ name: "shiftDown", min: -50, max: 50, step: 1, label: "Shift down" },
	{ name: "spread", min: 0, max: 100, step: 1, label: "Spread" },
	{ name: "blur", min: 0, max: 100, step: 1, label: "Blur" },
	{ name: "opacity", min: 0, max: 100, step: 1, label: "Opacity" },
];

export function Generator() {
	const [boxShadow, setBoxShadow] = useStore.boxShadow();
	const boxShadowLayer = boxShadow.layers[boxShadow.index];

	const updateBoxShadowLayer = useCallback((name: DRange["name"], value: any) => {
		setBoxShadow((state) =>
			produce(state, (draft) => {
				// @ts-expect-error: we use number member only here
				draft.layers[draft.index][name] = value;
			}),
		);
	}, []);

	const toggleBoxShadowLayer = useCallback((name: DRange["name"]) => {
		setBoxShadow((state) =>
			produce(state, (draft) => {
				// @ts-expect-error: we use number boolean only here
				draft.layers[draft.index][name] = !draft.layers[draft.index][name];
			}),
		);
	}, []);

	return (
		<Card
			name="generator"
			label="Box-Shadow CSS Generator"
			footerElem={<Layers />}
		>
			<div class="p-4">
				{rangeList.map((range) => (
					<Range
						label={range.label}
						min={range.min}
						max={range.max}
						step={range.step}
						value={boxShadowLayer[range.name] as number}
						setValue={updateBoxShadowLayer.bind(null, range.name)}
					/>
				))}
				<div class="my-2">
					<Checkbox
						label="Inset"
						checked={boxShadowLayer.isInset}
						toggleCheckedHandle={toggleBoxShadowLayer.bind(null, "isInset")}
					/>
				</div>
				<div class="mt-4">
					<ColorPicker
						name="shadow"
						color={rgbToHex(boxShadowLayer.rgb)}
						setColor={(c) => updateBoxShadowLayer("rgb", hexToRgb(c))}
					/>
				</div>
			</div>
		</Card>
	);
}
