import * as React from 'react'
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import colorSchemes from '../color-schemes'
import { PrimaryColor, Mode, Config } from '../types/types'

export interface generateThemeProps {
  Mode: 'light' | 'dark'
}

const generateTheme = (props: generateThemeProps) => {
  
  console.log("IT HIT");

  interface Config {
    primaryColor: PrimaryColor;
    Mode: Mode
  }

  const config : Config = {
    primaryColor: 'chateauGreen',
    Mode: 'dark'
  }


  const palette = colorSchemes(config)

  console.log("PAL RETURNED", palette)


  const chateauGreenColorScheme = {
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
  
  const chateauGreen = {

          ...chateauGreenColorScheme,
          light: chateauGreenColorScheme[300],
          main: chateauGreenColorScheme[400],
          dark: chateauGreenColorScheme[500],
          contrastText: "var(--mui-palette-common-black)",
          activated: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-activatedOpacity))",
          hovered: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
          selected: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",
          sidebarFill: "#202427"
  }

  const chateauGreenDark = {
    ...chateauGreenColorScheme,
          light: chateauGreenColorScheme[400],
          main: chateauGreenColorScheme[500],
          dark: chateauGreenColorScheme[600],
          contrastText: "var(--mui-palette-common-white)",
          activated: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-activatedOpacity))",
          hovered: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
          selected: "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",
                sidebarFill: "#202427"
  }

const chateauGreenTheme = {
  dark: chateauGreenDark,
  light: chateauGreen

}

  // const theme = createTheme({
  //   palette: {
  //       primary: chateauGreenTheme[props.Mode]
  //   }
  // })

  const configuration : Config = {
    primaryColor: 'chateauGreen',
    Mode: props.Mode
  }
  const theme = createTheme(colorSchemes(configuration))

  return theme

}

export default generateTheme