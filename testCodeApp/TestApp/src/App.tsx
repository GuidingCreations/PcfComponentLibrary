import './App.css'
import TestPage from './routes/TestPage'
import TestPage2 from './routes/TestPage2';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CustomThemeContext, CustomThemeProps } from './contexts/CustomThemeContext';
function App() {

const defaultTheme : CustomThemeProps = {
  CustomTheme: createTheme({palette: JSON.parse(localStorage.getItem('themeConfig') ?? '{"mode":"dark","primaryColor":"Green"}')}),
  SetCustomTheme: () => createTheme({palette: {mode: 'light'}})
}

const [CustomTheme, SetCustomTheme] = useState<Theme>(defaultTheme.CustomTheme);
console.log("CUSTOM THEME: ", CustomTheme)

  return (
<CustomThemeContext.Provider value = {{CustomTheme, SetCustomTheme}}>

<ThemeProvider theme={CustomTheme}>

      <CssBaseline />

      <Routes>
        <Route path='/' element = {<TestPage updateThemeMode={(newThemeMode: 'dark' | 'light') =>  {}}/>}/>
        <Route path='/TestPage2' element = {<TestPage2/>}/>
      </Routes>
      
      </ThemeProvider>
</CustomThemeContext.Provider>
  )
}

export default App
