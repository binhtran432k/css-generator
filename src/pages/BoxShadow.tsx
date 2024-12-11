import { CssCode } from "#src/components/box-shadow/CssCode.js";
import { Preview } from "#src/components/box-shadow/Preview.js";

export function BoxShadow() {
	return (
		<div class="home container m-auto">
			<div class="flex flex-col  gap-4">
				<Preview />
				<CssCode />
			</div>
		</div>
	);
}
