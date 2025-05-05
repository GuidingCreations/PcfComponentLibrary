import type { ColorSystemOptions, PaletteColorOptions } from "@mui/material/styles";
import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface PaletteColor {
        activated?: string;
        hovered?: string;
        selected?: string;
        sidebarFill: string;
    }
  
    interface SimplePaletteColorOptions {
      activated?: string;
      hovered?: string;
      selected?: string;
      sidebarFill: string;
	  elementBackgroundColor: string
    }
  }

import {
	california,
	chateauGreen,
	kepple,
	neonBlue,
	nevada,
	redOrange,
	royalBlue,
	shakespeare,
	stormGrey,
	teal,
	tomatoOrange,
} from "./colors";
import type { ColorScheme, Config, Mode, PrimaryColor } from "./types/types";

const primarySchemes: Record<PrimaryColor, Record<ColorScheme, PaletteColorOptions>> = {
	Green: {
		dark: {
			...chateauGreen,
			light: chateauGreen[300],
			main: chateauGreen[400],
			dark: chateauGreen[500],
			contrastText: "rgba(255, 255, 255, 1)",
			activated: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-activatedOpacity))",
			hovered: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
			selected: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",
            sidebarFill: "#202427",
			elementBackgroundColor: "#121517"
		},
		light: {
			...chateauGreen,
			light: chateauGreen[400],
			main: chateauGreen[500],
			dark: chateauGreen[600],
			contrastText: "#FFFFFF",
			activated: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-activatedOpacity))",
			hovered: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
			selected: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",
            sidebarFill: "#FFFFFF"
		},
	},
	"Neon Blue": {
		dark: {
			...neonBlue,
			light: neonBlue[300],
			main: neonBlue[400],
			dark: neonBlue[500],
			contrastText: "rgba(255, 255, 255, 1)",
			activated: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-activatedOpacity))",
			hovered: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
			selected: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",
            sidebarFill: "#202427",
			elementBackgroundColor: "#121517"
			

        },
		light: {
			...neonBlue,
			light: neonBlue[400],
			main: neonBlue[500],
			dark: neonBlue[600],
            sidebarFill: "#FFFFFF"
		},
	},
	"Royal Blue": {
		dark: {
			...royalBlue,
			light: royalBlue[300],
			main: royalBlue[400],
			dark: royalBlue[500],
			contrastText: "rgba(255, 255, 255, 1)",
			activated: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-activatedOpacity))",
			hovered: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
			selected: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",
            sidebarFill: "#202427",
			elementBackgroundColor: "#121517"

		},
		light: {
			...royalBlue,
			light: royalBlue[400],
			main: royalBlue[500],
			dark: royalBlue[600],
            sidebarFill: "#FFFFFF"
		},
	},
	"Orange": {
		dark: {
			...tomatoOrange,
			light: tomatoOrange[300],
			main: tomatoOrange[400],
			dark: tomatoOrange[500],
			contrastText: "rgba(255, 255, 255, 1)",
            sidebarFill: "#202427",
			elementBackgroundColor: "#121517"

		},
		light: {
			...tomatoOrange,
			light: tomatoOrange[400],
			main: tomatoOrange[500],
			dark: tomatoOrange[600],
			contrastText: "blue",
            sidebarFill: "#FFFFFF"
		},
	},
	"Teal": {
		dark: {
			...teal,
			light: teal[300],
			main: teal.main,
			dark: teal[500],
			contrastText: teal.darkContrastText,
			activated: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-activatedOpacity))",
			hovered: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
			selected: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",
            sidebarFill: "#202427",
			elementBackgroundColor: "#121517"
		},
		light: {
			...teal,
			light: teal[400],
			main: teal[500],
			dark: teal[600],
			contrastText: teal.lightContrastText,
			activated: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-activatedOpacity))",
			hovered: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
			selected: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",
            sidebarFill: "#FFFFFF"
		}
	}
};


export function colorSchemes(config: Config): any {
	console.log("CONFIGY: ", config)
	let primary : any = primarySchemes[config.primaryColor];

	console.log("PRIM: ", primary)

	if (!primary) {
		primary = primarySchemes.Green;
		console.log("PRIM UPDATED")
		
	}


	const isDark = config.Mode == 'dark'
	

	const theme = createTheme({
		
		components: {
		
			MuiPopper: {
				defaultProps: {
					placement: 'bottom',
					modifiers:  [
						{
						  name: "offset",
						  options: {
							offset: [0, 8]
						  }
						}
					  ]
				},
				styleOverrides: {
					root: {
						'& .MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected="true"]' : {
							backgroundColor: primary.light.light,
							opacity: '1',
							ShadowRoot: ''
						},
						'& .MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected="true"]:hover': {
							backgroundColor: primary.light.main,
							opacity: '1',
						},
						
						backgroundColor: primary[config.Mode].elementBackgroundColor,
						borderStyle: 'solid',
						borderWidth: '1px',
						borderColor: primary.light.main,
						borderRadius: '10px',
						padding: '2px 4px',
					}
				}
				
			
			},
			MuiOutlinedInput: {
				styleOverrides : {
		
				  root: {
					
					margin: '0px',
					color: config.Mode == 'dark' ? 'white' : 'black',
					height: '100%', 
					'& .MuiOutlinedInput-notchedOutline': {
		
					  borderStyle: 'solid',
					  borderWidth:"1px",
					  borderColor: isDark ? 'white' : 'black' ,
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
					borderColor:  isDark ? 'white' : 'black'
				  },
				  	'&.Mui-focused': {
						"& .MuiOutlinedInput-notchedOutline": {
						  border: `1px solid ${primary.dark.main}`,
						}},			
				},
				input: {
				  marginTop: 0,
				  marginBottom: 0
		
				}
				
		
					  }
			},
			MuiInputBase: {
				styleOverrides: {
					inputMultiline: {
						height: '100%'
					},
					multiline: {
						height: 'fit-content'
					},
					root: {
						marginBottom: 'auto'
					}
				}
			},
			MuiChip: {
				styleOverrides: {
					root: {
						backgroundColor: primary.light.light
					},
					label: {
						color: primary[config.Mode].contrastText
					}
				}
			},
			MuiAutocomplete: {
				styleOverrides: {
					option: {
						'&[data-focus="true"]': {
          backgroundColor: 'blue',
        }
					}
				}
			},
			
			
		},
		palette: {
			
			mode: config.Mode,
			action: { disabledBackground: "rgba(0, 0, 0, 0.12)" },
			background: {
				default: config.Mode == 'dark' ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)",
				paper: config.Mode == "dark" ? "#121517" : "white",
				
			},
			common: { black: "#000000", white: "#ffffff" },
			error: {
				...redOrange,
				light: redOrange[300], 
				main: redOrange[400],
				dark: redOrange[500],
				contrastText:  "rgba(255,255,255, 1)"
			},
			info: {
				...shakespeare,
				light: shakespeare[300],
				main: shakespeare[400],
				dark: shakespeare[500],
				contrastText: "rgba(255,255,255, 1)"
			},
			primary: primary.dark,
			secondary: {
				...nevada,
				light: nevada[100],
				main: nevada[200],
				dark: nevada[300],
				contrastText: "rgba(255,255,255, 1)"
			},
			success: {
				...kepple,
				light: kepple[300],
				main: kepple[400],
				dark: kepple[500],
				contrastText: "rgba(255,255,255, 1)",
				
			},
			text: {
				primary: config.Mode == 'dark' ? "#FFFFFF" : "rgba(255, 255, 255, 1)",
				secondary: config.Mode == 'dark' ? 'white' : 'black',
				disabled: "var(--mui-palette-neutral-600)",
			},
			warning: {
				...california,
				light: california[300],
				main: california[400],
				dark: california[500],
				contrastText: "rgba(255,255,255, 1)",
				
			},
			
		}
	})
	

	
		return theme

}

export default colorSchemes