import React, { PropsWithChildren } from "react";
import Reform from "./reform-context";
import { useReformState } from "./use-reform-state";

export function ReformProvider<T extends Record<string, unknown>>({
  children,
  defaultValue,
}: PropsWithChildren<{
  defaultValue: { (): T };
}>) {
  const reform = useReformState({
    initialState: defaultValue,
  });
  return <Reform.Provider value={reform}>{children}</Reform.Provider>;
}
