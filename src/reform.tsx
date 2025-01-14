import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import FormContext, { IFormContext } from "./context";

export interface ReformProps<T> {
  defaultValue?: T;
}

export function Reform<T>({
  children,
  defaultValue,
}: PropsWithChildren<ReformProps<T>>) {
  const data = useRef({ ...defaultValue });
  const value = useMemo(() => {
    return {
      data() {
        return data.current;
      },
      useInput<T>(name, options) {
        const [value, setValue] = useState<T>(
          data.current[name] ?? options?.defaultValue
        );
        const updateValue = useCallback(
          (input: T) => {
            data.current[name] = input;
            setValue(input);
          },
          [name]
        );
        return [value, updateValue];
      },
    } satisfies IFormContext;
  }, []);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
