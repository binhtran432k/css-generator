import { produce } from "immer";
import { useCallback } from "preact/hooks";

import { MyStore, useStore } from "#src/store.js";

import { Card } from "../Card.jsx";
import { Range } from "./Range.jsx";
import { Checkbox } from "./Checkbox.jsx";
import { ColorPicker } from "./ColorPicker.js";
import { hexToRgb, rgbToHex } from "#src/utils/color.js";

type DRange = {
	name: keyof MyStore["boxShadow"];
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
	const [boxShadowState, setBoxShadowState] = useStore.boxShadow();

	const updateBoxShadow = useCallback((name: DRange["name"], value: any) => {
		setBoxShadowState((state) =>
			produce(state, (draft) => {
				// @ts-expect-error: we use number member only here
				draft[name] = value;
			}),
		);
	}, []);

	const toggleBoxShadow = useCallback((name: DRange["name"]) => {
		setBoxShadowState((state) =>
			produce(state, (draft) => {
				// @ts-expect-error: we use number boolean only here
				draft[name] = !draft[name];
			}),
		);
	}, []);

	return (
		<Card name="generator" label="Box-Shadow CSS Generator">
			<div class="p-4">
				{rangeList.map((range) => (
					<Range
						label={range.label}
						min={range.min}
						max={range.max}
						step={range.step}
						value={boxShadowState[range.name] as number}
						setValue={updateBoxShadow.bind(null, range.name)}
					/>
				))}
				<div class="my-2">
					<Checkbox
						label="Inset"
						checked={boxShadowState.isInset}
						toggleChecked={toggleBoxShadow.bind(null, "isInset")}
					/>
				</div>
				<div class="my-4">
					<ColorPicker
						name="shadow"
						color={rgbToHex(boxShadowState.rgb)}
						setColor={(c) => updateBoxShadow("rgb", hexToRgb(c))}
					/>
				</div>
			</div>
		</Card>
	);
}
