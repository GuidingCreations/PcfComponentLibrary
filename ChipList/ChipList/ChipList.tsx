/* eslint-disable */
import { Chip, Stack } from '@mui/material';
import React, {memo, useRef} from 'react'

export interface ChipProp {
  Value: string;
  backgroundColor?: string,
  recordID?: string
}

export interface ChipListProps {
  ChipList: ChipProp[];
  width: number;
  height: number
  useTestData: boolean
}

const ChipListComponent = (props: ChipListProps) => {
 
const testItems = useRef<ChipProp[] >([
        {
            Value: "Option 1",
            backgroundColor: "red",
            recordID: "151"
        },
        {
            Value: "Option 2",
            backgroundColor: "blue",
            recordID: "152"
        },
        {
            Value: "Option 3",
            recordID: "153"
        }
    ])

const items = !props.useTestData ? props.ChipList : testItems.current
    

  return (
    <Stack rowGap={1} spacing={1} direction={'row'} flexWrap={'wrap'} style={{height: `${props.height}px`, width: `${props.width}px`}}>
        {
          items.map((chipItem: ChipProp) => {
            return(

            <Chip 
              key={""}
              sx={{
                backgroundColor: chipItem.backgroundColor || 'black',
                color: 'white',
                flexGrow: 1
              }}
              label = {chipItem.Value}
              onClick = {() => console.log("VAL: ", chipItem.Value)}
              onDelete={() => console.log("DELETE")}
            />
            
          )
          })
        }
    </Stack>
  )
}

export default memo(ChipListComponent)