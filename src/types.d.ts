export interface IReformInputValidationError {
  name: string;
  title?: string;
  reason: string;
}

export interface IUseReformInput<Data, Name extends keyof Data> {
  (name: Name, options?: {
    defaultValue?: {
        (): Data[Name]
    }
    equals?: {
        (a: Data[Name], b: Data[Name]): boolean
    }
    valid?: {
        (value: Data[Name]): IReformInputValidationError[] | null | undefined
    }
  }): [
    Data[Name],
    {
      (computeNext: { (current: Data[Name]): Data[Name] }): void;
    },
    IReformInputValidationError[] | null | undefined
  ];
}

export interface IUseReformOptions<
  Data extends Record<string | number, unknown>
> {
  initialState: { (): Data };
}

export type TUseReform<Data extends Record<string | number, unknown>> = [
  Data,
  {
    useInput: IUseReformInput<Data, keyof Data>;
  }
];
