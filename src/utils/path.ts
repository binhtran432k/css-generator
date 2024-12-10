export const pathMap = {
	base: getPath("/"),
	notFound: getPath("/404"),
};

export const checkPath =
	typeof window !== "undefined"
		? (path: string, pathFromMap: string) => path === pathFromMap
		: (path: string, pathFromMap: string) => getPath(path) === pathFromMap;

function getPath(path: string) {
	return import.meta.env
		? import.meta.env.BASE_URL + path.replace(/^\//, "")
		: path;
}
