import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import PowerProvider from './PowerProvider.tsx'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestPage2 from './routes/TestPage2.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/TestPage2",
    element: <TestPage2/>
  }
]);




ReactDOM.createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <PowerProvider>
    <RouterProvider router={router}/>
  </PowerProvider>
</StrictMode>,
)
