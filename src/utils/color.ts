export type DRgb = [number, number, number];

export function hexToRgb(hex: string): DRgb {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return [r, g, b];
}

export function rgbToHex(rgb: DRgb): string {
	return `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}
