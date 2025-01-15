import { createContext } from "react";
import { TUseReform } from "./types";

const DEFAULT_REFORM_DATA = {};

const DEFAULT_NO_OP = () => {
  throw new Error("Not implemented");
};

export default createContext<TUseReform<any>>([
  DEFAULT_REFORM_DATA,
  {
    useInput: DEFAULT_NO_OP,
  },
]);