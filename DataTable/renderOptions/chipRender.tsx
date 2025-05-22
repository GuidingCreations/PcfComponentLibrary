import * as React from "react";
import { Chip } from "@mui/material";
import type {} from '@mui/x-data-grid/themeAugmentation';
import { memo } from "react";

export interface chipProps {
    backgroundColor: string, 
    label: string
    testObj: any;
    fontColor: string;
}



const chipRender = (props : chipProps) => {

    console.log("CHIP PROPS: ", props)

  return (
    <Chip
    label = {props.label}
    sx={{backgroundColor: props.backgroundColor, color: props.fontColor}}
    />
  )
}

export default memo(chipRender)