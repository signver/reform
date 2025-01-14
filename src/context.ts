import { createContext } from "react";

export interface IFormContext<T = unknown> {
  data: { (): T };
}

const NOT_IMPLEMENTED = () => {
  throw new Error("Form context is not mounted");
};

const FORM_CONTEXT = createContext<IFormContext>({
  data: NOT_IMPLEMENTED,
});

export default FORM_CONTEXT;
