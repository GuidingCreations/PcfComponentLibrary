/* eslint-disable */

import * as React from "react"
import * as HoverCardPrimitives from "@radix-ui/react-hover-card"

import { cx } from "../../utils"

interface TrackerBlockProps {
  key?: string | number
  color?: string
  tooltip?: string | string[]
  hoverEffect?: boolean
  defaultBackgroundColor: string
  useDarkMode: boolean
}

const Block = ({
  color,
  tooltip,
  defaultBackgroundColor,
  hoverEffect,
  useDarkMode
}: TrackerBlockProps) => {

  console.log("BLOCK PROPS: ", useDarkMode, defaultBackgroundColor, hoverEffect, tooltip, color)
  const [open, setOpen] = React.useState(false)
  return (
    <HoverCardPrimitives.Root
      open={open}
      onOpenChange={setOpen}
      openDelay={0}
      closeDelay={0}
      tremor-id="tremor-raw"
      
    >
      <HoverCardPrimitives.Trigger onClick={() => setOpen(true)} asChild>
        <div  className="size-full overflow-hidden px-[0.5px] transition first:rounded-l-[4px] first:pl-0 last:rounded-r-[4px] last:pr-0 sm:px-px">
          <div
          style={{backgroundColor: color}}
            className={`size-full rounded-[1px] ${hoverEffect ? "hover:opacity-50" : ""}`}
          />
        </div>
      </HoverCardPrimitives.Trigger>
      {
        tooltip ?
        <HoverCardPrimitives.Portal>
        <HoverCardPrimitives.Content
          sideOffset={10}
          side="top"
          align="center"
          avoidCollisions
          style={{zIndex: 4999, backgroundColor: defaultBackgroundColor}}
          
          className="w-auto rounded-md px-2 py-1 text-sm shadow-md"
          >
          { typeof tooltip == "string" ? tooltip : 
          
          <div style={{display: 'flex', flexDirection: 'column', zIndex: 5000, backgroundColor: defaultBackgroundColor}}>
            {tooltip?.map((line : any) => <p style={{color: defaultBackgroundColor == "black" ? "white" : "black"}}>{typeof line  == "string" ? line : line.Value}</p>)}
          </div>
          
          }
        </HoverCardPrimitives.Content>
      </HoverCardPrimitives.Portal>
      : null
  }
    </HoverCardPrimitives.Root>
  )
}

Block.displayName = "Block"

interface TrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TrackerBlockProps[]
  defaultBackgroundColor: string
  hoverEffect?: boolean;
  useDarkMode: boolean
}

const Tracker = React.forwardRef<HTMLDivElement, TrackerProps>(
  (
    {
      data = [],
      
      className,
      hoverEffect,
      ...props
    },
    forwardedRef,
  ) => {
    console.log("TRACKER PASSED PROPS: ", props)
    const varBackground = props.defaultBackgroundColor
    return (
      <div
        ref={forwardedRef}
        className={cx("group flex h-8 w-full items-center", className)}
        {...props}
        style={{width: '100%', height: '100%'}}
      >
        {data.map((props, index) => { 
          
          console.log('DATA PROPS: ', props)
          
          return (
          <Block
          {...props}
          key={props.key ?? index}
          hoverEffect={hoverEffect}
          defaultBackgroundColor= {varBackground}
            useDarkMode = {props.useDarkMode}
          />
        )})}
      </div>
    )
  },
)

Tracker.displayName = "Tracker"

export { Tracker, type TrackerBlockProps }
