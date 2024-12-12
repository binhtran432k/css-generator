import clsx from "clsx/lite";
import { produce } from "immer";
import { useCallback } from "preact/compat";

import { useStore } from "#src/store.js";
import {
	createDefaultBoxShadowLayer,
	type DBoxShadowLayer,
	getBoxShadowLayerText,
} from "#src/utils/boxShadow.js";

export function Layers() {
	const [boxShadow, setBoxShadow] = useStore.boxShadow();

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

	const deleteLayer = useCallback((index: number, e: MouseEvent) => {
		e.stopPropagation();
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
						onClickHandle={
							i === boxShadow.index ? undefined : setIndex.bind(null, i)
						}
						onDeleteHandle={deleteLayer.bind(null, i)}
					/>
				))}
			</div>
		</div>
	);
}

function Layer(props: {
	layer: DBoxShadowLayer;
	isIndex: boolean;
	onClickHandle?: () => void;
	onDeleteHandle: (e: MouseEvent) => void;
}) {
	return (
		<div
			class={clsx(
				"flex items-center w-full p-2 filter hover:filter-brightness-90 transition gap-2",
				props.isIndex
					? "bg-primary color-bg light:bg-light-primary light:color-light-bg"
					: "bg-bg-alt light:bg-light-bg-alt",
			)}
			onClick={props.onClickHandle}
		>
			<span class="grow text-left">{getBoxShadowLayerText(props.layer)}</span>
			<span class="i-material-symbols-edit text-xl"></span>
			<button
				class="i-material-symbols-delete text-xl hover:scale-110 transition"
				onClick={props.onDeleteHandle}
				aria-label="Delete"
			/>
		</div>
	);
}
