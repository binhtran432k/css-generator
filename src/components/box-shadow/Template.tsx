import { produce } from "immer";
import { useCallback, useState } from "preact/compat";

import { useStore } from "#src/store.js";
import {
	createBoxShadowLayer,
	DBoxShadowLayer,
	getBoxShadowValue,
} from "#src/utils/boxShadow.js";

import { Card } from "../Card.jsx";

const templates: Readonly<Omit<DBoxShadowLayer, "id">[][]> = [
	[
		{
			rgb: [40, 159, 237],
			opacity: 100,
			shiftRight: 5,
			shiftDown: 5,
			blur: 0,
			spread: 0,
			isInset: false,
		},
		{
			rgb: [95, 184, 255],
			opacity: 100,
			shiftRight: 10,
			shiftDown: 10,
			blur: 0,
			spread: 0,
			isInset: false,
		},
		{
			rgb: [161, 216, 255],
			opacity: 100,
			shiftRight: 15,
			shiftDown: 15,
			blur: 0,
			spread: 0,
			isInset: false,
		},
		{
			rgb: [202, 230, 255],
			opacity: 100,
			shiftRight: 20,
			shiftDown: 20,
			blur: 0,
			spread: 0,
			isInset: false,
		},
		{
			rgb: [225, 238, 255],
			opacity: 100,
			shiftRight: 25,
			shiftDown: 25,
			blur: 0,
			spread: 0,
			isInset: false,
		},
	],
	[
		{
			rgb: [255, 255, 255],
			opacity: 100,
			shiftRight: -1,
			shiftDown: 0,
			blur: 4,
			spread: 0,
			isInset: false,
		},
		{
			rgb: [255, 255, 0],
			opacity: 100,
			shiftRight: -2,
			shiftDown: 0,
			blur: 10,
			spread: 0,
			isInset: false,
		},
		{
			rgb: [255, 128, 0],
			opacity: 100,
			shiftRight: -10,
			shiftDown: 0,
			blur: 20,
			spread: 0,
			isInset: false,
		},
		{
			rgb: [255, 0, 0],
			opacity: 100,
			shiftRight: -18,
			shiftDown: 0,
			blur: 40,
			spread: 0,
			isInset: false,
		},
	],
];

export function Template() {
	const [, setBoxShadow] = useStore.boxShadow();
	const [reverses, setReverses] = useState(templates.map(() => false));

	const reverseIndex = useCallback((index: number) => {
		setReverses((xs) => {
			xs[index] = !xs[index];
			return xs;
		});
	}, []);

	const applyTemplate = useCallback((index: number) => {
		setBoxShadow((state) =>
			produce(state, (draft) => {
				const layers = templates[index].map(createBoxShadowLayer);

				if (reverses[index]) layers.reverse();
				reverseIndex(index);

				draft.layers = layers;
				draft.index = 0;
			}),
		);
	}, []);

	return (
		<Card name="template" label="Template">
			<div class="flex flex-wrap p-4 gap-4 mt-2 mb-8">
				{templates.map((t, i) => (
					<button
						class="w-12 h-12 bg-info hover:border hover:border-comment"
						style={{ boxShadow: getBoxShadowValue(t) }}
						onClick={applyTemplate.bind(null, i)}
						aria-label={`Template ${i}`}
					/>
				))}
			</div>
		</Card>
	);
}
