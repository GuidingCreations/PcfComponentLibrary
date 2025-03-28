import { createTheme } from "@mui/material/styles";

import { colorSchemes } from "./color-schemes";
import { shadows } from "./shadows";
import type { Direction, Mode, PrimaryColor, Theme } from "./types/types";
import { typography } from "./typography";
import { PaletteMode } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';

interface Config {
	primaryColor: PrimaryColor;
	direction?: Direction;
	Mode: Mode
}

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
    },
  });

function customCreateTheme(config: Config): any {

    console.log("MODE IN CONFIG: ", config)

/*

	const theme = createTheme({
		breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
		colorSchemes: colorSchemes({ primaryColor: config.primaryColor, Mode: config.Mode}),
		cssVariables: {
			colorSchemeSelector: "class",
		},
		direction: config.direction,
		shadows,
		shape: { borderRadius: 8 },
		typography
	});

	*/


	const theme : any = createTheme({
		palette: {
			mode: 'dark'
		}
	})
    console.log("CREATED THEME", theme)

	return theme;
}

export { customCreateTheme as createTheme };
