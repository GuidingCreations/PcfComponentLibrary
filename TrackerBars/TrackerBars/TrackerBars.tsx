/* eslint-disable */



"use client"
import * as React from "react"
import { Tracker } from "./Tracker"
import { memo } from "react"

const testData = [
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "red", tooltip: "Error" },
  { color: "seagreen", tooltip: ["Tracker Info akjdfa;sdflkjadfsjk asd;flkasdf; adjsfk;kjadf adsf;kajsdf;l ", "SECOND LINE;jfff sl"] },
  { color: "seagreen", tooltip: ["Tracker Info", "Tracker info number: 2"] },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "red", tooltip: "Error" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "yellow", tooltip: "Warn" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
  { color: "seagreen", tooltip: "Tracker Info" },
]

export interface TrackerBarsProps {
  trackerData: any[];
  useTestData: boolean;
  height: number;
  width: number
  useDarkMode: boolean;
}

 const TrackerBarsComponent = (props: TrackerBarsProps) => {

  const data = props.useTestData ? testData : props.trackerData

  console.log("PROPS: ", props, "DATA: ", data)

  return(
    <div style={{height: `${props.height}px`, width: `${props.width}px`}}>

  <Tracker data={data} hoverEffect={true} style={{width: '100%', height: '100%', gap: '1.5px'}} useDarkMode = {props.useDarkMode} defaultBackgroundColor= {props.useDarkMode ? "white" : "black"} />
    </div>
)
}

export default memo(TrackerBarsComponent)