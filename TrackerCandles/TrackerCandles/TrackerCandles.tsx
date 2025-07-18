/* eslint-disable */
import * as React from 'react'
import { memo } from 'react'

const data = [
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'},
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "blue" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'},
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "red" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'},
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "red" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'},
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "red" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "red" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'},
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "red" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'},
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "red" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'},
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "red" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'},
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "red" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'},
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 2", backgroundColor: "red" },
  { color: "bg-emerald-600", tooltip: "Tracker Info", key: "TEST 1", backgroundColor: 'green'} 
]

export interface CandleProps {
  height?: string;
  width?: string;
}

const Candles = (props: CandleProps) => {
 
  console.log("PROPS RECEIVED CANDLES: ", props)

  return (
    data.length > 0 ?
    
      <div id='rootContain' style={{display: 'flex', width: props.width, height: props.height}} className='group flex h-8 w-full items-center'>

      {data.map((record, index) => {
        return <div key = {index} className='size-full overflow-hidden px-[0.5px]  first:rounded-l-[4px] first:pl-0 last:rounded-r-[4px] last:pr-0 sm:px-px'>
          <div className='size-full rounded-[1px]' style={{backgroundColor: record.backgroundColor}}></div>
        </div>
      })}

     
   
      </div>
    
    
    : null
  )
}

export default memo(Candles)