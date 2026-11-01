import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export const externalProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
