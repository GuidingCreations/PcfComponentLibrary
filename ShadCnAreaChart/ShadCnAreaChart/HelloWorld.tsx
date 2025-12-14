"use client"
/* eslint-disable */
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../components/ui/chart"

export const description = "An area chart with gradient fill"
export interface AreaChartProps {
  width: number
  height: number;
  chartData?: any[];
  useTestData?: boolean;
  dateColumn?: string;
  secondaryDateColumn?: string;
  valueColumn?: string;
  secondaryValueColumn?: string;
  chartTitle?: string;
  chartSubTitle?: string;
}
const data = [
  { month: "January", desktop: 186, mobile: 80, date: new Date(2024, 0, 1) },
  { month: "February", desktop: 305, mobile: 200, date: new Date(2024, 1, 1) },
  { month: "March", desktop: 237, mobile: 120, date: new Date(2024, 2, 1) },
  { month: "April", desktop: 73, mobile: 190, date: new Date(2024, 4, 1) },
  { month: "May", desktop: 209, mobile: 130, date: new Date(2024, 4, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2024, 5, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2024, 6, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2024, 7, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2024, 8, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2024, 9, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2024, 10, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2024, 11, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2025, 0, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2025, 1, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2025, 2, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2025, 3, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2025, 4, 1) },
  { month: "June", desktop: 214, mobile: 140, date: new Date(2025, 5, 1) },
]
const formatXaxis = (tickItem: string | number) => {
  const date = new Date(tickItem);
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function AreaChartComponent(props: AreaChartProps) {

  console.log("Props Received: ", props);
  document.documentElement.classList.add("dark")


  const chartData = props.useTestData ? data : (props.chartData || []);

  return (
    <div style = {{height: `${props.height}px`, width: `${props.width}px`}}>

    <Card className="bg-gray-950" >
      
      {
        (props.chartTitle || props.chartSubTitle) && (
        <CardHeader className="dark:text-white">
          {props.chartTitle ? <CardTitle className="dark:text-white">{props.chartTitle}</CardTitle> : null}
          {props.chartSubTitle ? <CardDescription className="dark:text-white">{props.chartSubTitle}</CardDescription> : null}
        </CardHeader>
        )
      }
      
      
      
      
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={props.useTestData ? "date" : props.dateColumn ?? "date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatXaxis}
            />
            <YAxis
            tickLine={true}
            axisLine= {true}
            tickCount={5}
            tickMargin={8}
            
            />
            <ChartTooltip labelClassName="text-muted-foreground" cursor={false} content={<ChartTooltipContent />}  />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey={props.useTestData ? "mobile" : props.valueColumn ?? "mobile"}
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>

    </div>

  )
}
