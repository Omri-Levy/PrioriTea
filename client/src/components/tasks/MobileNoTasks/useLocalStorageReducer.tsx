import { useCallback, useEffect, useReducer } from "react";

export const useLocalStorageReducer = function (
  reducer: (state: any, action: any) => any,
  initialValue: Record<string, unknown>,
  key: string
) {
  const setLocalStorage = useCallback(
    function (value: any) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );
  const getLocalStorage = useCallback(
    function () {
      const cachedValue = localStorage.getItem(key);

      return cachedValue ? JSON.parse(cachedValue) : cachedValue;
    },
    [key]
  );
  const initializer = useCallback(
    function () {
      return getLocalStorage() ?? initialValue;
    },
    [getLocalStorage, initialValue]
  );
  const [state, dispatch] = useReducer(reducer, initialValue, initializer);

  useEffect(
    function () {
      setLocalStorage(state);
    },
    [setLocalStorage, state]
  );

  return [state, dispatch];
};
