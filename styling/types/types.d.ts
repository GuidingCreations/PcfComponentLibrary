export type { Theme } from "@mui/material/styles";

export type PrimaryColor = "Green" | "Neon Blue" | "Royal Blue" | "Orange" | "Teal";

export type Direction = "ltr" | "rtl";

export type ColorScheme = "dark" | "light";

export type Mode = "dark" | "light";

export interface Config {
    primaryColor: PrimaryColor;
    Mode: Mode
}
