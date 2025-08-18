/* eslint-disable */

import * as React from 'react'
import { memo } from 'react'

export interface bodyProps {
    isBold: boolean;
    Text: string;
    TextAlign: string;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    isItalic: boolean;
    height: number;
    width: number;
    fontColor: string | undefined | null;
    useAutoHeight: boolean;
    updateComponentHeight: (newHeight: number) => void;
    overflow: string
}

const bodyTypography = (props : bodyProps) => {

  const parentRef = React.useRef<HTMLDivElement>(null)

  const bodyStyles : React.CSSProperties = {

    fontSize: '16px',
    fontWeight: props.isBold ? 'bold' : '400',
    textAlign: props.TextAlign.toLowerCase() == 'left' ? "left" : props.TextAlign.toLowerCase() == "center" ? "center" : "right",
    paddingTop: `${props.paddingTop}px`,
    paddingRight: `${props.paddingRight}px`,
    paddingLeft: `${props.paddingLeft}px`,
    paddingBottom: `${props.paddingBottom}px`,
    fontStyle: props.isItalic ? 'italic' : 'normal',
    height: 'fit-content',
    width: 'fit-content',
    maxWidth: `${props.width - 16}px`,
    color: props.fontColor ? props.fontColor : 'white',
    wordWrap: "break-word",
    whiteSpace:  "pre-line"

  }

  const divStyles : React.CSSProperties = {
    
    height: props.useAutoHeight ? 'fit-content' : `${props.height}px`,
    width: `${props.width}px`,
    display: 'block',
    overflow: props.overflow.toLowerCase() == "hidden" ? "hidden" : props.overflow.toLowerCase() == "visible" ? "visible" : "scroll"
  }

  React.useEffect(() => {
    if (parentRef.current) {

      props.updateComponentHeight(parentRef.current?.clientHeight)
    }
  })
  
  return (

    <div style= {divStyles} ref = {parentRef}>

      <p style={bodyStyles}>{props.Text}</p>

    </div>
  
)
}

export default memo(bodyTypography)