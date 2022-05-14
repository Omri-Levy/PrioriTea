export const uniqueArray = <TItem,
	>
(arr: IterableIterator<TItem> | Array<TItem>): Array<TItem> =>
	[...new Set(arr)];
