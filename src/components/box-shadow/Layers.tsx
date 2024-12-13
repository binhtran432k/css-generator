import clsx from "clsx/lite";
import { produce } from "immer";
import { useCallback, useState } from "preact/compat";

import { useStore } from "#src/store.js";
import {
	createDefaultBoxShadowLayer,
	type DBoxShadowLayer,
	getBoxShadowLayerText,
} from "#src/utils/boxShadow.js";

export function Layers() {
	const [boxShadow, setBoxShadow] = useStore.boxShadow();
	const [dragIndex, setDragIndex] = useState<number | null>(null);

	const setIndex = useCallback((index: number) => {
		setBoxShadow((state) =>
			produce(state, (draft) => {
				draft.index = index;
			}),
		);
	}, []);

	const addLayer = useCallback(() => {
		setBoxShadow((state) =>
			produce(state, (draft) => {
				draft.layers.push(createDefaultBoxShadowLayer());
			}),
		);
	}, []);

	const deleteLayer = useCallback((index: number) => {
		setBoxShadow((state) =>
			produce(state, (draft) => {
				if (draft.layers.length <= 1) return;
				draft.layers = draft.layers
					.slice(0, index)
					.concat(draft.layers.slice(index + 1));
				if (draft.index >= draft.layers.length)
					draft.index = draft.layers.length - 1;
				else if (index < draft.index) draft.index--;
			}),
		);
	}, []);

	const dragOverLayer = (index: number) => {
		if (index === dragIndex || dragIndex === null) return;

		setBoxShadow((state) =>
			produce(state, (draft) => {
				const tmp = draft.layers[dragIndex];
				draft.layers[dragIndex] = draft.layers[index];
				draft.layers[index] = tmp;

				if (draft.index === dragIndex) draft.index = index;
				else if (draft.index === index) draft.index = dragIndex;
			}),
		);

		setDragIndex(index);
	};

	return (
		<div class="p-4">
			<button
				type="button"
				class="px-3 py-1 rounded bg-bg-alt hover:filter-brightness-90 border border-comment light:bg-light-bg-alt light:border-light-comment"
				onClick={addLayer}
			>
				Add Layer
			</button>
			<div class="mt-4">
				{boxShadow.layers.map((layer, i) => (
					<Layer
						key={layer.id}
						layer={layer}
						isIndex={i === boxShadow.index}
						isDrag={i == dragIndex}
						onClickHandle={
							i === boxShadow.index ? undefined : setIndex.bind(null, i)
						}
						onDeleteHandle={deleteLayer.bind(null, i)}
						onDragStartHandle={setDragIndex.bind(null, i)}
						onDragOverHandle={dragOverLayer.bind(null, i)}
						onDragEndHandle={setDragIndex.bind(null, null)}
					/>
				))}
			</div>
		</div>
	);
}

function Layer(props: {
	layer: DBoxShadowLayer;
	isIndex?: boolean;
	isDrag?: boolean;
	onClickHandle?: () => void;
	onDeleteHandle: () => void;
	onDragStartHandle: () => void;
	onDragOverHandle: () => void;
	onDragEndHandle: () => void;
}) {
	return (
		<div
			class={clsx(
				"flex items-center w-full p-2 filter hover:filter-brightness-90 transition gap-1 cursor-move",
				props.isIndex
					? "bg-primary color-bg light:bg-light-primary light:color-light-bg"
					: props.isDrag
						? "bg-warn color-bg"
						: "bg-bg-alt light:bg-light-bg-alt",
			)}
			onDragStart={props.onDragStartHandle}
			onDragOver={(e) => {
				e.preventDefault();
				props.onDragOverHandle();
			}}
			onDragEnd={props.onDragEndHandle}
			onClick={props.onClickHandle}
			draggable
		>
			<span class="i-material-symbols-drag-indicator text-xl" />
			<span class="grow text-left select-none">
				{getBoxShadowLayerText(props.layer)}
			</span>
			<span class="i-material-symbols-edit text-xl" />
			<button
				class="i-material-symbols-delete text-xl hover:scale-110 transition-transform"
				onClick={(e) => {
					e.stopPropagation();
					props.onDeleteHandle();
				}}
				aria-label="Delete"
			/>
		</div>
	);
}
