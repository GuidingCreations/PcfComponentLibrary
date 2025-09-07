import './App.css'
import TestPage from './routes/TestPage'
import TestPage2 from './routes/TestPage2';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {

  

  const initialState = {Theme: createTheme({palette: JSON.parse(localStorage.getItem('themeConfig') ?? '{"mode":"dark","primaryColor":"Green"}')})};

  const [state, setState] = useState(initialState)

  return (
      <ThemeProvider theme={state.Theme}>

      <CssBaseline />
      
      <Routes>
        <Route path='/' element = {<TestPage updateThemeMode={(newThemeMode: 'dark' | 'light') =>  setState({...state, Theme: createTheme({palette: {mode: newThemeMode}})})}/>}/>
        <Route path='/TestPage2' element = {<TestPage2/>}/>
      </Routes>
      </ThemeProvider>
  )
}

export default App
