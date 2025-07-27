// this function to handle if value is only string so the input type not multiSelect
export const getStringValue = (val: string | { [key: string]: string }[]) =>
  typeof val === "string" ? val : "";
