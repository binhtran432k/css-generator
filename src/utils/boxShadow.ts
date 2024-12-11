import { DRgb } from "./color";

export type DBoxShadow = {
	rgb: DRgb;
	shiftRight: number;
	shiftDown: number;
	spread: number;
	blur: number;
	opacity: number;
	isInset: boolean;
};

export function getBoxShadow(boxShadow: DBoxShadow) {
	const [r, g, b] = boxShadow.rgb;
	return `rgba(${[r, g, b, boxShadow.opacity / 100].join(",")}) ${boxShadow.shiftRight}px ${boxShadow.shiftDown}px ${boxShadow.blur}px ${boxShadow.spread}px${boxShadow.isInset ? " inset" : ""}`;
}
