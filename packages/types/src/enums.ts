export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
  ALL = "all",
}

export enum Status {
	IDLE = "IDLE",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED",
}

export enum Priority {
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	MIN = Priority.ONE,
	MAX = Priority.FIVE,
}
