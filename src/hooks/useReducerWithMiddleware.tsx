import { ActionDispatch, AnyActionArg, useReducer } from "react";

export const useReducerWithMiddleware = (
  reducer: (state: any, ...action: any) => any,
  initialState: any,
  middleware?: (...args: any) => void,
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchWithMiddleware: ActionDispatch<AnyActionArg> = (
    ...args: any
  ) => {
    middleware?.(...args);
    dispatch(...args);
  };
  return [state, dispatchWithMiddleware];
};
