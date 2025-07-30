/* eslint-disable */

import * as React from 'react'
import { memo } from 'react'
import Box from '@mui/material/Box';
import { Unstable_FunnelChart as FunnelChart } from '@mui/x-charts-pro/FunnelChart';
const FunnelComponent = () => {
  return (
      <FunnelChart
        series={[
          {
            data: [{ value: 200}, { value: 180 }, { value: 90 }, { value: 50 }],
          },
        ]}
        height={300}
        gap={10}
      />
  )
}

export default memo(FunnelComponent)