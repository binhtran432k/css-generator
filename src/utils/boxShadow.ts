import { DRgb } from "./color";

export type DBoxShadowLayer = {
	id: number;
	rgb: DRgb;
	shiftRight: number;
	shiftDown: number;
	spread: number;
	blur: number;
	opacity: number;
	isInset: boolean;
};

let incrementId = 0;

export function createDefaultBoxShadowLayer(): DBoxShadowLayer {
	return createBoxShadowLayer({
		rgb: [0, 0, 0],
		opacity: 20,
		shiftRight: 0,
		shiftDown: 0,
		blur: 5,
		spread: 3,
		isInset: false,
	});
}

export function createBoxShadowLayer(
	props: Omit<DBoxShadowLayer, "id">,
): DBoxShadowLayer {
	return {
		id: incrementId++,
		...props,
	};
}

export function getBoxShadowCssCode(boxShadows: Omit<DBoxShadowLayer, "id">[]) {
	return `box-shadow: ${getBoxShadowValue(boxShadows)};`;
}

export function getBoxShadowValue(boxShadows: Omit<DBoxShadowLayer, "id">[]) {
	return boxShadows
		.map((boxShadow) => {
			const [r, g, b] = boxShadow.rgb;
			return [
				`rgba(${[r, g, b, boxShadow.opacity / 100].join(",")})`,
				`${boxShadow.shiftRight}px`,
				`${boxShadow.shiftDown}px`,
				`${boxShadow.blur}px`,
				`${boxShadow.spread}px`,
				boxShadow.isInset && " inset",
			]
				.filter(Boolean)
				.join(" ");
		})
		.join(", ");
}

export function getBoxShadowLayerText(boxShadow: DBoxShadowLayer) {
	const [r, g, b] = boxShadow.rgb;
	return [
		boxShadow.isInset && " inset",
		`${boxShadow.shiftRight}px`,
		`${boxShadow.shiftDown}px`,
		`${boxShadow.blur}px`,
		`${boxShadow.spread}px`,
		`rgba(${[r, g, b, boxShadow.opacity / 100].join(",")})`,
	]
		.filter(Boolean)
		.join(" ");
}
