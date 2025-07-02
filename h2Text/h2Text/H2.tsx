/* eslint-disable */

import * as React from 'react'
import { memo } from 'react'

export interface h2Props {
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
    verticalAlign: string;
    fontColor: string | undefined | null
}

const h2Typography = (props : h2Props) => {

  const h2Styles : React.CSSProperties = {
    fontSize: '28px',
    fontWeight: props.isBold ? 'bold' : '400',
    textAlign: 'left',
    paddingTop: `${props.paddingTop}px`,
    paddingRight: `${props.paddingRight}px`,
    paddingLeft: `${props.paddingLeft}px`,
    paddingBottom: `${props.paddingBottom}px`,
    fontStyle: props.isItalic ? 'italic' : 'normal',
    height: 'fit-content',
    width: 'fit-content',
    maxWidth: `${props.width - 16}px`,
    color: props.fontColor ? props.fontColor : 'white'
  }

  const divStyles : React.CSSProperties = {
    
    height: `${props.height}px`,
    width: `${props.width}px`,
    display: 'flex',
    alignItems: props.verticalAlign == 'bottom' ? 'end' : props.verticalAlign == 'top' ? 'start' : 'center',
    justifyContent: props.TextAlign == 'right' ? 'end' : props.TextAlign == 'left' ? 'start' : 'center'

  }

console.log("props: ", props)

  return (
    <div style={divStyles}>

    <h2 style={h2Styles}>{props.Text}</h2>
    </div>
  )
}

export default memo(h2Typography)