import type { ClassValue } from "svelte/elements";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ClassMeow = ClassValue | null | undefined

export function cn(...inputs: ClassMeow[]) {
    return twMerge(clsx(inputs))
}
