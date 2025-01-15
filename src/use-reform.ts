import { useContext } from "react";
import reformContext from "./reform-context";
import { TUseReform } from "./types";

export function useReform<T extends Record<string | number, unknown>>() {
  return useContext(reformContext) as TUseReform<T>;
}
