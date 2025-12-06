import { PrimaryColor } from "./types/types"

export interface colorSchemaType {
	50?: string;
	100?: string;	
	200?: string;	
	300?: string;	
	400?: string;	
	500?: string;	
	600?: string;	
	700?: string;	
	800?: string;	
	900?: string;	
	950?: string;
	main?: string;
	lightContrastText?: string;
	darkContrastText? : string
}

export const california : colorSchemaType = {
	50: "#fffaea",
	100: "#fff3c6",
	200: "#ffe587",
	300: "#ffd049",
	400: "#ffbb1f",
	500: "#fb9c0c",
	600: "#de7101",
	700: "#b84d05",
	800: "#953b0b",
	900: "#7b310c",
	950: "#471701",
	main: "#ffbb1f",
	lightContrastText: "#FFFFFF",
	darkContrastText: "#FFFFFF"
}

export const teal : colorSchemaType = {
	50: "#07DBD4",
	100: "#07DBD4",
	200: "#07DBD4",
	300: "#07DBD4",
	400: "#07DBD4",
	500: "#07DBD4",
	600: "#07DBD4",
	700: "#07DBD4",
	800: "#07DBD4",
	900: "#07DBD4",
	950: "#07DBD4",
	main: "#07DBD4",
	darkContrastText: "#000000",
	lightContrastText: "#000000"
}

export const chateauGreen : colorSchemaType = {
	50: "#edfcf2",
	100: "#d2f9de",
	200: "#aaf0c4",
	300: "#72e3a3",
	400: "#3acd7e",
	500: "#16b364",
	600: "#0a9150",
	700: "#087442",
	800: "#095c37",
	900: "#094b2f",
	950: "#032b1a",
} 

export const kepple : colorSchemaType = {
	50: "#f0fdfa",
	100: "#ccfbef",
	200: "#9af5e1",
	300: "#5fe9ce",
	400: "#2ed3b8",
	500: "#15b79f",
	600: "#0e9382",
	700: "#107569",
	800: "#115e56",
	900: "#134e48",
	950: "#042f2c",
} 

export const neonBlue : colorSchemaType = {
	50: "#ecf0ff",
	100: "#dde3ff",
	200: "#c2cbff",
	300: "#9ca7ff",
	400: "#7578ff",
	500: "#635bff",
	600: "#4e36f5",
	700: "#432ad8",
	800: "#3725ae",
	900: "#302689",
	950: "#1e1650",
} 

export const nevada : colorSchemaType = {
	50: "#fbfcfe",
	100: "#f0f4f8",
	200: "#dde7ee",
	300: "#cdd7e1",
	400: "#9fa6ad",
	500: "#636b74",
	600: "#555e68",
	700: "#32383e",
	800: "#202427",
	900: "#121517",
	950: "#090a0b",
} 

export const redOrange : colorSchemaType = {
	50: "#fef3f2",
	100: "#fee4e2",
	200: "#ffcdc9",
	300: "#fdaaa4",
	400: "#f97970",
	500: "#f04438",
	600: "#de3024",
	700: "#bb241a",
	800: "#9a221a",
	900: "#80231c",
	950: "#460d09",
} 

export const royalBlue : colorSchemaType = {
	50: "#ecf3ff",
	100: "#dce8ff",
	200: "#c0d4ff",
	300: "#9bb6ff",
	400: "#738dff",
	500: "#5265ff",
	600: "#3339f8",
	700: "#3739de",
	800: "#2225b1",
	900: "#24298b",
	950: "#151651",
} 

export const shakespeare : colorSchemaType = {
	50: "#ecfdff",
	100: "#cff7fe",
	200: "#a4eefd",
	300: "#66e0fa",
	400: "#10bee8",
	500: "#04aad6",
	600: "#0787b3",
	700: "#0d6d91",
	800: "#145876",
	900: "#154964",
	950: "#082f44",
} 

export const stormGrey : colorSchemaType = {
	50: "#f9fafb",
	100: "#f1f1f4",
	200: "#dcdfe4",
	300: "#b3b9c6",
	400: "#8a94a6",
	500: "#667085",
	600: "#565e73",
	700: "#434a60",
	800: "#313749",
	900: "#212636",
	950: "#121621",
} 

export const tomatoOrange : colorSchemaType = {
	50: "#fff3ed",
	100: "#ffe2d4",
	200: "#ffc1a8",
	300: "#ffa280",
	400: "#ff9771",
	500: "#ff6c47",
	600: "#fe4011",
	700: "#ed3507",
	800: "#9f2c0f",
	900: "#7e1110",
	950: "#440608",
}

export const Pink : colorSchemaType = {
	50: "#DB07B4",
	100: "#DB07B4",
	200: "#DB07B4",
	300: "#DB07B4",
	400: "#DB07B4",
	500: "#DB07B4",
	600: "#DB07B4",
	700: "#DB07B4",
	800: "#DB07B4",
	900: "#DB07B4",
	950: "#DB07B4",
	lightContrastText: "#FFFFFF",
	darkContrastText: "#FFFFFF",
	main: "#DB07B4"
}

export const Red : colorSchemaType = {
	50: "#D30404",
	100: "#D30404",
	200: "#D30404",
	300: "#D30404",
	400: "#D30404",
	500: "#D30404",
	600: "#D30404",
	700: "#D30404",
	800: "#D30404",
	900: "#D30404",
	950: "#D30404",
	lightContrastText: "#FFFFFF",
	darkContrastText: "#FFFFFF",
	main: "#D30404"
}

export const Themes = [
	{Name: "california", Theme: california},
	{Name: "teal", Theme: teal},
	{Name: "Green", Theme: chateauGreen},
	{Name: "kepple", Theme: kepple},
	{Name: "Neon Blue", Theme: neonBlue},
	{Name: "redOrange", Theme: redOrange},
	{Name: "Royal Blue", Theme: royalBlue},
	{Name: "shakespeare", Theme: shakespeare},
	{Name: "stormGrey", Theme: stormGrey},
	{Name: "tomatoOrange", Theme: tomatoOrange},
	{Name: "Pink", Theme: Pink},
	{Name: "Red", Theme: Red}
]

export const primaryColorNames : PrimaryColor[] = [
	"Orange",
	"Green",
	"Neon Blue",
	"Royal Blue",
	"Teal",
	"Pink",
	"Red"
]