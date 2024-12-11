import { DRgb } from "./color";

export type DBoxShadowLayer = {
	rgb: DRgb;
	shiftRight: number;
	shiftDown: number;
	spread: number;
	blur: number;
	opacity: number;
	isInset: boolean;
};

export const DEFAULT_BOX_SHADOW_LAYER: Readonly<DBoxShadowLayer> = {
	rgb: [0, 0, 0],
	shiftRight: 0,
	shiftDown: 0,
	spread: 3,
	blur: 5,
	opacity: 20,
	isInset: false,
};

export function getBoxShadowCssCode(boxShadows: DBoxShadowLayer[]) {
	return `box-shadow: ${getBoxShadowValue(boxShadows)};`;
}

export function getBoxShadowValue(boxShadows: DBoxShadowLayer[]) {
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
