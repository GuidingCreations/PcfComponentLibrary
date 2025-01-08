import React from 'react'
import Chip from '../../Chip/Chip/Chip'
import '../../dist/output.css'

export interface ChipListProps {
    chipHeight?: number;
    chipFontSize?: string;
    chipWidth?: number;
    data?: any[];
    onDestroyChip : (value : any) => void
}

const ChipList = (props: ChipListProps) => {

    const testData = [
        {label: "testValue1", backgroundColor: 'white', labelColor: 'black', iconFill: 'black'},
        {label: "testValue2", backgroundColor: 'black', labelColor: 'white'}
    ]

    const chipData = props.data ? props.data : testData

    console.log('chip data', chipData)
    return (
    <div className='div flex flex-wrap gap-1 w-full justify-start p-1' style={{width: props.chipWidth ? props.chipWidth : ''}}>
        
        {chipData?.map( (item) => {
            return <Chip
            labelColor= {item.chipTextColor ? item.chipTextColor :  'white'}
            backgroundColor={item.chipBackgroundColor ? item.chipBackgroundColor : 'blue'}
            labelText={item.label ? item.label : 'no label'}
            fontSize={props.chipFontSize ? props.chipFontSize : '12px'}
            height={props.chipHeight ? props.chipHeight : 50}
            onSelectX={() => props.onDestroyChip(item)}
            borderColor ='black'
            iconFill={item.iconFill ? item.iconFill : 'white'}
            key={item.label}
            />
        })}
    </div>
  )
}

export default ChipList