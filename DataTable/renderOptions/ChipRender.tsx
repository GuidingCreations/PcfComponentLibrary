import * as React from "react";
import { Chip } from "@mui/material";
import type {} from '@mui/x-data-grid/themeAugmentation';
import { memo } from "react";

export interface chipProps {
    backgroundColor: string, 
    fontColor: string;
    label: string
}

const ChipRender = (props : chipProps) => {
  
  return (
    <Chip
      label = {props.label}
      sx={{backgroundColor: props.backgroundColor, "& .MuiChip-label": {color: props.fontColor ?? "black", width: '100%'}}}
    />
  )

}

export default memo(ChipRender)