export const pathMap = {
	base: "",
	boxShadow: "box-shadow",
};

export const getRoutePath =
	typeof window !== "undefined"
		? (path: string) => import.meta.env.BASE_URL + path
		: (path: string) => "/" + path;

export const checkPath = (path: string, pathFromMap: string) =>
	path === getRoutePath(pathFromMap);
