import { useCallback, useEffect, useMemo, useState } from "react";
import {
  IReformInputValidationError,
  IUseReformInput,
  IUseReformInputOptions,
  IUseReformOptions,
  TUseReform,
} from "./types";

export function useReformState<Data extends Record<string | number, unknown>>({
  initialState,
}: IUseReformOptions<Data>): TUseReform<Data> {
  const [data, setData] = useState(initialState);
  const [validation, setValidation] =
    useState<Record<keyof Data, IReformInputValidationError[]>>();
  return [
    data,
    {
      useInput<Name extends keyof Data>(
        name: Name,
        options: IUseReformInputOptions<Data[typeof name]>
      ) {
        const value = useMemo(() => data[name], [data, name]);
        useEffect(() => {
          if (!options?.defaultValue) return;
          if (!!value) return;
          setData((current) => ({
            ...current,
            [name]: options.defaultValue(),
          }));
        }, [options?.defaultValue, value]);
        const setValue: IUseReformInput<Data, Name>["1"] = useCallback(
          (computeNext) => {
            const next = computeNext(value);
            const isEqual = !!options?.equals
              ? options.equals(next, value)
              : next === value;
            if (isEqual) return;
            setData((current) => ({
              ...current,
              [name]: next,
            }));
            setValidation((current) => ({
              ...current,
              [name]: options?.valid(next),
            }));
          },
          [options?.equals, name, value]
        );
        return [value, setValue, validation?.[name]];
      },
    },
  ];
}
