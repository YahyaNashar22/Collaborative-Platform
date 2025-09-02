import { states } from "../data/states";

export const getStatesForCountry = (country: string) => {
  const allStates = states.find((state) => state.label === country);
  if (allStates) return allStates.states;
  return [];
};
