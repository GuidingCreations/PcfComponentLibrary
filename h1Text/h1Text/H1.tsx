/* eslint-disable */

import * as React from 'react'
import { memo } from 'react'

export interface h1Props {
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

const h1Typography = (props : h1Props) => {

  const h1Styles : React.CSSProperties = {
    fontSize: '38px',
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

  return (
    <div style={divStyles}>
      <h1 style={h1Styles}>{props.Text}</h1>
    </div>
  )
}

export default memo(h1Typography)