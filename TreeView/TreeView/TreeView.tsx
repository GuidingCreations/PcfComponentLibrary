import  * as React from 'react'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useRef, memo } from 'react';

const TreeViewComponent = () => {

  const testItems = useRef<any[]>(
    [
  {
    id: 'grid',
    label: 'Data Grid',
    children: [
      { id: 'grid-community', label: '@mui/x-data-grid' },
      { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
      { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
    ],
  },
  {
    id: 'pickers',
    label: 'Date and Time Pickers',
    children: [
      { id: 'pickers-community', label: '@mui/x-date-pickers' },
      { id: 'pickers-pro', label: '@mui/x-date-pickers-pro' },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    children: [
      { id: 'charts-community', label: '@mui/x-charts' },
      { id: 'charts-pro', label: '@mui/charts-pro' },
    ],
  },
  {
    id: 'tree-view',
    label: 'Tree View',
    children: [
      { id: 'tree-view-community', label: '@mui/x-tree-view' },
      { id: 'tree-view-pro', label: '@mui/x-tree-view-pro' },
    ],
  },
    ]
)

  return (
    <div style={{textAlign: "left"}}>

    <RichTreeView items={testItems.current} sx={{
      
    }}/>
    </div>
  )

}

export default memo(TreeViewComponent)