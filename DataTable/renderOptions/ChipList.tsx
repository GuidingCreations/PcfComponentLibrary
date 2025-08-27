import React, { memo } from 'react'
import ChipRender, { chipProps } from './ChipRender'

export interface ChipListProps {
    Chips: chipProps[];
}

const ChipList = (props: ChipListProps) => {
  return (
    props.Chips.length > 0 ?
    <div style={{display: 'flex', flexWrap: "wrap", rowGap: '4px', columnGap: '1%', justifyContent: 'flex-start', maxWidth: '100%' }}>
        {
        props.Chips.map((chip: chipProps, index) => {
            return (
              <div style={{flexShrink: 1, maxWidth: '100%'}} key={index}>
                <ChipRender
                  backgroundColor = {chip.backgroundColor ?? "black"} 
                  fontColor = {chip.fontColor ?? "white"} 
                  label={chip.label ?? "No label"}
                />
          </div>
            )
        })}
    </div> : null
  )
}

export default memo(ChipList)