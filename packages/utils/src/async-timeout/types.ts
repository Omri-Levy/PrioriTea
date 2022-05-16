export type AsyncTimeout = {
	(ms: number): Promise<unknown>;
	<TPayload, >(ms: number, payload: TPayload): Promise<TPayload>;
}
