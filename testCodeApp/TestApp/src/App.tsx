import './App.css'
import TestPage from './routes/TestPage'
import TestPage2 from './routes/TestPage2';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CustomThemeContext, CustomThemeProps } from './contexts/CustomThemeContext';
function App() {

const [CustomTheme, SetCustomTheme] = useState<Theme>(createTheme(localStorage.getItem("ThemeConfig") ? 
createTheme(
  {
    palette: {
      mode: JSON.parse(localStorage.getItem("ThemeConfig")!).mode
    }
  }
) : createTheme()));
console.log("CUSTOM THEME: ", CustomTheme)

useEffect(() => {
  localStorage.setItem("ThemeConfig", JSON.stringify({mode: CustomTheme.palette.mode}))
}, [CustomTheme])

  return (
<CustomThemeContext.Provider value = {{CustomTheme, SetCustomTheme}}>

<ThemeProvider theme={CustomTheme}>

      <CssBaseline />

      <Routes>
        <Route path='/' element = {<TestPage/>}/>
        <Route path='/TestPage2' element = {<TestPage2/>}/>
      </Routes>
      
      </ThemeProvider>
</CustomThemeContext.Provider>
  )
}

export default App
