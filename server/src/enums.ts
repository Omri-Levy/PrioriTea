export enum Method {
	GET = "get",
	POST = "post",
	PUT = "put",
	DELETE = "delete",
	PATCH = "patch",
	ALL = "all",
}

export type MethodUnion = "post" | "get" | "put" | "patch" | "delete";
