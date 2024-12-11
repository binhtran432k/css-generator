import { useStore } from "#src/store.js";
import { getBoxShadow } from "#src/utils/boxShadow.js";
import { Card } from "../Card.jsx";

export function CssCode() {
	const [boxShadowState] = useStore.boxShadow();

	return (
		<Card name="css-code" label="CSS code">
			<code class="block p-4 mb-4">
				box-shadow: {getBoxShadow(boxShadowState)};
			</code>
		</Card>
	);
}
