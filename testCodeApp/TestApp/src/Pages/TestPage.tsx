import * as React from 'react'
import { Office365UsersService } from '../Services/Office365UsersService';
import {TestListService} from '../Services/TestListService'
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

const TestPage = () => {
     
        const [listItems, setListItems ] = React.useState<any>()
        const [loading, setLoading] = React.useState(true)

        const columns :GridColDef[] = [
          {
            field: "TestChoices",
            valueGetter: (value : any) => {return value.Value}
          },
          {
            field: "testCurrency"
          }
        ]

        console.log("COLS: ",columns)

          const loadData = async () => {

            setLoading(true)
            try {
              const items = await TestListService.getAll({top: 4000})
              console.log("ITEMS: ", items)
              setListItems(items.data);
        
            } catch {
              console.log("ERR")
            } finally {
              setLoading(false)
            }

            
          }


        React.useEffect(() => {
        
      
          loadData()

        }, [])

  return (
    <div style={{width: '1000px', height: '500px'}}>
    {
    loading ?
    <div>Loading...</div> :
    <div>Loaded</div>
  }
    <button onClick={() => loadData()} >Click me to reload</button>
    <DataGrid loading={loading} columns={columns} rows={listItems} getRowId={(row) => row.ID} sx={{width: '100%', height: '100%'}}/>
  </div>
  )
}

export default TestPage