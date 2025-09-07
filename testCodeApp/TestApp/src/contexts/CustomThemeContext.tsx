import { createTheme, type Theme } from "@mui/material/styles";
import React, { createContext, useContext, useState, type PropsWithChildren, type ReactNode } from "react"


export interface CustomThemeProps  {
  CustomTheme: Theme;
  SetCustomTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const CustomThemeContext = createContext<CustomThemeProps | undefined>(undefined);

export const useCustomThemeContext = () => {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error("context not found")
  }
  return context
}