import { useStore } from "#src/store.js";
import { getBoxShadowCssCode } from "#src/utils/boxShadow.js";
import { Card } from "../Card.jsx";

export function CssCode() {
	const [boxShadowLayers] = useStore.boxShadow.layers();

	return (
		<Card name="css-code" label="CSS code">
			<code class="block p-4 mb-4">{getBoxShadowCssCode(boxShadowLayers)}</code>
		</Card>
	);
}
