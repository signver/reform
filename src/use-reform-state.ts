import { useCallback, useEffect, useMemo, useState } from "react";
import { IUseReformInput, IUseReformOptions, TUseReform } from "./types";

export function useReformState<Data extends Record<string | number, unknown>>({
  initialState,
}: IUseReformOptions<Data>): TUseReform<Data> {
  const [data, setData] = useState(initialState);

  return [
    data,
    {
      useInput<Name extends keyof Data>(name: Name, { defaultValue, equals, valid }) {
        const value = useMemo(() => data[name], [data, name]);
        const validationMessages = useMemo(
          () => valid?.(value),
          [valid, value]
        );
        useEffect(() => {
          if (!defaultValue) return;
          if (!!value) return;
          setData((current) => ({ ...current, [name]: defaultValue() }));
        }, [defaultValue, value]);
        const setValue: ReturnType<IUseReformInput<Data, Name>>['1'] = useCallback(
          (computeNext) => {
            const next = computeNext(value);
            const isEqual = !!equals ? equals(next, value) : next === value;
            if (isEqual) return;
            setData((current) => ({
              ...current,
              [name]: next,
            }));
          },
          [equals, name, value]
        );
        return [value, setValue, validationMessages];
      },
    },
  ];
}
