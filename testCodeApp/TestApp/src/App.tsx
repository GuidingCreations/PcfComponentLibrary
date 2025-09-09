import './App.css'
import TestPage from './routes/RootLayout/Children/TestPage'
import TestPage2 from './routes/RootLayout/Children/TestPage2';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CustomThemeContext } from './contexts/CustomThemeContext';
import RootLayout from './routes/RootLayout/RootLayout'
import HomePage from './routes/RootLayout/Children/HomePage';
import MyOwnedGroups from './routes/RootLayout/Children/Groups/MyOwnedGroups';
function App() {

const [CustomTheme, SetCustomTheme] = useState<Theme>(createTheme(localStorage.getItem("ThemeConfig") ? 
createTheme(
  {
    palette: {
      mode: JSON.parse(localStorage.getItem("ThemeConfig")!).mode,
      primary: {
        main: '#0061c3'
      }
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
        <Route element = {<RootLayout/>}>
          <Route path='/' element = {<HomePage/>}/>
          <Route path='TestPage' element = {<TestPage/>}/>
          <Route path='TestPage2' element = {<TestPage2/>}/>
          <Route path='Groups'>
            <Route path = "MyOwnedGroups" element= {<MyOwnedGroups/>}/>
          </Route>
        </Route>
      </Routes>
      
      </ThemeProvider>
</CustomThemeContext.Provider>
  )
}

export default App
