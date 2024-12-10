function getPath(path: string) {
	return import.meta.env
		? import.meta.env.BASE_URL + path.replace(/^\//, "")
		: path;
}

export const pathMap = {
	base: getPath("/"),
	notFound: getPath("/404"),
} as const;
