import { multiSelectType } from "../interfaces/registerSignup";

// this function to handle if value is only string so the input type not multiSelect
export const getStringValue = (val: string | multiSelectType[]) =>
  typeof val === "string" ? val : "";
