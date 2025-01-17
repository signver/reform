export interface IReformInputValidationError {
  name: string;
  title?: string;
  reason: string;
}

export interface IUseReformInputOptions<Value> {
  defaultValue?: {
    (): Value;
  };
  equals?: {
    (a: Value, b: Value): boolean;
  };
  valid?: {
    (value: Value): IReformInputValidationError[] | null | undefined;
  };
}

export type IUseReformInput<Data, Name extends keyof Data = keyof Data> = [
  Data[Name],
  {
    (computeNext: { (current: Data[Name]): Data[Name] }): void;
  },
  IReformInputValidationError[] | null | undefined
];

export interface IUseReformOptions<
  Data extends Record<string | number, unknown>
> {
  initialState: { (): Data };
}

export type TUseReform<Data extends Record<string | number, unknown>> = [
  Data,
  {
    useInput: {
      <Name extends keyof Data = keyof Data>(
        name: Name,
        options?: {
          defaultValue?: {
            (): Data[typeof name];
          };
          equals?: {
            (a: Data[typeof name], b: Data[typeof name]): boolean;
          };
          valid?: {
            (value: Data[typeof name]):
              | IReformInputValidationError[]
              | null
              | undefined;
          };
        }
      ): IUseReformInput<Data, typeof name>;
    };
  }
];
