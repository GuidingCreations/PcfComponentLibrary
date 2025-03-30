import type { PrimaryColor } from "./types/types";

export interface AppConfig {
	name: string;
	description: string;
	// Overriden by Settings Context.
	direction: "ltr" | "rtl";
	// Overriden by Settings Context.
	language: string;
	// Overriden by Settings Context.
	theme: "light" | "dark" | "system";
	themeColor: string;
	// Overriden by Settings Context.
	primaryColor: PrimaryColor;

}

export const appConfig: AppConfig = {
	name: "Devias Kit Pro",
	description: "",
	direction: "ltr",
	language: "en",
	theme: "dark",
	themeColor: "#3acd7e",
	primaryColor: "green",
	
};
