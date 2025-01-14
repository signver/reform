import { createContext } from "react";

export interface IFormInputOptions<T> {
  is?: {
    equal?: { (a?:T, b?: T) }
  }
}

export interface IFormContext<T = unknown> {
  data: { (): T };
  useInput: { <T>(name: string, options?: { defaultValue?: T }): void };
}

const NOT_IMPLEMENTED = () => {
  throw new Error("Form context is not mounted");
};

const FORM_CONTEXT = createContext<IFormContext>({
  data: NOT_IMPLEMENTED,
  useInput: NOT_IMPLEMENTED,
});

export default FORM_CONTEXT;
