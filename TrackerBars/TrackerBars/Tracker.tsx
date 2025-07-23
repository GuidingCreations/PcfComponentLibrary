/* eslint-disable */

import * as React from "react"
import * as HoverCardPrimitives from "@radix-ui/react-hover-card"

import { cx } from "../../utils"

interface TrackerBlockProps {
  key?: string | number
  color?: string
  tooltip?: string | string[]
  hoverEffect?: boolean
  defaultBackgroundColor?: string
}

const Block = ({
  color,
  tooltip,
  defaultBackgroundColor,
  hoverEffect,
}: TrackerBlockProps) => {
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
      <HoverCardPrimitives.Portal>
        <HoverCardPrimitives.Content
          sideOffset={10}
          side="top"
          align="center"
          avoidCollisions
          style={{zIndex: 4999}}
          
          className="w-auto rounded-md px-2 py-1 text-sm shadow-md text-white dark:text-gray-900 bg-gray-900 dark:bg-gray-50"
        >
          { typeof tooltip == "string" ? tooltip : 
          
          <div style={{display: 'flex', flexDirection: 'column', zIndex: 5000}}>
            {tooltip?.map((line : any) => <p>{typeof line  == "string" ? line : line.Value}</p>)}
          </div>
          
          }
        </HoverCardPrimitives.Content>
      </HoverCardPrimitives.Portal>
    </HoverCardPrimitives.Root>
  )
}

Block.displayName = "Block"

interface TrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TrackerBlockProps[]
  defaultBackgroundColor?: string
  hoverEffect?: boolean
}

const Tracker = React.forwardRef<HTMLDivElement, TrackerProps>(
  (
    {
      data = [],
      defaultBackgroundColor = "bg-gray-400 dark:bg-gray-400",
      className,
      hoverEffect,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cx("group flex h-8 w-full items-center", className)}
        {...props}
      >
        {data.map((props, index) => (
          <Block
            key={props.key ?? index}
            defaultBackgroundColor={defaultBackgroundColor}
            hoverEffect={hoverEffect}
            {...props}
          />
        ))}
      </div>
    )
  },
)

Tracker.displayName = "Tracker"

export { Tracker, type TrackerBlockProps }
