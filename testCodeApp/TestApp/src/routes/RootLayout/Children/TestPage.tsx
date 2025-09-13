import * as React from 'react'
import {TestListService} from '../../../Services/TestListService'
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useCustomThemeContext } from '../../../contexts/CustomThemeContext';
import { createTheme } from '@mui/material/styles';


const TestPage = () => {
     
  const {CustomTheme, SetCustomTheme} = useCustomThemeContext();

        const updateThemeMode =() => {
          
          
          SetCustomTheme(createTheme({palette: {mode: CustomTheme.palette.mode == "dark" ? "light": "dark"}}))
        }

        const [listItems, setListItems ] = React.useState<any>()
        const [loading, setLoading] = React.useState(true)

        const columns :GridColDef[] = [
          {
            field: "TestChoices",
            valueGetter: (value : any) => {return value.Value},
            editable: true
          },
          {
            field: "testCurrency",
            editable: true
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
        
      
          loadData();

          let themeConfigRaw = localStorage.getItem("themeConfig");
          if (!themeConfigRaw) {
            localStorage.setItem('themeConfig', JSON.stringify({Mode: "dark", primaryColor: "Green"}));
            themeConfigRaw = localStorage.getItem("themeConfig")
          }

          const themeConfig = JSON.parse(localStorage.getItem("themeConfig")!)
          console.log(themeConfig)

        }, [])

  return (
    


    <div style={{width: '1000px', height: '500px'}}>
    {
      loading ?
      <div>Loading...</div> :
      <div>Loaded</div>
    }
    <button onClick={() => loadData()} >Click me to reload</button>
    <DataGrid
      onCellEditStop={(e) => {
        console.log("EVENT: ", e,  e.api.getRowWithUpdatedValues(e.id, "testCurrency").testCurrency, typeof  e.api.getRowWithUpdatedValues(e.id, "testCurrency").testCurrency)
        const tryUpdate = Promise.resolve(TestListService.update(e.row.ItemInternalId as any, {testCurrency: Number(e.api.getRowWithUpdatedValues(e.id, "testCurrency").testCurrency)}));
        tryUpdate.then(() => loadData());
        console.log("TRY UPDATE: ", tryUpdate)
      }} 
      checkboxSelection 
      disableMultipleRowSelection 
      loading={loading} 
      columns={columns} 
      rows={listItems} 
      getRowId={(row) => row.ID} 
      sx={{width: '100%', height: '100%'}}
      editMode='cell'
      />
      <button onClick={() => {console.log("SWITCHING THEME"); updateThemeMode()}}>Switch theme mode</button>
      <a href='/TestPage2'>Go to second test page</a>
  </div>


  )
}

export default TestPage