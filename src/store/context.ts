import { atom, useAtom } from "jotai";

export const countAtom = atom(0);
export const fullNameAtom = atom("");
export function useFullName() {
  return useAtom(fullNameAtom);
}

export const decrementCountAtom = atom((get) => get(countAtom) - 1);
export const incrementCount = atom((get) => get(countAtom) + 1);

export const set = atom((get) => get(fullNameAtom));
