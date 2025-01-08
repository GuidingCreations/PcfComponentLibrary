import React from 'react'
import '../../dist/output.css'
import '../styles/Chip.css'

export interface ChipProps {
  labelText?: string;
  labelColor?: string;
  backgroundColor?: string;
  onSelectX: () => void;
  height?: number;
  fontSize?: string;
  borderColor?: string;
  iconFill?: string;
}

const Chip = (props: ChipProps) => {
  
  const styles = {
    wrapperStyles: {
      height: props.height == undefined ? 30 : props.height,
      alignItems: 'center',
      '--var-background-color': props.backgroundColor != null ? props.backgroundColor : '',
      borderType: 'solid',
      borderColor: props.borderColor ? props.borderColor : 'black',
      borderWidth: '1px',
      backgroundColor: props.backgroundColor || '' 
    }  as React.CSSProperties,
    labelStyles: {
      fontSize: props.fontSize == undefined ? 12 : props.fontSize,
      color: props.labelColor == undefined ? 'white': props.labelColor,
      
    }
  }

  return (

        <div className='bg-blue-700 rounded-lg p-2 text-white flex gap-1' style={styles?.wrapperStyles} id='chipWrapper'>
        <label className='text-xs truncate max-w-40' style={styles?.labelStyles}>{props.labelText ? props.labelText : 'NO LABEL TEXT'}</label>
        
<svg onClick={()=>props.onSelectX? props.onSelectX() : console.log('no destroy formula') } width="1rem" height="1rem" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" fill={props.iconFill ? props.iconFill : 'white'} stroke='red' className='cursor-pointer' style={{pointerEvents: 'all'}}>
<path d="m885.35 385.35-214.65 214.65 214.64 214.65h0.003906c9.6445 9.3203 15.145 22.121 15.262 35.531 0.11719 13.41-5.1602 26.309-14.645 35.789-9.4805 9.4844-22.379 14.762-35.789 14.645-13.41-0.11719-26.211-5.6172-35.531-15.262l-214.65-214.65-214.65 214.65c-12.703 12.266-30.93 16.922-47.957 12.254-17.027-4.668-30.332-17.973-35-35-4.668-17.027-0.011719-35.254 12.254-47.957l214.65-214.65-214.65-214.65c-12.266-12.703-16.922-30.93-12.254-47.957 4.668-17.027 17.973-30.332 35-35 17.027-4.668 35.254-0.011719 47.957 12.254l214.65 214.65 214.65-214.65c9.3203-9.6445 22.121-15.145 35.531-15.262 13.41-0.11719 26.309 5.1602 35.789 14.645 9.4844 9.4805 14.762 22.379 14.645 35.789-0.11719 13.41-5.6172 26.211-15.262 35.531z"/>
</svg>
    </div>
  )
}

export default Chip