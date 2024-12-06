"use client";

import { useState } from "react";
import * as React from "react";
import CircularProgress from '@mui/material/CircularProgress'

export interface loaderProps {
  containerHeight: number;
}

export default function Modal(props: loaderProps) {
  return (
    <div
    style={{
      backgroundColor: "RGBA(0, 0, 0, 0.49)",
      width: "100%",
      height: props.containerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>

    <CircularProgress 
      color="secondary" 
      style={{
        width: '10%',
        height: '10%'
      }}  
    />
    </div>
  );
}
