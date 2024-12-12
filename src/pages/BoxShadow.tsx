import { CssCode } from "#src/components/box-shadow/CssCode.js";
import { Generator } from "#src/components/box-shadow/Generator.js";
import { Preview } from "#src/components/box-shadow/Preview.js";

export function BoxShadow() {
	return (
		<div class="home container m-auto px-4 pb-4">
			<div class="flex gap-4 flex-col md:flex-row">
				<div class="flex-grow-1 md:max-w-1/2">
					<Generator />
				</div>
				<div class="flex flex-grow-1 md:max-w-1/2 flex-col gap-4">
					<Preview />
					<CssCode />
				</div>
			</div>
		</div>
	);
}
