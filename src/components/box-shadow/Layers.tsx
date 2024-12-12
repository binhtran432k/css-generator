import clsx from "clsx/lite";
import { produce } from "immer";
import { useCallback } from "preact/compat";

import { useStore } from "#src/store.js";
import {
	type DBoxShadowLayer,
	DEFAULT_BOX_SHADOW_LAYER,
	getBoxShadowLayerText,
} from "#src/utils/boxShadow.js";

export function Layers() {
	const [boxShadow, setBoxShadow] = useStore.boxShadow();

	const setLayer = useCallback((index: number) => {
		setBoxShadow((state) =>
			produce(state, (draft) => {
				draft.index = index;
			}),
		);
	}, []);

	const addBoxShadowLayer = useCallback((layer: DBoxShadowLayer) => {
		setBoxShadow((state) =>
			produce(state, (draft) => {
				draft.layers.push(layer);
			}),
		);
	}, []);

	return (
		<div class="p-4">
			<button
				type="button"
				class="px-3 py-1 rounded bg-bg-alt hover:filter-brightness-90 border border-comment light:bg-light-bg-alt light:border-light-comment"
				onClick={addBoxShadowLayer.bind(null, DEFAULT_BOX_SHADOW_LAYER)}
			>
				Add Layer
			</button>
			<div class="mt-4">
				{boxShadow.layers.map((layer, i) => (
					<Layer
						layer={layer}
						isIndex={i === boxShadow.index}
						onClickHandle={setLayer.bind(null, i)}
					/>
				))}
			</div>
		</div>
	);
}

function Layer(props: {
	layer: DBoxShadowLayer;
	isIndex: boolean;
	onClickHandle: () => void;
}) {
	return (
		<button
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
		</button>
	);
}
